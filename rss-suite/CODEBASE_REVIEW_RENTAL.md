# Car Rental - Codebase Review & Interview Prep

## 1. PROJECT OVERVIEW
Car rental booking platform with vehicle catalog, reservation management, admin approval workflow, and email notifications. Most design-pattern-conscious project in your portfolio — intentionally implements Factory, Decorator, and NgRx state management.

**Tech Stack**: ASP.NET Core 8.0 | EF Core | SQL Server | JWT Auth | BCrypt | FluentValidation | AutoMapper | Angular 17 | NgRx (Entity Adapter) | Bootstrap 5 | ngx-toastr | ESLint + Prettier | i18n (English/Norwegian)

**Architecture**: Clean layered architecture with service abstractions, intentional design patterns (Factory, Decorator), and NgRx state management on frontend.

---

## 2. DESIGN PATTERNS (Best Feature of This Project)

### Factory Pattern
**Files**: `DynamicUserFactory.cs`, `AdminUserFactory.cs`, `CustomerUserFactory.cs`
```
IUserFactory → DynamicUserFactory (dispatcher)
                ├── AdminUserFactory  → creates admin users with specific initialization
                └── CustomerUserFactory → creates customer users with different logic
```
**Interview**: "I used the Factory pattern for user creation because admins and customers have different initialization logic — validation rules, default permissions, associated entities. The DynamicUserFactory dispatches to the right factory based on context."

### Decorator Pattern
**File**: `LoggingUserServiceDecorator.cs`
```
IUserService → LoggingUserServiceDecorator (wraps) → UserService
```
**Interview**: "I wrapped the UserService with a logging decorator to add cross-cutting concerns without modifying the service itself. The decorator implements the same IUserService interface, logs method calls and results, then delegates to the real service. This follows the Open/Closed Principle."

### NgRx with Entity Adapter (Frontend)
```typescript
export const carAdapter = createEntityAdapter<Car>({
  selectId: (car: Car) => car.carId,
});
```
**Interview**: "I used NgRx Entity Adapter for normalized car state management. It provides efficient CRUD operations on entities, memoized selectors, and prevents unnecessary re-renders."

---

## 3. SOLID PRINCIPLES (Intentionally Applied)

| Principle | Implementation | Evidence |
|-----------|---------------|----------|
| **SRP** | Each service handles one entity domain | `CarService` only does cars, `BrandService` only brands |
| **OCP** | Factory/Decorator allow extension without modification | New user types = new factory, new cross-cutting = new decorator |
| **LSP** | All services implement interfaces uniformly | `LoggingUserServiceDecorator` substitutes for `UserService` |
| **ISP** | Separate interfaces per service | `ICarService`, `IBrandService`, etc. — focused contracts |
| **DIP** | Controllers depend on interfaces, DI resolves | `builder.Services.AddScoped<IUserService>(sp => new LoggingUserServiceDecorator(...))` |

---

## 4. ARCHITECTURE STRENGTHS

| Feature | Details |
|---------|---------|
| **FluentValidation** | `CarUpsertRequestValidator`, `CustomerUpsertRequestValidator`, `UserUpsertRequestValidator` |
| **BCrypt passwords** | Proper hashing (unlike other RSS projects) |
| **In-Memory Cache** | 10-minute TTL for brand/color lookups |
| **JWT auth** | Proper bearer token authentication |
| **Smart/Dumb Components** | Container components manage state; presentational components receive data via `@Input` |
| **Lazy Loading** | Feature modules loaded on-demand |
| **ESLint + Prettier** | Code quality tooling configured |

---

## 5. AREAS FOR IMPROVEMENT

1. **Missing `[Authorize]`** on many endpoints — only User PUT/DELETE and Rental management require auth
2. **No rate limiting** on API
3. **No integration tests** for the rental approval workflow
4. **Image upload** could use file type/size validation
5. **Email service** — could fail silently, needs retry logic

---

## 6. API ENDPOINTS

| Entity | Endpoints | Auth Required |
|--------|-----------|---------------|
| **User** | CRUD + Login + IsUsernameExists + CreateWithoutRegistration | PUT/DELETE only |
| **Car** | CRUD + GetMostRentedCars | None |
| **Brand** | CRUD (searchable) | None |
| **Color** | CRUD | None |
| **CarImage** | CRUD + Upload | None |
| **Customer** | CRUD | None |
| **Rental** | CRUD + ChangeApprovedStatus | Admin-only for management |
| **Mail** | SendEmail | None |

---

## 7. DATABASE SCHEMA

```
User ──┬── Customer ──── Rental
       └── Rental          │
                           │
Brand ── Car ── CarImage   │
Color ── Car ── Rental ────┘
```

**Key**: BCrypt password hashing, FK relationships with cascade delete, proper decimal(18,2) for prices

---

## 8. INTERVIEW STORIES (STAR)

### Story 1: Design Pattern Application
**S**: Building a car rental system as a portfolio project to demonstrate design pattern knowledge
**T**: Implement Factory, Decorator, and state management patterns in a real application
**A**: Used Factory pattern for polymorphic user creation (Admin vs Customer with different initialization). Added Decorator pattern for transparent logging on UserService without modifying business logic. Implemented NgRx with Entity Adapter for normalized state management on frontend
**R**: Clean, demonstrable code showing pattern application. Each pattern serves a real purpose, not forced usage. Can explain trade-offs in interviews

### Story 2: CQRS-Lite State Management
**S**: Car catalog needed efficient state management with filtering, sorting, and caching
**T**: Implement predictable state management without over-engineering
**A**: Used NgRx with Entity Adapter for normalized car state. Actions define user intent, reducers handle state transitions, effects handle API calls, selectors provide memoized computed state
**R**: Predictable data flow. Zero unnecessary API calls when navigating between views. Component re-renders minimal due to memoized selectors

---

## 9. WHAT TO SAY IN INTERVIEWS
"The Rental project is my most intentionally designed application. I used Factory pattern for user creation, Decorator for cross-cutting logging, and NgRx Entity Adapter for state management. It has proper JWT auth with BCrypt, FluentValidation, and in-memory caching. I built it to demonstrate that I understand these patterns practically, not just theoretically."

**This is the project to lead with for pattern/architecture questions.**

---

## 10. IMPROVEMENT TODO (For Public GitHub)

1. Add `[Authorize]` to all write endpoints
2. Add integration tests for rental approval workflow
3. Add Swagger endpoint documentation with examples
4. Add Docker + docker-compose for easy setup
5. Add CI/CD with GitHub Actions
6. Add README with screenshots and API docs
7. Add rate limiting middleware
8. Add health check endpoint
