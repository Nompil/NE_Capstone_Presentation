import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { evidenceDetails, flowDetails } from '../data/evidence.js';
import { FlowArrow, IconBadge, iconForLabel } from './VisualIcons.jsx';

export function DetailDialog({ title, kicker, onClose, children, className = '' }) {
  const titleId = useId();
  const dialogRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const root = document.getElementById('root');
    const wasInert = root?.inert;
    if (root) root.inert = true;
    dialogRef.current?.querySelector('button')?.focus({ preventScroll: true });
    const handleKeyDown = (event) => {
      const dialogs = document.querySelectorAll('[data-presentation-dialog]');
      if (dialogs[dialogs.length - 1] !== dialogRef.current) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopImmediatePropagation();
        onClose();
      }
      if (event.key === 'Tab') {
        const focusable = [...dialogRef.current.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), summary, [tabindex]:not([tabindex="-1"])')].filter((element) => element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      if (root) root.inert = wasInert;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [onClose]);

  return createPortal(
    <div className="problem-detail-backdrop evidence-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section aria-labelledby={titleId} aria-modal="true" className={`problem-detail-dialog presentation-detail-dialog ${className}`} data-presentation-dialog ref={dialogRef} role="dialog" tabIndex={-1}>
        <header className="problem-detail-header">
          <div><span>{kicker}</span><h2 id={titleId}>{title}</h2></div>
          <button aria-label="Close detail" className="problem-detail-close" onClick={onClose} type="button">×</button>
        </header>
        <div className="problem-detail-body">{children}</div>
      </section>
    </div>, document.body
  );
}

export function EvidenceImage({ src, alt, caption, assetBase, className = '', label = 'View full evidence', active = true, sourceUrl, sourceLabel = 'View source' }) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [fittedWidth, setFittedWidth] = useState(0);
  const frameRef = useRef(null);
  const imageRef = useRef(null);
  const updateFit = useCallback(() => {
    const frame = frameRef.current;
    const image = imageRef.current;
    if (!frame || !image?.naturalWidth) return;
    const fit = Math.min(frame.clientWidth / image.naturalWidth, frame.clientHeight / image.naturalHeight);
    setFittedWidth(image.naturalWidth * fit);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => { if (!active) setOpen(false); }, [active]);
  useEffect(() => {
    if (!open || !frameRef.current) return undefined;
    const observer = new ResizeObserver(updateFit);
    observer.observe(frameRef.current);
    updateFit();
    return () => observer.disconnect();
  }, [open, updateFit]);
  return (
    <>
      <button className={`source-evidence-image ${className}`} type="button" aria-haspopup="dialog" onClick={() => { setZoom(100); setOpen(true); }}>
        <img src={`${assetBase}${src}`} alt={alt} />
        <span>{label}<span aria-hidden="true">↗</span></span>
      </button>
      {open && <DetailDialog title={alt} kicker="IMBOKODO BANK · PROJECT EVIDENCE" onClose={close} className="evidence-image-dialog">
        <div className="image-evidence-tools">
          <button type="button" disabled={zoom <= 100} onClick={() => setZoom((value) => Math.max(100, value - 25))} aria-label="Zoom out">−</button>
          <output aria-live="polite">{zoom}%</output>
          <button type="button" disabled={zoom >= 250} onClick={() => setZoom((value) => Math.min(250, value + 25))} aria-label="Zoom in">+</button>
          <button type="button" onClick={() => setZoom(100)}>Fit</button>
          <a href={`${assetBase}${src}`} target="_blank" rel="noopener noreferrer">Open original ↗</a>
          {sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{sourceLabel} ↗</a>}
        </div>
        <div className="full-evidence-image" ref={frameRef}><img src={`${assetBase}${src}`} alt={alt} ref={imageRef} onLoad={updateFit} style={{ width: fittedWidth ? `${fittedWidth * zoom / 100}px` : 'auto' }} /></div>
        <p className="evidence-caption">{caption}</p>
      </DetailDialog>}
    </>
  );
}

export function RiskExplorer({ assetBase, initialAmount = '100000', initialCrossBorder = false }) {
  const [amount, setAmount] = useState(initialAmount);
  const [signals, setSignals] = useState({ crossBorder: initialCrossBorder, velocity: false, duplicate: false });
  const numericAmount = Number(amount);
  const amountPoints = numericAmount > 200000 ? 40 : numericAmount > 100000 ? 25 : numericAmount > 50000 ? 15 : 0;
  const components = [['Amount band', amountPoints], ['Cross-border', signals.crossBorder ? 15 : 0], ['High velocity', signals.velocity ? 25 : 0], ['Possible duplicate', signals.duplicate ? 20 : 0]];
  const score = Math.min(100, components.reduce((total, component) => total + component[1], 0));
  const level = score >= 40 ? 'HIGH' : score >= 20 ? 'MEDIUM' : 'LOW';
  return (
    <section className="risk-explorer" aria-label="Interactive Workbench R2 score illustration">
      <div className="risk-explorer-controls">
        <label>Transaction amount · ZAR<select value={amount} onChange={(event) => setAmount(event.target.value)}>
          <option value="1000">R1,000</option><option value="50000">R50,000</option><option value="100000">R100,000</option><option value="150000">R150,000</option><option value="200000.01">R200,000.01</option>
        </select></label>
        <fieldset><legend>Other rules that add points</legend>
          {[
            ['crossBorder', 'Cross-border', '+15 · country differs from ZA or explicit flag'],
            ['velocity', 'High velocity', '+25 · more than 5 accepted transactions in 5 minutes'],
            ['duplicate', 'Possible duplicate', '+20 · matching distinct-source charge within 120 seconds']
          ].map(([key, label, detail]) => <label className="signal-option" key={key}><input type="checkbox" checked={signals[key]} onChange={(event) => setSignals((current) => ({ ...current, [key]: event.target.checked }))} /><span><strong>{label}</strong><small>{detail}</small></span></label>)}
        </fieldset>
      </div>
      <div className="risk-explorer-result" aria-live="polite">
        <p>R2 RULES · WORKED EXAMPLE</p><strong className="explorer-score">{score}<small> / 100</small></strong><span className={`risk-level risk-level--${level.toLowerCase()}`}>{level}</span>
        <div className="explorer-score-track" role="meter" aria-label="Illustrative R2 score" aria-valuenow={score} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${score}%` }} /></div>
        <dl>{components.map(([label, points]) => <div key={label}><dt>{label}</dt><dd>+{points}</dd></div>)}</dl>
        <p>LOW 0 to 19 · MEDIUM 20 to 39 · HIGH 40 to 100</p>
      </div>
      <p className="evidence-caption risk-explorer-note">Rule version: <code>fintrust-r2-rules-2026-10-13</code>. Points from each triggered rule add up to a review priority. Amounts use the transaction’s currency without exchange-rate conversion. The score guides the investigation; the Analyst decides the outcome.</p>
      {assetBase && <details className="r2-capture"><summary>View real R2 verification evidence</summary><p>Captured isolated PostgreSQL verification with AWS mocked, before Imbokodo branding was applied.</p><a href={`${assetBase}r2-score-evidence.png`} target="_blank" rel="noopener noreferrer"><img src={`${assetBase}r2-score-evidence.png`} alt="Recorded Workbench R2 example: R150,000, amount +25, cross-border +15, velocity +25, total 65 HIGH" />Open full R2 capture ↗</a></details>}
    </section>
  );
}

export function RiskScoringSummary({ assetBase }) {
  return <section className="risk-scoring-summary" aria-label="R2 scoring overview">
    <p className="risk-summary-lead">{flowDetails.Score}</p>
    <ul className="risk-summary-signals" aria-label="Four scoring checks">
      {[
        ['score', 'Transaction amount'],
        ['link', 'Cross-border'],
        ['clock', 'Transactions close together'],
        ['search', 'Possible duplicate']
      ].map(([icon, label]) => <li key={label}><IconBadge name={icon} /><span>{label}</span></li>)}
    </ul>
    <dl className="risk-summary-actions" aria-label="What happens next">
      <div><dt>LOW · 0 to 19</dt><dd>Save the record</dd></div>
      <div><dt>MEDIUM · 20 to 39</dt><dd>Create an Analyst review</dd></div>
      <div><dt>HIGH · 40 to 100</dt><dd>Create a review and trigger an alert</dd></div>
    </dl>
    <p className="risk-summary-example"><strong>R100,000 alone adds 15 points and stays LOW.</strong> Other signals can raise the score.</p>
    <p className="risk-summary-context">The score is a review priority, not a fraud probability. Recent history supports speed and duplicate checks. Learning each customer’s usual pattern is a future improvement.</p>
    <details className="risk-summary-details"><summary>Show rule points and try an example</summary><p className="risk-summary-context">The brief introduced rule ideas and left point values open. R2 defines the points and risk bands, refines the speed check and adds a possible duplicate check.</p><RiskExplorer assetBase={assetBase} /></details>
    <details className="risk-summary-details risk-context-details"><summary>Why the amount needs context</summary><ContextEvidence /></details>
  </section>;
}

export function ContextEvidence() {
  return (
    <>
      <p>The same R100,000 can be expected for a business that regularly pays suppliers and unusual for an account whose payments are usually much smaller. An Analyst needs the purpose, counterparties, account history and other evidence to interpret it.</p>
      <div className="context-comparison">
        <article><span>EXAMPLE CUSTOMER PATTERN</span><h3>Regular supplier payment</h3><strong>R100,000</strong><p>Typical supplier payments: R80,000 to R120,000. This amount fits the example pattern, but purpose and evidence still matter.</p></article>
        <article><span>EXAMPLE CUSTOMER PATTERN</span><h3>Unusual account activity</h3><strong>R100,000</strong><p>Typical payments: R500 to R2,000. The same amount represents a large change and warrants closer investigation.</p></article>
      </div>
      <p className="context-status"><strong>Current R2 scoring:</strong> fixed rules set the review priority. Recent history supports speed and duplicate checks. <strong>Future improvement:</strong> learning each customer’s usual payment range, as illustrated above. The example customer patterns are not part of the current scoring calculation.</p>
    </>
  );
}

export function EvidenceGrid({ cards, className = '', variant = 'standard', assetBase, active = true, onNavigate }) {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  useEffect(() => { if (!active) setSelected(null); }, [active]);
  const detail = selected && evidenceDetails[selected.title];
  return (
    <>
      <div className={`card-grid ${className} card-grid--${variant}`}>
        {variant === 'discipline' && <div className="discipline-source-hub"><strong>CLOUD<br />LEARNER</strong></div>}
        {cards.map((card, index) => <button className="content-card content-card--interactive" key={`${card.title}-${index}`} type="button" aria-haspopup="dialog" onClick={() => setSelected(card)}>
          <IconBadge name={iconForLabel(card.title)} />
          {card.number && <span className="card-number">{card.number}</span>}<h3>{card.title}</h3>
          {card.label && <p className="card-label">{card.label}</p>}{card.body && <p>{card.body}</p>}
          {card.items && <ul>{card.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          <span className="evidence-card-cue">Explore evidence ↗</span>
        </button>)}
      </div>
      {selected && <DetailDialog title={selected.title} kicker="IMBOKODO BANK · CONTEXT & EVIDENCE" onClose={close}>
        {detail?.kind !== 'risk' && <p>{detail?.text || selected.body}</p>}
        {detail?.items && <ul>{detail.items.map((item) => <li key={item}>{item}</li>)}</ul>}
        {detail?.kind === 'risk' && <RiskScoringSummary assetBase={assetBase} />}
        {detail?.image && <figure className="context-evidence-figure"><img src={`${assetBase}${detail.image}`} alt={detail.caption || selected.title} /><figcaption>{detail.caption || 'Original project evidence from the supplied presentation.'}</figcaption></figure>}
        {detail?.destination && <button className="evidence-navigate" type="button" onClick={() => { close(); onNavigate?.(detail.destination); }}>Open related slide ↗</button>}
      </DetailDialog>}
    </>
  );
}

export function EvidenceFlow({ steps, className = '', active = true, assetBase }) {
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  useEffect(() => { if (!active) setSelected(null); }, [active]);
  return <>
    <div className={`process-row ${className}`}>
      {steps.map((step, index) => <div className="process-unit" key={step.title}>
        <button type="button" className={`process-card process-card--${index % 4} process-card--interactive`} aria-haspopup="dialog" onClick={() => setSelected(step)}>
          <IconBadge name={iconForLabel(step.title)} />
          <span className="process-number">{step.number || String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.body}</p><small>{step.cue || 'Explore this step ↗'}</small>
        </button>{index < steps.length - 1 && <span className="process-arrow" aria-hidden="true"><FlowArrow /></span>}
      </div>)}
    </div>
    {selected && <DetailDialog title={selected.title === 'Score' ? 'R2 Risk Scoring' : selected.title} kicker="IMBOKODO BANK · WORKFLOW" onClose={close}>{selected.title === 'Score' ? <RiskScoringSummary assetBase={assetBase} /> : <p>{flowDetails[selected.title] || selected.body}</p>}</DetailDialog>}
  </>;
}

export function VerificationChart({ values }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const chart = <figure className="verification-chart"><div className="verification-bars" role="img" aria-label={`Historical passing test milestones in source-deck order: ${values.join(', ')}.`}>
    {values.map((value, index) => <div key={value}><strong>{value}</strong><span style={{ height: `${Number(value) / 178 * 100}%` }} /><small>Milestone {index + 1}</small></div>)}
  </div><figcaption>My earlier test milestones show how the test suite grew through the project. Each bar is a separate stage.</figcaption></figure>;
  return <><button className="verification-chart-trigger" type="button" aria-haspopup="dialog" onClick={() => setOpen(true)}><span>Verification progression · source-deck milestones</span><span className="milestone-spark">{values.map((value) => <span key={value} style={{ '--bar-height': `${Number(value) / 178 * 100}%` }}><i /><strong>{value}</strong></span>)}</span><small>Open chart & context ↗</small></button>{open && <DetailDialog title="Verification grew with the product" kicker="HISTORICAL PROJECT EVIDENCE" onClose={close}>{chart}</DetailDialog>}</>;
}
