import { regulatoryReferences } from './references.js';

export const mainSlides = [
  {
    id: 'cover',
    title: 'IMBOKODO BANK',
    subtitle: 'Imbokodo Risk and Compliance Workbench',
    type: 'cover',
    group: 'Opening',
    strapline: 'Cloud Capstone Project',
    headline: 'Transaction Insights, Risk Monitoring and Analyst Investigation',
    presenter: 'Nompilo Eugenia Mchunu  |  Cloud Learner',
    motto: 'Trust the data. Understand the risk. Prove the decision.'
  },
  {
    id: 'about',
    title: 'About Me',
    subtitle: 'My learning journey and the context for this capstone.',
    group: 'WHY',
    badge: 'INTRODUCTION',
    type: 'profile',
    name: 'Nompilo Eugenia Mchunu',
    role: 'CLOUD LEARNER',
    motto: '“Dreams Delayed Are Not Dreams Denied.”',
    intro: 'I am Nompilo Eugenia Mchunu, a Cloud Learner developing practical experience in cloud architecture, application development, data, security, testing and project delivery.',
    context: 'My role at Imbokodo Bank: design and build a cloud solution that turns transaction data into useful risk information for investigation.',
    cards: [
      { title: 'My previous practical work', body: 'Task & Time Tracking application built with SharePoint, Power Automate and Power BI.' },
      { title: 'My career direction', body: 'Building practical cloud skills towards solutions architecture through hands-on delivery.' }
    ]
  },
  {
    id: 'scenario',
    title: 'The Scenario: Why This Project Was Needed',
    subtitle: 'Imbokodo Bank is dealing with growing transaction volumes and needs clearer risk visibility.',
    group: 'WHY',
    badge: 'WHY',
    type: 'problem',
    intro: 'At Imbokodo Bank, repetitive manual checks can overwhelm Analysts, introduce mistakes and leave urgent risk events waiting in busy queues. Teams need clearer priorities, transaction context and traceable decisions.',
    researchStatement: 'The PA notes that banks cannot manually review every transaction and encourages effective transaction-monitoring systems.',
    contextSource: regulatoryReferences[0],
    columns: [
      {
        title: 'Too much manual work',
        icon: 'alert',
        summary: 'Repetitive checks take time away from investigating unusual activity.',
        items: ['Growing queues and repeated checks', 'Manual mistakes and missed details', 'Urgent events waiting for attention'],
        detailTitle: 'The operational challenge',
        detail: 'In the Imbokodo Bank capstone scenario, operations teams receive transaction data that must be processed consistently and reviewed for potentially risky activity. Manual processing is slow, difficult to scale and can make high-risk patterns harder to identify quickly. Risk and Compliance teams can lose time searching for context while important information waits in a growing queue.',
        detailItems: ['Repeated checks reduce investigation time.', 'Manual handling makes important details easier to miss.', 'Busy queues can delay attention to urgent activity.'],
        sources: [regulatoryReferences[0]]
      },
      {
        title: 'What the Analyst needs',
        icon: 'users',
        summary: 'Transaction details, supporting evidence and a clear next step.',
        items: ['What happened?', 'What needs attention first?', 'What information supports the review?'],
        detailTitle: 'Why not review everything manually?',
        businessProblem: 'At Imbokodo Bank, Analysts manage repetitive checks alongside urgent reviews. Information spread across files and busy queues makes it harder to act promptly and explain each decision.',
        projectResponse: 'Imbokodo Risk and Compliance Workbench brings priority cases and supporting evidence into one workspace. Analysts can focus on the activity that needs attention and record a clear investigation outcome.',
        detail: 'The South African Reserve Bank’s Prudential Authority notes that supervised banks process large transaction volumes and lack the human resources to review every transaction manually. It encourages effective transaction monitoring systems to identify unusual or suspicious activity.',
        detailItems: ['Manual workload reduces investigation time.', 'Repeated handling increases mistakes and missed details.', 'Urgent activity can wait behind routine work.', 'Scattered evidence makes decisions harder to trace.'],
        responseItems: ['Clear priorities help the team focus its attention.', 'Evidence is easier to find during an investigation.', 'Recorded outcomes make decisions easier to explain later.'],
        sources: [regulatoryReferences[0]]
      },
      {
        title: 'The Workbench response',
        icon: 'screen',
        summary: 'Imbokodo Risk and Compliance Workbench brings priority cases and investigation evidence together.',
        items: ['Clear priorities for the team', 'Evidence in one workspace', 'A recorded investigation outcome'],
        detailTitle: 'How my solution helps',
        detail: 'The Workbench helps Analysts focus on urgent activity, review supporting evidence and record a clear decision. It gives Imbokodo Bank a more organised way to manage investigations while keeping the final decision with the Analyst.',
        detailItems: ['Bring the information needed for a case together.', 'Make the next review action clear.', 'Keep the outcome available for later review.']
      }
    ],
    takeaway: 'Project objective: turn transaction data into explainable, auditable risk decisions.'
  },
  {
    id: 'assignment',
    title: 'The Project Assignment',
    subtitle: 'The brief required a cloud system to process transactions, calculate risk and notify Compliance.',
    group: 'WHAT',
    badge: 'WHAT',
    type: 'capabilities',
    cards: [
      { title: 'INGEST', body: 'Receive transaction CSV files.' },
      { title: 'VALIDATE', body: 'Check records and separate invalid rows.' },
      { title: 'SCORE', body: 'Apply configured rules and classify risk.' },
      { title: 'API ACCESS', body: 'Make transactions and risk insights available through APIs.' },
      { title: 'ALERTS', body: 'Notify Compliance when risk thresholds are reached.' },
      { title: 'OPERATE', body: 'Schedule processing, monitor errors, test and deploy to AWS.' }
    ],
    noteTitle: 'Brief boundaries',
    note: 'Use sample data. No real customer banking data, movement of funds, automated compliance decisions or machine-learning fraud detection in the first release.'
  },
  {
    id: 'disciplines',
    title: 'One Project, Multiple Disciplines',
    subtitle: 'One project spanning business needs, cloud design, development, testing and delivery.',
    group: 'WHAT',
    badge: 'MY CONTRIBUTION',
    type: 'discipline-grid',
    cards: [
      { title: 'Business Analysis', body: 'Requirements, scope, stakeholders, user journeys' },
      { title: 'Solution Design', body: 'Architecture, service choices, trade-offs' },
      { title: 'Development & Data', body: 'Python logic, APIs, SQL, data model' },
      { title: 'Testing & QA', body: 'Repeat checks, error cases, user journeys' },
      { title: 'Cloud Engineering', body: 'AWS networking, worker functions, staged setup' },
      { title: 'FinOps & Governance', body: 'Budgets, cost avoidance, evidence, documentation' },
      { title: 'Project Coordination', body: 'Planning, progress tracking, staged delivery' },
      { title: 'Security & Operations', body: 'IAM, private data, logging, recovery thinking' }
    ]
  },
  {
    id: 'business-analysis',
    title: 'Business Analysis: Starting With the Problem',
    subtitle: 'The bank’s needs shaped the technology choices.',
    group: 'WHAT',
    badge: 'ROLE: BUSINESS ANALYSIS',
    type: 'analysis',
    leadTitle: 'Start with the Analyst’s needs',
    items: [
      'Primary user: the Risk / Compliance Analyst.',
      'Clear roles for the Analyst, Administrator, Auditor and Maintainer.',
      'Requirements cover what the system does and how safely and reliably it works.',
      'A defined scope and a clear journey from upload to decision.',
      'Separate paths for bad data, business risk and technical failures.'
    ],
    diagram: 'image-6-1.png',
    proof: 'Traces file validation, duplicate handling, quarantine, scoring and visible outcomes.'
  },
  {
    id: 'solution-design',
    title: 'Solution Design: From Transaction to Decision',
    subtitle: 'A simple business view before the technical architecture.',
    group: 'HOW',
    badge: 'HOW',
    type: 'process',
    steps: [
      { title: 'Receive', body: 'Controlled transaction file' },
      { title: 'Validate', body: 'Reject bad files; quarantine bad rows' },
      { title: 'Score', body: 'R2 rule points set the review priority', cue: 'How R2 scoring works ↗' },
      { title: 'Store', body: 'Save transactions, scores and risk records' },
      { title: 'Investigate', body: 'Review evidence, assign work and record a decision' },
      { title: 'Prove', body: 'Audit trail, reports and outcomes' }
    ],
    takeaway: 'Scores guide review priority. The Analyst investigates and records the decision.'
  },
  {
    id: 'data-model',
    title: 'SQL & Data Modelling',
    subtitle: 'Every transaction connects to its risk score, investigation and decision history.',
    group: 'HOW',
    badge: 'BUILD EVIDENCE',
    type: 'data-model-evidence'
  },
  {
    id: 'sql-evidence',
    title: 'SQL Evidence & Data Layer',
    subtitle: 'SQL highlights accounts with repeated HIGH-risk transactions.',
    group: 'HOW',
    badge: 'BUILD EVIDENCE',
    type: 'sql-build-evidence'
  },
  {
    id: 'aws-architecture',
    title: 'Three-Tier AWS Architecture',
    subtitle: 'Three connected layers: the Analyst screen, application logic and data storage.',
    group: 'HOW',
    badge: 'ROLE: SOLUTION DESIGN',
    type: 'architecture',
    region: 'AWS Africa (Cape Town), af-south-1',
    flows: [
      { label: 'Amazon S3', detail: 'Landing / quarantine / reports', category: 'storage' },
      { label: 'Ingest Lambda', detail: 'Validate file and rows', category: 'compute' },
      { label: 'SQS FIFO', detail: 'Ordered, decoupled work', category: 'messaging' },
      { label: 'Scoring Lambda', detail: 'Deterministic rules', category: 'compute' },
      { label: 'RDS PostgreSQL', detail: 'Authoritative ledger', category: 'database' },
      { label: 'DynamoDB', detail: 'Derived risk state', category: 'database' },
      { label: 'API Gateway + Query Lambda', detail: 'Workbench access', category: 'compute' },
      { label: 'EventBridge + Report Lambda', detail: 'Scheduled reporting', category: 'compute' }
    ],
    details: [
      'Presentation tier: the Workbench is where the Analyst sees risk information and records decisions.',
      'Application tier: API requests and Python/Lambda functions handle checks, scores, alerts and reports.',
      'Data tier: PostgreSQL keeps the main records, DynamoDB keeps fast risk summaries and S3 keeps files.',
      'SQS holds work in a queue so processing can continue at its own pace.',
      'CloudWatch helps investigate errors. Retries and the failure queue help recover work safely.'
    ]
  },
  {
    id: 'system-integration',
    title: 'Technical Integration: From API to Analyst',
    subtitle: 'The browser requests data, the API returns JSON and the workbench presents risk information.',
    group: 'HOW',
    badge: 'INTEGRATION EVIDENCE',
    type: 'integration-evidence'
  },
  {
    id: 'foundations',
    title: 'Four Technical Foundations',
    subtitle: 'Coding, data, cloud services and day-to-day system support work together.',
    group: 'HOW',
    badge: 'SKILLS',
    type: 'foundations',
    cards: [
      { title: 'PYTHON', label: 'Application logic', body: 'Validation, scoring, APIs, automation, exception handling' },
      { title: 'SQL / POSTGRESQL', label: 'Trusted data', body: 'Transactions, accounts, reviews, audit history, reconciliation' },
      { title: 'AWS CLOUD', label: 'Platform', body: 'Serverless processing, storage, queues, APIs, monitoring and deployment' },
      { title: 'OPERATIONS & GOVERNANCE', label: 'Control', body: 'Security, observability, recovery, budgets and controlled change' }
    ],
    takeaway: 'Every technology has a purpose: help the user, protect the data, handle failures or control cost.'
  },
  {
    id: 'solution-difference',
    title: 'What Makes the Solution Different',
    subtitle: 'The brief required processing, scores and alerts. The Workbench adds a complete Analyst investigation.',
    group: 'SHOW',
    badge: 'SHOW',
    type: 'questions',
    questions: ['What happened?', 'Why is it risky?', 'What should I do next?'],
    benefits: ['Case ownership and review deadlines.', 'Source evidence and review history together.', 'Recorded decisions and specialist referrals.'],
    screens: [
      {
        src: 'image-10-1.png',
        alt: 'Imbokodo Risk and Compliance Workbench Analyst overview',
        caption: 'The Analyst overview brings urgent work and review status into one workspace.',
        brief: 'Process transaction data, provide risk insights and send threshold alerts.',
        addition: 'A review queue adds case ownership, review deadlines and visible work status so the team can manage an investigation.'
      },
      {
        src: 'image-10-2.png',
        alt: 'Imbokodo Risk and Compliance Workbench investigation evidence',
        caption: 'Original investigation screen showing the saved V1 assessment and its supporting evidence.',
        brief: 'Apply explainable rules and make transaction and risk information available through APIs.',
        addition: 'The investigation connects the original file and row, saved assessment, notes and review history in one case.'
      },
      {
        src: 'image-10-3.png',
        alt: 'Imbokodo Risk and Compliance Workbench investigation actions',
        caption: 'The Analyst can review the evidence, add notes and record an outcome or specialist referral.',
        brief: 'Notify the Compliance team when a configured risk threshold is reached.',
        addition: 'The work continues after the alert. The Analyst records a decision, its reason and any specialist referral. Decision history keeps who acted and when.'
      }
    ],
    takeaway: 'An alert starts the review. The Workbench carries it through to a recorded decision.'
  },
  {
    id: 'data-quality',
    title: 'Data Quality: Correction and Recovery',
    subtitle: 'Authorised corrections are checked again and recorded, while accepted transactions stay protected.',
    group: 'SHOW',
    badge: 'SHOW: FAILURE PATH',
    type: 'recovery',
    steps: [
      { title: 'Invalid row', body: 'Validation identifies the issue' },
      { title: 'Quarantine', body: 'Keep the error reason and original row' },
      { title: 'Analyst action', body: 'Correct or reject the row' },
      { title: 'Revalidation', body: 'Only valid data reaches trusted storage' }
    ],
    takeaway: 'A successful file upload is not the same thing as trusted data.'
  },
  {
    id: 'testing',
    title: 'Testing and Verification',
    subtitle: 'Checks cover normal transactions, bad data, repeated uploads and recovery after errors.',
    group: 'SHOW',
    badge: 'ROLE: TESTING & QA',
    type: 'testing',
    cards: [
      { title: 'Functional', body: 'Validation, scoring, review workflow, reports' },
      { title: 'Failure paths', body: 'Invalid rows, duplicate files, retries, DLQ behaviour' },
      { title: 'Data integrity', body: 'Correct totals, safe retries and complete database updates' },
      { title: 'Security / RBAC', body: 'Role boundaries, account scope, protected actions' },
      { title: 'Runtime', body: 'Linux / Python 3.12 / PostgreSQL compatibility' },
      { title: 'Browser gates', body: 'The Analyst’s journey through the working screens' }
    ],
    timeline: ['129', '149', '158', '161', '178'],
    takeaway: 'The Linux test report records 1,026 passing checks across the application, data and user workflow.'
  },
  {
    id: 'security',
    title: 'Security and Operations',
    subtitle: 'Controlled access, protected data and clear steps for handling errors.',
    group: 'HOW',
    badge: 'ROLE: SECURITY & OPERATIONS',
    type: 'security',
    cards: [
      { title: 'Identity & access', items: ['Least-privilege IAM', 'Role-based business permissions', 'Private data access boundaries'] },
      { title: 'Data protection', items: ['Private RDS', 'Encryption / protected configuration', 'Synthetic training data only'] },
      { title: 'Failure & recovery', items: ['Retries and DLQ', 'Quarantine for bad data', 'Controlled replay and reconciliation'] },
      { title: 'Observability', items: ['Structured logs', 'CloudWatch metrics / alarms', 'X-Ray tracing design'] }
    ],
    takeaway: 'Risky transactions go to Analyst review; technical failures go through retry and recovery paths.'
  },
  {
    id: 'finops',
    title: 'FinOps: Architecture Within a Small Budget',
    subtitle: 'A practical cloud design shaped by a US$10 monthly project budget.',
    group: 'HOW',
    badge: 'ROLE: FINOPS',
    type: 'finops',
    budget: 'US$10',
    budgetLabel: 'monthly project budget',
    alerts: ['50%', '80%', '100% actual', '100% forecast'],
    decisions: [
      'Avoid extra networking services that add standing monthly costs.',
      'Serverless workers run when work arrives, reducing idle compute.',
      'Single-AZ RDS suits the project budget. Multi-AZ is a future availability improvement.',
      'Keep the setup lean without an extra database proxy or duplicate environments.',
      'Add resources in stages and check cost before expanding.'
    ],
    takeaway: 'The “best” architecture is the one that meets the requirement within the real constraints.'
  },
  {
    id: 'well-architected',
    title: 'AWS Well-Architected Review',
    subtitle: 'AWS’s six pillars provide a structured way to review the design and find improvements.',
    group: 'SHOW',
    badge: 'GOVERNANCE',
    type: 'well-architected',
    pillars: [
      { title: 'Operational Excellence', body: 'Logs and recovery steps help me find and fix problems.', reviewed: true },
      { title: 'Security', body: 'Each user and service gets only the permissions it needs.' },
      { title: 'Reliability', body: 'Safe retries and failure queues help recover work without duplicate records.' },
      { title: 'Performance Efficiency', body: 'A queue lets files arrive while workers process earlier transactions.' },
      { title: 'Cost Optimization', body: 'Workers run when needed to help control compute cost.' },
      { title: 'Sustainability', body: 'Smaller resources and fewer duplicate environments reduce waste.' }
    ],
    takeaway: '11 Operational Excellence questions completed. The other five pillars guide the next review.'
  },
  {
    id: 'delivery',
    title: 'Project Coordination and Delivery',
    subtitle: 'Clear stages make the work easier to build, test and improve step by step.',
    group: 'LEARN',
    badge: 'ROLE: PROJECT COORDINATION',
    type: 'delivery',
    steps: [
      { title: 'Understand', body: 'Brief, requirements, scope' },
      { title: 'Design', body: 'Architecture, data, security, cost' },
      { title: 'Build', body: 'Python, SQL, APIs, workflows' },
      { title: 'Verify', body: 'Tests, Linux, browser evidence' },
      { title: 'Deploy', body: 'Controlled AWS stages' },
      { title: 'Present', body: 'SOP, evidence, lessons learned' }
    ],
    takeaway: 'Tasks, dependencies, decisions and test results make progress and next steps visible.'
  },
  {
    id: 'lessons',
    title: 'Project Challenges and Lessons Learned',
    subtitle: 'The challenges shaped better decisions and practical lessons.',
    group: 'LEARN',
    badge: 'LEARN',
    type: 'lessons',
    cards: [
      { title: 'Architecture vs cost', challenge: 'Extra services could quickly use up the budget.', learning: 'I chose only the services the project needed.', outcome: 'A simpler design with clear cost and availability choices.' },
      { title: 'Technology vs user workflow', challenge: 'A score alone did not help the Analyst finish a review.', learning: 'Named owners, review deadlines, clear reasons and decision notes.', outcome: 'The Analyst can follow a risk event through to its recorded outcome.' },
      { title: 'Data quality', challenge: 'A file can upload successfully and still contain bad rows.', learning: 'Separate invalid rows and keep the reason and original input.', outcome: 'Accepted data stays protected while bad rows can be corrected.' },
      { title: 'Verification', challenge: 'Errors needed as much attention as successful transactions.', learning: 'Test bad inputs, repeated requests, Linux compatibility and user journeys.', outcome: 'A test record that shows what was checked and what passed.' }
    ],
    takeaway: 'Every technical choice should support a user, a business requirement or an operational constraint.'
  },
  {
    id: 'skills',
    title: 'Skills Developed Through the Capstone',
    subtitle: 'Practical skills developed across cloud, coding, data, security and delivery.',
    group: 'LEARN',
    badge: 'SKILLS GAINED',
    type: 'skills',
    cards: [
      { title: 'Cloud', body: 'AWS architecture, S3, Lambda, SQS, RDS, DynamoDB, API Gateway, CloudWatch' },
      { title: 'Development', body: 'Python, APIs, data checks, error handling and fixed business rules' },
      { title: 'Data', body: 'SQL, PostgreSQL, linked records, correct totals and record history' },
      { title: 'Architecture', body: 'Decoupling, reliability, service selection, failure handling, trade-offs' },
      { title: 'Security & Ops', body: 'IAM, private data, logging, monitoring, recovery thinking' },
      { title: 'FinOps', body: 'Budgets, alerts, cost modelling, avoiding unnecessary standing services' },
      { title: 'Business Analysis', body: 'Requirements, stakeholders, scope, user journeys, success criteria' },
      { title: 'Delivery', body: 'Testing, Git / CI, evidence, documentation, staged deployment and project tracking' }
    ]
  },
  {
    id: 'roadmap',
    title: 'Roadmap: What Comes Next',
    subtitle: 'Next steps: easier data feeds, stronger access controls and richer customer context.',
    group: 'SCALE',
    badge: 'SCALE',
    type: 'roadmap',
    horizons: [
      { title: 'NOW', items: ['Controlled CSV ingestion', 'Validation + quarantine', 'Rule-based scoring', 'Analyst investigation', 'Audit + reports'] },
      { title: 'NEXT', items: ['Secure scheduled feeds', 'API-based ingestion', 'Cognito workforce authentication', 'Alert grouping, cooldowns & digests', 'More operational automation'] },
      { title: 'LATER', items: ['Continuous transaction feeds', 'More risk scenarios', 'Learn each customer’s normal pattern', 'Stronger production resilience', 'Clearer evidence summaries'] }
    ],
    takeaway: 'The Workbench explains the evidence. The Analyst makes the decision.'
  },
  {
    id: 'closing',
    title: 'IMBOKODO BANK',
    subtitle: 'Imbokodo Risk and Compliance Workbench',
    type: 'closing',
    group: 'Close',
    headline: 'Trust the data.\\nUnderstand the risk.\\nProve the decision.',
    summary: 'The solution goes beyond detecting risk. It helps the Analyst understand why something was flagged, investigate the evidence and prove what decision was made.',
    presenter: 'Nompilo Eugenia Mchunu  |  Cloud Learner',
    cta: 'Thank you · Questions'
  }
];
