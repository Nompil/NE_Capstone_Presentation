export const projectStatus = {
  liveDemoUrl: 'https://qzgzopn8o4.execute-api.af-south-1.amazonaws.com/dev/',
  linuxVerificationPassed: true,
  apiGatewayLive: true,
  cognitoLive: true,
  sesLive: true,
  alarmsLive: true,
  endToEndPassed: true,
  verificationScope: 'Recorded synthetic core cloud demonstration, not production acceptance',
  verificationDate: '18 October 2026, 02:44 SAST',
  inboxReceiptVerified: false,
  liveFailureDrillVerified: false,
  quotaIncreaseApproved: false
};

const snapshot = 'https://github.com/Nompil/fintrust/blob/4a8ad8af275d8ee039873b4b2036e0f09c182b16/';

export const releaseEvidence = {
  cloud: `${snapshot}docs/EVIDENCE/13-cloud-live/final-live-verification.json`,
  journey: `${snapshot}docs/EVIDENCE/13-cloud-live/core-cloud-demonstration.json`,
  alerts: `${snapshot}docs/EVIDENCE/13-cloud-live/ses-delivery-metrics.json`,
  runbook: `${snapshot}docs/CLOUD_DEMONSTRATION_RUNBOOK.md`,
  governance: `${snapshot}docs/data_governance.md`,
  repository: 'https://github.com/Nompil/fintrust/tree/4a8ad8af275d8ee039873b4b2036e0f09c182b16',
  ci: 'https://github.com/Nompil/fintrust/actions/runs/39066017375',
  laterCi: 'https://github.com/Nompil/fintrust/actions/runs/39067872212',
  rules: `${snapshot}backend/fintrust/rules.py`
};
