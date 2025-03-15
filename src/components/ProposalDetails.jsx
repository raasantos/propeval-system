import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  Download,
  Calendar,
  Clock,
  MapPin,
  Home,
  DollarSign,
  User,
  Clipboard,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Printer,
  Eye,
  ExternalLink,
  Phone,
  Mail
} from 'lucide-react';

const ProposalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch proposal data
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll simulate loading data
    setTimeout(() => {
      // Mock data for a proposal
      setProposal({
        id: id,
        propertyType: 'Residencial',
        address: 'Av. Paulista, 1000, Apto 501, Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        postalCode: '01310-100',
        area: 120,
        requestDate: '10/03/2025',
        serviceType: 'Avaliação para Financiamento Residencial',
        purpose: 'Financiamento',
        status: 'Em análise',
        estimatedCost: 'R$ 3.500,00',
        estimatedTime: '7 dias',
        creationDate: '09/03/2025',
        inspectionDate: '12/03/2025',
        evaluationDate: '14/03/2025',
        completionDate: '16/03/2025',
        reportDeliveryDate: '17/03/2025',
        requestor: {
          name: 'Marcelo Banco',
          department: 'Crédito Imobiliário',
          phone: '(11) 98765-4321',
          email: 'marcelo.banco@banco.com'
        },
        evaluator: {
          name: 'Ana Silva',
          company: 'Silva Avaliações Imobiliárias',
          phone: '(11) 91234-5678',
          email: 'ana.silva@avaliadores.com',
          crea: 'CREA-SP 123456'
        },
        documents: [
          { id: 1, name: 'Matrícula do Imóvel.pdf', type: 'PDF', size: '1.2 MB', uploadDate: '09/03/2025' },
          { id: 2, name: 'Planta Baixa.dwg', type: 'DWG', size: '3.5 MB', uploadDate: '09/03/2025' },
          { id: 3, name: 'Fotos do Imóvel.zip', type: 'ZIP', size: '8.7 MB', uploadDate: '09/03/2025' }
        ],
        reportFiles: [
          { id: 1, name: 'Laudo de Avaliação.pdf', type: 'PDF', size: '4.8 MB', uploadDate: '17/03/2025' },
          { id: 2, name: 'Relatório Fotográfico.pdf', type: 'PDF', size: '12.3 MB', uploadDate: '17/03/2025' }
        ],
        history: [
          { date: '09/03/2025 14:32', user: 'Marcelo Banco', action: 'Proposta criada', status: 'Aguardando avaliação' },
          { date: '10/03/2025 09:45', user: 'Sistema', action: 'Avaliador designado: Ana Silva', status: 'Aguardando avaliação' },
          { date: '10/03/2025 11:20', user: 'Ana Silva', action: 'Proposta aceita', status: 'Em análise' },
          { date: '11/03/2025 16:15', user: 'Ana Silva', action: 'Agendamento de vistoria: 12/03/2025 10:00', status: 'Em análise' }
        ],
        propertyDetails: {
          constructions: [
            { name: 'Edificação Principal', type: 'Apartamento', area: 120, bedrooms: 3, bathrooms: 2, parkingSpaces: 2 }
          ],
          features: [
            'Piso em porcelanato', 'Armários planejados', 'Ar condicionado', 'Sacada com churrasqueira', 'Piscina no condomínio', 'Academia'
          ],
          condition: 'Ótimo',
          age: '5 anos',
          condominium: 'Edifício Paulista Residence',
          condominiumFee: 'R$ 950,00'
        }
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  // Helper function to get status color
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Proposta não encontrada. O ID {id} pode não existir ou ocorreu um erro ao carregar os dados.</p>
        </div>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded flex items-center"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para o Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <button 
                  className="text-gray-600 hover:text-gray-900 flex items-center text-sm font-medium"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Voltar para o Dashboard
                </button>
                <h1 className="text-2xl font-semibold text-gray-900 mt-2">
                  Proposta {proposal.id}
                </h1>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                    {proposal.status}
                  </span>
                  <span className="text-sm text-gray-500 ml-3">
                    Criada em {proposal.creationDate}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </button>
                {proposal.reportFiles && proposal.reportFiles.length > 0 && (
                  <button className="px-3 py-2 bg-blue-600 rounded text-sm font-medium text-white hover:bg-blue-700 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Laudo
                  </button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mt-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  className={`${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab('overview')}
                >
                  Visão Geral
                </button>
                <button
                  className={`${
                    activeTab === 'details'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab('details')}
                >
                  Detalhes do Imóvel
                </button>
                <button
                  className={`${
                    activeTab === 'documents'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab('documents')}
                >
                  Documentos
                </button>
                <button
                  className={`${
                    activeTab === 'history'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                  onClick={() => setActiveTab('history')}
                >
                  Histórico
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Left column: Property info */}
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Informações do Imóvel</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-start mb-4">
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Endereço</h3>
                          <p className="mt-1 text-sm text-gray-900">{proposal.address}</p>
                          <p className="text-sm text-gray-900">{proposal.city}, {proposal.state} - {proposal.postalCode}</p>
                        </div>
                      </div>
                      <div className="flex items-start mb-4">
                        <Home className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Tipo de Imóvel</h3>
                          <p className="mt-1 text-sm text-gray-900">{proposal.propertyType}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Finalidade</h3>
                          <p className="mt-1 text-sm text-gray-900">{proposal.purpose}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start mb-4">
                        <FileText className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Tipo de Serviço</h3>
                          <p className="mt-1 text-sm text-gray-900">{proposal.serviceType}</p>
                        </div>
                      </div>
                      <div className="flex items-start mb-4">
                        <DollarSign className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Custo Estimado</h3>
                          <p className="mt-1 text-sm text-gray-900">{proposal.estimatedCost}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Prazo Estimado</h3>
                          <p className="mt-1 text-sm text-gray-900">{proposal.estimatedTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Datas Importantes</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-500">Solicitação</h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-900">{proposal.creationDate}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-500">Vistoria</h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-900">{proposal.inspectionDate || 'Não agendada'}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-500">Avaliação</h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-900">{proposal.evaluationDate || 'Pendente'}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-500">Conclusão</h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-900">{proposal.completionDate || 'Pendente'}</p>
                    </div>
                    <div className="bg-gray-50 rounded p-3">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-500">Entrega do Laudo</h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-900">{proposal.reportDeliveryDate || 'Pendente'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {proposal.reportFiles && proposal.reportFiles.length > 0 && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">Laudos Disponíveis</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {proposal.reportFiles.map(file => (
                        <div key={file.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-blue-500 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">
                                {file.type} • {file.size} • Enviado em {file.uploadDate}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-600 hover:text-gray-900 p-1">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900 p-1">
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right column: People and status info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Status da Proposta</h2>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {proposal.status === 'Aguardando avaliação' && <AlertCircle className="h-8 w-8 text-yellow-500 mr-3" />}
                    {proposal.status === 'Em análise' && <Clipboard className="h-8 w-8 text-blue-500 mr-3" />}
                    {proposal.status === 'Concluído' && <CheckCircle className="h-8 w-8 text-green-500 mr-3" />}
                    {proposal.status === 'Reavaliação solicitada' && <XCircle className="h-8 w-8 text-red-500 mr-3" />}
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {proposal.status === 'Aguardando avaliação' && 'A proposta está aguardando a designação ou aceitação de um avaliador.'}
                    {proposal.status === 'Em análise' && 'A proposta está sendo analisada pelo avaliador designado.'}
                    {proposal.status === 'Concluído' && 'A avaliação foi concluída e o laudo está disponível.'}
                    {proposal.status === 'Reavaliação solicitada' && 'Foi solicitada uma reavaliação da proposta.'}
                  </p>
                  
                  <div className="mt-5 pt-5 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Próximas Etapas:</h3>
                    <ul className="space-y-2">
                      {proposal.status === 'Aguardando avaliação' && (
                        <>
                          <li className="flex items-start">
                            <span className="h-5 w-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                            <span className="text-sm text-gray-600">Designação do avaliador</span>
                          </li>
                          <li className="flex items-start">
                            <span className="h-5 w-5 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                            <span className="text-sm text-gray-500">Agendamento de vistoria</span>
                          </li>
                        </>
                      )}
                      {proposal.status === 'Em análise' && (
                        <>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600">Proposta aceita</span>
                          </li>
                          <li className="flex items-start">
                            <span className="h-5 w-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                            <span className="text-sm text-gray-600">Realização da vistoria</span>
                          </li>
                          <li className="flex items-start">
                            <span className="h-5 w-5 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                            <span className="text-sm text-gray-500">Elaboração do laudo</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Pessoas Envolvidas</h2>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Solicitante</h3>
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium mr-3">
                        {proposal.requestor.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{proposal.requestor.name}</p>
                        <p className="text-xs text-gray-500">{proposal.requestor.department}</p>
                        <div className="mt-2 flex space-x-2">
                          <a href={`mailto:${proposal.requestor.email}`} className="text-gray-500 hover:text-gray-700 flex items-center text-xs">
                            <Mail className="h-3 w-3 mr-1" />
                            {proposal.requestor.email}
                          </a>
                          <a href={`tel:${proposal.requestor.phone}`} className="text-gray-500 hover:text-gray-700 flex items-center text-xs">
                            <Phone className="h-3 w-3 mr-1" />
                            {proposal.requestor.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {proposal.evaluator && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Avaliador</h3>
                      <div className="flex items-start">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium mr-3">
                          {proposal.evaluator.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{proposal.evaluator.name}</p>
                          <p className="text-xs text-gray-500">{proposal.evaluator.company}</p>
                          <p className="text-xs text-gray-500">{proposal.evaluator.crea}</p>
                          <div className="mt-2 flex space-x-2">
                            <a href={`mailto:${proposal.evaluator.email}`} className="text-gray-500 hover:text-gray-700 flex items-center text-xs">
                              <Mail className="h-3 w-3 mr-1" />
                              {proposal.evaluator.email}
                            </a>
                            <a href={`tel:${proposal.evaluator.phone}`} className="text-gray-500 hover:text-gray-700 flex items-center text-xs">
                              <Phone className="h-3 w-3 mr-1" />
                              {proposal.evaluator.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Detalhes do Imóvel</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Construções</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Área (m²)</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quartos</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banheiros</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vagas</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {proposal.propertyDetails.constructions.map((construction, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{construction.type}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{construction.area} m²</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{construction.bedrooms}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{construction.bathrooms}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{construction.parkingSpaces}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <h3 className="text-sm font-medium text-gray-700 mt-6 mb-3">Características</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {proposal.propertyDetails.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Informações Adicionais</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div>
                        <p className="text-xs text-gray-500">Condomínio</p>
                        <p className="text-sm text-gray-900">{proposal.propertyDetails.condominium}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Taxa de Condomínio</p>
                        <p className="text-sm text-gray-900">{proposal.propertyDetails.condominiumFee}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Estado de Conservação</p>
                        <p className="text-sm text-gray-900">{proposal.propertyDetails.condition}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Idade</p>
                        <p className="text-sm text-gray-900">{proposal.propertyDetails.age}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Documentos Enviados</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {proposal.documents.map(document => (
                    <div key={document.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{document.name}</p>
                          <p className="text-xs text-gray-500">
                            {document.type} • {document.size} • Enviado em {document.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-600 hover:text-gray-900 p-1">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {proposal.reportFiles && proposal.reportFiles.length > 0 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Laudos de Avaliação</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {proposal.reportFiles.map(file => (
                      <div key={file.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-blue-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {file.type} • {file.size} • Enviado em {file.uploadDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900 p-1">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Histórico da Proposta</h2>
            </div>
            <div className="p-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  {proposal.history.map((event, eventIdx) => (
                    <li key={eventIdx}>
                      <div className="relative pb-8">
                        {eventIdx !== proposal.history.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                              {event.action.includes('Proposta criada') && <FileText className="h-4 w-4 text-blue-600" />}
                              {event.action.includes('Avaliador designado') && <User className="h-4 w-4 text-blue-600" />}
                              {event.action.includes('Proposta aceita') && <CheckCircle className="h-4 w-4 text-green-600" />}
                              {event.action.includes('Agendamento') && <Calendar className="h-4 w-4 text-blue-600" />}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-900">{event.action}</p>
                              {event.status && (
                                <p className="mt-1 text-xs text-gray-500">
                                  Status: <span className={`font-medium ${
                                    event.status === 'Aguardando avaliação' ? 'text-yellow-600' : 
                                    event.status === 'Em análise' ? 'text-blue-600' : 
                                    'text-gray-900'
                                  }`}>{event.status}</span>
                                </p>
                              )}
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <div>{event.date.split(' ')[0]}</div>
                              <div className="text-xs">{event.date.split(' ')[1]}</div>
                              <div className="mt-1 text-xs text-gray-400">por {event.user}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalDetails;