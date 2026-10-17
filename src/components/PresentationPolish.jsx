import { useCallback, useEffect, useState } from 'react';
import { DetailDialog, EvidenceImage, VerificationChart } from './Evidence.jsx';
import { FlowArrow, IconBadge, VisualIcon, iconForLabel } from './VisualIcons.jsx';

const terms = [
  ['Lambda', 'A small worker that runs when an event arrives.', 'Separates ingestion, scoring, alerts, API responses and reports.'],
  ['S3', 'The controlled file landing area.', 'Keeps the uploaded file available for processing and traceability.'],
  ['SQS', 'A waiting line for work.', 'Buffers processing so one slow worker does not stop file reception.'],
  ['DLQ', 'A separate queue for work that could not complete.', 'Keeps technical failures visible for controlled investigation and replay.'],
  ['RDS / PostgreSQL', 'The main database for transaction and review records.', 'Keeps transactions, saved scores, investigations and decisions connected.'],
  ['DynamoDB', 'A fast store for risk summaries.', 'Supports the alert flow while PostgreSQL keeps the main records.'],
  ['API', 'The contract between the screen and backend.', 'Lets the Workbench request structured data and submit authorised actions.'],
  ['API Gateway', 'The AWS front door for requests from the screen.', 'Sends each request to the right backend function.'],
  ['Cognito', 'The workforce sign-in service in the access design.', 'Identifies the user so the application can apply the right permissions.'],
  ['IAM', 'Permissions for AWS services and operators.', 'Limits what each service can read or change. Business roles are a separate control.'],
  ['SES', 'The email notification service in the alert design.', 'Draws attention to a stored HIGH-risk event. Email is not the audit trail.'],
  ['CloudWatch', 'The place to check logs, metrics and alarms.', 'Helps find errors and understand how the system is running.'],
  ['Idempotency', 'Repeating the same work does not create another business record.', 'Protects the ledger during retries and repeated source-file processing.'],
  ['Quarantine', 'A holding area for rejected data.', 'Keeps invalid rows out of trusted transactions while preserving the original evidence.'],
  ['ERD', 'A map of entities and their relationships.', 'Explains how an account connects to transactions, risk events and review history.'],
  ['Deterministic scoring', 'The same rule inputs and version produce the same score.', 'Makes R2 explainable. It is not a trained behavioural model or a probability of fraud.']
];

export function TermsLauncher() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return <><button type="button" onClick={() => setOpen(true)}>Terms</button>{open && <DetailDialog title="Technical terms in plain English" kicker="OPTIONAL Q&A REFERENCE" onClose={close}><p className="technical-lead">Name the service. Explain its job. Connect it to Imbokodo Bank’s need.</p><div className="plain-terms">{terms.map(([term, meaning, purpose]) => <article key={term}><h3>{term}</h3><p>{meaning}</p><small>{purpose}</small></article>)}</div></DetailDialog>}</>;
}

const architectureStages = [
  { business: 'Receive', service: 'Amazon S3', meaning: 'Keep the uploaded file', purpose: 'The original file links every row back to its source.', tone: 'teal' },
  { business: 'Validate', service: 'Ingest Lambda', meaning: 'Check the data', purpose: 'Each row is checked before acceptance. Invalid rows go to quarantine with a reason, so they can be corrected safely.', tone: 'teal' },
  { business: 'Queue', service: 'Amazon SQS', meaning: 'Hold work until ready', purpose: 'A queue lets the system receive files while workers process earlier transactions. Failed work can be retried safely.', tone: 'blue' },
  { business: 'Score', service: 'Scoring Lambda', meaning: 'Apply the risk rules', purpose: 'R2 applies the amount, cross-border, velocity and duplicate rules. The score, reasons and rule version are saved together.', tone: 'amber' },
  { business: 'Store', service: 'RDS + DynamoDB', meaning: 'Save records and summaries', purpose: 'PostgreSQL keeps the main transaction and risk records. DynamoDB keeps fast risk summaries to support processing and alerts.', tone: 'blue' },
  { business: 'Investigate', service: 'API + Workbench', meaning: 'Review and record a decision', purpose: 'The API brings saved information to the screen. The Analyst checks the reasons, adds notes and records the outcome.', tone: 'teal' }
];

