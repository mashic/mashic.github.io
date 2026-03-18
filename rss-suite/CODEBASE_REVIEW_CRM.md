# CRM Project - Codebase Review & Interview Prep

## 1. PROJECT OVERVIEW
A multi-tenant Customer Relationship Management system for tracking clients, events (calls/meetings/emails), tasks, and sales pipeline status across different companies. Built as a SaaS product where each company is a tenant sharing the same database.

**Tech Stack**: ASP.NET Core 6.0 | EF Core 7.0 | Angular 16 | SQL Server | AutoMapper | JWT Auth | Bootstrap + ng-bootstrap

**Architecture**: Layered (Controllers → Services → EF Core DbContext). Generic BaseCRUD pattern with Template Method design.

---

## 2. ARCHITECTURE DECISIONS

| Decision | What | Why | Trade-off | Senior Alternative |
|----------|------|-----|-----------|-------------------|
| **Generic Base Service** | `BaseService<T, Tdb, Tsearch, Trequest>` with virtual hooks | Eliminates CRUD boilerplate for 13+ entities | Hard to debug deep inheritance; 4 type params hurt readability | Prefer composition with a generic repository + explicit services for complex entities |
| **Multi-Tenancy via CompanyId** | Every entity scoped by CompanyId FK | Simple tenant isolation | CompanyId from query params (not JWT) = **tenant bypass vulnerability** | Extract CompanyId from JWT claims; enforce in middleware |
| **Soft Delete** | `IsDeleted` + `DeletedAt` columns | Audit trail, data recovery | Queries must always filter `.Where(x => !x.IsDeleted)` | Use a global query filter in EF Core (already possible) |
| **Basic Auth → JWT** | Login returns JWT, stored in localStorage | Standard SPA auth | Credentials in localStorage vulnerable to XSS | HttpOnly secure cookies; refresh token rotation |

---

## 3. CODE QUALITY REVIEW

### Done Well
1. **Generic CRUD Framework** - Template Method pattern with `AddFilter()`, `AddInclude()`, `BeforeInsert()`, `BeforeUpdate()` hooks - extensible and DRY
2. **Proper DTO Separation** - Database entities, API DTOs, Request objects, and SearchObjects are properly separated
3. **Paginated Results** - `PagedResult<T>` with count/page/pageSize is consistent across all endpoints

### Needs Improvement
1. **Multi-Tenancy Security** (CRITICAL) - CompanyId from query parameter, not JWT → any tenant can read any other tenant's data
2. **Hardcoded secrets** - JWT key in `appsettings.json`, DB credentials in `CrmContext.OnConfiguring` with IP:port visible
3. **SHA1 password hashing** - `UserService.cs` uses SHA1 + salt. SHA1 is broken. Must migrate to bcrypt/PBKDF2
4. **No null checks in BaseService** - `GetById()` and `Update()` don't handle entity not found → 500 errors
5. **No input validation** - Search objects accept negative pages, huge page sizes; no FluentValidation

### SOLID Analysis
| Principle | Status | Details |
|-----------|--------|---------|
| SRP | ⚠️ Partial | Services handle filtering, mapping, validation all together |
| OCP | ✅ Good | Template Method hooks allow extension without modification |
| LSP | ✅ Good | All services substitute correctly for base |
| ISP | ✅ Good | Separate search/request DTOs per entity |
| DIP | ⚠️ Partial | Services depend on EF Core DbContext directly, not repository abstraction |

---

## 4. DESIGN PATTERNS

| Pattern | Where | Interview Explanation |
|---------|-------|----------------------|
| **Template Method** | `BaseService` with virtual `AddFilter()`, `BeforeInsert()` | "The base service defines the algorithm skeleton—get, filter, paginate—and subclasses override specific steps like filtering logic or pre-insert validation" |
| **DTO Pattern** | `*Request`, `*SearchObject`, mapped via AutoMapper | "I separate what the client sends (Request), what we query by (SearchObject), and what we return (DTO) — each has a different concern" |
| **Soft Delete** | `IsDeleted` flag on entities | "Instead of physical deletion we mark records as deleted, maintaining audit history and allowing recovery" |
| **Multi-Tenancy** | `CompanyId` scoping | "Each API request is scoped to a tenant. In hindsight, CompanyId should come from the JWT token, not client input" |

