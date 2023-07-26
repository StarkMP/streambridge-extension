import * as Sentry from '@sentry/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'https://46f880f11e5346c9a5c7cdc425777b50@o1100388.ingest.sentry.io/4505597588078592',
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        tracePropagationTargets: ['localhost'],
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  });
}

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(<App />);