export function ArchitectureWalkthrough({ active, assetBase, details, region }) {
  const [layer, setLayer] = useState('aws');
  const [selected, setSelected] = useState(null);
  const [regionOpen, setRegionOpen] = useState(false);
  const close = useCallback(() => setSelected(null), []);
  const closeRegion = useCallback(() => setRegionOpen(false), []);
  useEffect(() => { if (!active) { setSelected(null); setRegionOpen(false); } }, [active]);
  return <section className="architecture-walkthrough" aria-label="Readable Imbokodo Risk and Compliance Workbench architecture">
    <div className="architecture-tiers" aria-label="The three architecture tiers"><article><IconBadge name="screen" /><small>TIER 1 · PRESENTATION</small><strong>The Analyst screen</strong><span>Workbench · dashboards · investigation</span><FlowArrow twoWay className="tier-connector" /></article><article><IconBadge name="code" /><small>TIER 2 · APPLICATION</small><strong>The processing and rules</strong><span>API · Python / Lambda · queues</span><FlowArrow twoWay className="tier-connector" /></article><article><IconBadge name="database" /><small>TIER 3 · DATA</small><strong>The saved information</strong><span>PostgreSQL · DynamoDB · S3</span></article></div>
    <div className="architecture-reveal"><p>SQS buffers incoming work. Lambda processes events.</p><div role="group" aria-label="Architecture detail level"><button type="button" aria-pressed={layer === 'business'} onClick={() => setLayer('business')}>Business flow</button><button type="button" aria-pressed={layer === 'aws'} onClick={() => setLayer('aws')}>AWS services</button></div></div>
    <ol className="readable-architecture">{architectureStages.map((stage, index) => <li key={stage.business} data-tone={stage.tone}><button type="button" aria-haspopup="dialog" onClick={() => setSelected(stage)}><VisualIcon name={iconForLabel(stage.business)} /><small>0{index + 1}{layer === 'aws' ? ` · ${stage.business}` : ''}</small><h3>{layer === 'aws' ? stage.service : stage.business}</h3><p>{stage.meaning}</p><span>Why this exists ↗</span></button>{index < architectureStages.length - 1 && <FlowArrow />}</li>)}</ol>
    <div className="architecture-rails"><article><strong>Protect access and monitor errors</strong><p>IAM controls permissions · CloudWatch helps find problems</p></article><article><strong>Handle bad data and technical errors separately</strong><p>Bad data → quarantine · Failed work → retry / failure queue</p></article></div>
    <div className="architecture-evidence-line"><button type="button" className="architecture-region-choice" aria-haspopup="dialog" onClick={() => setRegionOpen(true)}>{region} · Why this Region? ↗</button><EvidenceImage src="image-8-1.png" alt="Original Imbokodo Risk and Compliance Workbench architecture diagram" caption="My detailed AWS diagram shows the file, processing, data, reporting and recovery paths." label="Detailed diagram" className="architecture-original" assetBase={assetBase} active={active} /></div>
    {regionOpen && <DetailDialog title="CPGL: Why Africa (Cape Town)?" kicker="HOW · ARCHITECTURE DECISION" onClose={closeRegion}><p className="technical-lead">Cape Town, af-south-1, is the selected AWS location for the Imbokodo Bank workload.</p><div className="region-criteria"><article><h3>C · Compliance</h3><p>Data location, access and governance requirements shape the choice. The capstone uses sample data.</p></article><article><h3>P · Proximity</h3><p>The Workbench serves South African Analysts. Cape Town keeps regional resources closer to these users.</p></article><article><h3>G · Geography and geological risk</h3><p>Geographic risks belong in the recovery review. The current Single-AZ database and future Multi-AZ option are different resilience choices.</p></article><article><h3>L · Latency</h3><p>A nearby Region aims to reduce network delay. Measured response times would confirm the benefit for users.</p></article></div><p className="technical-caption">The design records proximity and data-location considerations. Latency measurements and a documented geographic-risk comparison would complete the evidence. Cost and service availability remain additional FinOps checks.</p><p className="region-source-links"><a href="https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions.html" target="_blank" rel="noopener noreferrer">AWS Region guidance ↗</a><a href="https://docs.aws.amazon.com/wellarchitected/latest/framework/cost_pricing_model_region_cost.html" target="_blank" rel="noopener noreferrer">AWS cost and Region trade-offs ↗</a></p></DetailDialog>}
    {selected && <DetailDialog title={`${selected.business}: ${selected.service}`} kicker="HOW IT WORKS · WHY IT MATTERS" onClose={close}><p className="technical-lead">{selected.meaning}</p><p>{selected.purpose}</p><details className="architecture-existing-notes"><summary>How the three layers fit together</summary><ul>{details.map((detail) => <li key={detail}>{detail}</li>)}</ul></details><p className="technical-caption">The three tiers describe the application’s responsibilities. The transaction flow shows how work moves between those responsibilities.</p></DetailDialog>}
  </section>;
}

export function VerificationSummary({ values, active }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => { if (!active) setOpen(false); }, [active]);
  return <><button className="verification-summary" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}><span><strong>1,026</strong><small>checks passed in the saved Linux run</small></span><span><strong>0</strong><small>failures, errors or skips</small></span><em>Inspect the test record ↗</em><small className="verification-environment">Ubuntu · Python 3.12 · PostgreSQL 16.15 · simulated AWS connections</small></button>{open && <DetailDialog title="Test coverage and results" kicker="LINUX TEST RESULTS" onClose={close}><p className="technical-lead">The saved Linux test report records 1,026 passing checks, with no failures, errors or skips.</p><p>Application and browser checks ran using Ubuntu 24.04, Python 3.12.3 and PostgreSQL 16.15. This run used a local test database and simulated AWS connections.</p><p>Separate checks covered 48 sign-in and API route cases, plus 98 infrastructure and access-rule cases. These are separate runs and are not added to the 1,026 total.</p><a href={`${import.meta.env.BASE_URL}resources/verification-summary.json`} target="_blank" rel="noopener noreferrer">Open the saved test summary ↗</a><div className="historical-verification"><VerificationChart values={values} /></div></DetailDialog>}</>;
}
