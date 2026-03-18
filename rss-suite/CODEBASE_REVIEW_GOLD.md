# Gold (POS Analytics) - Codebase Review & Interview Prep

## 1. PROJECT OVERVIEW
POS analytics dashboard for retail chains — a web portal for viewing sales reports, item management, receipt lookups, cashier performance metrics, and real-time POS monitoring. Maintenance-mode legacy system built 2020.

**Tech Stack**: .NET Framework 4.5.2 (ASP.NET Web API 2) | ADO.NET raw SQL via DBConnection class | Angular 7 (EOL) | SQL Server | Entity Framework 6 (Identity only) | ngx-charts

**Architecture**: Traditional 3-tier with **no service layer**. Controllers → DBConnection → SQL Server stored procedures. Same pattern as ERP but even older tech stack.

---

## 2. KEY FINDINGS

### Shared with ERP
- Same `PosBlagRobno` database
- Same ADO.NET pattern with raw SqlDataReader parsing
- Same hardcoded credentials (`fadil/fadil123`)
- Same `EnableCors("*", "*", "*")` on all controllers
- Same lack of authentication on data endpoints

### Unique to Gold
- **40+ reporting endpoints** focused on sales analytics (daily/weekly/monthly/yearly breakdowns)
- **EmailHelper** for error notification (sends stack traces via email on exceptions)
- **Multi-series charting** — `WebPocetnaPrometPoPeriodimaZaOperatera` returns multi-series data for cashier performance charts
- **ngx-charts** on frontend for interactive dashboards

---

## 3. SECURITY ISSUES (Same as ERP)
1. 🔴 **No authentication** on 40+ report endpoints — only Login endpoint exists
2. 🔴 **CORS `*` wildcard**
3. 🔴 **MD5 password hashing** (legacy, migrated to bcrypt per interview notes)
4. 🔴 **Hardcoded DB credentials** in DBConnection.cs
5. 🟠 **Multi-tenant bypass** — `klijentID` from client parameter, no JWT validation
6. 🟠 **No HTTPS enforcement**

---

## 4. INTERVIEW STORIES (STAR)

### Story: Dashboard Performance Optimization
**S**: Retail chain managers needed real-time sales dashboards but running complex reporting queries against the live POS database caused performance issues during peak hours
**T**: Deliver fast dashboard load times without impacting POS transaction processing
**A**: Used stored procedures optimized for reporting (pre-aggregated data), separated dashboard queries by time granularity (daily/weekly/monthly), implemented date range filtering to limit data scanned
**R**: Dashboard loads in <2s for most reports. **What I'd do differently**: Add a read replica for reporting, implement Redis caching for frequently-accessed aggregations, use materialized views

---

## 5. WHAT TO SAY IN INTERVIEWS
"Gold was a reporting-focused application for POS data — managers could see sales by cashier, product, time period. The main technical challenge was running heavy analytics against a live transactional database. I'd approach this differently now: dedicated read replica, caching layer, proper authentication. The code needs modernization — it's .NET Framework 4.5 and Angular 7."

---

## 6. BEST PRACTICES CHECKLIST

| Area | Rating | Notes |
|------|--------|-------|
| Code organization | 2/5 | God controller, no service layer |
| Error handling | 2/5 | EmailHelper for errors but exposes details |
| Input validation | 1/5 | Parameters passed directly to SPs |
| Auth & authz | 0/5 | Nothing on data endpoints |
| Secrets management | 0/5 | Hardcoded |
| Dependencies | 0/5 | .NET 4.5.2 and Angular 7 far beyond EOL |
