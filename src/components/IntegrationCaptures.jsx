import { EvidenceImage } from './Evidence.jsx';

export const integrationAssetBase = `${import.meta.env.BASE_URL}resources/`;

export const integrationCaptures = [
  {
    number: '05',
    title: 'Frontend sends the request',
    src: 'api-transactions-request.png',
    alt: 'Captured transaction request with HTTP 200',
    caption: 'Capture 05: the browser requests transactions and filter options. HTTP 200 means the request completed successfully.'
  },
  {
    number: '07',
    title: 'Backend returns structured data',
    src: 'api-transactions-response.png',
    alt: 'Captured backend transaction JSON response',
    caption: 'Capture 07: the API returns JSON with fields such as transaction ID, date, account and amount. The screen reads these fields to show the transaction.'
  },
  {
    number: '08',
    title: 'Workbench presents the risk information',
    src: 'api-risk-event-ui.png',
    alt: 'Captured API JSON and Analyst risk event view together',
    caption: 'Capture 08: the API response appears beside the Analyst risk list. The screen presents the saved assessment returned by the backend.'
  }
];

export function IntegrationCaptureSequence({ active }) {
  return <section className="integration-capture-sequence" aria-label="Frontend and backend integration"><h3>Request → response → Workbench</h3><p className="technical-caption">These screens show how I connected the frontend and backend: ask for data, return it as JSON and display it for the Analyst.</p><ol>{integrationCaptures.map((capture) => <li key={capture.number}><h4>{capture.number} · {capture.title}</h4><EvidenceImage src={capture.src} alt={capture.alt} caption={capture.caption} label={`Expand capture ${capture.number}`} assetBase={integrationAssetBase} active={active} /><p className="technical-caption">{capture.caption}</p></li>)}</ol><p className="technical-caption">The examples above load transaction lists. The code below follows a request for one investigation and shows where SQL brings the related records together.</p></section>;
}
