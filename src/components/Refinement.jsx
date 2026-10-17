import { useEffect, useRef, useState } from 'react';
import { DetailDialog, EvidenceGrid } from './Evidence.jsx';

function ProjectRolesDiagram({ slide, active }) {
  const frameRef = useRef(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;
    const observer = new ResizeObserver(() => setScale(Math.min(1, frame.clientWidth / 1920)));
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);
  return <div className="project-role-diagram" ref={frameRef} style={{ height: `${730 * scale}px` }} aria-label="Cloud Learner connected to eight project responsibilities"><div className="project-role-diagram__canvas" style={{ transform: `scale(${scale})` }}><svg className="project-role-diagram__connections" viewBox="0 0 1920 730" aria-hidden="true"><path d="M960 355 L340 255 M960 355 L340 455 M960 355 L1580 255 M960 355 L1580 455 M960 355 L640 75 M960 355 L640 615 M960 355 L1280 75 M960 355 L1280 615" /></svg><EvidenceGrid cards={slide.cards} variant="discipline" active={active} /></div></div>;
}

function SupportingDetails({ slide, active, label }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!active) setOpen(false); }, [active]);
  return <><button type="button" className="technical-launch editorial-details" onClick={() => setOpen(true)}>{label} ↗</button>{open && <DetailDialog title={slide.title} kicker="PROJECT EXPERIENCE" onClose={() => setOpen(false)}>{slide.id === 'disciplines' ? <ProjectRolesDiagram slide={slide} active={active} /> : <div className="editorial-detail-list">{slide.cards.map((card) => <article key={card.title}><h3>{card.title}</h3><p>{card.body}</p></article>)}</div>}</DetailDialog>}</>;
}

export function ProjectContribution({ slide, active }) {
  return <section className="contribution-layout"><div className="editorial-statement"><span>ONE CONNECTED RESPONSIBILITY</span><h2>Understand the need.<br />Build the flow.<br /><em>Prove the outcome.</em></h2><p>The work followed the Analyst’s journey, from the original transaction file to the investigation record.</p></div><ol className="contribution-list"><li><strong>Define the problem</strong><p>Requirements, user roles, scope and wireframes.</p></li><li><strong>Connect the system</strong><p>Data model, Python rules, APIs and the Workbench.</p></li><li><strong>Deliver with control</strong><p>Tests, security, recovery, cost choices and documentation.</p></li></ol><SupportingDetails slide={slide} active={active} label="Explore all project responsibilities" /></section>;
}

export function LearningOutcomes({ slide, active }) {
  return <section className="learning-layout"><h2>Connecting the parts changed<br />how the solution was built.</h2><div className="learning-outcomes"><article><span>01</span><h3>Start with the user</h3><p>A risk score needs reasons and a clear next action before an Analyst can use it.</p></article><article><span>02</span><h3>Design for failure</h3><p>Bad rows, retries and repeated uploads need their own controlled paths.</p></article><article><span>03</span><h3>Explain each choice</h3><p>Service selection has to account for cost, security and the records the bank needs.</p></article></div><SupportingDetails slide={slide} active={active} label="View the full skills record" /></section>;
}
