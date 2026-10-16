import { useEffect, useState } from 'react';
import { EvidenceImage } from './Evidence.jsx';
import { TechnicalLauncher } from './TechnicalEvidence.jsx';
import { integrationAssetBase, integrationCaptures } from './IntegrationCaptures.jsx';
import { FlowArrow, VisualIcon } from './VisualIcons.jsx';

const resourceBase = `${import.meta.env.BASE_URL}resources/`;

function BuildProgress() {
  return <p className="build-progress">Business need → Wireframe → ERD → SQL → Lambda / backend → API → Frontend → Live demo</p>;
}

export function IntegrationSlide({ active, assetBase, onNavigate }) {
  const [request, response, workbench] = integrationCaptures;
  return <><div className="integration-main-layout"><EvidenceImage src={workbench.src} alt={workbench.alt} caption={workbench.caption} label="08 · Expand API and Workbench evidence" assetBase={integrationAssetBase} active={active} className="integration-hero" /><aside className="integration-story"><span>CONNECTED WORKFLOW</span><h3 className="integration-mini-flow" aria-label="Frontend to API to Workbench"><span><VisualIcon name="screen" />Frontend</span><FlowArrow /><span><VisualIcon name="code" />API</span><FlowArrow /><span><VisualIcon name="search" />Workbench</span></h3><section><strong>05 · Frontend request</strong><p>The browser asks for transactions. HTTP 200 means the request succeeded.</p><EvidenceImage src={request.src} alt={request.alt} caption={request.caption} label="05 · Browser request evidence" assetBase={integrationAssetBase} active={active} className="integration-support-control" /></section><section><strong>07 · Backend response</strong><p>The API returns fields such as the account, amount and score as JSON.</p><EvidenceImage src={response.src} alt={response.alt} caption={response.caption} label="07 · JSON response evidence" assetBase={integrationAssetBase} active={active} className="integration-support-control" /></section><section><strong>08 · Analyst workbench</strong><p>The screen turns that information into a risk list the Analyst can use.</p></section></aside></div><div className="integration-main-actions"><TechnicalLauncher topic="journey" label="Frontend → API → SQL evidence" active={active} assetBase={assetBase} /><button type="button" className="technical-launch" onClick={() => onNavigate('appendix-app-evidence')}>Insights API · supporting screens</button></div><p className="integration-provenance">Connected transaction and risk records let the Analyst move from a risk list straight into an investigation.</p></>;
}

export function DataModelSlide({ active, assetBase, onNavigate }) {
  return <><div className="build-evidence-layout"><article className="build-evidence-story"><span>DATA RELATIONSHIPS</span><h3>How the records connect</h3><ul><li>Customers and accounts show who the transaction belongs to.</li><li>Each transaction links to its risk score and reasons.</li><li>Reviews and history keep the Analyst’s actions and decision.</li><li>Batch and quarantine records keep the original file, row and check results.</li></ul><p className="build-evidence-note">This core model sets out the main relationships. The implementation ERD shows the full database tables.</p><TechnicalLauncher topic="sql" label="Inspect implementation ERD & SQL" active={active} assetBase={assetBase} /></article><EvidenceImage src="core-data-model.png" assetBase={resourceBase} alt="Imbokodo Risk and Compliance Workbench core data model ERD" caption="My core data model groups the main business records. The implementation uses UUID IDs and the table names risk_reviews and risk_review_history." label="Expand core data model" active={active} /></div><div className="build-evidence-actions"><button className="technical-launch" onClick={() => onNavigate('business-analysis')}>Wireframe & business analysis</button><button className="technical-launch" onClick={() => onNavigate('sql-evidence')}>Continue to SQL evidence →</button></div><BuildProgress /></>;
}

export function SqlBuildSlide({ active, assetBase, onNavigate }) {
  const [query, setQuery] = useState('Loading repository SQL source…');
  useEffect(() => {
    const controller = new AbortController();
    fetch(`${resourceBase}sql-evidence.json`, { signal: controller.signal }).then((response) => {
      if (!response.ok) throw new Error('Source unavailable');
      return response.json();
    }).then((files) => setQuery(files['sql/risk_report.sql'] || 'Source unavailable.')).catch((error) => { if (error.name !== 'AbortError') setQuery('Source unavailable. The original SQL remains in the project repository.'); });
    return () => controller.abort();
  }, []);
  return <><div className="build-evidence-layout build-evidence-layout--sql"><article className="build-evidence-story"><span>SQL IN PRACTICE</span><h3>Find repeated HIGH-risk activity</h3><ul><li>Start with transactions that have a saved HIGH risk level. This named query step is called a CTE.</li><li>Count each account’s HIGH transactions over 30 days using a window.</li><li>More than three highlights an account for closer attention.</li></ul><p className="build-evidence-note">This helps the Analyst spot a pattern across transactions, rather than looking at each payment on its own.</p><TechnicalLauncher topic="sql" label="Explore SQL files & data integrity" active={active} assetBase={assetBase} /><p className="build-evidence-note">The query reads the saved risk level. SQL details explain how it also supports earlier records.</p></article><section className="build-sql-source"><h3>sql/risk_report.sql</h3><pre><code>{query}</code></pre></section></div><div className="build-evidence-actions"><button className="technical-launch" onClick={() => onNavigate('data-model')}>Return to core data model</button><button className="technical-launch" onClick={() => onNavigate('aws-architecture')}>Continue to AWS & Lambda →</button></div><BuildProgress /></>;
}
