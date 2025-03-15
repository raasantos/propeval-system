import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { 
  PlusCircle, 
  Search, 
  Bell, 
  Eye,
  Edit,
  Filter,
  RefreshCw,
  ArrowUpRight,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  HelpCircle
} from 'lucide-react';
import DashboardCharts from './DashboardCharts';
import DashboardAlerts from './DashboardAlerts';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // State for dashboard data
  const [pendingProposals, setPendingProposals] = useState([]);
  const [completedReports, setCompletedReports] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    pendingCount: 18,
    inEvaluationCount: 27,
    completedCount: 42,
    averageTime: 8.5
  });
  const [alertData, setAlertData] = useState({
    dueToday: 5,
    delayed: 3,
    pendingApproval: 8,
    resolvedIssues: 3
  });
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, [selectedDepartment]);

  const fetchDashboardData = () => {
    setIsLoading(true);
    
    // In a real app, this would be an API call with the selected department as a parameter
    // For now, we'll simulate a delay and return mock data
    setTimeout(() => {
      // Sample data for proposals
      const samplePendingProposals = [
        { id: 'P2025-0103', propertyType: 'Residencial', address: 'Av. Paulista, 1000', requestDate: '10/03/2025', status: 'Aguardando avaliação', estimatedCost: 'R$ 3.500,00', estimatedTime: '7 dias', dueDate: '17/03/2025' },
        { id: 'P2025-0102', propertyType: 'Comercial', address: 'Rua Augusta, 500', requestDate: '09/03/2025', status: 'Em análise', estimatedCost: 'R$ 5.200,00', estimatedTime: '10 dias', dueDate: '15/03/2025' },
        { id: 'P2025-0101', propertyType: 'Industrial', address: 'Rod. Anhanguera, KM 15', requestDate: '08/03/2025', status: 'Reavaliação solicitada', estimatedCost: 'R$ 8.700,00', estimatedTime: '14 dias', dueDate: '22/03/2025' },
        { id: 'P2025-0100', propertyType: 'Residencial', address: 'Rua dos Pinheiros, 750', requestDate: '06/03/2025', status: 'Em análise', estimatedCost: 'R$ 2.900,00', estimatedTime: '7 dias', dueDate: '15/03/2025' },
        { id: 'P2025-0099', propertyType: 'Comercial', address: 'Av. Faria Lima, 3000', requestDate: '05/03/2025', status: 'Aguardando avaliação', estimatedCost: 'R$ 6.100,00', estimatedTime: '10 dias', dueDate: '15/03/2025' },
      ];

      // Sample data for completed reports
      const sampleCompletedReports = [
        { id: 'R2025-095', propertyType: 'Residencial', address: 'Rua Oscar Freire, 200', completionDate: '07/03/2025', engineer: 'Ana Silva', finalValue: 'R$ 1.250.000,00' },
        { id: 'R2025-094', propertyType: 'Comercial', address: 'Av. Brigadeiro Faria Lima, 1500', completionDate: '05/03/2025', engineer: 'Carlos Mendes', finalValue: 'R$ 3.800.000,00' },
      ];

      // Adjust data based on department filter if needed
      if (selectedDepartment !== 'all') {
        // This is where you would filter the data based on department
        // For mock purposes, we'll just reduce the counts
        setStatusCounts({
          pendingCount: Math.floor(18 * 0.7),
          inEvaluationCount: Math.floor(27 * 0.7),
          completedCount: Math.floor(42 * 0.7),
          averageTime: 8.5
        });
        
        setAlertData({
          dueToday: Math.floor(5 * 0.7),
          delayed: Math.floor(3 * 0.7),
          pendingApproval: Math.floor(8 * 0.7),
          resolvedIssues: Math.floor(3 * 0.7)
        });
      } else {
        setStatusCounts({
          pendingCount: 18,
          inEvaluationCount: 27,
          completedCount: 42,
          averageTime: 8.5
        });
        
        setAlertData({
          dueToday: 5,
          delayed: 3,
          pendingApproval: 8,
          resolvedIssues: 3
        });
      }

      setPendingProposals(samplePendingProposals);
      setCompletedReports(sampleCompletedReports);
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 600);
  };

  const handleViewProposal = (id) => {
    navigate(`/proposals/${id}`);
  };

  const handleChartFilterClick = (filter) => {
    console.log(`Applying chart filter: ${filter}`);
    // In a real app, this would navigate to a filtered list based on the chart segment clicked
    navigate(`/proposals?filter=${filter}`);
  };

  const handleAlertClick = (alertType) => {
    console.log(`Clicked on alert: ${alertType}`);
    // Navigate to filtered proposals based on alert type
    navigate(`/proposals?alert=${alertType}`);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleRefresh = () => {
    fetchDashboardData();
  };

  // Helper function for proposal status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'Aguardando avaliação':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em análise':
        return 'bg-blue-100 text-blue-800';
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Reavaliação solicitada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white py-2 px-6 sticky top-0 z-10">
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
      <div className="flex-1">
        {/* Content area */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
              <p className="text-sm text-gray-500 mt-1">
                Última atualização: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Filter className="h-4 w-4 text-gray-400 mr-2" />
                <select 
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="all">Todos os departamentos</option>
                  <option value="credit">Crédito Imobiliário</option>
                  <option value="risk">Análise de Risco</option>
                  <option value="operations">Operações</option>
                </select>
              </div>
              <button 
                className="text-gray-600 hover:text-gray-800 px-3 py-1 border border-gray-300 rounded flex items-center text-sm"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </button>
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded flex items-center text-sm font-medium"
                onClick={() => navigate('/new-proposal')}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Nova Solicitação
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Alert Cards */}
              <DashboardAlerts 
                alerts={alertData} 
                onAlertClick={handleAlertClick} 
              />

              {/* Status cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">Propostas Pendentes</h3>
                    <div data-tooltip-id="pending-tooltip">
                      <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-gray-800">{statusCounts.pendingCount}</p>
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="text-red-500">+5</span> desde ontem
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Tooltip 
                  id="pending-tooltip" 
                  place="top"
                  content="Número total de propostas que ainda não foram aceitas por um avaliador ou estão aguardando designação."
                />
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">Em Avaliação</h3>
                    <div data-tooltip-id="evaluation-tooltip">
                      <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <AlertCircle className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-gray-800">{statusCounts.inEvaluationCount}</p>
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="text-green-500">-3</span> desde ontem
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Tooltip 
                  id="evaluation-tooltip" 
                  place="top"
                  content="Propostas em fase de avaliação ativa por um engenheiro avaliador designado."
                />
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">Concluídas (mês)</h3>
                    <div data-tooltip-id="completed-tooltip">
                      <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-gray-800">{statusCounts.completedCount}</p>
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="text-green-500">+12</span> vs. último mês
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Tooltip 
                  id="completed-tooltip" 
                  place="top"
                  content="Total de avaliações concluídas e laudos entregues no mês atual."
                />
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-500">Tempo Médio (dias)</h3>
                    <div data-tooltip-id="avg-time-tooltip">
                      <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-gray-800">{statusCounts.averageTime}</p>
                        <div className="mt-1 text-xs text-gray-500">
                          <span className="text-green-500">-0.7</span> vs. último mês
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Tooltip 
                  id="avg-time-tooltip" 
                  place="top"
                  content="Tempo médio em dias para conclusão de avaliações, desde a solicitação até a entrega do laudo."
                />
              </div>

              {/* Charts */}
              <DashboardCharts onFilterClick={handleChartFilterClick} />

              {/* Recent proposals section */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Propostas Recentes</h3>
                  <div className="flex space-x-2">
                    <button 
                      className="text-xs text-blue-600 flex items-center"
                      onClick={() => navigate('/proposals')}
                    >
                      <span>Ver todas</span>
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </button>
                  </div>
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
                        <th className="px-6 py-3">Vencimento</th>
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
                              getStatusColor(proposal.status)
                            }`}>
                              {proposal.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">{proposal.estimatedCost}</td>
                          <td className="px-6 py-4">
                            <span className={
                              proposal.dueDate === '15/03/2025' 
                                ? 'text-yellow-600 font-medium' 
                                : 'text-gray-700'
                            }>
                              {proposal.dueDate}
                            </span>
                          </td>
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
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Laudos Recentes</h3>
                  <button 
                    className="text-xs text-blue-600 flex items-center"
                    onClick={() => navigate('/reports')}
                  >
                    <span>Ver todos</span>
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </button>
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
                          <td className="px-6 py-4 font-medium">{report.finalValue}</td>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;