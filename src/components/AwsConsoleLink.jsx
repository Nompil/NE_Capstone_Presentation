export default function AwsConsoleLink({ compact = false, className = '' }) {
  if (!import.meta.env.DEV) return null;
  const localHost = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
  const consoleUrl = import.meta.env.VITE_FINTRUST_AWS_CONSOLE_URL;
  if (!localHost || !consoleUrl) return null;
  const signIn = <a className={`technical-launch aws-console-link ${compact ? className : ''}`} href={consoleUrl} target="_blank" rel="noopener noreferrer" title="Imbokodo Risk and Compliance Workbench AWS walkthrough. Africa (Cape Town), af-south-1.">Open AWS Console ↗</a>;
  if (compact) return signIn;
  return <section className={`aws-console-access ${className}`} aria-label="AWS console walkthrough">{signIn}<a className="aws-region-link" href="https://af-south-1.console.aws.amazon.com/lambda/home?region=af-south-1#/functions" target="_blank" rel="noopener noreferrer">Lambda functions · Cape Town ↗</a><p>AWS function walkthrough · Africa (Cape Town), af-south-1.</p></section>;
}
