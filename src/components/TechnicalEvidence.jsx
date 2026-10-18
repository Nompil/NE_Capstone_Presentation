import { useCallback, useEffect, useState } from 'react';
import { DetailDialog, EvidenceImage, RiskScoringSummary } from './Evidence.jsx';
import AwsConsoleLink from './AwsConsoleLink.jsx';
import { IntegrationCaptureSequence } from './IntegrationCaptures.jsx';
import { FlowArrow, VisualIcon } from './VisualIcons.jsx';
import { analystWireframeSource } from '../data/references.js';
import { projectStatus, releaseEvidence } from '../data/projectStatus.js';
import { CloudEvidenceLauncher } from './CloudEvidence.jsx';

const resourceBase = `${import.meta.env.BASE_URL}resources/`;
const topics = [
  ['journey', 'Frontend → API → backend', 'Follow a request from the analyst’s screen to SQL and back.'],
  ['sql', 'SQL & data integrity', 'Real schema, CTE, window query, views and database function.'],
  ['functions', 'Lambda & Python functions', 'Triggers, responsibilities and the boundaries between services.'],
  ['scoring', 'R2 Risk Scoring', 'See what affects the score and when a review or alert is created.'],
  ['alerts', 'Alerts & failure handling', 'Get HIGH-risk evidence to people without making email the audit trail.'],
  ['wireframe', 'Wireframe → working screen', 'Connect analyst needs to the real Imbokodo Bank workbench.'],
  ['demo', 'Live system demonstration', 'One transaction: upload, score, investigate, decide and prove.'],
  ['resources', 'Project documents', 'View and download the original SOP, review report and project plan.']
];

function Flow({ title, steps, failure = false }) {
  return <section className={`technical-flow${failure ? ' technical-flow--failure' : ''}`}><h3>{title}</h3><ol>{steps.map((step, index) => <li key={step}>{step}{index < steps.length - 1 && <FlowArrow className="technical-flow-connector" />}</li>)}</ol></section>;
}

function Code({ title, children }) {
  return <section className="technical-code"><h3>{title}</h3><pre><code>{children}</code></pre></section>;
}

