import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { DetailDialog as FullScreenDetailDialog, EvidenceFlow, EvidenceGrid, EvidenceImage, RiskExplorer } from './Evidence.jsx';
import TechnicalHub, { LiveDemoSlide, TechnicalLauncher } from './TechnicalEvidence.jsx';
import AwsConsoleLink from './AwsConsoleLink.jsx';
import { DataModelSlide, IntegrationSlide, SqlBuildSlide } from './BuildEvidence.jsx';
import { CloudEvidenceLauncher } from './CloudEvidence.jsx';
import { CurrentErdLauncher } from './CurrentErd.jsx';
import { ArchitectureWalkthrough, VerificationSummary } from './PresentationPolish.jsx';
import { FlowArrow, IconBadge, VisualIcon, iconForLabel } from './VisualIcons.jsx';
import { analystWireframeSource } from '../data/references.js';
import { ProjectContribution, LearningOutcomes } from './Refinement.jsx';
import { EmailEvidenceLauncher } from './EmailEvidence.jsx';

function PageMarker({ slide, number, total, appendixTotal, logoSrc }) {
  const appendixNumber = slide.appendix?.slice(1).padStart(2, '0');
  const page = slide.appendix ? `A${appendixNumber} / ${String(appendixTotal).padStart(2, '0')}` : `${String(number).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <>
      {slide.type !== 'cover' && slide.type !== 'closing' && (
        <div className="slide-brand-head">
          <img src={logoSrc} alt="" />
          <strong>IMBOKODO BANK</strong>
          <span aria-hidden="true">|</span>
          <span>IMBOKODO RISK AND COMPLIANCE WORKBENCH</span>
        </div>
      )}
      <span className="slide-page-number">{page}</span>
      {slide.type !== 'cover' && slide.type !== 'closing' && <footer className="source-slide-footer"><span>Nompilo Eugenia Mchunu | Cloud Learner</span><span>Imbokodo Bank Capstone</span></footer>}
    </>
  );
}

function SlideHeader({ slide }) {
  if (slide.type === 'cover' || slide.type === 'closing') return null;

  return (
    <header className="slide-heading">
      <div>
        <p className="slide-title">{slide.title}</p>
        {slide.subtitle && <p className="slide-subtitle">{slide.subtitle}</p>}
      </div>
      {slide.badge && <span className="slide-badge">{slide.badge}</span>}
    </header>
  );
}

function CardGrid(props) {
  return <EvidenceGrid {...props} />;
}

function ProcessRow(props) {
  return <EvidenceFlow {...props} />;
}

function ThreeColumns({ columns }) {
  return (
    <div className="three-columns">
      {columns.map((column) => (
        <article className="column-card" key={column.title}>
          <h3>{column.title}</h3>
          {column.body && <p>{column.body}</p>}
          {column.items && (
            <ul>
              {column.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
          {column.sources?.map((source) => (
            <div className="inline-source" key={source.id}>
              <span>Source: {source.displayName}</span>
              <a href={source.url} target="_blank" rel="noopener noreferrer">View source ↗</a>
            </div>
          ))}
        </article>
      ))}
    </div>
  );
}

function ProblemCard({ column, onSelect }) {
  return (
    <button className="column-card problem-card" type="button" onClick={onSelect}>
      <span className="problem-card__title"><VisualIcon name={column.icon || 'alert'} />{column.title}</span>
      <span className="problem-card__summary">{column.summary}</span>
      {column.items && (
        <ul>{column.items.map((item) => <li key={item}>{item}</li>)}</ul>
      )}
      <span className="problem-card__action">Explore this topic <span aria-hidden="true">↗</span></span>
    </button>
  );
}

function SourceLink({ source, label = 'Open source' }) {
  return <a className="source-link" href={source.url} target="_blank" rel="noopener noreferrer">{label} ↗</a>;
}

function DetailDialog({ title, kicker, onClose, children, className = '' }) {
  return <FullScreenDetailDialog title={title} kicker={kicker} onClose={onClose} className={className}>{children}</FullScreenDetailDialog>;
}

function PromiseQuestions({ slide, assetBase, active }) {
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const triggerRef = useRef(null);
  const restoreFocusRef = useRef(false);
  const closeScreen = useCallback(() => {
    restoreFocusRef.current = true;
    setSelectedScreen(null);
  }, []);

  useLayoutEffect(() => {
    if (active) return;
    setSelectedScreen(null);
    restoreFocusRef.current = false;
  }, [active]);

  useLayoutEffect(() => {
    if (selectedScreen || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    triggerRef.current?.focus({ preventScroll: true });
  }, [selectedScreen]);

  return (
    <>
      <div className="investigation-story">
        <div className="investigation-stages" role="group" aria-label="Explore the investigation journey">
        {slide.questions.map((question, index) => {
          return (
            <button
              aria-pressed={selectedStep === index}
              key={question}
              onClick={() => setSelectedStep(index)}
              type="button"
            >
              <span>0{index + 1}</span><strong>{question}</strong>
            </button>
          );
        })}
        </div>
        <div className="investigation-focus">
          <article aria-live="polite"><span>ADDED BEYOND THE BRIEF</span><h2>{['Work has an owner.', 'The reasons stay connected.', 'The decision is recorded.'][selectedStep]}</h2><p>{slide.benefits[selectedStep]}</p><p>{slide.screens[selectedStep].addition}</p><small>Original application captures show the stages of the workflow.</small></article>
          <button className="investigation-screenshot" type="button" onClick={(event) => { triggerRef.current = event.currentTarget; setSelectedScreen({ ...slide.screens[selectedStep], question: slide.questions[selectedStep] }); }}><img src={`${assetBase}${slide.screens[selectedStep].src}`} alt={slide.screens[selectedStep].alt} /><span>Inspect the {['review queue', 'supporting evidence', 'investigation actions'][selectedStep]} ↗</span></button>
        </div>
      </div>
      <p className="decision-note">{slide.takeaway}</p>
      {selectedScreen && (
        <DetailDialog
          className="screen-detail-dialog"
          kicker="IMBOKODO WORKBENCH · APPLICATION SCREEN"
          onClose={closeScreen}
          title={selectedScreen.question}
        >
          <figure className="screen-detail-figure">
            <img alt={selectedScreen.alt} src={`${assetBase}${selectedScreen.src}`} />
            <figcaption>{selectedScreen.caption}</figcaption>
          </figure>
          <div className="difference-detail"><p><strong>In the brief:</strong> {selectedScreen.brief}</p><p><strong>Added in the Workbench:</strong> {selectedScreen.addition}</p></div>
        </DetailDialog>
      )}
    </>
  );
}

function RiskScoring({ slide, active, assetBase }) {
  const [showExample, setShowExample] = useState(false);
  const triggerRef = useRef(null);
  const restoreFocusRef = useRef(false);
  const closeExample = useCallback(() => {
    restoreFocusRef.current = true;
    setShowExample(false);
  }, []);

  useLayoutEffect(() => {
    if (active) return;
    setShowExample(false);
    restoreFocusRef.current = false;
  }, [active]);

  useLayoutEffect(() => {
    if (showExample || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    triggerRef.current?.focus({ preventScroll: true });
  }, [showExample]);

  return (
    <>
      <div className="appendix-content">
        <div className="appendix-table">
          {slide.rows.map(([label, detail]) => label === 'Example' ? (
            <button
              aria-haspopup="dialog"
              className="appendix-row appendix-row--interactive"
              key={label}
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setShowExample(true);
              }}
              type="button"
            >
              <strong>{label}</strong><span>{detail}</span><span className="appendix-row__action">View score breakdown ↗</span>
            </button>
          ) : (
            <div className="appendix-row" key={label}><strong>{label}</strong><span>{detail}</span></div>
          ))}
        </div>
      </div>
      {showExample && (
        <DetailDialog
          className="risk-example-dialog"
          kicker="ILLUSTRATIVE EXAMPLE · DETERMINISTIC RULES"
          onClose={closeExample}
          title="How this risk score is explained"
        >
          <p>This configured example shows how the two selected signals contribute to a prioritisation score. It is not a fraud probability or a regulatory score.</p>
          <RiskExplorer assetBase={assetBase} initialAmount="200000.01" initialCrossBorder />
          <p className="risk-example-note">The score makes the contributing rules visible so an Analyst can review the evidence and make the decision.</p>
        </DetailDialog>
      )}
    </>
  );
}

function InteractiveGallery({ slide, assetBase, active }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const triggerRef = useRef(null);
  const restoreFocusRef = useRef(false);
  const closeImage = useCallback(() => {
    restoreFocusRef.current = true;
    setSelectedImage(null);
  }, []);

  useLayoutEffect(() => {
    if (active) return;
    setSelectedImage(null);
    restoreFocusRef.current = false;
  }, [active]);

  useLayoutEffect(() => {
    if (selectedImage || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    triggerRef.current?.focus({ preventScroll: true });
  }, [selectedImage]);

  return (
    <>
      <div className="evidence-gallery">
        {slide.images.map((image) => (
          <button
            aria-label={`View larger image: ${image.caption}`}
            className="evidence-gallery__button"
            key={image.src}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setSelectedImage(image);
            }}
            type="button"
          >
            <img alt={image.caption} src={`${assetBase}${image.src}`} />
            <span>{image.caption}</span>
            <small>View larger ↗</small>
          </button>
        ))}
      </div>
      {selectedImage && (
        <DetailDialog
          className="screen-detail-dialog"
          kicker="IMBOKODO WORKBENCH · PROJECT EVIDENCE"
          onClose={closeImage}
          title={selectedImage.caption}
        >
          <figure className="screen-detail-figure screen-detail-figure--gallery">
            <img alt={selectedImage.caption} src={`${assetBase}${selectedImage.src}`} />
            <figcaption>{selectedImage.caption}</figcaption>
          </figure>
        </DetailDialog>
      )}
    </>
  );
}

function ActivityDiagramEvidence({ slide, assetBase, active }) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(80);
  const triggerRef = useRef(null);
  const restoreFocusRef = useRef(false);
  const closeDiagram = useCallback(() => {
    restoreFocusRef.current = true;
    setIsOpen(false);
  }, []);

  useLayoutEffect(() => {
    if (active) return;
    setIsOpen(false);
    restoreFocusRef.current = false;
  }, [active]);

  useLayoutEffect(() => {
    if (isOpen || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    triggerRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  return (
    <>
      <>
        <div className="activity-evidence-heading">
          <span>PROJECT EVIDENCE</span>
          <h3>Activity Diagram</h3>
        </div>
        <button
          aria-haspopup="dialog"
          className="activity-diagram-preview"
          onClick={(event) => {
            triggerRef.current = event.currentTarget;
            setZoom(80);
            setIsOpen(true);
          }}
          type="button"
        >
          <img alt="Preview of the transaction admission, risk and reconciliation activity diagram" src={`${assetBase}${slide.diagram}`} />
          <span>Click to view diagram <span aria-hidden="true">↗</span></span>
        </button>
        <p>{slide.proof}</p>
      </>
      {isOpen && (
        <DetailDialog
          className="activity-diagram-dialog"
          kicker="PROJECT EVIDENCE · BUSINESS ANALYSIS"
          onClose={closeDiagram}
          title="Activity Diagram"
        >
          <div className="activity-diagram-tools" aria-label="Diagram zoom controls">
            <span>Diagram zoom</span>
            <button aria-label="Zoom out" disabled={zoom <= 55} onClick={() => setZoom((current) => Math.max(55, current - 15))} type="button">−</button>
            <output aria-live="polite">{zoom}%</output>
            <button aria-label="Zoom in" disabled={zoom >= 160} onClick={() => setZoom((current) => Math.min(160, current + 15))} type="button">+</button>
            <button className="activity-diagram-reset" onClick={() => setZoom(80)} type="button">Fit</button>
          </div>
          <div className="activity-diagram-viewport">
            <img
              alt="Activity Diagram tracing file validation, duplicate handling, quarantine, scoring, analyst visibility and batch outcomes"
              src={`${assetBase}${slide.diagram}`}
              style={{ width: `${zoom}%` }}
            />
          </div>
          <p className="activity-diagram-caption">{slide.proof}</p>
        </DetailDialog>
      )}
    </>
  );
}

function ProblemContext({ slide, active, assetBase }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const triggerRef = useRef(null);
  const restoreFocusRef = useRef(false);

  const closeDetails = useCallback(() => {
    restoreFocusRef.current = true;
    setSelectedCard(null);
  }, []);

  useLayoutEffect(() => {
    if (active) return;
    setSelectedCard(null);
    restoreFocusRef.current = false;
  }, [active]);

  useEffect(() => {
    if (!selectedCard) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && event.target instanceof Element && event.target.closest('.problem-detail-dialog')) {
        event.stopPropagation();
        closeDetails();
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [closeDetails, selectedCard]);

  useLayoutEffect(() => {
    if (selectedCard || !restoreFocusRef.current) return;
    restoreFocusRef.current = false;
    triggerRef.current?.focus({ preventScroll: true });
  }, [selectedCard]);

  return (
    <>
      <section className="regulatory-grounding" aria-label="Prudential Authority research statement">
        <div><strong>SOUTH AFRICAN PRUDENTIAL AUTHORITY</strong><p>{slide.researchStatement}</p></div>
        <SourceLink source={slide.contextSource} label="Read the PA statement" />
      </section>
      <section className="problem-context" aria-label="Imbokodo Bank analyst challenges">
        <p>{slide.intro}</p>
      </section>
      <div className="three-columns problem-columns">
        {slide.columns.map((column) => (
          <ProblemCard
            column={column}
            key={column.title}
            onSelect={(event) => {
              triggerRef.current = event.currentTarget;
              setSelectedCard(column);
            }}
          />
        ))}
      </div>
      <p className="slide-takeaway">{slide.takeaway}</p>
      {selectedCard && (
        <DetailDialog title={selectedCard.detailTitle} kicker="IMBOKODO BANK · SCENARIO & EVIDENCE" onClose={closeDetails}>
          <>
              {selectedCard.businessProblem ? <div className="business-problem-evidence business-problem-evidence--bank"><section className="business-research-lead"><h3>The Prudential Authority statement</h3><p>{selectedCard.detail}</p>{selectedCard.sources?.[0] && <SourceLink source={selectedCard.sources[0]} label="Read the PA statement" />}</section><section><h3>At Imbokodo Bank, these are the Analyst challenges</h3><p>{selectedCard.businessProblem}</p><ul className="bank-challenge-list">{selectedCard.detailItems.map((item) => <li key={item}>{item}</li>)}</ul><a className="business-brief-source" href={`${import.meta.env.BASE_URL}resources/project-plan.pdf#page=1`} target="_blank" rel="noopener noreferrer">Project brief · Business Problem (§2) ↗</a></section><section className="business-problem-response"><h3>How the Workbench helps</h3><p>{selectedCard.projectResponse}</p><ul className="bank-response-list">{selectedCard.responseItems.map((item) => <li key={item}>{item}</li>)}</ul></section></div> : <p>{selectedCard.detail}</p>}
              {selectedCard.detailItems && !selectedCard.businessProblem && (
                <ul>{selectedCard.detailItems.map((item) => <li key={item}>{item}</li>)}</ul>
              )}
              {selectedCard.sources?.map((source) => (
                <div className="problem-detail-source" key={source.id}>
                  <span>Source: {source.displayName}</span>
                  <SourceLink source={source} label="View source" />
                </div>
              ))}
              <p className="problem-detail-footnote">The Prudential Authority source supports the banking context. The Workbench is a capstone solution for the Imbokodo Bank scenario.</p>
          </>
        </DetailDialog>
      )}
    </>
  );
}

