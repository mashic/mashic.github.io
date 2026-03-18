# ERP Project - Codebase Review & Interview Prep

## 1. PROJECT OVERVIEW
Enterprise Resource Planning web application for retail businesses managing articles, customers, suppliers, warehouses, invoicing, inventory, and reporting. A web portal on top of the existing POS/inventory SQL Server database with 500+ stored procedures driving all business logic.

**Tech Stack**: .NET Core 3.1 (EOL) | ADO.NET (raw SQL) | Angular 9 (EOL) | SQL Server | PrimeNG 11 | Bootstrap 4.6

**Architecture**: Monolithic with stored-procedure-driven business logic. No ORM usage for data — EF installed only for Identity. Controllers execute SQL directly through `MainController` and `ImagesController`.

---

## 2. ARCHITECTURE DECISIONS

| Decision | What | Why | Trade-off | Senior Alternative |
|----------|------|-----|-----------|-------------------|
| **Stored Procedures** | All business logic in SQL Server SPs | Leverages existing POS database, complex reporting optimized at DB level | Business logic locked in database, untestable, hard to version control | Extract to service layer; use SPs only for complex reporting |
| **Generic MainController** | Single controller with `GetDataSet`, `ProcExecQuery` endpoints | Any SP callable without new code | **Security nightmare** - no input validation, arbitrary SP execution | Separate controller per domain, validate inputs |
| **ADO.NET Direct** | Raw SqlCommand/SqlDataReader | Simple, fast, no ORM overhead | Type-unsafe, manual mapping, resource leak risk | Use Dapper for reads (type-safe) + EF Core for writes |
| **`GetDataSetBySql` endpoint** | Accepts raw SQL from client | Quick development shortcut | **CRITICAL: SQL injection** — client can run arbitrary queries | Remove immediately; never expose raw SQL execution |

---

## 3. CODE QUALITY REVIEW

### Done Well
1. **Parameterized queries** (in MainController) — stored procedure calls use SqlParameter, preventing SQL injection in the main data path
2. **Multi-tenant awareness** — FirmaId filtering in stored procedures
3. **Component-based Angular** — 43 feature modules, each focused on a business domain

### Critical Issues
1. **SQL Injection in ImagesController** — String concatenation for INSERT/UPDATE/DELETE: `"Insert into dbArtiklSlikeWebShop Values ('" + request.ArtiklId + "'..."`
2. **`GetDataSetBySql` allows arbitrary SQL** — Any authenticated (or unauthenticated) client can execute raw SQL against the database
3. **No authentication on any endpoint** — Zero `[Authorize]` attributes except Login. All data openly accessible
4. **Hardcoded credentials** — DB connection string with user/password in `appsettings.json`
5. **MD5 password hashing** — Cryptographically broken since 2012
6. **Resource leaks** — SqlConnection.Open() without `using` statements; connections leaked on exceptions
7. **Error disclosure** — `catch (Exception ex) { return Ok(ex.Message); }` exposes stack traces

### SOLID Analysis
| Principle | Status | Details |
|-----------|--------|---------|
| SRP | ❌ | MainController: HTTP handling + SQL execution + data mapping + auth in one class |
| OCP | ❌ | Adding entity requires new endpoint + service + component — not open for extension |
| ISP | ❌ | Generic endpoints force all callers to understand stored procedure interface |
| DIP | ❌ | Controllers directly instantiate `new DBConnection()` — no abstraction |

---

## 4. DESIGN PATTERNS

| Pattern | Where | Notes |
|---------|-------|-------|
| **God Class** | *Anti-pattern* — MainController with 30+ methods | Should be split into domain controllers |
| **Anemic Services** | Frontend services are HTTP wrappers only | No client-side business logic |
| **Magic Strings** | Stored proc names hardcoded in every service | Should use constants or config |

---

## 5. DATABASE & DATA
- **Shared database**: `PosBlagRobno` used by multiple RSS applications simultaneously
- **Tables**: Artikli, Kupci, Dobavljaci, Proizvodjaci, Korisnici, Poslovnice, Kase, Skladista, Porezi + image tables
- **Heavy SP reliance**: 500+ stored procedures contain all business logic
- **Multi-tenant**: FirmaId filtering done in stored procedures

---

## 6. SECURITY VULNERABILITIES (CRITICAL)
1. 🔴 **SQL Injection** — ImagesController uses string concatenation for SQL
2. 🔴 **Arbitrary SQL execution** — `GetDataSetBySql` endpoint
3. 🔴 **No authentication** — All endpoints unauthenticated
4. 🔴 **Hardcoded DB credentials** — In appsettings.json
5. 🔴 **CORS wildcard** — `WithOrigins("*")`
6. 🟠 **MD5 hashing** — For passwords
7. 🟠 **Exception disclosure** — Full error messages returned to client

---

## 7. INTERVIEW STORIES (STAR)

### Story 1: Legacy System Modernization
**S**: Existing POS system had 500+ stored procedures and no web interface — clients needed remote access
**T**: Build a web frontend without rewriting business logic or disrupting existing POS operations
**A**: Created a thin .NET Core API layer that calls existing stored procedures via ADO.NET. Angular frontend with 43 feature modules matching business domains. Shared the same `PosBlagRobno` database
**R**: Delivered web access to all POS features within 3 months. If starting over, I'd add a proper service layer with Dapper, input validation, and authentication

### Story 2: Working with Legacy Constraints
**S**: Management required zero changes to existing stored procedures used by WinForms POS clients
**T**: Bridge modern web tech to legacy SQL-first architecture
**A**: Built `GetDataSet` generic endpoint that forwards SP names and parameters. Accepted the trade-off of security risk for compatibility
**R**: All 43 features launched. **Lesson learned**: Generic endpoints need strict whitelisting — I'd implement an allowed-SP registry pattern

---

## 8. WHAT TO SAY IN INTERVIEWS

**Honest framing**: "This was a legacy modernization project with hard constraints — couldn't modify existing stored procedures used by POS terminals. I built a web layer on top. If I owned this project today, I'd address the security issues first: add authentication, parameterize the ImagesController queries, remove the raw SQL endpoint, and add input validation."

**Shows self-awareness**, which is what interviewers look for.

---

## 9. BEST PRACTICES CHECKLIST

| Area | Rating | Notes |
|------|--------|-------|
| Code organization | 2/5 | God controller, no service layer |
| Naming conventions | 2/5 | Mixed English/Bosnian, inconsistent |
| Error handling | 1/5 | Exception messages returned to client |
| Input validation | 0/5 | None — raw SP names and SQL accepted |
| Auth & authz | 0/5 | No authentication on any endpoint |
| Logging | 1/5 | Only error emails |
| Secrets management | 0/5 | Hardcoded in appsettings |
| CI/CD | 0/5 | None |
| Documentation | 0/5 | No README, no Swagger |
| Dependencies | 1/5 | .NET Core 3.1 and Angular 9 both EOL |