function FunctionSource() {
  const [sources, setSources] = useState(null);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${resourceBase}function-evidence.json`, { signal: controller.signal }).then((response) => {
      if (!response.ok) throw new Error('Source unavailable');
      return response.json();
    }).then(setSources).catch((failure) => { if (failure.name !== 'AbortError') setError(true); });
    return () => controller.abort();
  }, []);
  const files = sources ? Object.entries(sources) : [];
  return <><nav className="technical-tabs" aria-label="Implementation source">{['R2 scoring function', 'Alert delivery', 'Score persistence', 'Frontend request'].map((label, index) => <button key={label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{label}</button>)}</nav><Code title={`Actual implementation excerpt · ${files[selected]?.[0] || 'loading'}`}>{files[selected]?.[1] || (error ? 'Source unavailable; inspect the project repository.' : 'Loading source…')}</Code></>;
}

function Documents() {
  const documents = [
    ['Workbench Project Guide', 'workbench-readme.pdf', 'workbench-readme.pdf', 'The README as a PDF: presentation controls, architecture, the CPGL Region choice and hosting.'],
    ['Analyst Standard Operating Procedure', 'analyst-sop.pptx', 'analyst-sop-preview.pdf', 'My 22-slide guide explains how to use the Workbench, investigate risk and record decisions.'],
    ['AWS Well-Architected Review', 'well-architected.pdf', 'well-architected.pdf', 'The review records 11 completed Operational Excellence questions. This public sharing copy removes account and contact details.'],
    ['Project Plan', 'project-plan.pdf', 'project-plan.pdf', 'My project plan sets out the business problem, scope, approach and delivery stages.'],
    ['Workbench Use Case Diagram', 'fintrust-use-case.pdf', 'fintrust-use-case.pdf', 'My diagram shows what the Analyst, Administrator, Auditor and Maintainer each do in the system.']
  ];
  return <div className="technical-documents">{documents.map(([title, file, view, note]) => <article key={file}><span>PROJECT RESOURCE</span><h3>{title}</h3><p>{note}</p><div><a href={`${resourceBase}${view}`} target="_blank" rel="noopener noreferrer">View ↗</a><a href={`${resourceBase}${file}`} download>Download ↓</a></div></article>)}</div>;
}

function SqlEvidence({ active }) {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState('sql/risk_report.sql');
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${resourceBase}sql-evidence.json`, { signal: controller.signal }).then((response) => {
      if (!response.ok) throw new Error('Evidence unavailable');
      return response.json();
    }).then(setFiles).catch((failure) => { if (failure.name !== 'AbortError') setError(true); });
    return () => controller.abort();
  }, []);
  return <><p className="technical-lead">PostgreSQL connects transactions, scores, reviews and decision history.</p><div className="technical-split"><div><Flow title="How the records connect" steps={['Customer → Accounts', 'Account → Transactions', 'Transaction → Risk events', 'Review → History']} /><p>Each record has its own ID. Foreign keys link related records, such as an account and its transactions. Checks on amount, currency and source identity help protect the data and prevent the same input being saved twice.</p></div><EvidenceImage src="erd.png" assetBase={resourceBase} alt="Imbokodo Risk and Compliance Workbench implementation data model" caption="Baseline implementation ERD. Later workflow and recovery extensions are not all shown." active={active} /></div><nav className="technical-tabs" aria-label="SQL source files">{['schema.sql', 'risk_report.sql', 'monthly_summary.sql', 'views.sql', 'procedure.sql'].map((file) => <button key={file} aria-pressed={selected === `sql/${file}`} onClick={() => setSelected(`sql/${file}`)}>{file}</button>)}</nav><Code title={`Project SQL · ${selected}`}>{files?.[selected] || (error ? 'Source unavailable. Inspect the project repository.' : 'Loading source…')}</Code><div className="technical-warning"><strong>What these queries do.</strong> risk_report finds accounts with more than three HIGH transactions in a 30-day period. R2 uses the saved risk level, with HIGH starting at 40; the 70-point fallback supports earlier records. monthly_summary adds movement by currency from a zero starting point. flag_account lets an authorised action record a manual risk flag.</div><p className="technical-caption">Six assessed SQL artefacts include the schema, 200-row seed, CTE report, window query, views and stored function. The seed is local test data, not the cloud ledger. The 100, 75, 65 hand-check verifies movement from zero, not a real bank balance. Separate currencies are not combined. Every view and function has not been re-executed in the live demonstration.</p></>;
}

function Alerts() {
  return <><p className="technical-lead">A HIGH-risk transaction needs attention. How does the right team hear about it?</p><p>The transaction, frozen score and workflow are saved in PostgreSQL first. A DynamoDB update then starts a separate notification path.</p><Flow title="Business flow · save the record first" steps={['Accept transaction', 'Calculate score', 'Commit risk + review', 'Analyst investigates', 'Record decision']} /><Flow title="Alert flow · HIGH risk only" steps={['DynamoDB projection', 'DynamoDB Streams', 'Alert Lambda claims event', 'SES notification', 'Save delivery state']} /><div className="technical-three"><article><h3>LOW · below 20</h3><p>Save the record. No routine review or HIGH-risk alert.</p></article><article><h3>MEDIUM · 20 to 39</h3><p>Create a review for the Analyst.</p></article><article><h3>HIGH · 40 to 100</h3><p>Create a review and trigger the separate alert path.</p></article></div><div className="technical-warning"><strong>The saved record is the audit trail.</strong> A definite send rejection can be retried. An uncertain send result is marked UNKNOWN and checked before resending to avoid duplicate notifications. Failure queues and CloudWatch support investigation.</div><h3>Recorded AWS result</h3><p>Two SES provider message IDs were recorded. Account-level counters showed Send 2 and Delivery 2, with no recorded bounces, rejects or complaints. Inbox receipt remains unconfirmed; aggregate counters do not prove where each message appeared.</p><p>Failure queues are deployed. A live exhausted-retry and redrive drill has not been established.</p><a href={releaseEvidence.alerts} target="_blank" rel="noopener noreferrer">Inspect the SES evidence ↗</a><p className="technical-caption">The deployed handler is alert_delivery.py. The required legacy alert.py module is not the deployed alert handler. Grouping, cooldowns and digests remain future improvements.</p></>;
}

