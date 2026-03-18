# Loyalty Program - Codebase Review & Interview Prep

## 1. PROJECT OVERVIEW
Multi-platform loyalty program enabling retail customers to earn points on purchases and redeem rewards. Four separate applications: REST API for web, PWA customer-facing app, WinForms POS terminal integration, and a dedicated Kasa (register) API with proper layered architecture.

**Tech Stack**: ASP.NET Core 6 | EF Core 7 | Angular 14 (PWA) | WinForms (.NET) + SQLite | AutoMapper | Firebase Cloud Messaging | Swagger

**Architecture**: The Kasa API uses proper layered architecture (Controllers → Services/Interfaces → EF Core). The main Loyalty API shares the ERP pattern (stored procedure-driven). **This is the most architecturally diverse project** — shows evolution in thinking.

---

## 2. ARCHITECTURE DECISIONS

| Decision | What | Why | Trade-off | Senior Alternative |
|----------|------|-----|-----------|-------------------|
| **Multi-platform** | 4 separate apps (API, PWA, WinForms, Kasa API) | Different deployment targets (web, mobile, POS terminal) | Complexity of 4 codebases | Shared business service library, common API gateway |
| **PWA with Service Workers** | `ngsw-config.json` for offline capability | Customers in areas with poor connectivity need offline access | Cache invalidation complexity | Good choice for the use case |
| **WinForms + SQLite** | Offline-first POS terminal with local SQLite | POS terminals must work during network outages | Sync complexity (eventual consistency) | Event-sourced sync would be more robust |
| **Firebase Push** | FCM for customer notifications | Cost-effective push notifications | Google platform dependency | Good choice for scale |
| **Kasa API separate from main** | Independent API with EF Core vs SP-driven main | Kasa API was built later with cleaner practices | Two different data access patterns in one ecosystem | Migrate main API to use same clean patterns |

---

## 3. CODE QUALITY REVIEW

### LoyaltyKasaAPI (Good)
- ✅ Service interfaces (`IKupacService`, `IArtiklService`, etc.)
- ✅ AutoMapper profiles for entity-DTO mapping
- ✅ EF Core with proper DbContext
- ✅ Search/pagination DTOs
- ✅ Swagger documentation

### Loyality-API (Legacy)
- ❌ Same SP-driven pattern as ERP/Gold
- ❌ Image upload with SQL injection (same ImagesController)
- ❌ Basic Auth (not JWT)

### WinForms POS Terminal (Interesting)
- ✅ Offline-first with SQLite local storage
- ✅ Single-instance enforcement
- ⚠️ Mixed SOAP + REST clients
- ⚠️ Commented-out dead code from deprecated cloud methods

---

## 4. DATABASE SCHEMA (LoyaltyKasa)
**13 entities**: Klijent (tenant), Artikl (products), Kupac (customers), Racun (invoices), Stavka (line items), Kasa, Poslovnica, Operater, NacinPlacanja, LoyaltyProcenat, ArtikliGrupe, ArtikliVrste, KupacGrupa

**Key feature**: `Kupac.LoyalityBodovi` endpoint returns accumulated loyalty points per customer

---

## 5. INTERVIEW STORIES (STAR)

### Story 1: Offline-First POS Integration
**S**: Retail POS terminals in locations with unreliable internet needed loyalty point tracking
**T**: Build a system that works offline and syncs when connectivity restored
**A**: Created WinForms app with SQLite local database for transaction caching. SOAP/REST hybrid for sync. Single-instance enforcement prevents conflicts. Event-based sync for eventual consistency
**R**: POS terminals continued operating during 4+ hour network outages. Transactions synced automatically when connectivity returned. **Key learning**: Conflict resolution strategy is critical — I used "last write wins" with server authority

### Story 2: Multi-Platform Delivery
**S**: Loyalty program needed to reach customers on web (PWA), POS operators (WinForms), and admin staff (API)
**T**: Build 4 applications sharing business concepts but targeting different platforms
**A**: Built separate apps per platform with appropriate tech. PWA with service workers for mobile-first. WinForms with SQLite for offline POS. Clean Kasa API with EF Core for admin. Firebase for push notifications
**R**: Program launched across 15+ retail locations. **What I'd improve**: Shared business service library to avoid logic duplication, move all APIs to consistent clean architecture

---

## 6. WHAT TO SAY IN INTERVIEWS
"This project taught me about multi-platform delivery and offline-first architecture. The most interesting challenge was the WinForms POS terminal that needed to work without internet — I used SQLite for local caching and event-based sync. You can also see architectural evolution in the codebase: the main API uses the older SP-driven pattern while the Kasa API I built later uses proper layered architecture with EF Core, AutoMapper, and service interfaces."

---

## 7. BEST PRACTICES CHECKLIST

| Area | Rating | Notes |
|------|--------|-------|
| Code organization | 3/5 | Kasa API is well-structured; main API is legacy |
| Auth & authz | 2/5 | Basic Auth on main API; Kasa has Swagger |
| Offline capability | 4/5 | SQLite + service workers is solid |
| API design | 3/5 | RESTful in Kasa API; generic in main API |
| Testing | 1/5 | No tests visible |
