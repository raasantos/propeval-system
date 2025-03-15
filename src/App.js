import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import ProposalRequestForm from './components/ProposalRequestForm';
import ProposalDetails from './components/ProposalDetails';
import ProposalsList from './components/ProposalsList'; // Nova importação
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="flex">
        <Navbar />
        <main className="flex-1 ml-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/new-proposal" element={<ProposalRequestForm />} />
            <Route path="/proposals/:id" element={<ProposalDetails />} />
            <Route path="/proposals" element={<ProposalsList />} /> {/* Rota atualizada */}
            <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-semibold">Relatórios (Em desenvolvimento)</h1></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;