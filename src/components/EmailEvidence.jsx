import { useCallback, useEffect, useState } from 'react';
import { DetailDialog, EvidenceImage } from './Evidence.jsx';

const evidence = {
  budget: {
    title: 'Budget warnings reached my inbox',
    summary: 'AWS Budgets sent warning emails when the monthly forecast exceeded the US$10 project target.',
    meaning: 'The two emails show forecasts of US$10.29 and US$12.53. They confirm that budget notifications reached my inbox. Forecasts are estimates, not actual charges, and a budget alert does not stop spending.',
    images: [
      ['budget-forecast-10-29.png', 'Budget forecast: US$10.29', 'A forecast above the US$10 monthly target triggered this email.'],
      ['budget-forecast-12-53.png', 'Budget forecast: US$12.53', 'A second email shows another forecast above the same target.']
    ]
  },
  support: {
    title: 'AWS acknowledged my support case',
    summary: 'I contacted AWS Support while working through the deployment restriction. AWS confirmed that a case had been opened.',
    meaning: 'This acknowledgement confirms the case was opened. It does not confirm quota approval, the support response or a fix. The demonstration used shared Lambda capacity with SQS processing limited to two concurrent runs; the quota increase remains unresolved.',
    images: [['aws-support-acknowledgement.png', 'AWS support case acknowledgement', 'The account details are cropped out and the case number is hidden.']]
  },
  ses: {
    title: 'SES email address verification',
    summary: 'Amazon SES confirmed that an email address was verified for sending.',
    meaning: 'Address verification supports email setup. It does not prove production sending access or receipt of a Workbench risk alert. The captured page also explains sandbox restrictions. Workbench alert inbox receipt remains unconfirmed.',
    images: [['ses-address-verified.png', 'Amazon SES verification confirmation', 'The confirmation shows address verification, not a delivered transaction alert.']]
  }
};

export function EmailEvidenceLauncher({ topic, label, active = true }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => { if (!active) setOpen(false); }, [active]);
  const entry = evidence[topic];
  return <>
    <button type="button" className="technical-launch email-evidence-launch" onClick={() => setOpen(true)} aria-haspopup="dialog">{label} ↗</button>
    {open && <DetailDialog title={entry.title} kicker="IMBOKODO BANK · PROJECT EVIDENCE" onClose={close}>
      <p className="technical-lead">{entry.summary}</p>
      <p>{entry.meaning}</p>
      <div className={`email-evidence-grid${entry.images.length === 1 ? ' email-evidence-grid--single' : ''}`}>
        {entry.images.map(([src, title, caption]) => <article key={src}><h3>{title}</h3><EvidenceImage src={src} alt={title} caption={caption} label="Expand screenshot" active={active} className="email-evidence-preview" /><p className="evidence-caption">{caption}</p></article>)}
      </div>
    </DetailDialog>}
  </>;
}
