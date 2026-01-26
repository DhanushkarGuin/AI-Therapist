import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ClientDashboard from './pages/ClientDashboard';
import TherapistDashboard from './pages/TherapistDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/therapist-dashboard" element={<TherapistDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