function Functions() {
  const rows = [
    ['Ingest', 'A transaction file arrives', 'Check fields, keep the file and row reference, separate bad rows and queue accepted work.', 'fintrust.ingest.lambda_handler'],
    ['Scoring', 'A message arrives in SQS', 'Read the transaction history, apply R2 rules and save the score and reasons.', 'fintrust.score.lambda_handler'],
    ['Alert', 'A HIGH-risk update reaches the stream', 'Send through SES and save the send result or error for follow-up.', 'fintrust.alert_delivery.lambda_handler'],
    ['API', 'The screen sends a request', 'Check user permissions and return transaction, risk and review information as JSON.', 'fintrust.api.lambda_handler'],
    ['Report', 'A reporting request or schedule', 'Read stored data and produce a report for the selected period.', 'fintrust.report.lambda_handler']
  ];
  return <><p className="technical-lead">Each function has one clear job. A slow notification should not stop a risk record being saved.</p><AwsConsoleLink /><div className="technical-table"><div className="technical-table-head"><b>Function / what starts it</b><b>What it does</b><b>Code entry point</b></div>{rows.map(([name, trigger, responsibility, handler]) => <div key={name}><span><strong>{name}</strong><small>{trigger}</small></span><span>{responsibility}</span><code>{handler}</code></div>)}</div><Flow title="Inside the scoring function" steps={['Protect account update', 'Find transaction', 'Check speed + duplicates', 'Apply risk rules', 'Save score + reasons', 'Update risk summary']} /><p className="technical-caption">The deployed workers are fintrust-ingest-dev, fintrust-scoring-dev, fintrust-alert-dev, fintrust-api-dev and fintrust-report-dev. A dashboard request shares one read-only database snapshot within that request; this is not warm Lambda connection pooling. Transactions roll back on failure and connections close explicitly.</p><CloudEvidenceLauncher mode="architecture" active /></>;
}

function Journey({ active }) {
  return <><IntegrationCaptureSequence active={active} /><h3>How the investigation screen gets its information</h3><p className="technical-lead">The API connects the screen to the backend. When an Analyst opens a case, the screen asks for the saved transaction, score and review history.</p><Flow title="Screen → request → database → screen" steps={['Open investigation', 'GET /v1/risk-events/{id}', 'Check user permissions', 'Read linked SQL records', 'Return JSON data', 'Show reasons + history']} /><div className="technical-split"><Code title="Frontend request · project code">{'request(`/v1/risk-events/${row.risk_event_id}`)\n\nd.risk_score\nd.risk?.rule_version'}</Code><article><h3>What happens in the backend</h3><p>The API checks the record ID and the accounts the user may access. SQL joins bring the transaction, score and review together. The response also includes notes, history and alert status.</p><p>The Workbench uses JavaScript to send HTTP requests and display the returned data. The screen shows the saved assessment, so the Analyst sees the same score and reasons that were recorded during processing.</p></article></div><Flow title="Why this matters" steps={['One saved assessment', 'Clear score reasons', 'Analyst action', 'Recorded decision history']} /><p className="technical-caption">Project code: frontend/js/release1.js → backend/fintrust/workflow_api.py → PostgreSQL.</p></>;
}

function Wireframe({ active }) {
  return <><p className="technical-lead">The investigation screen brings together what an Analyst needs: the transaction, the risk reasons, a place for notes and the case history.</p><div className="use-case-document-links"><a href={analystWireframeSource.url} target="_blank" rel="noopener noreferrer">{analystWireframeSource.label} ↗</a></div><div className="technical-split"><EvidenceImage src="analyst-wireframe.png" assetBase={resourceBase} alt="Analyst Investigation wireframe" caption="My Figma wireframe shows the planned layout and investigation actions." label="Expand wireframe" active={active} sourceUrl={analystWireframeSource.url} sourceLabel={analystWireframeSource.label} /><EvidenceImage src="sop-screen-7.png" assetBase={resourceBase} alt="Imbokodo Bank investigation screen" caption="The investigation screen in my Analyst SOP shows how the design became a working screen." active={active} /></div><div className="technical-three"><article><h3>Understand the transaction</h3><p>Account, amount and country appear with the saved score.</p></article><article><h3>Make a decision</h3><p>The Analyst checks the reasons, adds notes and chooses the outcome.</p></article><article><h3>Keep the history</h3><p>The timeline records what happened and who took action.</p></article></div><p className="technical-caption">My Use Case and Activity diagrams are also available on the Business Analysis slide.</p></>;
}

