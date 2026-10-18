# Imbokodo Risk and Compliance Workbench

Presented by **Nompilo Eugenia Mchunu**. GitHub account: **Nompil**.

The presentation follows `Imbokodo_Bank_Capstone_Presentation_Final.pptx` as its visual and narrative source. All original topics remain, with 23 main slides and the existing technical appendix. Security and FinOps sit with the other HOW slides before SHOW. Imbokodo Bank branding, the fixed 1920 × 1080 canvas and WHY → WHAT → HOW → SHOW → LEARN → SCALE → CLOSE navigation remain.

## Content placement

- WHY covers the Prudential Authority context and Imbokodo Bank's Analyst challenges. No R2 mechanics or amount examples appear in these slides or their panels.
- WHAT describes the original brief: CSV ingestion, validation, configured scoring, APIs, alerts and system operations.
- HOW introduces R2 at the Score step. Rule points, the worked calculator and the R100,000 customer-context comparison remain optional details there.
- SHOW explains what the Workbench adds: case ownership and deadlines, connected source evidence and review history, recorded decisions and specialist referrals. The following recovery slide covers controlled correction.
- Use Imbokodo Risk and Compliance Workbench as the product name, with the Workbench as a short form. Original evidence, code identifiers, URLs, configuration keys and source filenames keep their authentic names.

## AWS Region and architecture

The selected Region is **AWS Africa (Cape Town), af-south-1**. This is the deployment location for the regional AWS workload, not a fourth application tier or a transaction-processing step.

Explain the choice in **HOW, Three-Tier AWS Architecture**. Select **Why this Region?** beside the Region name for the short explanation.

The **CPGL** checklist uses the course meanings below:

- **C, Compliance:** consider data location, access and governance requirements. The capstone uses sample data. Choosing a South African Region does not establish compliance by itself.
- **P, Proximity:** South African Analysts are the intended users, so Cape Town keeps the regional workload closer to them.
- **G, Geography and geological risk:** assess geographic concentration, natural hazards and the recovery design. Availability Zones, backups and recovery options are relevant. The capstone's Single-AZ database is not a Multi-AZ resilience design.
- **L, Latency:** a nearby Region can reduce network delay. The project has not recorded a measured comparison between Regions.

**Application in this project:** compliance considerations and proximity are reflected in the design. Latency is a design aim. A documented geographic-risk comparison and latency measurements would complete the decision evidence. CPGL is a Region-selection checklist, separate from the AWS Well-Architected review.

**FinOps is an additional check:** compare regional prices and required service availability within the US$10 monthly project budget. Cape Town is not presented as the cheapest Region.

This choice relates to the Performance Efficiency, Security and Cost Optimization areas of the AWS Well-Architected Framework. It does not change the recorded review coverage: 11 Operational Excellence questions were completed in the supplied report.

