const iconPaths = {
  upload: 'M12 16V3m-4 4 4-4 4 4M4 14v6h16v-6M8 20h8',
  check: 'M5 3h10l4 4v14H5V3m9 0v5h5M8 14l3 3 5-6',
  score: 'M4 18a9 9 0 1 1 16 0M12 14l5-6M8 20h8M5 12h2m10 0h2M12 5v2',
  database: 'M20 6c0 2-16 2-16 0s16-2 16 0v12c0 3-16 3-16 0V6m0 6c0 3 16 3 16 0',
  search: 'M15 15l6 6M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z',
  audit: 'M8 4H5v17h14V4h-3M8 3h8v4H8V3m0 9h8m-8 4h5',
  cloud: 'M6 18a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11H6Z',
  code: 'm8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18',
  shield: 'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6l-9-4Zm-4 10 3 3 5-6',
  report: 'M5 2h10l4 4v16H5V2m9 0v5h5M8 17v-3m4 3v-6m4 6v-9',
  users: 'M9 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 1a2.5 2.5 0 1 0 0-5M2 21v-4c0-5 14-5 14 0v4H2m16-8c3 0 4 2 4 4v4h-3',
  clock: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 6v6l4 3',
  settings: 'm10 2-1 3-3 1-3-1-2 4 2 2v3l-2 2 2 4 3-1 3 1 1 3h4l1-3 3-1 3 1 2-4-2-2v-3l2-2-2-4-3 1-3-1-1-3h-4Zm6 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  queue: 'M8 5h13M8 12h13M8 19h13M3 5h1M3 12h1M3 19h1',
  bell: 'M5 16h14l-2-3V9a5 5 0 0 0-10 0v4l-2 3Zm5 4h4M12 2v2',
  mail: 'M3 5h18v14H3V5Zm0 0 9 8 9-8',
  retry: 'M3 11a9 9 0 0 1 16-5l2 3M21 3v6h-6M21 13A9 9 0 0 1 5 19l-2-3M3 22v-6h6',
  cost: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM8 17V7h4c5 0 5 6 0 6H8m4 0 4 4',
  leaf: 'M4 20C2 6 10 3 21 3c0 13-4 19-15 15M3 21 16 8',
  chart: 'M3 3v18h18M7 16l4-6 4 3 6-8',
  screen: 'M3 3h18v13H3V3m9 13v5m-5 0h10M7 7h4m-4 4h10',
  link: 'm10 14 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 10a4 4 0 0 0 6 0l5-5a4 4 0 0 0-6-6l-2 2',
  alert: 'm12 2 10 19H2L12 2Zm0 6v6m0 3v1',
  plan: 'M3 4h7v6H3V4m11 10h7v6h-7v-6M10 7h7v7M6 14v6h4',
  book: 'M12 5C8 2 4 3 2 4v16c3-2 7-1 10 1m0-16c4-3 8-2 10-1v16c-3-2-7-1-10 1V5',
  grow: 'M4 20h16M7 16v-5m5 5V8m5 8V4m-3 2 3-3 3 3'
};

const iconTones = {
  upload: 'blue', check: 'teal', score: 'gold', database: 'indigo', search: 'purple', audit: 'navy',
  cloud: 'blue', code: 'coral', shield: 'navy', report: 'blue', users: 'purple', clock: 'gold',
  settings: 'slate', queue: 'blue', bell: 'coral', mail: 'coral', retry: 'coral', cost: 'gold',
  leaf: 'green', chart: 'indigo', screen: 'blue', link: 'navy', alert: 'coral', plan: 'purple', book: 'slate', grow: 'indigo'
};

const labelIcons = {
  INGEST: 'upload', VALIDATE: 'check', SCORE: 'score', 'API ACCESS': 'link', ALERTS: 'bell', INVESTIGATE: 'search', REPORT: 'report', OPERATE: 'settings',
  Receive: 'upload', Validate: 'check', Score: 'score', Store: 'database', Investigate: 'search', Prove: 'audit',
  Understand: 'users', Design: 'plan', Build: 'code', Verify: 'check', Deploy: 'cloud', Present: 'screen',
  'Invalid row': 'alert', Quarantine: 'shield', 'Analyst action': 'users', Revalidation: 'retry', Queue: 'queue',
  'Business Analysis': 'users', 'Solution Design': 'plan', 'Development & Data': 'code', 'Testing & QA': 'check',
  'Cloud Engineering': 'cloud', 'FinOps & Governance': 'cost', 'Project Coordination': 'plan', 'Security & Operations': 'shield',
  PYTHON: 'code', 'SQL / POSTGRESQL': 'database', 'AWS CLOUD': 'cloud', 'OPERATIONS & GOVERNANCE': 'settings',
  Functional: 'check', 'Failure paths': 'retry', 'Data integrity': 'database', 'Security / RBAC': 'shield', Runtime: 'code', 'Browser gates': 'screen',
  'Identity & access': 'users', 'Data protection': 'shield', 'Failure & recovery': 'retry', Observability: 'chart',
  Cloud: 'cloud', Development: 'code', Data: 'database', Architecture: 'plan', 'Security & Ops': 'shield', FinOps: 'cost', Delivery: 'plan',
  'Operational Excellence': 'settings', Security: 'shield', Reliability: 'retry', 'Performance Efficiency': 'chart', 'Cost Optimization': 'cost', Sustainability: 'leaf'
};

export function iconForLabel(label) {
  return labelIcons[label] || 'book';
}

export function VisualIcon({ name, className = '' }) {
  return <svg className={`visual-icon ${className}`} data-icon-tone={iconTones[name] || 'slate'} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={iconPaths[name] || iconPaths.book} /></svg>;
}

export function IconBadge({ name, className = '' }) {
  return <span className={`visual-icon-badge ${className}`} data-icon-tone={iconTones[name] || 'slate'} aria-hidden="true"><VisualIcon name={name} /></span>;
}

export function FlowArrow({ className = '', twoWay = false }) {
  return <svg className={`visual-flow-arrow ${className}`} viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M3 12h33m-8-8 8 8-8 8" />{twoWay && <path d="m11 4-8 8 8 8" />}</svg>;
}
