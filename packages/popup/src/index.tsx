import { initAnalytics } from '@shared/analytics';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

initAnalytics();

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(<App />);