References: [AWS Region guidance](https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html) and [AWS Well-Architected Region cost guidance](https://docs.aws.amazon.com/wellarchitected/latest/framework/cost_pricing_model_region_cost.html).

## Run locally

Install Node.js 20 or newer, then run:

```sh
npm ci
npm run dev
```

Use `npm run build` to create the static site in `dist/`, or `npm run preview` to preview that production build locally.

## Presentation controls

- The chapter strip beneath the toolbar jumps to each story group; its active indicator tracks progress within that group.
- Assignment, contribution, foundation, testing, security and skills cards open contextual evidence panels. Workflow steps are also clickable.
- The scenario preserves the Imbokodo Bank introduction and prominently links the South African Prudential Authority statement. R2 rules and the R100,000 customer-context example belong in HOW, through the Score step. They are not shown on the opening scenario slide or its panels.
- On the scenario slide, select any of the three problem cards to open its detailed explanation; close it with **×**, click outside, or press `Escape`.
- On the cover, select a story-stage label to jump directly to that chapter.
- Standard slides repeat the Imbokodo Bank logo and Risk & Compliance Workbench wordmark in the upper-left, matching the supplied slide references.
- On **Business Analysis: Starting With the Problem**, use the Use Case, Activity and Wireframe tabs. Each diagram opens in a zoomable evidence viewer.
- On **What Makes the Solution Different**, select a question to focus on one stage and its larger application capture. Select the image to inspect the original evidence and brief comparison.
- On **A8 · Risk Scoring Rules**, select the example row to try amount bands and additional signals. The calculation uses the frozen R2 defaults; it does not query the live application or create an assessment.
- **Three-Tier AWS Architecture** identifies the presentation, application and data layers. AWS service names appear by default so the cloud design is immediately visible. **Business flow** switches to the plain process labels. The subtitle and queue explanation connect managed cloud services to their purpose. Select a stage for more detail. **Deployed cloud diagram** shows the recorded service paths. Its optional original-design disclosure retains the original PowerPoint evidence unchanged, with historical status labels identified.
- Testing shows 1,146 automated checks from the retained Linux CI run with CPython 3.12.15 and PostgreSQL 16. Local and simulated-service checks are separate from the recorded six-row AWS demonstration. Earlier milestones remain historical, not additive.
- **Terms** opens an optional 16-term plain-English reference. It adds no main slide.
- The SHOW demonstration button opens A19, with a seven-step memory cue and deeper presenter speaking cues, recovery and authentic fallback evidence.
- On **A16 · Application and Design Evidence**, select a screenshot to open a larger view; these are existing project assets.
- **Present / Browse** switches between one-slide presentation mode and a scrollable overview.
- **Index** opens the chapter list; **Q&A**, **Architecture**, and **Evidence** open quick-access panels.
- **Open Workbench** opens https://qzgzopn8o4.execute-api.af-south-1.amazonaws.com/dev/ in a new tab. The hosted application uses Cognito sign-in. No credentials are bundled.
- **Audience view** or `P` hides both navigation bars. Keyboard navigation and evidence controls remain available. Move to the bottom centre or tab to reveal the small navigation control. **Show controls**, `P` or `Escape` restores the toolbar.
- Fullscreen also starts the clean audience view. Exit fullscreen with the toolbar or `Escape`.
- `←` / `→`, `Space` / `Shift+Space`, `Home`, and `End` move through the deck.
- `A`, `C`, `S`, `T`, and `R` jump to Architecture, FinOps, Security, Testing, and Roadmap.
- `D` opens the hosted Workbench; `Q` opens Q&A; `E` opens Evidence.
- Keyboard controls are ignored while typing in a form field or editable content. Space activates focused buttons and disclosure controls instead of advancing the presentation.
- Slide and menu transitions use subtle motion and follow the device's reduced-motion preference.

Evidence dialogs open outside the scaled slide canvas, support keyboard closing and focus return, and keep background controls inactive. The evidence drawer navigates to bundled evidence. File-preparation reminders are kept outside the audience presentation.

## Presenter voice

The presentation uses a balanced voice: first person for the introduction, a few personal decisions and speaking cues; clear, direct statements elsewhere. Avoid repetitive I openings and narration about Nompilo in the third person. Technical explanations stay plain while preserving service names, source code, thresholds and current-versus-future distinctions. File reminders belong in separate presenter notes. **What Makes the Solution Different** starts SHOW at main slide 15 and retains all three original application captures.

## Suggested presentation route

Slide 19 explicitly maps the Software Development Life Cycle to requirements, design, development, testing, deployment and operations. Its deployment detail covers regional configuration, permissions and quota checks. Cloud is the platform, while SDLC is the delivery process. A service quota restriction is not a verified resolution until the affected deployment succeeds. Final presenter cue cards should follow the confirmed challenge and resolution record.

Keep the main story linear. Open the Score calculation in HOW, the original Figma wireframe in Business Analysis, and the AWS Console at Architecture when needed. In SHOW, select the three investigation stages and inspect the evidence that supports each added capability. Use the live demonstration entry for the working Analyst journey. Keep the remaining appendix material for questions. The SQL slide shows labelled source excerpts and the expected output shape, not an invented query result. The US$10 figure is a budget notification target, not a spending cap or actual spend.

## Visual cues

The presentation uses local, code-native line icons for concepts such as upload, validation, scoring, storage, investigation and audit. Stronger SVG arrows connect workflows, the three logical tiers, screenshot stories and roadmap stages. Existing project screenshots provide the picture evidence. `VisualIcons.jsx` supplies the shared decorative icons and connectors, which stay out of accessible control names. No external icon service or new dependency is required.

Icon colours follow purpose: blue for systems, indigo for data, gold for risk and cost, purple for investigation and people, coral for alerts and errors, navy for security and audit, and teal for successful validation. Neutral operations use slate; sustainability uses a muted leaf green. The shared palette and badge treatments live in `visuals.css`.

## Evidence provenance and gaps

### Final presentation evidence and console access

Technical Integration, slide 11, uses supplied capture 08 as its main image. Captures 05 and 07 open from discreet request and response controls beside it. The existing Frontend → API → SQL detail panel also presents captures 05, 07 and 08 in that order before the retained source walkthrough. Supplied capture 06 appears only in A16, Application and Design Evidence, with an appendix link from the integration slide and Q&A access.

These images are authentic supplied captures. HTTP 200 establishes successful responses in the captured session, not cloud deployment or SQL execution. JSON fields remain as captured, including missing metadata. The risk capture's 70% badge has no visible rule version, so it is not attributed to current R2 scoring. A matching record ID between the selected response and a particular visible risk row is not claimed. The wireframe screenshot is cropped to its design area to remove surrounding browser toolbars and editor panels. Its retained design pixels are unchanged. Other screenshots are unmodified.

Business Analysis includes the supplied Figma Analyst Investigation wireframe alongside the Use Case and Activity Diagrams. The comparison panel now uses that actual wireframe rather than a reconstruction. The supplied core ERD occupies the separate SQL & Data Modelling slide after Solution Design, followed by SQL Evidence & Data Layer, then AWS Architecture. The main ERD preview now uses the submitted SQL names and key relationships. Expand it for all 18 physical tables, 17 foreign keys, domain views, exact column types and constraints. The original conceptual design remains in the Original design tab.

The file supplied as `03_SQL_Transaction_Risk_Query.png` actually shows the Solution Design presentation slide. It is not displayed as SQL evidence. The SQL slide uses actual repository source while an authentic query/result screenshot remains outstanding.

Local presenter access is configured in ignored `.env.local` through `VITE_FINTRUST_AWS_CONSOLE_URL`. The console control appears beside Explore Lambda functions, on AWS Architecture and in the Lambda detail panel. It opens the provided account sign-in page in a new tab. The detail panel also links to Lambda in Africa (Cape Town), `af-south-1`. Authentication remains entirely with AWS; credentials are not stored in the presentation. The presenter signs in privately before the session and demonstrates only resources visible as deployed.

Console access is deliberately limited to the local Vite development presentation. Production builds remove the console controls and account-specific URL from client JavaScript. `.env.local` must not be committed or copied to a public host. A static public presentation does not provide a backend or authenticate into AWS.

- Solution Design retains **Receive → Validate → Score → Store → Investigate → Prove** and all three technical Q&A buttons. A clickable HIGH-risk-only branch leaves Store for Alert Lambda, SES and the Analyst/Risk team, with a separate delivery-failure queue/CloudWatch/Maintainer line. It opens the detailed alert panel. The persisted risk event remains the source of truth.

- The Scenario slide leads with the Prudential Authority statement and source, then connects it to Imbokodo Bank's Analyst workload, mistakes and urgent events that can be overlooked. Its panels stay with business needs. R2 rules, amount examples and notification mechanics belong in HOW, not WHY.
- The manual-review detail panel follows the same order: Prudential Authority context, Imbokodo Bank's specific challenges, then the Workbench response. It covers manual workload, mistakes, overlooked events, fragmented evidence, competing priorities and decision traceability. The Analyst retains decision ownership; source links and the regulatory disclaimer remain.
- Business Analysis now includes the original **Workbench Use Case Diagram** alongside the retained Activity Diagram in keyboard-accessible tabs. Both expand with zoom. The unmodified use-case PDF is available to view/download here and in Project Documents. Its 12 October 2026 planning/design provenance and independent role boundaries are explicit.

- **A18 · From Analyst Need to Working System** adds eight clickable walkthroughs: frontend/API/backend, SQL, Lambda/Python, R2 scoring, alerts, wireframe comparison, live-demo sequence and project documents. Access it from **Evidence** or **Q&A**.
- **A19 · Live System Demonstration** provides a dedicated presenter slide with the demo sequence, hosted application link, recorded AWS results and authentic supporting evidence and a return-to-SHOW control, without renumbering the main deck.
- Main-slide entry points are retained within the existing design: Business Analysis opens the wireframe comparison; Solution Design opens API, Lambda and SQL evidence; AWS Architecture opens the independent alert path; the application slide opens the live-demo sequence; Well-Architected opens real documents.
- `public/resources/` contains the supplied SOP PowerPoint, a slide-image PDF preview, the project-plan PDF, a public sharing copy of the Well-Architected report, authentic SOP screenshots, the project ERD, and actual source excerpts. The SOP PDF preview is a derivative, not a replacement SOP. The public Well-Architected copy has account and contact details removed. The untouched original stays outside the public repository and web build. The local `private-evidence/` folder is ignored by Git.
- SQL tabs show repository source, not executed query results. Implementation tabs show real Python functions and the frontend request helper; deployment status remains separate. The Workbench uses JavaScript; React/Vite powers this presentation.
- Alert evidence distinguishes the persisted risk/review record, delivery claim and SES acceptance. UNKNOWN/SENDING requires reconciliation; email is not the audit trail, and provider acceptance is not inbox delivery.
- The supplied Figma wireframe replaces the earlier reconstruction. The presenter can demonstrate current Lambda deployment in the local console walkthrough. SQL execution results, matching API/Network evidence and SES delivery evidence require authentic captures or live demonstration.
- A publication check found account and contact details in the Well-Architected report. They have been removed from the public download copy. Text checks of the public PDFs and SOP PowerPoint found no remaining email addresses or 12-digit account identifiers. These checks do not replace a final visual privacy review. Changes to the presentation do not deploy AWS resources.

- `image-6-1.png` is the original activity model. Its proportions are preserved.
- `image-8-1.png` is the original architecture evidence. It describes the design; it does not prove deployment status.
- `image-10-1.png` shows the Imbokodo Bank overview. `image-10-2.png` and `image-10-3.png` show historical V1 investigation evidence and are labelled accordingly in their detail views.
- `image-11-1.png` and `image-11-2.png` show quarantine reason, source lineage, correction history and audit evidence.
- `r2-score-evidence.png` and `r2-velocity-evidence.png` are real captures from the project's isolated PostgreSQL R2 verification with AWS mocked, before the bank branding update. They are labelled and appear in detail/appendix views.
- A current Imbokodo-branded R2 component capture and live budget/alarm screenshots were not supplied with the deck. Existing captures and source-deck budget figures are used without claiming new live evidence.
- `fintrust_presentation_demo_scenarios.csv` was mentioned in the previous chat but is not present in the presentation workspace or the matching Downloads search. Its original contents have not been recreated or substituted.

R2 uses deterministic amount bands, cross-border, velocity and duplicate signals. It consults transaction history for its configured velocity and duplicate checks. Customer-specific behavioural baselining remains future context and is not described as implemented.

## External references

The scenario slide visibly cites South African Reserve Bank Prudential Authority AML/CFT guidance and supplied banking-sector risk material. Both are listed with clickable source links in the final technical appendix, **A17 · Sources & References**. These external sources support the real-world banking context only; Imbokodo Risk and Compliance Workbench's architecture, deterministic scoring rules and workflows are capstone design choices, not regulatory requirements.

## Profile photo

The About Me slide uses the supplied presenter portrait at `public/assets/profile.jpg`. A portrait loading error falls back to the presenter’s initials and name without file preparation instructions on the slide.

## GitHub Pages publication

The presentation repository is `Nompil/NE_Capstone_Presentation`, with `main` as its publishing branch. The presenter has approved making the clean presentation source public and hosting the slides with GitHub Pages. Anyone can view the public source, slides and bundled downloads. The panel does not need to sign in.

GitHub Pages address: [Open the Imbokodo Bank presentation](https://nompil.github.io/NE_Capstone_Presentation/).

The original unredacted report, local AWS console configuration and credentials must remain private. They are excluded from both the public repository and its history. The previous hosting service is no longer used for public access.

The Pages workflow builds with `/NE_Capstone_Presentation/` as Vite's base path and uploads a build artifact. Set the repository variable `PUBLISH_PAGES` to `true` to enable its deployment job. GitHub Pages uses **GitHub Actions** as its publishing source. Future approved pushes to `main` rebuild and update the website automatically.

Publication sequence:

1. Review source, documents, screenshots and repository history for material that must remain private.
2. Add only approved source, evidence and the lockfile. Exclude environment files, credentials, `node_modules/`, `dist/` and `private-evidence/`.
3. Push the clean presentation to `main` in `Nompil/NE_Capstone_Presentation` and apply the approved public visibility.
4. Select GitHub Actions as the Pages publishing source and set `PUBLISH_PAGES=true`.
5. Run the deployment workflow. Wait for the build and deployment to succeed before sharing the website address.
6. Check slide navigation, screenshots, evidence panels, PDF downloads and external links on the hosted version.

GitHub Pages hosts the presentation's static files. It does not run the Python backend or deploy the Workbench's AWS resources. The Workbench is hosted separately on AWS and requires its own application sign-in. The AWS workload Region remains af-south-1; GitHub Pages is a separate hosting service.

A matching PDF edition of this guide is bundled as `public/resources/workbench-readme.pdf` and is available through Project Documents in the technical appendix.

References: [What GitHub Pages hosts](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) and [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

The website reports a retained AWS verification snapshot from 18 October 2026, 02:44 SAST. It is not a continuous health monitor or a production acceptance certificate.

## Verified cloud handover, 18 October 2026

Five Lambda workers, protected API Gateway routes, Cognito, private PostgreSQL, S3, SQS FIFO, DynamoDB Streams, SES and EventBridge were included in the recorded core demonstration. These are three logical layers of a serverless application, not three EC2 server tiers.

The six-row cloud input produced three accepted rows, two quarantines and one duplicate, with no technical failures or pending items in that batch. A later correction returned 202 and reached RESOLVED, bringing the ledger to four. The earlier October report retains its three-row snapshot. The 200-row SQL seed is local evidence only.

The Lambda quota increase remains unresolved. A verified workaround uses ten shared concurrent executions, no positive per-function reservations, and SQS concurrency of two. Shared contention and throttling remain possible. Basic Support does not establish the cause of a particular quota value.

Two SES provider message IDs and aggregate Send 2 / Delivery 2 counters were recorded. Inbox receipt is unconfirmed. A detailed batch-status polling route returned 404 although the core pipeline completed. Full browser role rehearsal, live DLQ redrive, restoration, load acceptance and complete approved financial-data disposal remain separate work. Administrator user provisioning is operator-managed; the in-app user list is read-only.

Open **Recorded cloud results** in SHOW or **Data governance & risks** at Well-Architected for bounded results and immutable source links. All original diagrams and screenshots remain. Historical V1 badges and old architecture status labels are not treated as current R2/cloud results. The data-model slide now opens the complete schema-derived physical ERD.

Evidence snapshot: [final AWS verification](https://github.com/Nompil/fintrust/blob/4a8ad8af275d8ee039873b4b2036e0f09c182b16/docs/EVIDENCE/13-cloud-live/final-live-verification.json), [core demonstration](https://github.com/Nompil/fintrust/blob/4a8ad8af275d8ee039873b4b2036e0f09c182b16/docs/EVIDENCE/13-cloud-live/core-cloud-demonstration.json), [retained CI run](https://github.com/Nompil/fintrust/actions/runs/39066017375).

## Corrected PostgreSQL ERD

The SQL and Data Modelling slide and A9 now open the current schema-derived ERD. The main preview selects key columns for explanation. Detail tabs show ledger/review, ingestion/recovery, and all 18 tables. Each full table includes every column, its type, required status, keys and actual FK cardinalities. Two derived views are documented separately.

The model comes from the exact submitted sql/schema.sql and migrations 001 through 006 at commit 4a8ad8af275d8ee039873b4b2036e0f09c182b16. A fresh empty PostgreSQL 18 reconstruction matched all 164 columns in the retained PostgreSQL 16 workflow checkpoint and included eight lifecycle columns from migration 003. This diagram update made no live RDS query or database modification.

Important corrections: tx_id and other business keys use their real UUID/BIGINT types; risk_reviews uses risk_event_id as its PK/FK; risk_review_history has composite key (risk_event_id, version); outboxes and transaction_lifecycle_events are included; transactions.batch_id is lineage rather than an invented FK. Cognito identities, S3 evidence and DynamoDB alert claims remain outside the SQL model. The legacy/direct-path alerts SQL table is labelled separately.

Public resources include Imbokodo_Workbench_Current_ERD.pdf, full/domain SVG and PNG files, editable DOT and Mermaid source, and erd-current-catalog.json. The catalog includes all declared constraints and indexes, including the partial unique source-identity index. The original core-data-model.png and erd.png remain unchanged as historical design evidence. Frozen JSON assessments and outboxes are intentional audit/recovery snapshots, not grounds for an unsupported blanket 3NF claim.