function BusinessAnalysisEvidence({ slide, assetBase, active }) {
  const [selected, setSelected] = useState('wireframe');
  const resourceBase = `${import.meta.env.BASE_URL}resources/`;
  const diagrams = [
    { id: 'use-case', label: 'Use Case', title: 'Use Case Diagram', src: 'fintrust-use-case.png', base: resourceBase, alt: 'Imbokodo Risk and Compliance Workbench Use Case Diagram', caption: 'My Use Case Diagram maps the Analyst, Administrator, Auditor and Maintainer roles.', description: 'Who does what: investigate, manage access, read audit records or recover failed work.' },
    { id: 'activity', label: 'Activity', title: 'Activity Diagram', src: slide.diagram, base: assetBase, alt: 'Activity Diagram', caption: slide.proof, description: slide.proof },
    { id: 'wireframe', label: 'Wireframe', title: 'Analyst Investigation Wireframe', src: 'analyst-wireframe.png', base: resourceBase, alt: 'My Figma Analyst Investigation wireframe', caption: 'My Figma wireframe shows the investigation layout and actions.', description: 'Transaction details, risk reasons, notes and history support investigation in one place.', source: analystWireframeSource }
  ];
  const current = diagrams.find((diagram) => diagram.id === selected);
  const handleTabKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    const offset = event.key === 'ArrowLeft' ? -1 : 1;
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? diagrams.length - 1 : (diagrams.findIndex((diagram) => diagram.id === selected) + offset + diagrams.length) % diagrams.length;
    setSelected(diagrams[index].id);
    event.currentTarget.querySelector(`#${diagrams[index].id}-tab`)?.focus();
  };
  return <>
    <div className="activity-evidence-heading"><span>PROJECT EVIDENCE</span><h3>{current.title}</h3></div>
    <div className="analysis-evidence-tabs" role="tablist" aria-label="Business Analysis diagrams" onKeyDown={handleTabKeyDown}>
      {diagrams.map((diagram) => <button key={diagram.id} type="button" role="tab" id={`${diagram.id}-tab`} aria-controls="analysis-diagram-panel" aria-selected={selected === diagram.id} tabIndex={selected === diagram.id ? 0 : -1} onClick={() => setSelected(diagram.id)}>{diagram.label}</button>)}
    </div>
    <div className="analysis-diagram-panel" id="analysis-diagram-panel" role="tabpanel" aria-labelledby={`${selected}-tab`}>
      <EvidenceImage key={current.id} src={current.src} alt={current.alt} caption={current.caption} label={`Expand ${current.title}`} className="activity-source-image" assetBase={current.base} active={active} sourceUrl={current.source?.url} sourceLabel={current.source?.label} />
    </div>
    <p>{current.description}</p>
    {selected === 'use-case' && <div className="use-case-document-links"><a href={`${resourceBase}fintrust-use-case.pdf`} target="_blank" rel="noopener noreferrer">View original PDF ↗</a><a href={`${resourceBase}fintrust-use-case.pdf`} download>Download PDF ↓</a></div>}
    {current.source && <div className="use-case-document-links"><a href={current.source.url} target="_blank" rel="noopener noreferrer">{current.source.label} ↗</a></div>}
  </>;
}

