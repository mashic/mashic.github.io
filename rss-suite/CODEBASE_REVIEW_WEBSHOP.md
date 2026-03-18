# WebShop (E-Commerce) - Codebase Review & Interview Prep

## 1. PROJECT OVERVIEW
B2C e-commerce platform with product catalog, shopping cart, checkout, and payment processing via Monri (Balkans payment processor). Features product variants (size/color), customer reviews, Happy Hour time-based discounts, and order management.

**Tech Stack**: .NET Core 3.1 | EF Core 3.1 (writes) + Dapper (reads) | Angular 7 | SQL Server | Monri Payment Gateway | ng-bootstrap | i18n (Bosnian/English)

**Architecture**: Repository pattern with interface abstractions. Hybrid ORM (EF Core for writes, Dapper for reads). Controllers → Repositories → Database. No service layer.

---

## 2. KEY ARCHITECTURE DECISIONS

| Decision | What | Why | Trade-off | Senior Alternative |
|----------|------|-----|-----------|-------------------|
| **Hybrid ORM** | EF Core for writes, Dapper for reads | 3x read performance improvement with Dapper | Dual data access patterns to maintain | Excellent choice — production-proven pattern |
| **Repository + Interfaces** | `IRepository` abstractions | Testability, swappable implementations | Repositories became "fat" with business logic | Add service layer between controllers and repos |
| **Monri Payment** | Redirect-based PCI-compliant payment | We never see card data — Monri hosts the payment page | Redirect-based UX (user leaves site) | Correct approach for PCI compliance |
| **Client-side pricing** | Cart prices stored in localStorage | Simple cart implementation | 🔴 **User can modify prices** | Server-side cart with session/JWT association |

---

## 3. MONRI PAYMENT INTEGRATION ⭐

**Flow** (most interview-worthy feature):
```
1. Customer clicks "Pay"
2. Backend creates order (status=PendingPayment)
3. Backend generates Monri redirect URL with HMAC-SHA512 signature
4. Customer redirected to Monri hosted payment page
5. Customer enters card details (PCI compliant — we never see it)
6. Monri processes → POSTs callback to /api/narudzbe/Payment
7. Backend verifies HMAC-SHA512 signature
8. Updates order status to "Paid"
9. Background reconciliation catches lost callbacks (~15 min)
```

**Signature verification**: `HMAC-SHA512(data, secretKey)` compared with incoming signature
**Idempotency**: `if (order.Status != "PendingPayment") return Ok();` — prevents duplicate processing

---

## 4. SECURITY ISSUES (CRITICAL)
1. 🔴 **Hardcoded payment secret** in MonriPayment.cs: `MerchantKey = "key-55f9ccc46e4ec11bfd9abf53edae5b1c"`
2. 🔴 **Payment secret in FRONTEND** — `payment.component.ts`: `SECRET_KEY = "t9Se=Ts_YXQ2|E*x9?)spg"` — exposed to any user
3. 🔴 **Plaintext passwords** — `DbKupacLoginPodaci` stores passwords unhashed
4. 🔴 **No authentication** — All endpoints open, KlijentId hardcoded
5. 🔴 **No authorization** — Anyone can change order status
6. 🟠 **Client-side cart prices** — localStorage prices can be modified
7. 🟠 **CORS wildcard** — `AllowAnyOrigin()`
8. 🟠 **Image upload unsafe** — No MIME type check, file size limit, or virus scan

---

## 5. SPECIAL FEATURES

### Happy Hour Pricing
- Time-based discounts at product or category level
- Rule engine in database with priority system for conflicts
- Sliding cache invalidation based on next rule transition
- **Interview angle**: "Dynamic pricing based on time windows — similar to airline/hotel pricing but for retail"

### Product Variants
```
Product: Nike Air Max 90
├─ Size S, Black (Stock: 5, Price: €100)
├─ Size M, Red (Stock: 0, Price: €100)
└─ Size L, Blue (Stock: 12, Price: €110 override)
```

### Internationalization
- `translate/` with Bosnian and English
- Frontend language service with dynamic switching

---

## 6. INTERVIEW STORIES (STAR)

### Story 1: Payment Gateway Integration with Monri
**S**: E-commerce site needed online payment processing for Balkans market
**T**: Integrate payment gateway while maintaining PCI compliance — we cannot see or store card data
**A**: Implemented Monri redirect-based flow. Backend generates HMAC-SHA512-signed payment request. Customer enters card details on Monri's hosted page. Monri POSTs callback with signed response. Backend verifies signature and updates order. Added reconciliation job to catch lost callbacks
**R**: Payment processing live. PCI compliant — zero card data touches our servers. **Lesson learned**: Payment secret must NEVER be in frontend code (it currently is — security issue I'd fix first)

### Story 2: Hybrid ORM Pattern
**S**: E-commerce catalog queries with Dapper were 3x faster than EF Core for complex product listings with variants, images, and pricing
**T**: Optimize read performance without losing EF Core's benefits for write operations
**A**: Used Dapper for all read queries (product catalog, search, listings) and EF Core for write operations (order creation, customer registration) — "CQRS-lite" approach
**R**: Catalog page load dropped from ~800ms to ~250ms. Write operations maintained data integrity via EF Core change tracking

---

## 7. WHAT TO SAY IN INTERVIEWS
"The WebShop project taught me about payment integration and hybrid data access patterns. The Monri payment flow with HMAC-SHA512 signature verification ensures PCI compliance. I used a 'CQRS-lite' approach with Dapper for reads and EF Core for writes, which gave us 3x better read performance. The biggest mistake in the codebase is the payment secret exposed in frontend code — I'd fix that immediately along with adding server-side cart validation and proper authentication."

---

## 8. BEST PRACTICES CHECKLIST

| Area | Rating | Notes |
|------|--------|-------|
| Code organization | 3/5 | Repository pattern with interfaces |
| Naming conventions | 2/5 | Mixed English/Bosnian |
| Error handling | 1/5 | Try-catch-return-null pattern |
| Auth & authz | 0/5 | Nothing implemented |
| Payment security | 2/5 | HMAC verification good but secrets exposed |
| Logging | 0/5 | No structured logging |
| Testing | 0/5 | Zero tests for payment flow |
| Dependencies | 1/5 | .NET Core 3.1 and Angular 7 both EOL |
