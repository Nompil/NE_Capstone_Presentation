import { useEffect, useState } from 'react';
import { EvidenceImage } from './Evidence.jsx';
import { TechnicalLauncher } from './TechnicalEvidence.jsx';
import { integrationAssetBase, integrationCaptures } from './IntegrationCaptures.jsx';
import { FlowArrow, VisualIcon } from './VisualIcons.jsx';
import { CurrentErdLauncher } from './CurrentErd.jsx';

const resourceBase = `${import.meta.env.BASE_URL}resources/`;

function BuildProgress() {
  return <p className="build-progress">Business need → Wireframe → ERD → SQL → Lambda / backend → API → Frontend → Live demo</p>;
}

export function IntegrationSlide({ active, assetBase, onNavigate }) {
  const [request, response, workbench] = integrationCaptures;
  return <><div className="integration-main-layout"><EvidenceImage src={workbench.src} alt={workbench.alt} caption={workbench.caption} label="08 · Expand API and Workbench evidence" assetBase={integrationAssetBase} active={active} className="integration-hero" /><aside className="integration-story"><span>CONNECTED WORKFLOW</span><h3 className="integration-mini-flow" aria-label="Frontend to API to Workbench"><span><VisualIcon name="screen" />Frontend</span><FlowArrow /><span><VisualIcon name="code" />API</span><FlowArrow /><span><VisualIcon name="search" />Workbench</span></h3><section><strong>05 · Frontend request</strong><p>The browser asks for transactions. HTTP 200 means the request succeeded.</p><EvidenceImage src={request.src} alt={request.alt} caption={request.caption} label="05 · Browser request evidence" assetBase={integrationAssetBase} active={active} className="integration-support-control" /></section><section><strong>07 · Backend response</strong><p>The API returns fields such as the account, amount and score as JSON.</p><EvidenceImage src={response.src} alt={response.alt} caption={response.caption} label="07 · JSON response evidence" assetBase={integrationAssetBase} active={active} className="integration-support-control" /></section><section><strong>08 · Analyst workbench</strong><p>The screen turns that information into a risk list the Analyst can use.</p></section></aside></div><div className="integration-main-actions"><TechnicalLauncher topic="journey" label="Frontend → API → SQL evidence" active={active} assetBase={assetBase} /><button type="button" className="technical-launch" onClick={() => onNavigate('appendix-app-evidence')}>Insights API · supporting screens</button></div><p className="integration-provenance">Connected transaction and risk records let the Analyst move from a risk list straight into an investigation.</p></>;
}

export function DataModelSlide({ active, assetBase, onNavigate }) {
  return <><div className="build-evidence-layout"><article className="build-evidence-story"><span>DATA RELATIONSHIPS</span><h3>How the records connect</h3><ul><li>Customers and accounts connect to accepted transactions.</li><li>Risk events connect to reviews and decision history.</li><li>Ingestion and lifecycle records trace each source row.</li><li>Quarantine, corrections and outboxes support safe recovery.</li></ul><p className="build-evidence-note">The complete model has 18 tables and 17 foreign keys. Two workflow views calculate status from saved records.</p><TechnicalLauncher topic="sql" label="Inspect SQL & data integrity" active={active} assetBase={assetBase} /></article><CurrentErdLauncher preview active={active} label="Expand current ERD and all 18 tables" /></div><div className="build-evidence-actions"><button className="technical-launch" onClick={() => onNavigate('business-analysis')}>Wireframe & business analysis</button><button className="technical-launch" onClick={() => onNavigate('sql-evidence')}>Continue to SQL evidence →</button></div><BuildProgress /></>;
}

export function SqlBuildSlide({ active, assetBase, onNavigate }) {
  const [query, setQuery] = useState('Loading repository SQL source…');
  const countExcerpt = query.match(/COUNT\(\*\) OVER \([\s\S]*?AS tx_count_30d/)?.[0].replace(/^ {8}/gm, '') || query;
  const resultExcerpt = query.match(/SELECT DISTINCT account_id[\s\S]*$/)?.[0] || '';
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${resourceBase}sql-evidence.json`, { signal: controller.signal }).then((response) => {
      if (!response.ok) throw new Error('Source unavailable');
      return response.json();
    }).then((files) => setQuery(files['sql/risk_report.sql'] || 'Source unavailable.')).catch((error) => { if (error.name !== 'AbortError') setQuery('Source unavailable. The original SQL remains in the project repository.'); });
    return () => controller.abort();
  }, []);
  return <><div className="build-evidence-layout build-evidence-layout--sql"><article className="build-evidence-story"><span>SQL IN PRACTICE</span><h3>Which accounts need a closer look?</h3><ul><li>First select transactions with a saved HIGH risk level.</li><li>Count each account’s HIGH transactions over 30 days.</li><li>Return accounts with more than three.</li></ul><p className="build-evidence-note">The output is a list of account IDs for review. It adds a view across transactions without changing the saved score.</p><TechnicalLauncher topic="sql" label="Open full SQL source & data integrity" active={active} assetBase={assetBase} /><p className="build-evidence-note">Two excerpts from the actual query appear alongside. The full source includes the saved risk filter and support for earlier records.</p></article><section className="build-sql-source"><h3>sql/risk_report.sql · source excerpts</h3><p className="sql-excerpt-label">1. Count activity within the 30 day window</p><pre><code>{countExcerpt}</code></pre><p className="sql-excerpt-label">2. Return the accounts that meet the condition</p><pre><code>{resultExcerpt}</code></pre><p className="sql-output-note">Result shape: account IDs for Analyst review.</p></section></div><div className="build-evidence-actions"><button className="technical-launch" onClick={() => onNavigate('data-model')}>Return to core data model</button><button className="technical-launch" onClick={() => onNavigate('aws-architecture')}>Continue to AWS & Lambda →</button></div></>;
}