### Anti-Patterns
- **God Controller Risk** - BaseController handles all CRUD; could grow if custom endpoints added
- **Magic strings** - CompanyId, search field names passed as strings
- **Missing null guards** - Happy path coding without defensive checks

---

## 5. DATABASE & DATA
**13 entities**: Company, User, Client, Event, Business, City, Country, Status, Software, TypeOfEvent, LeadSource, Tasks, UserTask

**Key Relationships**: Event → Client + User + Status + TypeOfEvent; Client → Business + City + Company + LeadSource

**Missing Indexes**: Likely missing composite indexes on (CompanyId, IsDeleted) which is filtered on every query

**N+1 Risk**: `AddInclude()` eager loading per entity helps but no `.AsSplitQuery()` for complex includes

---

## 6. TESTING
**None visible.** No unit tests, integration tests, or E2E tests found.

**Should test**: Multi-tenant isolation, search filtering, pagination edge cases, soft delete cascading, password hashing, JWT token generation/validation

---

## 7. API DESIGN
- Standard CRUD: GET (paginated), GET/{id}, POST, PUT/{id}, DELETE/{id} per entity
- **Extended**: Client has PATCH (toggle IsActive), User has ChangePassword, Event supports date range filtering
- ✅ REST conventions followed
- ❌ Login via query params `?username=x&password=y` (should be POST body)
- ❌ ChangePassword via query params (password in URL = logged in access logs)

---

## 8. FRONTEND
- **Module-based** Angular 16 with lazy loading
- **Services**: 21 CRM-specific services in `core/CrmServices/`
- **Auth**: JWT interceptor + error interceptor + auth guard
- **Subscription management**: Needs review for memory leaks

---

## 9. INTERVIEW STORIES (STAR)

### Story 1: Multi-Tenant Architecture
**S**: Building a CRM used by multiple companies on shared infrastructure
**T**: Ensure complete data isolation while keeping single database for cost efficiency
**A**: Implemented CompanyId scoping on every entity and service, with search objects inheriting base pagination. Added soft delete for audit trail
**R**: Supported 10+ tenants on one deployment. **Lesson learned**: CompanyId should be extracted from JWT, not client input — I'd fix this if starting over

### Story 2: Generic CRUD Framework
**S**: 13+ entities all needing identical CRUD operations
**T**: Eliminate boilerplate without sacrificing per-entity customization
**A**: Built `BaseService<T, Tdb, Tsearch, Trequest>` with Template Method pattern — virtual hooks for `AddFilter()`, `AddInclude()`, `BeforeInsert()`, `BeforeUpdate()`
**R**: New entities went from 2hrs to 15min setup. Team adopted the pattern across other RSS projects

---

## 10. LIKELY INTERVIEW QUESTIONS

1. **"Walk me through how a client creates a new Event"** → POST /api/Event → EventService.Insert() → BeforeInsert() validates → AutoMapper maps Request → EF Core SaveChanges → mapped DTO returned
2. **"How does multi-tenancy work?"** → CompanyId FK on every entity, filtered in AddFilter(). Acknowledge vulnerability: should come from JWT
3. **"What would you change?"** → CompanyId from JWT, bcrypt for passwords, add FluentValidation, move secrets to Azure Key Vault, add unit tests
4. **"How would this scale to 100x?"** → Read replicas for reporting, Redis cache for frequently accessed lookups (cities, countries), horizontal scaling behind load balancer since API is stateless
5. **"How did you handle authorization?"** → JWT with [Authorize] attribute. Missing resource-level authorization — user A can access user B's records if they know the ID

---

## 11. BEST PRACTICES CHECKLIST

| Area | Rating | Notes |
|------|--------|-------|
| Code organization | 4/5 | Clean separation: Controllers/Services/Database/Models |
| Naming conventions | 3/5 | Consistent C# naming, mixed English/Bosnian |
| Error handling | 2/5 | No global error filter, null returns instead of exceptions |
| Input validation | 1/5 | No validation anywhere |
| Auth & authz | 2/5 | JWT auth exists but no resource-level authorization |
| Logging | 1/5 | No structured logging |
| Secrets management | 1/5 | Hardcoded in appsettings and DbContext |
| CI/CD | 1/5 | Dockerfile exists but no pipeline |
| Documentation | 1/5 | No README, no API docs |
| Dependencies | 3/5 | Mostly current for the stack |
