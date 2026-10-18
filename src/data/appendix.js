import { regulatoryReferences } from './references.js';

export const appendixSlides = [
  {
    id: 'appendix-architecture',
    appendix: 'A1',
    title: 'Three-Tier Architecture: Service Detail',
    subtitle: 'The screen, application logic and data layer work together through requests and events.',
    rows: [
      ['Ingestion', 'S3 landing → ingest Lambda → validation'],
      ['Valid rows', 'SQS FIFO → scoring Lambda → RDS PostgreSQL'],
      ['Invalid rows', 'Quarantine keeps the error reason and original file / row'],
      ['Risk summaries', 'Main PostgreSQL records → fast DynamoDB risk summaries'],
      ['Application', 'Browser → Cognito → API Gateway → API Lambda; private data access'],
      ['HIGH alerts', 'Saved risk → DynamoDB Streams → Alert Lambda → SES and delivery state'],
      ['Reporting', 'EventBridge → report Lambda → reports S3'],
      ['Operations', 'Ten CloudWatch alarms; live failure and recovery drills remain separate']
    ]
  },
  {
    id: 'appendix-iam',
    appendix: 'A2',
    title: 'IAM / Least Privilege',
    subtitle: 'Separate runtime permissions from staged deployment permissions.',
    rows: [
      ['Runtime roles', 'Scoped permissions for each workload component'],
      ['Deployment', 'Staged permissions with approval gates'],
      ['Data access', 'Grant only the storage and database actions each role needs'],
      ['Review', 'Reassess policy scope as deployment stages change']
    ]
  },
  {
    id: 'appendix-s3',
    appendix: 'A3',
    title: 'S3 Security',
    subtitle: 'Protect transaction files, quarantine records and reports.',
    rows: [
      ['Encryption', 'SSE-KMS with a customer-managed key'],
      ['Access', 'Public access blocked; access scoped through IAM'],
      ['Recovery', 'Versioning enabled where required'],
      ['Cost', 'S3 Bucket Keys reduce KMS request overhead']
    ]
  },
  {
    id: 'appendix-rds',
    appendix: 'A4',
    title: 'RDS Network Security',
    subtitle: 'Private access protects the main PostgreSQL database.',
    rows: [
      ['Database', 'PostgreSQL 16; encrypted and not publicly accessible'],
      ['Ingress', 'Application Lambda security group → database security group'],
      ['Port', 'TCP 5432 restricted to the application path'],
      ['Resilience trade-off', 'Single-AZ capstone footprint; production redundancy remains separate']
    ]
  },
  {
    id: 'appendix-sqs',
    appendix: 'A5',
    title: 'SQS / DLQ Configuration',
    subtitle: 'The queue holds work for processing. The failure queue keeps work that needs investigation.',
    rows: [
      ['Queue', 'FIFO ordering and explicit deduplication'],
      ['Visibility', '12-minute visibility timeout'],
      ['Retention', '4 days on processing queue; 14 days on DLQ'],
      ['Redrive', 'Move to DLQ after 5 failed receives'],
      ['Replay', 'Controlled redrive after failure analysis']
    ]
  },
  {
    id: 'appendix-dynamodb',
    appendix: 'A6',
    title: 'DynamoDB Configuration',
    subtitle: 'DynamoDB keeps fast risk summaries while PostgreSQL keeps the main records.',
    rows: [
      ['Purpose', 'Keep risk summaries that can be read quickly'],
      ['Capacity', 'On-demand mode for the capstone workload'],
      ['Main record', 'PostgreSQL keeps the transaction, risk and review records'],
      ['Updates', 'Risk summaries are updated from saved processing results']
    ]
  },
  {
    id: 'appendix-observability',
    appendix: 'A7',
    title: 'CloudWatch / Observability',
    subtitle: 'Keep business risk events distinct from technical incidents.',
    rows: [
      ['Logs', 'Structured workload logs'],
      ['Metrics', 'Operational health and processing measures'],
      ['Alarms', 'Ten standard-metric workload alarms verified; budget alerts are separate'],
      ['Tracing', 'Full X-Ray coverage and alarm-recipient drills remain unverified'],
      ['Business events', 'Risk events go to Analyst review; technical failures use recovery paths']
    ]
  },
  {
    id: 'appendix-risk',
    appendix: 'A8',
    title: 'R2 Risk Scoring Rules',
    subtitle: 'Fixed rule points set the review priority. The Analyst makes the decision.',
    rows: [
      ['Amount bands', '≤50,000: 0 · >50,000 to 100,000: +15 · >100,000 to 200,000: +25 · >200,000: +40'],
      ['Additional signals', 'High velocity +25 · cross-border +15 · possible duplicate +20'],
      ['Velocity', 'More than five accepted transactions in the closed 300-second window, including this one'],
      ['Duplicate signal', 'Distinct reliable source references; matching transaction attributes within 120 seconds'],
      ['Maximum score', '100; no currency conversion before applying amount bands'],
      ['Risk levels', 'LOW 0 to 19 · MEDIUM 20 to 39 · HIGH 40 to 100'],
      ['Example', 'Very high amount + cross-border = 40 + 15 = 55 (HIGH)'],
      ['Review targets', 'Default Medium 24h · High 4h · escalated 2h from escalation; project targets, not law']
    ]
  },
  {
    id: 'appendix-data-model',
    appendix: 'A9',
    title: 'Data Model / ERD',
    subtitle: 'Connected transactions, scores, reviews and history make decisions traceable from start to finish.',
    rows: [
      ['Physical model', '18 tables, 17 foreign keys and two derived workflow views'],
      ['Transaction', 'transactions.tx_id is UUID; source identity has a partial unique index'],
      ['Frozen assessment', 'processed_transactions.result stores the saved score, reasons and rule version'],
      ['Investigation', 'risk_reviews uses risk_event_id as its primary and foreign key'],
      ['Audit history', 'risk_review_history has composite key (risk_event_id, version)'],
      ['Recovery', 'Ingestion, lifecycle, quarantine, corrections and durable outboxes are included']
    ]
  },
  {
    id: 'appendix-testing',
    appendix: 'A10',
    title: 'Testing Evidence',
    subtitle: 'Checks cover normal use, error cases, data quality and user permissions.',
    rows: [
      ['Functional', 'Validation, scoring, review workflow and reports'],
      ['Failure paths', 'Invalid rows, duplicate files, retries and DLQ behaviour'],
      ['Data checks', 'Correct totals, safe retries and complete database updates'],
      ['Security', 'Role boundaries, account scope and protected actions'],
      ['Browser', 'Analyst journeys and UI verification'],
      ['Linux CI run', '1,146 checks passed; CPython 3.12.15 and PostgreSQL 16; local and simulated services'],
      ['Separate AWS demo', 'Six rows: accepted 3, quarantined 2, duplicate 1; later corrected ledger 4']
    ]
  },
  {
    id: 'appendix-cost',
    appendix: 'A11',
    title: 'Cost Governance',
    subtitle: 'US$10 monthly project budget; thresholds are set to prompt staged action.',
    rows: [
      ['Alerts', '50%, 80%, 100% actual and 100% forecast'],
      ['Avoidance', 'No NAT Gateway or unnecessary interface endpoints'],
      ['Compute', 'Serverless services where practical'],
      ['Database', 'Single-AZ RDS for the capstone; no RDS Proxy'],
      ['Change control', 'Create resources in stages and review cost before expansion']
    ]
  },
  {
    id: 'appendix-roles',
    appendix: 'A12',
    title: 'Role & Permission Model',
    subtitle: 'Separate roles give each user the right responsibilities and access.',
    rows: [
      ['Analyst', 'Owns investigation and records the decision'],
      ['Admin', 'In-app user list is read-only; cloud provisioning is operator-managed'],
      ['Auditor', 'Read-only evidence and audit access'],
      ['Maintainer', 'Technical recovery and operational support'],
      ['Browser scope', 'Analyst sign-in confirmed; Admin first sign-in and wider role rehearsal remain separate']
    ]
  },
  {
    id: 'appendix-deployment',
    appendix: 'A13',
    title: 'Deployment Pipeline',
    subtitle: 'Five deployed Lambda workers use shared regional capacity.',
    rows: [
      ['Plan', 'Requirements, scope, architecture and cost'],
      ['Build', 'Application logic, data model and workflows'],
      ['Verify', 'Regression, Linux compatibility and browser evidence'],
      ['Deploy', 'CloudFormation manages infrastructure; five Lambda workers deployed'],
      ['Capacity workaround', 'Ten shared concurrent executions; SQS concurrency limited to two'],
      ['Remaining limit', 'No approved quota increase; shared workers may compete or throttle']
    ]
  },
  {
    id: 'appendix-failure',
    appendix: 'A14',
    title: 'Failure Handling',
    subtitle: 'Failures are made visible and recoverable instead of silently losing data.',
    rows: [
      ['Invalid file', 'Reject and provide a receipt'],
      ['Invalid row', 'Keep the error reason and original row in quarantine'],
      ['Processing failure', 'Retry and isolate after repeated failure'],
      ['Replay', 'Retry safely, then check totals and duplicate protection'],
      ['Database', 'Save related changes together so records stay consistent'],
      ['Cloud verification', 'Correction and duplicate suppression passed; exhausted retry / DLQ redrive drills unverified']
    ]
  },
  {
    id: 'appendix-well-architected',
    appendix: 'A15',
    title: 'Well-Architected Mapping',
    subtitle: 'Operational Excellence reviewed, with the other five pillars mapped for further review.',
    rows: [
      ['Operational Excellence', '11 / 11 questions reviewed in the captured report'],
      ['Security', 'Next review: permissions, sign-in and protected data'],
      ['Reliability', 'Next review: recovery, backups and availability'],
      ['Performance Efficiency', 'Next review: response times and workload size'],
      ['Cost Optimization', 'Next review: spend and resource choices'],
      ['Sustainability', 'Next review: resource size and unnecessary capacity']
    ]
  },
  {
    id: 'appendix-app-evidence',
    appendix: 'A16',
    title: 'Application and Design Evidence',
    subtitle: 'My project diagrams and application screens, including the Insights dashboard API connection.',
    type: 'gallery',
    group: 'SHOW',
    images: [
      { src: 'activity-overview.svg', caption: 'Activity overview: from transaction to decision' },
      { src: 'image-6-1.png', caption: 'Original detailed activity diagram for technical questions' },
      { src: 'aws-architecture-current.svg', caption: 'Current AWS architecture with official service icons' },
      { src: 'image-8-1.png', caption: 'Original AWS design document for reference' },
      { src: 'image-10-1.png', caption: 'Imbokodo Bank analyst overview' },
      { src: 'image-10-2.png', caption: 'Risk evidence · historical V1 capture' },
      { src: 'image-10-3.png', caption: 'Investigation actions · historical V1 capture' },
      { src: 'image-11-1.png', caption: 'Quarantine case details' },
      { src: 'image-11-2.png', caption: 'Quarantine correction and audit history' },
      { src: 'r2-velocity-evidence.png', caption: 'Real R2 velocity evidence · isolated verification, before bank branding' },
      { src: 'r2-score-evidence.png', caption: 'Real R2 component evidence · isolated verification, before bank branding' },
      { src: 'api-insights-request.png', caption: '06 · Insights dashboard and API HTTP 200 responses, captured application evidence' }
    ]
  },
  {
    id: 'appendix-references',
    appendix: 'A17',
    title: 'Sources & References',
    subtitle: 'External sources for the real-world banking and regulatory context.',
    type: 'references',
    group: 'SHOW',
    sources: regulatoryReferences,
    note: 'External sources support the banking and regulatory context. The Imbokodo Risk and Compliance Workbench architecture, scoring rules and workflows are project design choices.'
  },
  {
    id: 'appendix-technical',
    appendix: 'A18',
    title: 'From Analyst Need to Working System',
    subtitle: 'SQL, Python, Lambda, API integration, scoring, alerts and the live demonstration.',
    type: 'technical-hub',
    group: 'SHOW'
  },
  {
    id: 'appendix-live-demo',
    appendix: 'A19',
    title: 'Live System Demonstration',
    subtitle: 'From transaction admission to analyst decision, with recovery and alert visibility.',
    type: 'live-demo',
    group: 'SHOW'
  }
];
