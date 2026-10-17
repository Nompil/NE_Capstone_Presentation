import { useEffect, useState } from 'react';
import { DetailDialog } from './Evidence.jsx';

function SupportingDetails({ slide, active, label }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!active) setOpen(false); }, [active]);
  return <><button type="button" className="technical-launch editorial-details" onClick={() => setOpen(true)}>{label} ↗</button>{open && <DetailDialog title={slide.title} kicker="PROJECT EXPERIENCE" onClose={() => setOpen(false)}><div className="editorial-detail-list">{slide.cards.map((card) => <article key={card.title}><h3>{card.title}</h3><p>{card.body}</p></article>)}</div></DetailDialog>}</>;
}

export function ProjectContribution({ slide, active }) {
  return <section className="contribution-layout"><div className="editorial-statement"><span>ONE CONNECTED RESPONSIBILITY</span><h2>Understand the need.<br />Build the flow.<br /><em>Prove the outcome.</em></h2><p>The work followed the Analyst’s journey, from the original transaction file to the investigation record.</p></div><ol className="contribution-list"><li><strong>Define the problem</strong><p>Requirements, user roles, scope and wireframes.</p></li><li><strong>Connect the system</strong><p>Data model, Python rules, APIs and the Workbench.</p></li><li><strong>Deliver with control</strong><p>Tests, security, recovery, cost choices and documentation.</p></li></ol><SupportingDetails slide={slide} active={active} label="Explore all project responsibilities" /></section>;
}

export function LearningOutcomes({ slide, active }) {
  return <section className="learning-layout"><h2>Connecting the parts changed<br />how the solution was built.</h2><div className="learning-outcomes"><article><span>01</span><h3>Start with the user</h3><p>A risk score needs reasons and a clear next action before an Analyst can use it.</p></article><article><span>02</span><h3>Design for failure</h3><p>Bad rows, retries and repeated uploads need their own controlled paths.</p></article><article><span>03</span><h3>Explain each choice</h3><p>Service selection has to account for cost, security and the records the bank needs.</p></article></div><SupportingDetails slide={slide} active={active} label="View the full skills record" /></section>;
}
