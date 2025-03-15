import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  LayoutDashboard, 
  FileText, 
  Settings, 
  User, 
  Search, 
  Bell, 
  BarChart,
  Eye,
  Edit
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Sample data for the dashboard
  const pendingProposals = [
    { id: 'P2025-0103', propertyType: 'Residencial', address: 'Av. Paulista, 1000', requestDate: '10/03/2025', status: 'Aguardando avaliação', estimatedCost: 'R$ 3.500,00', estimatedTime: '7 dias' },
    { id: 'P2025-0102', propertyType: 'Comercial', address: 'Rua Augusta, 500', requestDate: '09/03/2025', status: 'Em análise', estimatedCost: 'R$ 5.200,00', estimatedTime: '10 dias' },
    { id: 'P2025-0101', propertyType: 'Industrial', address: 'Rod. Anhanguera, KM 15', requestDate: '08/03/2025', status: 'Reavaliação solicitada', estimatedCost: 'R$ 8.700,00', estimatedTime: '14 dias' },
  ];

  const completedReports = [
    { id: 'R2025-095', propertyType: 'Residencial', address: 'Rua Oscar Freire, 200', completionDate: '07/03/2025', engineer: 'Ana Silva', finalValue: 'R$ 1.250.000,00' },
    { id: 'R2025-094', propertyType: 'Comercial', address: 'Av. Brigadeiro Faria Lima, 1500', completionDate: '05/03/2025', engineer: 'Carlos Mendes', finalValue: 'R$ 3.800.000,00' },
  ];

  const handleViewProposal = (id) => {
    navigate(`/proposals/${id}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white py-2 px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">PropEval</h1>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-sm text-gray-400">Sistema de Gestão de Avaliações Imobiliárias</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-8 pr-2 py-1 rounded bg-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button className="relative">
              <Bell className="h-5 w-5 text-gray-300" />
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center ml-4">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-medium">MB</div>
              <span className="ml-2 text-sm">Marcelo Banco</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {/* Content area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center text-sm font-medium"
              onClick={() => navigate('/new-proposal')}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Nova Solicitação
            </button>
          </div>

          {/* Status cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Propostas Pendentes</h3>
              <p className="text-2xl font-semibold text-gray-800">18</p>
              <div className="mt-2 text-xs text-gray-500">
                <span className="text-red-500">+5</span> desde ontem
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Em Avaliação</h3>
              <p className="text-2xl font-semibold text-gray-800">27</p>
              <div className="mt-2 text-xs text-gray-500">
                <span className="text-green-500">-3</span> desde ontem
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Concluídas (mês)</h3>
              <p className="text-2xl font-semibold text-gray-800">42</p>
              <div className="mt-2 text-xs text-gray-500">
                <span className="text-green-500">+12</span> vs. último mês
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Tempo Médio (dias)</h3>
              <p className="text-2xl font-semibold text-gray-800">8.5</p>
              <div className="mt-2 text-xs text-gray-500">
                <span className="text-green-500">-0.7</span> vs. último mês
              </div>
            </div>
          </div>

          {/* Recent proposals section */}
          <div className="bg-white rounded shadow mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Propostas Recentes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Tipo</th>
                    <th className="px-6 py-3">Endereço</th>
                    <th className="px-6 py-3">Data</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Custo Est.</th>
                    <th className="px-6 py-3">Prazo Est.</th>
                    <th className="px-6 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingProposals.map(proposal => (
                    <tr key={proposal.id} className="text-sm">
                      <td className="px-6 py-4 font-medium">{proposal.id}</td>
                      <td className="px-6 py-4">{proposal.propertyType}</td>
                      <td className="px-6 py-4">{proposal.address}</td>
                      <td className="px-6 py-4">{proposal.requestDate}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          proposal.status === 'Aguardando avaliação' ? 'bg-yellow-100 text-yellow-800' : 
                          proposal.status === 'Em análise' ? 'bg-blue-100 text-blue-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {proposal.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{proposal.estimatedCost}</td>
                      <td className="px-6 py-4">{proposal.estimatedTime}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleViewProposal(proposal.id)}
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </button>
                          <button className="text-gray-600 hover:text-gray-800 flex items-center">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Completed reports section */}
          <div className="bg-white rounded shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800">Laudos Recentes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Tipo</th>
                    <th className="px-6 py-3">Endereço</th>
                    <th className="px-6 py-3">Data Conclusão</th>
                    <th className="px-6 py-3">Engenheiro</th>
                    <th className="px-6 py-3">Valor Final</th>
                    <th className="px-6 py-3">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {completedReports.map(report => (
                    <tr key={report.id} className="text-sm">
                      <td className="px-6 py-4 font-medium">{report.id}</td>
                      <td className="px-6 py-4">{report.propertyType}</td>
                      <td className="px-6 py-4">{report.address}</td>
                      <td className="px-6 py-4">{report.completionDate}</td>
                      <td className="px-6 py-4">{report.engineer}</td>
                      <td className="px-6 py-4">{report.finalValue}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => handleViewProposal(report.id)}
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Ver Laudo
                          </button>
                          <button className="text-gray-600 hover:text-gray-800">
                            Histórico
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;