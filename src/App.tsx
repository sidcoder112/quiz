
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { PersistGate } from 'redux-persist/integration/react';
import {  persistor } from './store';
import HomePage from './components/HomePage';
import DifficultyPage from './components/QuizSetupPage';
import Quiz from './components/Quiz';
import SettingsPage from './components/SettingsPage';
import Profile from './components/Profile';
import ViewHistoryPage from './components/ViewHistoryPage';
import AdminPanel from './components/AdminPanel';
import ResultsPage from './components/ResultsPage';
import QuizSetupPage from './components/QuizSetupPage';
import NoPage from './components/NoPage';

const App = () => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/difficulty" element={<DifficultyPage />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<ViewHistoryPage />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/setup" element={<QuizSetupPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
      </PersistGate>
    </Auth0Provider>
  );
};

export default App;
