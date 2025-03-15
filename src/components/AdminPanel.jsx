import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  User, 
  Search, 
  Bell, 
  BarChart,
  UserPlus,
  Edit,
  Trash2,
  Check,
  X,
  ChevronDown,
  Plus,
  Save,
  FileUp,
  Copy,
  Link
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [activeFormTab, setActiveFormTab] = useState('templates');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditFormModal, setShowEditFormModal] = useState(false);
  const [showServiceTypeModal, setShowServiceTypeModal] = useState(false);

  // Sample data for users
  const users = [
    { id: 1, name: 'Ana Silva', email: 'ana.silva@banco.com', role: 'Analista', department: 'Crédito Imobiliário', status: 'Ativo', lastLogin: '15/03/2025 09:45' },
    { id: 2, name: 'Carlos Mendes', email: 'carlos.mendes@avaliadores.com', role: 'Engenheiro Avaliador', department: 'Avaliação', status: 'Ativo', lastLogin: '14/03/2025 16:20' },
    { id: 3, name: 'Roberto Santos', email: 'roberto.santos@banco.com', role: 'Gerente', department: 'Operações', status: 'Ativo', lastLogin: '15/03/2025 10:12' },
    { id: 4, name: 'Juliana Alves', email: 'juliana.alves@banco.com', role: 'Administrador', department: 'TI', status: 'Ativo', lastLogin: '15/03/2025 08:30' },
    { id: 5, name: 'Marcos Oliveira', email: 'marcos.oliveira@banco.com', role: 'Analista', department: 'Risco', status: 'Inativo', lastLogin: '10/02/2025 11:05' },
  ];

  // Sample data for form templates
  const formTemplates = [
    { id: 1, name: 'Avaliação Residencial Padrão', description: 'Template para avaliação de imóveis residenciais', fields: 32, lastUpdated: '01/03/2025', status: 'Ativo' },
    { id: 2, name: 'Avaliação Comercial Completa', description: 'Template detalhado para imóveis comerciais', fields: 48, lastUpdated: '15/02/2025', status: 'Ativo' },
    { id: 3, name: 'Avaliação Rural Simplificada', description: 'Template para avaliação rápida de imóveis rurais', fields: 28, lastUpdated: '20/02/2025', status: 'Ativo' },
    { id: 4, name: 'Avaliação Industrial', description: 'Template para avaliação de galpões e instalações industriais', fields: 52, lastUpdated: '10/03/2025', status: 'Rascunho' },
  ];

  // Sample data for service types
  const serviceTypes = [
    { id: 1, name: 'Avaliação para Financiamento Residencial', description: 'Avaliação padrão para financiamentos de imóveis residenciais', templateId: 1, cost: 'R$ 800,00', estimatedDays: 7, status: 'Ativo' },
    { id: 2, name: 'Avaliação para Garantia Comercial', description: 'Avaliação detalhada para garantias de imóveis comerciais', templateId: 2, cost: 'R$ 1.500,00', estimatedDays: 10, status: 'Ativo' },
    { id: 3, name: 'Avaliação Rural Básica', description: 'Avaliação simplificada para propriedades rurais', templateId: 3, cost: 'R$ 2.000,00', estimatedDays: 12, status: 'Ativo' },
  ];

  // Sample data for form sections and fields
  const formEditorSections = [
    { 
      id: 1, 
      name: 'Identificação do Imóvel', 
      fields: [
        { id: 101, type: 'text', label: 'Endereço Completo', placeholder: 'Ex: Av. Paulista, 1000', required: true },
        { id: 102, type: 'text', label: 'CEP', placeholder: '00000-000', required: true },
        { id: 103, type: 'select', label: 'Tipo de Imóvel', options: ['Apartamento', 'Casa', 'Terreno', 'Sala Comercial'], required: true },
        { id: 104, type: 'text', label: 'Matrícula', placeholder: 'Número da matrícula do imóvel', required: true },
      ] 
    },
    { 
      id: 2, 
      name: 'Características Construtivas', 
      fields: [
        { id: 201, type: 'number', label: 'Área Construída (m²)', placeholder: '0.00', required: true },
        { id: 202, type: 'number', label: 'Área do Terreno (m²)', placeholder: '0.00', required: true },
        { id: 203, type: 'select', label: 'Padrão Construtivo', options: ['Baixo', 'Normal', 'Alto', 'Luxo'], required: true },
        { id: 204, type: 'number', label: 'Idade Aparente (anos)', placeholder: '0', required: false },
      ] 
    },
    { 
      id: 3, 
      name: 'Informações da Região', 
      fields: [
        { id: 301, type: 'select', label: 'Infraestrutura Urbana', options: ['Completa', 'Parcial', 'Mínima', 'Inexistente'], required: true },
        { id: 302, type: 'select', label: 'Vocação da Região', options: ['Residencial', 'Comercial', 'Industrial', 'Mista'], required: true },
        { id: 303, type: 'textarea', label: 'Descrição do Entorno', placeholder: 'Descreva as características do entorno...', required: false },
      ] 
    },
  ];

  // User roles for selection
  const userRoles = ['Analista', 'Engenheiro Avaliador', 'Gerente', 'Administrador'];
  const departments = ['Crédito Imobiliário', 'Avaliação', 'Operações', 'TI', 'Risco', 'Compliance'];

  // Form field handlers
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'Ativo'
  });

  // Service type form state
  const [newServiceType, setNewServiceType] = useState({
    name: '',
    description: '',
    templateId: '',
    cost: '',
    estimatedDays: '',
    status: 'Ativo'
  });

  const handleUserFormChange = (e) => {
    setNewUserData({
      ...newUserData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceTypeChange = (e) => {
    setNewServiceType({
      ...newServiceType,
      [e.target.name]: e.target.value
    });
  };

  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would add the user to the database
    setShowAddUserModal(false);
    alert('Usuário criado com sucesso!');
  };

  const handleFormEditorSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save the form template
    setShowEditFormModal(false);
    alert('Template de formulário salvo com sucesso!');
  };

  const handleServiceTypeSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save the service type
    setShowServiceTypeModal(false);
    alert('Tipo de serviço criado com sucesso!');
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
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-medium">JA</div>
              <span className="ml-2 text-sm">Juliana Alves</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Removed for integration with shared Navbar */}

        {/* Content area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Administração do Sistema</h2>
          </div>

          {/* Admin tabs */}
          <div className="bg-white rounded shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button 
                  className={`px-6 py-4 text-sm font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('users')}
                >
                  Gestão de Usuários
                </button>
                <button 
                  className={`px-6 py-4 text-sm font-medium ${activeTab === 'forms' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('forms')}
                >
                  Gestão de Formulários de Laudo de Avaliação
                </button>
                <button 
                  className={`px-6 py-4 text-sm font-medium ${activeTab === 'services' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('services')}
                >
                  Tipos de Serviço
                </button>
              </nav>
            </div>

            {/* User Management Content */}
            {activeTab === 'users' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Usuários do Sistema</h3>
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center text-sm font-medium"
                    onClick={() => setShowAddUserModal(true)}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Novo Usuário
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                        <th className="px-6 py-3">Nome</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Função</th>
                        <th className="px-6 py-3">Departamento</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Último Login</th>
                        <th className="px-6 py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map(user => (
                        <tr key={user.id} className="text-sm">
                          <td className="px-6 py-4 font-medium">{user.name}</td>
                          <td className="px-6 py-4">{user.email}</td>
                          <td className="px-6 py-4">{user.role}</td>
                          <td className="px-6 py-4">{user.department}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">{user.lastLogin}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-3">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit className="h-4 w-4" />
                              </button>
                              {user.status === 'Ativo' ? (
                                <button className="text-red-600 hover:text-red-800">
                                  <X className="h-4 w-4" />
                                </button>
                              ) : (
                                <button className="text-green-600 hover:text-green-800">
                                  <Check className="h-4 w-4" />
                                </button>
                              )}
                              <button className="text-gray-600 hover:text-gray-800">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Form Management Content */}
            {activeTab === 'forms' && (
              <div className="p-6">
                {/* Form management tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex">
                    <button 
                      className={`mr-8 py-2 text-sm font-medium ${activeFormTab === 'templates' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setActiveFormTab('templates')}
                    >
                      Templates de Laudos
                    </button>
                    <button 
                      className={`mr-8 py-2 text-sm font-medium ${activeFormTab === 'fields' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setActiveFormTab('fields')}
                    >
                      Campos Personalizados
                    </button>
                  </nav>
                </div>

                {/* Templates List */}
                {activeFormTab === 'templates' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Templates de Laudos de Avaliação</h3>
                      <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded flex items-center text-sm font-medium"
                        onClick={() => setShowEditFormModal(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Template
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                            <th className="px-6 py-3">Nome do Template</th>
                            <th className="px-6 py-3">Descrição</th>
                            <th className="px-6 py-3">Campos</th>
                            <th className="px-6 py-3">Última Atualização</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Serviços Relacionados</th>
                            <th className="px-6 py-3">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {formTemplates.map(template => (
                            <tr key={template.id} className="text-sm">
                              <td className="px-6 py-4 font-medium">{template.name}</td>
                              <td className="px-6 py-4">{template.description}</td>
                              <td className="px-6 py-4">{template.fields}</td>
                              <td className="px-6 py-4">{template.lastUpdated}</td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  template.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {template.status}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {serviceTypes.filter(service => service.templateId === template.id).length}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex space-x-3">
                                  <button 
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() => setShowEditFormModal(true)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </button>
                                  <button className="text-green-600 hover:text-green-800">
                                    <Copy className="h-4 w-4" />
                                  </button>
                                  {template.status === 'Ativo' ? (
                                    <button className="text-red-600 hover:text-red-800">
                                      <X className="h-4 w-4" />
                                    </button>
                                  ) : (
                                    <button className="text-green-600 hover:text-green-800">
                                      <Check className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Custom Fields */}
                {activeFormTab === 'fields' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-800">Campos Personalizados</h3>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center text-sm font-medium">
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Campo
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 mb-6 rounded">
                      <p className="text-sm text-gray-600">
                        Crie campos personalizados que podem ser utilizados em diferentes templates de laudos de avaliação. 
                        Campos personalizados podem ser do tipo texto, número, seleção, data, entre outros.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-white p-4 border border-gray-200 rounded shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">Índice de Conservação</h4>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Ativo</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Tipo: Seleção</p>
                        <p className="text-xs text-gray-500 mb-3">Opções: Ótimo, Bom, Regular, Ruim, Péssimo</p>
                        <div className="flex justify-end">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-white p-4 border border-gray-200 rounded shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">Valor do Condomínio</h4>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Ativo</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Tipo: Número</p>
                        <p className="text-xs text-gray-500 mb-3">Formato: R$ 0,00</p>
                        <div className="flex justify-end">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-white p-4 border border-gray-200 rounded shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">Destaque Comercial</h4>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Ativo</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Tipo: Texto</p>
                        <p className="text-xs text-gray-500 mb-3">Caracteres máximos: 200</p>
                        <div className="flex justify-end">
                          <button className="text-blue-600 hover:text-blue-800 mr-2">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Service Types Content */}
            {activeTab === 'services' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Tipos de Serviço de Avaliação</h3>
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center text-sm font-medium"
                    onClick={() => setShowServiceTypeModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Tipo de Serviço
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 mb-6 rounded">
                  <p className="text-sm text-gray-600">
                    Gerencie os tipos de serviço que serão oferecidos aos usuários do banco para solicitação de avaliações.
                    Cada tipo de serviço está associado a um template de laudo que o engenheiro avaliador deverá preencher.
                  </p>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                        <th className="px-6 py-3">Tipo de Serviço</th>
                        <th className="px-6 py-3">Descrição</th>
                        <th className="px-6 py-3">Template de Laudo</th>
                        <th className="px-6 py-3">Custo</th>
                        <th className="px-6 py-3">Prazo (dias)</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {serviceTypes.map(service => (
                        <tr key={service.id} className="text-sm">
                          <td className="px-6 py-4 font-medium">{service.name}</td>
                          <td className="px-6 py-4">{service.description}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {formTemplates.find(t => t.id === service.templateId)?.name}
                              <Link className="h-4 w-4 ml-1 text-blue-600" />
                            </div>
                          </td>
                          <td className="px-6 py-4">{service.cost}</td>
                          <td className="px-6 py-4">{service.estimatedDays}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              service.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {service.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-3">
                              <button className="text-blue-600 hover:text-blue-800">
                                <Edit className="h-4 w-4" />
                              </button>
                              {service.status === 'Ativo' ? (
                                <button className="text-red-600 hover:text-red-800">
                                  <X className="h-4 w-4" />
                                </button>
                              ) : (
                                <button className="text-green-600 hover:text-green-800">
                                  <Check className="h-4 w-4" />
                                </button>
                              )}
                              <button className="text-gray-600 hover:text-gray-800">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-lg w-full max-w-xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Adicionar Novo Usuário</h3>
            </div>
            <form onSubmit={handleUserFormSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  <input 
                    type="text" 
                    name="name"
                    value={newUserData.name}
                    onChange={handleUserFormChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={newUserData.email}
                    onChange={handleUserFormChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Função</label>
                    <select 
                      name="role" 
                      value={newUserData.role}
                      onChange={handleUserFormChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="">Selecione...</option>
                      {userRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                    <select 
                      name="department" 
                      value={newUserData.department}
                      onChange={handleUserFormChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="">Selecione...</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="status" 
                        value="Ativo" 
                        checked={newUserData.status === 'Ativo'}
                        onChange={handleUserFormChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-sm">Ativo</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="status" 
                        value="Inativo" 
                        checked={newUserData.status === 'Inativo'}
                        onChange={handleUserFormChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-sm">Inativo</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button 
                  type="button" 
                  className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 rounded text-sm font-medium text-white hover:bg-blue-700"
                >
                  Adicionar Usuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Form Template Modal */}
      {showEditFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-lg w-full max-w-4xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Editor de Template de Laudo</h3>
            </div>
            <form onSubmit={handleFormEditorSubmit}>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Template</label>
                    <input 
                      type="text" 
                      defaultValue="Avaliação Residencial Padrão"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      defaultValue="Ativo"
                    >
                      <option value="Rascunho">Rascunho</option>
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows="2"
                    defaultValue="Template para avaliação de imóveis residenciais"
                  ></textarea>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Seções do Laudo</h4>
                    <button 
                      type="button"
                      className="text-sm text-blue-600 flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Seção
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formEditorSections.map((section) => (
                      <div key={section.id} className="border border-gray-200 rounded bg-white">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                          <h5 className="font-medium">{section.name}</h5>
                          <div className="flex space-x-2">
                            <button type="button" className="text-blue-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button type="button" className="text-gray-600">
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <table className="min-w-full">
                            <thead>
                              <tr className="text-left text-xs font-medium text-gray-500 uppercase">
                                <th className="px-4 py-2">Campo</th>
                                <th className="px-4 py-2">Tipo</th>
                                <th className="px-4 py-2 text-center">Obrigatório</th>
                                <th className="px-4 py-2 text-right">Ações</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {section.fields.map((field) => (
                                <tr key={field.id} className="text-sm">
                                  <td className="px-4 py-2">{field.label}</td>
                                  <td className="px-4 py-2 capitalize">{field.type}</td>
                                  <td className="px-4 py-2 text-center">
                                    {field.required ? (
                                      <Check className="h-4 w-4 text-green-600 inline" />
                                    ) : (
                                      <X className="h-4 w-4 text-gray-400 inline" />
                                    )}
                                  </td>
                                  <td className="px-4 py-2 text-right">
                                    <div className="flex space-x-2 justify-end">
                                      <button type="button" className="text-blue-600">
                                        <Edit className="h-4 w-4" />
                                      </button>
                                      <button type="button" className="text-red-600">
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="mt-3 flex justify-end">
                            <button 
                              type="button"
                              className="text-sm text-blue-600 flex items-center"
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Adicionar Campo
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-between">
                <div>
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <FileUp className="h-4 w-4 mr-2" />
                    Importar Template
                  </button>
                </div>
                <div className="flex space-x-3">
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowEditFormModal(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 rounded text-sm font-medium text-white hover:bg-blue-700 flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Template
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Service Type Modal */}
      {showServiceTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded shadow-lg w-full max-w-xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Novo Tipo de Serviço</h3>
            </div>
            <form onSubmit={handleServiceTypeSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Serviço</label>
                  <input 
                    type="text" 
                    name="name"
                    value={newServiceType.name}
                    onChange={handleServiceTypeChange}
                    placeholder="Ex: Avaliação para Financiamento Residencial"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea 
                    name="description"
                    value={newServiceType.description}
                    onChange={handleServiceTypeChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows="2"
                    placeholder="Breve descrição do serviço"
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Template de Laudo Associado</label>
                  <select 
                    name="templateId" 
                    value={newServiceType.templateId}
                    onChange={handleServiceTypeChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione...</option>
                    {formTemplates.map(template => (
                      <option key={template.id} value={template.id}>{template.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Custo (R$)</label>
                    <input 
                      type="text" 
                      name="cost"
                      value={newServiceType.cost}
                      onChange={handleServiceTypeChange}
                      placeholder="Ex: R$ 800,00"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prazo Estimado (dias)</label>
                    <input 
                      type="number" 
                      name="estimatedDays"
                      value={newServiceType.estimatedDays}
                      onChange={handleServiceTypeChange}
                      placeholder="Ex: 7"
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="status" 
                        value="Ativo" 
                        checked={newServiceType.status === 'Ativo'}
                        onChange={handleServiceTypeChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-sm">Ativo</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="status" 
                        value="Inativo" 
                        checked={newServiceType.status === 'Inativo'}
                        onChange={handleServiceTypeChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-sm">Inativo</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button 
                  type="button" 
                  className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowServiceTypeModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 rounded text-sm font-medium text-white hover:bg-blue-700"
                >
                  Adicionar Serviço
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;