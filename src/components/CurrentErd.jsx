import { useCallback, useEffect, useState } from 'react';
import { DetailDialog, EvidenceImage } from './Evidence.jsx';

const resources = `${import.meta.env.BASE_URL}resources/`;
const source = 'https://github.com/Nompil/fintrust/tree/4a8ad8af275d8ee039873b4b2036e0f09c182b16';
const views = [
  ['overview', 'Core relationships', 'erd-current-overview.svg', 'Selected columns explain the transaction and investigation.'],
  ['ledger', 'Ledger & review', 'erd-current-ledger.svg', 'All columns for customer, account, transaction, assessment, review and projection records.'],
  ['recovery', 'Intake & recovery', 'erd-current-recovery.svg', 'All columns for ingestion, lifecycle, quarantine, corrections and correction delivery.'],
  ['full', 'All 18 tables', 'erd-current-full.svg', 'Complete physical ERD, including operations receipts and migration history.'],
  ['original', 'Original design', 'core-data-model.png', 'Original conceptual design retained for comparison. The current physical diagrams use the submitted schema.']
];

export function CurrentErdDetails({ active = true }) {
  const [view, setView] = useState('overview');
  const [catalog, setCatalog] = useState(null);
  const [failed, setFailed] = useState(false);
  const [table, setTable] = useState('transactions');
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${resources}erd-current-catalog.json`, { signal: controller.signal }).then(response => {
      if (!response.ok) throw new Error('Catalog unavailable');
      return response.json();
    }).then(setCatalog).catch(error => { if (error.name !== 'AbortError') setFailed(true); });
    return () => controller.abort();
  }, []);
  const selected = views.find(item => item[0] === view);
  const columns = catalog?.columns.filter(column => column.table === table) || [];
  const constraints = catalog?.constraints.filter(constraint => constraint.table === table) || [];
  const keys = column => constraints.filter(constraint => ['p', 'f', 'u'].includes(constraint.kind) && constraint.columns?.includes(column)).map(constraint => ({ p: 'PK', f: 'FK', u: 'UK' })[constraint.kind]).filter((key, index, values) => values.indexOf(key) === index).join(' / ');
  return <div className="current-erd-details">
    <p className="technical-lead">18 PostgreSQL tables, 17 declared foreign keys and two derived workflow views.</p>
    <nav className="technical-tabs" aria-label="Current ERD views">{views.map(([id, label]) => <button key={id} type="button" aria-pressed={view === id} onClick={() => setView(id)}>{label}</button>)}</nav>
    <p>{selected[3]}</p>
    <EvidenceImage key={view} src={selected[2]} alt={`Imbokodo Workbench ERD: ${selected[1]}`} caption={selected[3]} label="Expand and zoom diagram" assetBase={resources} active={active} className="current-erd-preview" />
    <div className="cloud-evidence-links"><a href={`${resources}Imbokodo_Workbench_Current_ERD.pdf`} target="_blank" rel="noopener noreferrer">Open ERD PDF ↗</a><a href={`${resources}erd-current-full.svg`} target="_blank" rel="noopener noreferrer">Full-size vector diagram ↗</a><a href={`${resources}erd-current.mmd`} download>Editable ERD source ↓</a><a href={source} target="_blank" rel="noopener noreferrer">Submitted schema and migrations ↗</a></div>
    <div className="technical-three"><article><h3>The exact keys matter</h3><p>Transactions use tx_id. A review uses risk_event_id as its primary and foreign key. Review history uses the composite key (risk_event_id, version).</p></article><article><h3>Recovery is part of the model</h3><p>Ingestion occurrences link to lifecycle events, quarantine cases and corrections. Outboxes preserve work that must complete after a database commit.</p></article><article><h3>Storage has clear boundaries</h3><p>Cognito holds application identities. DynamoDB holds current cloud alert claims. The SQL alerts table is retained for the legacy/direct notification path.</p></article></div>
    <details className="cloud-limitations"><summary>Inspect exact columns, constraints and source scope</summary>
      <p>The diagram follows the submitted base schema and migrations 001 to 006. An isolated schema reconstruction checked all 164 columns in the retained PostgreSQL 16 workflow checkpoint, then included the eight lifecycle columns from migration 003. This task did not query or change live RDS.</p>
      <p>PK means primary key, FK means declared foreign key and UK means unique constraint. Composite key fields work together. A required column carries ! in the full diagram. Cardinalities reflect database constraints, not assumptions about populated rows.</p>
      <p>transactions.batch_id is a lineage value, not a foreign key. candidate_account_id and user subject fields also have no declared SQL foreign key. The derived views are batch_reconciliation and quarantine_workflow.</p>
      {catalog ? <><label className="current-erd-table-choice">Inspect table <select value={table} onChange={event => setTable(event.target.value)}>{catalog.relations.filter(relation => relation.kind === 'r').map(relation => <option key={relation.name}>{relation.name}</option>)}</select></label><div className="current-erd-columns"><table><thead><tr><th>Key</th><th>Column</th><th>PostgreSQL type</th><th>Required</th></tr></thead><tbody>{columns.map(column => <tr key={column.name}><td>{keys(column.name)}</td><td>{column.name}</td><td>{column.type}</td><td>{column.not_null ? 'Yes' : 'No'}</td></tr>)}</tbody></table></div><h3>Declared constraints</h3>{constraints.map(constraint => <p className="current-erd-constraint" key={constraint.name}><strong>{constraint.name}</strong><code>{constraint.definition}</code></p>)}</> : <p>{failed ? 'The interactive catalog could not load. The full diagram, PDF and source links remain available above.' : 'Loading the schema catalog…'}</p>}
      <a href={`${resources}erd-current-catalog.json`} target="_blank" rel="noopener noreferrer">Open the schema catalog ↗</a>
    </details>
  </div>;
}

export function CurrentErdLauncher({ active = true, preview = false, label = 'Explore the current ERD', className = '' }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => { if (!active) setOpen(false); }, [active]);
  return <><button type="button" className={`${preview ? 'source-evidence-image current-erd-main' : 'technical-launch'} ${className}`} aria-haspopup="dialog" onClick={() => setOpen(true)}>{preview && <img src={`${resources}erd-current-overview.svg`} alt="Current SQL customer, account, transaction and risk review relationships" />}<span>{label} ↗</span></button>{open && <DetailDialog title="Current PostgreSQL Data Model" kicker="IMBOKODO BANK · SQL & DATA MODELLING" onClose={close}><CurrentErdDetails active={active} /></DetailDialog>}</>;
}
