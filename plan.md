username.github.io — PORTFOLIO WEBSITE PLAN
**production experience across 7+ business domains** (CRM, ERP, POS, Loyalty, Manufacturing, Hospitality, E-commerce, Computer Vision)

### What You CAN Show Publicly (As Developer)
- **Architecture patterns**: Generic CRUD, Template Method, Factory, Decorator, Repository
- **Tech decisions**: Why you chose patterns, trade-offs you made
- **Code samples**: Sanitized examples of your patterns (no client data/connections)
- **System diagrams**: Architecture, data flow, component relationships
- **Domain knowledge**: Manufacturing MES, POS analytics, loyalty programs, hotel bookings

### Purpose
Single page showcasing your projects, skills, and experience. Links to GitHub repos and live demos.

### Structure
```
masic.github.io/
├── index.html              # Landing + hero
├── sections:
│   ├── About Me            # 2-3 sentence intro
│   ├── Skills              # Tech stack visual (Angular, .NET, SQL, OpenCV, etc.)
│   ├── Featured Projects   # Cards linking to repos
│   │   ├── Kanban Board    # "Real-time collaboration with WebSockets"
│   │   ├── .NET Blog       # "Clean Architecture with MediatR + CQRS"
│   │   ├── Car Rental      # "Design Patterns: Factory, Decorator, NgRx"
│   │   ├── Hiking App      # "Progressive scalability with load test proof"
│   │   └── RSS Suite       # "7 enterprise apps serving real clients" (descriptions only) - in folder rss-suite
│   ├── Experience          # RSS company, domains worked in, team size
│   ├── Architecture Samples # Diagrams of your best patterns
│   └── Contact             # LinkedIn, GitHub, Email
```
Build with Angular (minimal, static). Shows consistency with your stack and demonstrates you can build lightweight apps too.
ask the agent to draw an architectural diagram or flow chart, it can render Mermaid diagrams
### Content Per Project Card
```
[Project Name]
[1-sentence description]
[Tech badges: Angular, .NET, PostgreSQL, etc.]
[Screenshot or architecture diagram]
[Links: GitHub | Live Demo | Read More]