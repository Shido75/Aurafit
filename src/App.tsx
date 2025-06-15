import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import Progress from './pages/Progress';
import Onboarding from './pages/Onboarding';
import Messages from './pages/Messages';

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-[#0D1117] text-[#8B949E] scanlines">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;