function Demo({ active }) {
  return <><p className="technical-lead">Follow one transaction from upload to a recorded decision.</p><section className="demo-speaking-cues"><h3>Demonstration story</h3><p>“I’ll follow one transaction from its CSV upload to the saved decision.”</p><p>“The review brings the evidence together. The recorded outcome and history show the actions taken.”</p><p>“HIGH-risk alerts draw attention to the case. Notification errors are handled separately from the saved risk record.”</p></section><Flow title="1 · Upload and explain" steps={['Upload CSV', 'Open batch results', 'Accepted / quarantined', 'Open transaction', 'Explain score + rule version']} /><Flow title="2 · Investigate and record" steps={['Open risk details', 'Assign review', 'Record outcome', 'Show audit history', 'Explain alert status']} /><Flow title="3 · Correct bad data safely" steps={['Open bad row', 'Read error reason', 'Authorised correction', 'Check again', 'Show correction history']} /><div className="technical-split"><EvidenceImage src="sop-screen-16.png" assetBase={resourceBase} alt="Upload row outcomes from Analyst SOP" caption="My SOP shows accepted rows, rejected rows and the available follow-up actions." active={active} /><article><h3>Points to explain</h3><p>Why a row passed or failed. How the score was calculated. What the Analyst decided. Where the decision and its history are saved.</p><p>Use the same record ID to connect the screen, API response, saved review and alert status.</p></article></div></>;
}

export function TechnicalContent({ topic, active = true, assetBase }) {
  if (topic === 'alerts') return <Alerts />;
  if (topic === 'sql') return <SqlEvidence active={active} />;
  if (topic === 'functions') return <><Functions /><FunctionSource /></>;
  if (topic === 'journey') return <><Journey active={active} /><FunctionSource /></>;
  if (topic === 'wireframe') return <Wireframe active={active} />;
  if (topic === 'demo') return <Demo active={active} />;
  if (topic === 'resources') return <Documents />;
  return <RiskScoringSummary assetBase={assetBase} />;
}

export function TechnicalLauncher({ topic, label, accessibleLabel, className = '', active = true, assetBase }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => { if (!active) setOpen(false); }, [active]);
  return <><button type="button" aria-label={accessibleLabel} className={`technical-launch ${className}`} onClick={() => setOpen(true)}>{label} <span aria-hidden="true">↗</span></button>{open && <DetailDialog title={topics.find(([id]) => id === topic)?.[1] || 'Project evidence'} kicker="IMBOKODO BANK · TECHNICAL WALKTHROUGH" onClose={close}><TechnicalContent topic={topic} active={active} assetBase={assetBase} /></DetailDialog>}</>;
}

export default function TechnicalHub({ active, assetBase }) {
  return <div className="technical-hub">{topics.map(([topic, title, description], index) => <article key={topic}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p><TechnicalLauncher topic={topic} label="Open walkthrough" accessibleLabel={`Explore ${title}`} active={active} assetBase={assetBase} /></article>)}</div>;
}

export function LiveDemoSlide({ active, onNavigate }) {
  return <div className="technical-live-slide"><span className="demo-transition-label">THE WORKBENCH ON AWS</span><h2>One transaction. One investigation.<br />A traceable decision.</h2><ol className="demo-memory-flow" aria-label="Live demonstration sequence">{['Sign in', 'Transactions', 'Risk events', 'Investigate', 'Processing', 'Correction', 'Report'].map((step, index) => <li key={step}><VisualIcon name={['users', 'database', 'score', 'search', 'settings', 'check', 'audit'][index]} /><small>0{index + 1}</small><strong>{step}</strong></li>)}</ol><p className="demo-proof-promise"><strong>Connected AWS demonstration:</strong> four ledger rows after correction. The earlier October report contains three.</p><div className="technical-live-actions"><a className="technical-launch" href={projectStatus.liveDemoUrl} target="_blank" rel="noopener noreferrer">Open Workbench ↗</a><CloudEvidenceLauncher active={active} /><TechnicalLauncher topic="demo" label="Walkthrough & supporting screens" active={active} /><button className="technical-launch" onClick={() => onNavigate('solution-difference')}>Return to SHOW</button></div><p className="technical-caption">Cognito protects the application. Sign in privately before the presentation.</p></div>;
}