function References({ slide }) {
  return (
    <div className="references-layout">
      <div className="references-grid">
        {slide.sources.map((source, index) => (
          <article className="reference-card" key={source.id}>
            <span className="reference-card__number">{String(index + 1).padStart(2, '0')}</span>
            <p className="reference-card__organisation">{source.organisation} · {source.division}</p>
            <h2>{source.displayName}</h2>
            <p className="reference-card__topic">{source.topic}</p>
            <h3>USED TO SUPPORT</h3>
            <ul>{source.supports.map((item) => <li key={item}>{item}</li>)}</ul>
            <SourceLink source={source} />
          </article>
        ))}
      </div>
      <p className="references-note">{slide.note}</p>
    </div>
  );
}

function ProfilePortrait({ src }) {
  const [available, setAvailable] = useState(true);

  return (
    <div className="profile-card" aria-label={available ? 'My portrait' : 'My initials'}>
      {available ? (
        <img className="profile-photo" src={src} alt="Nompilo Eugenia Mchunu" onError={() => setAvailable(false)} />
      ) : (
        <>
          <div className="profile-monogram">NM</div>
          <span>Nompilo Eugenia Mchunu</span>
        </>
      )}
    </div>
  );
}

function ArchitectureDiagram({ flows }) {
  const primary = flows.slice(0, 6);
  const secondary = flows.slice(6);
  return (
    <div className="architecture-visual" aria-label="Imbokodo Workbench AWS architecture flow">
      <div className="architecture-path">
        {primary.map((node, index) => (
          <div className="architecture-unit" key={node.label}>
            <article className={`architecture-node architecture-node--${node.category}`}>
              <span>{node.category}</span>
              <h3>{node.label}</h3>
              <p>{node.detail}</p>
            </article>
            {index < primary.length - 1 && <span className="architecture-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <div className="architecture-secondary">
        {secondary.map((node) => (
          <article className={`architecture-node architecture-node--${node.category}`} key={node.label}>
            <span>{node.category}</span>
            <h3>{node.label}</h3>
            <p>{node.detail}</p>
          </article>
        ))}
        <article className="architecture-node architecture-node--control">
          <span>cross-cutting controls</span>
          <h3>IAM · KMS · CloudWatch</h3>
          <p>Security and operational evidence</p>
        </article>
      </div>
    </div>
  );
}

function SlideBody({ slide, logoSrc, profileSrc, assetBase, onNavigate, qaItems, active }) {
  switch (slide.type) {
    case 'cover':
      return (
        <div className="cover-content">
          <div className="cover-brand">
            <img src={logoSrc} alt="" />
            <div><span>{slide.title}</span><strong>{slide.subtitle}</strong></div>
          </div>
          <div className="cover-title-block">
            <p className="cover-kicker">{slide.strapline}</p>
            <h1><span>Transaction Insights, Risk</span><span>Monitoring</span><span>and Analyst Investigation</span></h1>
          </div>
          <div className="cover-bank-mark"><img src={logoSrc} alt="Imbokodo Bank emblem" /><p>From a flagged transaction<br /><strong>to a decision that can be explained.</strong></p></div>
          <div className="cover-footer">
            <p>{slide.presenter}</p>
            <strong>{slide.motto}</strong>
            <nav className="cover-story-path" aria-label="Jump to a presentation chapter">
              {[
                ['WHY', 'scenario'],
                ['WHAT', 'assignment'],
                ['HOW', 'solution-design'],
                ['SHOW', 'solution-difference'],
                ['LEARN', 'lessons'],
                ['SCALE', 'roadmap'],
                ['CLOSE', 'closing']
              ].map(([label, id], index, steps) => (
                <span className="cover-story-path__step" key={id}>
                  <button type="button" onClick={() => onNavigate(id)}>{label}</button>
                  {index < steps.length - 1 && <span aria-hidden="true">→</span>}
                </span>
              ))}
            </nav>
          </div>
        </div>
      );
    case 'closing':
      return (
        <div className="closing-content">
          <div className="cover-brand">
            <img src={logoSrc} alt="" />
            <div><span>{slide.title}</span><strong>{slide.subtitle}</strong></div>
          </div>
          <p className="closing-product">IMBOKODO BANK CAPSTONE</p>
          <h1>{slide.headline.split('\\n').map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="closing-summary">{slide.summary}</p>
          <details className="closing-qa" aria-label="Q and A launchpad">
            <summary>Questions · explore topics</summary>
            <div>{qaItems.map(([label, id]) => (
              <button key={`${label}-${id}`} type="button" onClick={() => onNavigate(id)}>{label}</button>
            ))}</div>
          </details>
          <div className="closing-footer">
            <p>{slide.presenter}</p>
            <strong>{slide.cta}</strong>
          </div>
        </div>
      );
    case 'profile':
      return (
        <div className="profile-layout">
          <ProfilePortrait src={profileSrc} />
          <div className="profile-details">
            <h2>{slide.name}</h2>
            <p className="profile-role">{slide.role}</p>
            <p className="profile-motto">{slide.motto}</p>
            <p className="profile-copy">{slide.intro}</p>
            <p className="profile-copy">{slide.context}</p>
            <div className="profile-facts">
              {slide.cards.map((card) => (
                <article className="profile-fact" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      );
    case 'three-columns':
      return (
        <>
          <p className="slide-lead">{slide.intro}</p>
          <ThreeColumns columns={slide.columns} />
          <p className="slide-takeaway">{slide.takeaway}</p>
        </>
      );
    case 'problem':
      return <ProblemContext slide={slide} active={active} assetBase={assetBase} />;
    case 'capabilities':
      return (
        <>
          <CardGrid cards={slide.cards} className="six-card-grid" variant="capability" assetBase={assetBase} active={active} onNavigate={onNavigate} />
          <div className="scope-note">
            <h3>{slide.noteTitle}</h3>
            <p>{slide.note}</p>
          </div>
        </>
      );
    case 'discipline-grid':
      return <ProjectContribution slide={slide} active={active} assetBase={assetBase} />;
    case 'analysis':
      return (
        <div className="analysis-layout">
          <article className="analysis-panel">
            <h3>{slide.leadTitle}</h3>
            <ul>{slide.items.map((item) => <li key={item}>{item}</li>)}</ul>
            <TechnicalLauncher topic="wireframe" label="Wireframe → working screen" className="technical-inline" active={active} assetBase={assetBase} />
          </article>
          <aside className={`proof-panel${slide.id === 'business-analysis' ? ' proof-panel--activity' : ''}`}>
            {slide.id === 'business-analysis'
              ? <BusinessAnalysisEvidence slide={slide} assetBase={assetBase} active={active} />
              : <><span>PROJECT EVIDENCE</span><p>{slide.proof}</p></>}
          </aside>
        </div>
      );
    case 'process':
    case 'delivery':
      return (
        <>
          {slide.type === 'delivery' && <p className="sdlc-introduction">Cloud provides the platform. SDLC provides the delivery process.</p>}
          <ProcessRow steps={slide.steps} className={slide.type === 'delivery' ? 'process-row--six' : ''} active={active} assetBase={assetBase} />
          {slide.id === 'solution-design' && <>
            <svg className="solution-alert-connector" viewBox="0 0 1920 60" aria-hidden="true"><path d="M1085 0 V25 H650 V42" /><path d="M643 34 L650 42 L657 34" /></svg>
            <TechnicalLauncher topic="alerts" accessibleLabel="Explore the independent HIGH-risk alert and delivery-failure flow" className="solution-alert-branch" active={active} label={<span className="solution-alert-content">
              <span className="solution-alert-label"><VisualIcon name="bell" />HIGH risk only · independent notification path</span>
              <span className="solution-alert-nodes"><span>HIGH risk · DynamoDB Streams</span><span aria-hidden="true">→</span><span>Alert Lambda</span><span aria-hidden="true">→</span><span>SES notification</span><span aria-hidden="true">→</span><span>Analyst / Risk team</span></span>
              <span className="solution-alert-failure">Delivery failure → Alert failure queue / DLQ → CloudWatch / Maintainer</span>
              <span className="solution-alert-truth">The saved risk record is the source of truth. The Analyst investigates and decides.</span>
            </span>} />
          </>}
          {slide.type === 'process' && <div className="technical-process-links"><TechnicalLauncher topic="journey" label="Frontend → API → SQL" active={active} /><TechnicalLauncher topic="functions" label="Explore Lambda functions" active={active} /><AwsConsoleLink compact /><TechnicalLauncher topic="sql" label="SQL source & ERD" active={active} /></div>}
          <p className="slide-takeaway">{slide.takeaway}</p>
        </>
      );
    case 'architecture':
      return (
        <>
          <ArchitectureWalkthrough active={active} assetBase={assetBase} details={slide.details} region={slide.region} />
          <TechnicalLauncher topic="alerts" label="HIGH risk → DynamoDB Streams → Alert Lambda → SES · Stored records remain the audit trail" className="technical-main-strip" active={active} />
          <AwsConsoleLink compact className="architecture-console-entry" />
        </>
      );
    case 'foundations':
      return (
        <>
          <CardGrid cards={slide.cards} className="four-card-grid" variant="foundation" assetBase={assetBase} active={active} onNavigate={onNavigate} />
          <p className="slide-takeaway">{slide.takeaway}</p>
        </>
      );
    case 'questions':
      return <><PromiseQuestions slide={slide} assetBase={assetBase} active={active} /><button type="button" className="technical-launch technical-demo-entry" onClick={() => onNavigate('appendix-live-demo')}>LIVE SYSTEM DEMONSTRATION ↗</button><CloudEvidenceLauncher active={active} className="question-cloud-results" /></>;
    case 'recovery':
      return (
        <>
          <div className="source-recovery-evidence">
            <EvidenceImage src="image-11-1.png" alt="Quarantine reason and source lineage" caption="An invalid account identifier and the available recovery actions." assetBase={assetBase} active={active} label="Inspect the quarantined row" />
            <EvidenceImage src="image-11-2.png" alt="Quarantine correction and audit history" caption="The original values, correction history and recorded quarantine event." assetBase={assetBase} active={active} label="Inspect recovery evidence" />
          </div>
          <ProcessRow steps={slide.steps} className="process-row--recovery" active={active} assetBase={assetBase} />
          <p className="slide-takeaway">{slide.takeaway}</p>
        </>
      );
    case 'testing':
      return (
        <>
          <CardGrid cards={slide.cards} className="six-card-grid" variant="testing" assetBase={assetBase} active={active} onNavigate={onNavigate} />
          <VerificationSummary values={slide.timeline} active={active} />
          <p className="slide-takeaway">{slide.takeaway}</p>
        </>
      );
    case 'security':
      return (
        <>
          <CardGrid cards={slide.cards} className="four-card-grid" variant="security" assetBase={assetBase} active={active} onNavigate={onNavigate} />
          <p className="slide-takeaway">{slide.takeaway}</p>
        </>
      );
    case 'finops':
      return (
        <div className="finops-layout">
          <div className="budget-figure"><IconBadge name="cost" /><strong>{slide.budget}</strong><span>{slide.budgetLabel}</span></div>
          <div className="finops-content">
            <div className="budget-alerts"><span>Budget alerts</span>{slide.alerts.map((alert) => <strong key={alert}>{alert}</strong>)}</div>
            <article className="finops-decisions">
              <h3>Cost decisions</h3>
              <ul>{slide.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
            </article>
            <EmailEvidenceLauncher topic="budget" label="View budget warning emails" active={active} />
            <p className="slide-takeaway">{slide.takeaway}</p>
          </div>
        </div>
      );
    case 'well-architected':
      return (
        <>
          <TechnicalLauncher topic="resources" label="Review, SOP & project plan" className="technical-resource-entry" active={active} /><CloudEvidenceLauncher mode="governance" label="Data governance & risks" className="governance-entry" active={active} />
          <div className="pillar-grid">
            {slide.pillars.map((pillar) => (
              <article className={`pillar-card${pillar.reviewed ? ' pillar-card--reviewed' : ''}`} key={pillar.title}>
                <IconBadge name={iconForLabel(pillar.title)} />
                <h3>{pillar.title}</h3><p>{pillar.body}</p><small>{pillar.reviewed ? '11 / 11 questions reviewed' : 'Design focus for the next review'}</small>
              </article>
            ))}
          </div>
          <p className="slide-takeaway">{slide.takeaway}</p>
        </>
      );
    case 'lessons':
      return (
        <>
          <div className="lesson-list">
            {slide.cards.map((card, index) => (
              <article className="lesson-row" key={card.title}>
                <span className="lesson-number">0{index + 1}</span>
                <div><h3>{card.title}</h3><p><strong>Challenge:</strong> {card.challenge}</p></div>
                <p><strong>Decision:</strong> {card.learning}<span className="lesson-outcome"><strong>Outcome:</strong> {card.outcome}</span></p>
              </article>
            ))}
          </div>
          <EmailEvidenceLauncher topic="support" label="View AWS support acknowledgement" active={active} />
          <p className="slide-takeaway">{slide.takeaway}</p>
        </>
      );
    case 'skills':
      return <LearningOutcomes slide={slide} active={active} />;
    case 'roadmap':
      return (
        <>
          <div className="roadmap-grid">
            {slide.horizons.map((horizon, index) => (
              <article className={`roadmap-card roadmap-card--${index}`} key={horizon.title}>
                <IconBadge name={['check', 'clock', 'grow'][index]} />
                <span>0{index + 1}</span><h2>{horizon.title}</h2>
                <ul>{horizon.items.map((item) => <li key={item}>{item}</li>)}</ul>
                {index < slide.horizons.length - 1 && <FlowArrow />}
              </article>
            ))}
          </div>
          <p className="slide-takeaway">{slide.takeaway}</p>
        </>
      );
    case 'appendix':
    case undefined:
      if (slide.id === 'appendix-risk') return <RiskScoring slide={slide} active={active} assetBase={assetBase} />;
      return (
        <div className="appendix-content">
          <div className="appendix-table">
            {slide.rows.map(([label, detail]) => (
              <div className="appendix-row" key={label}><strong>{label}</strong><span>{detail}</span></div>
            ))}
          </div>
          {slide.id === 'appendix-data-model' && <CurrentErdLauncher active={active} className="appendix-current-erd" label="Open full ERD, columns and keys" />}
        </div>
      );
    case 'data-model-evidence':
      return <DataModelSlide active={active} assetBase={assetBase} onNavigate={onNavigate} />;
    case 'sql-build-evidence':
      return <SqlBuildSlide active={active} assetBase={assetBase} onNavigate={onNavigate} />;
    case 'integration-evidence':
      return <IntegrationSlide active={active} assetBase={assetBase} onNavigate={onNavigate} />;
    case 'technical-hub':
      return <TechnicalHub active={active} assetBase={assetBase} />;
    case 'live-demo':
      return <LiveDemoSlide active={active} onNavigate={onNavigate} />;
    case 'gallery':
      return <InteractiveGallery slide={slide} assetBase={assetBase} active={active} />;
    case 'references':
      return <References slide={slide} />;
    default:
      return null;
  }
}

export default function SlideView({ slide, number, total, appendixTotal, logoSrc, profileSrc, assetBase, scale, active, mode, onNavigate, qaItems }) {
  return (
    <div
      className={`slide-stage slide-stage--${mode}${active ? ' is-active' : ''}`}
      data-slide-id={slide.id}
      style={{ '--slide-scale': scale }}
    >
      <article
        className={`slide-canvas slide-canvas--${slide.type}`}
        style={{ transform: `scale(${scale})` }}
        aria-label={`${slide.appendix ? `Appendix ${slide.appendix}` : `Slide ${number} of ${total}`}: ${slide.title}`}
        aria-hidden={!active && mode === 'present'}
      >
        <PageMarker slide={slide} number={number} total={total} appendixTotal={appendixTotal} logoSrc={logoSrc} />
        <div className="slide-safe-area">
          <SlideHeader slide={slide} />
          <SlideBody slide={slide} logoSrc={logoSrc} profileSrc={profileSrc} assetBase={assetBase} onNavigate={onNavigate} qaItems={qaItems} active={active} />
        </div>
      </article>
    </div>
  );
}
