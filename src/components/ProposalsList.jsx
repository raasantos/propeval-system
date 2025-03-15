import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Settings, 
  RefreshCw,
  Check,
  X,
  Sliders,
  Calendar,
  Home,
  User,
  DollarSign,
  FileText,
  ArrowUpDown,
  AlertCircle,
  Building,
  MapPin,
  Briefcase
} from 'lucide-react';
import { Tooltip } from 'react-tooltip';

const ProposalsList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Pegar parâmetros da URL
  const initialFilter = searchParams.get('filter') || 'recent30days';
  const initialSearchQuery = searchParams.get('search') || '';
  
  // Estado para dados e UI
  const [proposals, setProposals] = useState([]);
  const [allProposals, setAllProposals] = useState([]); // Armazena todas as propostas carregadas
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: 'requestDate', direction: 'desc' });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  
  // Estado para filtros avançados
  const [advancedFilters, setAdvancedFilters] = useState({
    status: [],
    propertyType: [],
    dateRange: { start: '', end: '' },
    evaluator: '',
    costRange: { min: '', max: '' }
  });

  // Estado para a pesquisa avançada (com múltiplos critérios)
  const [searchCriteria, setSearchCriteria] = useState({
    general: '',
    status: '',
    creationDateRange: { start: '', end: '' },
    dueDateRange: { start: '', end: '' },
    evaluationCompany: '',
    location: { state: '', city: '' }
  });
  
  // Estado para as colunas visíveis (com valores padrão)
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const savedColumns = localStorage.getItem('proposalVisibleColumns');
    return savedColumns ? JSON.parse(savedColumns) : {
      id: true,
      propertyType: true,
      address: true,
      requestDate: true,
      status: true,
      estimatedCost: true,
      dueDate: true,
      evaluator: false,
      evaluationCompany: false,
      department: false,
      requestor: false,
      state: false,
      city: true
    };
  });

  // Todas as colunas disponíveis com seus labels
  const availableColumns = [
    { id: 'id', label: 'ID', icon: <FileText className="h-4 w-4 mr-2" /> },
    { id: 'propertyType', label: 'Tipo de Imóvel', icon: <Home className="h-4 w-4 mr-2" /> },
    { id: 'address', label: 'Endereço', icon: <MapPin className="h-4 w-4 mr-2" /> },
    { id: 'state', label: 'Estado', icon: <MapPin className="h-4 w-4 mr-2" /> },
    { id: 'city', label: 'Cidade', icon: <Building className="h-4 w-4 mr-2" /> },
    { id: 'requestDate', label: 'Data da Solicitação', icon: <Calendar className="h-4 w-4 mr-2" /> },
    { id: 'status', label: 'Status', icon: <AlertCircle className="h-4 w-4 mr-2" /> },
    { id: 'estimatedCost', label: 'Custo Estimado', icon: <DollarSign className="h-4 w-4 mr-2" /> },
    { id: 'dueDate', label: 'Vencimento', icon: <Calendar className="h-4 w-4 mr-2" /> },
    { id: 'evaluator', label: 'Avaliador', icon: <User className="h-4 w-4 mr-2" /> },
    { id: 'evaluationCompany', label: 'Empresa de Avaliação', icon: <Briefcase className="h-4 w-4 mr-2" /> },
    { id: 'department', label: 'Departamento', icon: <FileText className="h-4 w-4 mr-2" /> },
    { id: 'requestor', label: 'Solicitante', icon: <User className="h-4 w-4 mr-2" /> }
  ];

  // Filtros rápidos disponíveis
  const quickFilters = [
    { id: 'recent30days', label: 'Últimos 30 dias' },
    { id: 'all', label: 'Todas' },
    { id: 'pending', label: 'Aguardando Avaliação' },
    { id: 'inProgress', label: 'Em Análise' },
    { id: 'resolved', label: 'Concluídas' },
    { id: 'dueToday', label: 'Vencendo Hoje' },
    { id: 'delayed', label: 'Atrasadas' },
    { id: 'customSearch', label: 'Pesquisa Personalizada' }
  ];

  // Opções de status para pesquisa específica
  const statusOptions = [
    'Aguardando avaliação', 
    'Em análise', 
    'Reavaliação solicitada', 
    'Concluído', 
    'Cancelado'
  ];

  // Lista de estados para o filtro de localização
  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  // Lista de empresas para o filtro
  const evaluationCompanies = [
    'Avaliação Precisa Ltda',
    'ValorImob Consultoria',
    'Prime Avaliadores S.A.',
    'Engeval Engenharia',
    'Exata Perícias'
  ];

  // Carregar dados
  useEffect(() => {
    fetchProposals();
  }, []);

  // Aplicar filtro atual aos dados
  useEffect(() => {
    if (allProposals.length > 0) {
      applyInitialFilter();
    }
  }, [allProposals, activeFilter]);

  // Persiste as colunas visíveis no localStorage
  useEffect(() => {
    localStorage.setItem('proposalVisibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  // Função para buscar propostas (simulada)
  const fetchProposals = () => {
    setLoading(true);
    
    // Simulação de chamada de API
    setTimeout(() => {
      // Dados de exemplo
      const mockProposals = [
        { id: 'P2025-0103', propertyType: 'Residencial', address: 'Av. Paulista, 1000', city: 'São Paulo', state: 'SP', requestDate: '10/03/2025', status: 'Aguardando avaliação', estimatedCost: 'R$ 3.500,00', dueDate: '17/03/2025', evaluator: '', evaluationCompany: '', department: 'Crédito Imobiliário', requestor: 'João Silva' },
        { id: 'P2025-0102', propertyType: 'Comercial', address: 'Rua Augusta, 500', city: 'São Paulo', state: 'SP', requestDate: '09/03/2025', status: 'Em análise', estimatedCost: 'R$ 5.200,00', dueDate: '15/03/2025', evaluator: 'Ana Oliveira', evaluationCompany: 'Avaliação Precisa Ltda', department: 'Análise de Risco', requestor: 'Maria Santos' },
        { id: 'P2025-0101', propertyType: 'Industrial', address: 'Rod. Anhanguera, KM 15', city: 'Campinas', state: 'SP', requestDate: '08/03/2025', status: 'Reavaliação solicitada', estimatedCost: 'R$ 8.700,00', dueDate: '22/03/2025', evaluator: 'Carlos Mendes', evaluationCompany: 'Engeval Engenharia', department: 'Crédito Imobiliário', requestor: 'Pedro Costa' },
        { id: 'P2025-0100', propertyType: 'Residencial', address: 'Rua dos Pinheiros, 750', city: 'São Paulo', state: 'SP', requestDate: '06/03/2025', status: 'Em análise', estimatedCost: 'R$ 2.900,00', dueDate: '15/03/2025', evaluator: 'Ana Oliveira', evaluationCompany: 'Avaliação Precisa Ltda', department: 'Operações', requestor: 'Roberto Alves' },
        { id: 'P2025-0099', propertyType: 'Comercial', address: 'Av. Faria Lima, 3000', city: 'São Paulo', state: 'SP', requestDate: '05/03/2025', status: 'Aguardando avaliação', estimatedCost: 'R$ 6.100,00', dueDate: '15/03/2025', evaluator: '', evaluationCompany: '', department: 'Crédito Imobiliário', requestor: 'Juliana Lima' },
        { id: 'P2025-0098', propertyType: 'Rural', address: 'Estrada Vicinal, s/n', city: 'Ribeirão Preto', state: 'SP', requestDate: '04/03/2025', status: 'Concluído', estimatedCost: 'R$ 12.300,00', dueDate: '10/03/2025', evaluator: 'Marcos Santos', evaluationCompany: 'ValorImob Consultoria', department: 'Análise de Risco', requestor: 'Fernando Costa' },
        { id: 'P2025-0097', propertyType: 'Residencial', address: 'Rua Oscar Freire, 200', city: 'São Paulo', state: 'SP', requestDate: '03/03/2025', status: 'Concluído', estimatedCost: 'R$ 4.800,00', dueDate: '09/03/2025', evaluator: 'Ana Oliveira', evaluationCompany: 'Avaliação Precisa Ltda', department: 'Crédito Imobiliário', requestor: 'Camila Ferreira' },
        { id: 'P2025-0096', propertyType: 'Comercial', address: 'Av. Brigadeiro Faria Lima, 1500', city: 'São Paulo', state: 'SP', requestDate: '02/03/2025', status: 'Concluído', estimatedCost: 'R$ 7.500,00', dueDate: '08/03/2025', evaluator: 'Carlos Mendes', evaluationCompany: 'Engeval Engenharia', department: 'Operações', requestor: 'Marcelo Souza' },
        { id: 'P2025-0095', propertyType: 'Residencial', address: 'Rua Pamplona, 1000', city: 'São Paulo', state: 'SP', requestDate: '01/03/2025', status: 'Concluído', estimatedCost: 'R$ 3.200,00', dueDate: '07/03/2025', evaluator: 'Marcos Santos', evaluationCompany: 'Prime Avaliadores S.A.', department: 'Crédito Imobiliário', requestor: 'Luciana Almeida' },
        { id: 'P2025-0094', propertyType: 'Industrial', address: 'Avenida Brasil, 5000', city: 'Rio de Janeiro', state: 'RJ', requestDate: '28/02/2025', status: 'Cancelado', estimatedCost: 'R$ 9.100,00', dueDate: '06/03/2025', evaluator: '', evaluationCompany: '', department: 'Análise de Risco', requestor: 'Rafael Moreira' },
        { id: 'P2025-0093', propertyType: 'Comercial', address: 'Av. Paulista, 2000', city: 'São Paulo', state: 'SP', requestDate: '27/02/2025', status: 'Concluído', estimatedCost: 'R$ 5.600,00', dueDate: '05/03/2025', evaluator: 'Ana Oliveira', evaluationCompany: 'Avaliação Precisa Ltda', department: 'Crédito Imobiliário', requestor: 'Bruno Castro' },
        { id: 'P2025-0092', propertyType: 'Residencial', address: 'Rua Haddock Lobo, 400', city: 'São Paulo', state: 'SP', requestDate: '26/02/2025', status: 'Concluído', estimatedCost: 'R$ 2.800,00', dueDate: '04/03/2025', evaluator: 'Carlos Mendes', evaluationCompany: 'Engeval Engenharia', department: 'Operações', requestor: 'Amanda Dias' },
        { id: 'P2025-0091', propertyType: 'Rural', address: 'Rodovia dos Bandeirantes, KM 72', city: 'Jundiaí', state: 'SP', requestDate: '25/02/2025', status: 'Concluído', estimatedCost: 'R$ 15.200,00', dueDate: '03/03/2025', evaluator: 'Marcos Santos', evaluationCompany: 'ValorImob Consultoria', department: 'Análise de Risco', requestor: 'Ricardo Oliveira' },
        { id: 'P2025-0090', propertyType: 'Comercial', address: 'Av. Rebouças, 1200', city: 'São Paulo', state: 'SP', requestDate: '24/02/2025', status: 'Concluído', estimatedCost: 'R$ 6.400,00', dueDate: '02/03/2025', evaluator: 'Ana Oliveira', evaluationCompany: 'Prime Avaliadores S.A.', department: 'Crédito Imobiliário', requestor: 'Carla Mendes' },
        { id: 'P2025-0089', propertyType: 'Residencial', address: 'Rua Augusta, 1500', city: 'São Paulo', state: 'SP', requestDate: '23/02/2025', status: 'Concluído', estimatedCost: 'R$ 3.900,00', dueDate: '01/03/2025', evaluator: 'Carlos Mendes', evaluationCompany: 'Engeval Engenharia', department: 'Operações', requestor: 'Paulo Rodrigues' },
        // Propostas mais antigas (mais de 30 dias)
        { id: 'P2025-0073', propertyType: 'Comercial', address: 'Av. Nove de Julho, 3000', city: 'São Paulo', state: 'SP', requestDate: '10/02/2025', status: 'Concluído', estimatedCost: 'R$ 8.300,00', dueDate: '20/02/2025', evaluator: 'Marcos Santos', evaluationCompany: 'ValorImob Consultoria', department: 'Análise de Risco', requestor: 'Fernando Costa' },
        { id: 'P2025-0068', propertyType: 'Residencial', address: 'Alameda Santos, 800', city: 'São Paulo', state: 'SP', requestDate: '05/02/2025', status: 'Concluído', estimatedCost: 'R$ 4.100,00', dueDate: '15/02/2025', evaluator: 'Ana Oliveira', evaluationCompany: 'Avaliação Precisa Ltda', department: 'Crédito Imobiliário', requestor: 'Camila Ferreira' },
        { id: 'P2025-0062', propertyType: 'Industrial', address: 'Rodovia Dutra, KM 230', city: 'São José dos Campos', state: 'SP', requestDate: '29/01/2025', status: 'Concluído', estimatedCost: 'R$ 18.500,00', dueDate: '10/02/2025', evaluator: 'Carlos Mendes', evaluationCompany: 'Engeval Engenharia', department: 'Operações', requestor: 'Marcelo Souza' },
        { id: 'P2025-0057', propertyType: 'Comercial', address: 'Av. Rio Branco, 500', city: 'Rio de Janeiro', state: 'RJ', requestDate: '22/01/2025', status: 'Concluído', estimatedCost: 'R$ 6.700,00', dueDate: '05/02/2025', evaluator: 'Marcos Santos', evaluationCompany: 'Prime Avaliadores S.A.', department: 'Crédito Imobiliário', requestor: 'Luciana Almeida' },
        // Exemplos para Sorocaba, São Paulo para caso de teste
        { id: 'P2025-0044', propertyType: 'Residencial', address: 'Rua XV de Novembro, 500', city: 'Sorocaba', state: 'SP', requestDate: '15/01/2025', status: 'Concluído', estimatedCost: 'R$ 3.200,00', dueDate: '30/01/2025', evaluator: 'Ana Oliveira', evaluationCompany: 'Avaliação Precisa Ltda', department: 'Crédito Imobiliário', requestor: 'Felipe Castro' },
        { id: 'P2025-0043', propertyType: 'Comercial', address: 'Av. Barão de Tatuí, 1200', city: 'Sorocaba', state: 'SP', requestDate: '14/01/2025', status: 'Cancelado', estimatedCost: 'R$ 4.300,00', dueDate: '16/08/2025', evaluator: 'Carlos Mendes', evaluationCompany: 'Engeval Engenharia', department: 'Operações', requestor: 'Marcela Souza' },
        { id: 'P2025-0042', propertyType: 'Residencial', address: 'Rua Sete de Setembro, 350', city: 'Sorocaba', state: 'SP', requestDate: '13/01/2025', status: 'Cancelado', estimatedCost: 'R$ 2.800,00', dueDate: '16/08/2025', evaluator: 'Marcos Santos', evaluationCompany: 'ValorImob Consultoria', department: 'Crédito Imobiliário', requestor: 'Rodrigo Lima' }
      ];
      
      setAllProposals(mockProposals);
      setLoading(false);
    }, 600);
  };

  // Aplicar filtro inicial aos dados
  const applyInitialFilter = () => {
    let filteredProposals = [...allProposals];
    
    // Filtrar baseado no activeFilter
    if (activeFilter === 'recent30days') {
      // Filtrar propostas dos últimos 30 dias
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      filteredProposals = allProposals.filter(p => {
        const proposalDate = new Date(p.requestDate.split('/').reverse().join('-'));
        return proposalDate >= thirtyDaysAgo;
      });
    } else if (activeFilter === 'pending') {
      filteredProposals = allProposals.filter(p => p.status === 'Aguardando avaliação');
    } else if (activeFilter === 'inProgress') {
      filteredProposals = allProposals.filter(p => p.status === 'Em análise');
    } else if (activeFilter === 'resolved') {
      filteredProposals = allProposals.filter(p => p.status === 'Concluído');
    } else if (activeFilter === 'dueToday') {
      // Considerar vencendo hoje (simplificação para o exemplo)
      filteredProposals = allProposals.filter(p => p.dueDate === '15/03/2025');
    } else if (activeFilter === 'delayed') {
      // Considerando atrasado qualquer proposta não concluída com data anterior a hoje
      filteredProposals = allProposals.filter(p => 
        p.status !== 'Concluído' && 
        p.status !== 'Cancelado' && 
        new Date(p.dueDate.split('/').reverse().join('-')) < new Date('2025-03-15')
      );
    }
    
    setProposals(filteredProposals);
  };

  // Função para executar a pesquisa avançada
  const performSearch = () => {
    let results = [...allProposals];
    
    // Aplicar pesquisa geral (se tiver)
    if (searchCriteria.general) {
      const query = searchCriteria.general.toLowerCase();
      results = results.filter(proposal => 
        proposal.id.toLowerCase().includes(query) ||
        proposal.address.toLowerCase().includes(query) ||
        proposal.propertyType.toLowerCase().includes(query) ||
        proposal.status.toLowerCase().includes(query) ||
        proposal.city.toLowerCase().includes(query) ||
        proposal.state.toLowerCase().includes(query) ||
        (proposal.evaluator && proposal.evaluator.toLowerCase().includes(query)) ||
        (proposal.evaluationCompany && proposal.evaluationCompany.toLowerCase().includes(query))
      );
    }
    
    // Aplicar filtro por status (se selecionado)
    if (searchCriteria.status) {
      results = results.filter(proposal => proposal.status === searchCriteria.status);
    }
    
    // Aplicar filtro por data de criação (se datas fornecidas)
    if (searchCriteria.creationDateRange.start || searchCriteria.creationDateRange.end) {
      results = results.filter(proposal => {
        const proposalDate = new Date(proposal.requestDate.split('/').reverse().join('-'));
        let isWithinRange = true;
        
        if (searchCriteria.creationDateRange.start) {
          const startDate = new Date(searchCriteria.creationDateRange.start);
          isWithinRange = isWithinRange && proposalDate >= startDate;
        }
        
        if (searchCriteria.creationDateRange.end) {
          const endDate = new Date(searchCriteria.creationDateRange.end);
          isWithinRange = isWithinRange && proposalDate <= endDate;
        }
        
        return isWithinRange;
      });
    }
    
    // Aplicar filtro por data de vencimento (se datas fornecidas)
    if (searchCriteria.dueDateRange.start || searchCriteria.dueDateRange.end) {
      results = results.filter(proposal => {
        const dueDate = new Date(proposal.dueDate.split('/').reverse().join('-'));
        let isWithinRange = true;
        
        if (searchCriteria.dueDateRange.start) {
          const startDate = new Date(searchCriteria.dueDateRange.start);
          isWithinRange = isWithinRange && dueDate >= startDate;
        }
        
        if (searchCriteria.dueDateRange.end) {
          const endDate = new Date(searchCriteria.dueDateRange.end);
          isWithinRange = isWithinRange && dueDate <= endDate;
        }
        
        return isWithinRange;
      });
    }
    
    // Aplicar filtro por empresa de avaliação (se preenchido)
    if (searchCriteria.evaluationCompany) {
      results = results.filter(proposal => 
        proposal.evaluationCompany && 
        proposal.evaluationCompany.toLowerCase().includes(searchCriteria.evaluationCompany.toLowerCase())
      );
    }
    
    // Aplicar filtro por localização (se estado ou cidade preenchidos)
    if (searchCriteria.location.state || searchCriteria.location.city) {
      results = results.filter(proposal => {
        let matchesState = true;
        let matchesCity = true;
        
        if (searchCriteria.location.state) {
          matchesState = proposal.state === searchCriteria.location.state;
        }
        
        if (searchCriteria.location.city) {
          matchesCity = proposal.city.toLowerCase().includes(searchCriteria.location.city.toLowerCase());
        }
        
        return matchesState && matchesCity;
      });
    }
    
    // Atualizar as propostas filtradas
    setProposals(results);
    setCurrentPage(1); // Resetar para primeira página
    // Fechar o painel de pesquisa
    setShowSearchPanel(false);
    
    // Atualizar o estado de pesquisa para exibir informações sobre critérios aplicados
    const hasActiveSearch = Object.entries(searchCriteria).some(([key, value]) => {
      if (key === 'location' || key === 'creationDateRange' || key === 'dueDateRange') {
        return Object.values(value).some(v => v !== '');
      }
      return value !== '';
    });
    
    if (hasActiveSearch) {
      setActiveFilter('customSearch');
    }
  };

  // Função para limpar todos os critérios de pesquisa
  const clearSearchCriteria = () => {
    setSearchCriteria({
      general: '',
      status: '',
      creationDateRange: { start: '', end: '' },
      dueDateRange: { start: '', end: '' },
      evaluationCompany: '',
      location: { state: '', city: '' }
    });
  };

  // Função para atualizar os critérios de pesquisa
  const handleSearchCriteriaChange = (field, value) => {
    if (field.includes('.')) {
      // Manipular campos aninhados (como dateRange.start)
      const [parent, child] = field.split('.');
      setSearchCriteria(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      // Campos simples
      setSearchCriteria(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Aplicar filtros avançados aos dados já filtrados
  const filteredAndSortedProposals = useMemo(() => {
    let result = [...proposals];
    
    // Aplicar os filtros avançados selecionados
    if (advancedFilters.status.length > 0) {
      result = result.filter(proposal => advancedFilters.status.includes(proposal.status));
    }
    
    if (advancedFilters.propertyType.length > 0) {
      result = result.filter(proposal => advancedFilters.propertyType.includes(proposal.propertyType));
    }
    
    if (advancedFilters.evaluator) {
      result = result.filter(proposal => 
        proposal.evaluator && proposal.evaluator.toLowerCase().includes(advancedFilters.evaluator.toLowerCase())
      );
    }
    
    // Por fim, aplicamos a ordenação
    if (sortConfig.key) {
      result.sort((a, b) => {
        // Ignora case para ordenação de strings
        const aValue = typeof a[sortConfig.key] === 'string' ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
        const bValue = typeof b[sortConfig.key] === 'string' ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return result;
  }, [proposals, advancedFilters, sortConfig]);
  
  // Dados paginados
  const paginatedProposals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProposals.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedProposals, currentPage, itemsPerPage]);
  
  // Função de ordenação
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Função para alternar visibilidade de uma coluna
  const toggleColumnVisibility = (columnId) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };
  
  // Função para navegar para detalhes da proposta
  const handleViewProposal = (id) => {
    navigate(`/proposals/${id}`);
  };
  
  // Função para aplicar o filtro rápido
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Resetar para a primeira página
    
    // Atualizar a URL com o filtro
    const params = new URLSearchParams(location.search);
    params.set('filter', filter);
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };
  
  // Função para atualizar os filtros avançados
  const handleAdvancedFilterChange = (filterType, value) => {
    setAdvancedFilters(prev => {
      // Lógica especial para arrays (status, propertyType)
      if (filterType === 'status' || filterType === 'propertyType') {
        // Se já existe, remove; senão adiciona
        const updatedArray = prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value];
          
        return { ...prev, [filterType]: updatedArray };
      }
      
      // Para outros tipos de filtro
      return { ...prev, [filterType]: value };
    });
  };
  
  // Função para limpar todos os filtros
  const clearAllFilters = () => {
    setAdvancedFilters({
      status: [],
      propertyType: [],
      dateRange: { start: '', end: '' },
      evaluator: '',
      costRange: { min: '', max: '' }
    });
    setActiveFilter('recent30days');
    
    // Limpar parâmetros da URL
    const params = new URLSearchParams();
    params.set('filter', 'recent30days');
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
    
    // Reaplica o filtro de 30 dias
    applyInitialFilter();
  };
  
  // Função para exportar dados
  const handleExport = () => {
    alert('Funcionalidade de exportação será implementada aqui.');
  };
  
  // Helper function para obter a cor do status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Aguardando avaliação':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em análise':
      case 'Reavaliação solicitada':
        return 'bg-blue-100 text-blue-800';
      case 'Concluído':
        return 'bg-green-100 text-green-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Conjunto de tipos de propriedade para filtros
  const propertyTypeOptions = ['Residencial', 'Comercial', 'Industrial', 'Rural'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Propostas</h1>
        <div className="flex items-center space-x-3">
          <button 
            className="text-gray-600 hover:text-gray-800 px-3 py-1 border border-gray-300 rounded flex items-center text-sm"
            onClick={fetchProposals}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </button>
          <button 
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center text-sm font-medium"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </button>
        </div>
      </div>
      
      {/* Barra de pesquisa e filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto mb-4 md:mb-0">
            {/* Botão de Pesquisa */}
            <button 
              className="px-3 py-2 border border-gray-300 rounded-lg flex items-center text-blue-600 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => setShowSearchPanel(!showSearchPanel)}
              data-tooltip-id="search-button-tooltip"
            >
              <Search className="h-4 w-4 mr-2" />
              Pesquisar
            </button>
            <Tooltip 
              id="search-button-tooltip" 
              place="top"
              content="Abrir painel de pesquisa avançada"
            />
            
            {/* Botão de Filtros Avançados */}
            <button 
              className="px-3 py-2 border border-gray-300 rounded-lg flex items-center text-gray-600 hover:bg-gray-50"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              data-tooltip-id="advanced-filters-tooltip"
            >
              <Sliders className="h-4 w-4 mr-2" />
              Filtros
            </button>
            <Tooltip 
              id="advanced-filters-tooltip" 
              place="top"
              content="Expandir opções de filtro avançadas"
            />
          </div>
          
          <div className="relative flex items-center w-full md:w-auto">
            <button 
              className="px-3 py-2 border border-gray-300 rounded-lg flex items-center text-gray-600 hover:bg-gray-50"
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              data-tooltip-id="column-selector-tooltip"
            >
              <Settings className="h-4 w-4 mr-2" />
              Colunas
            </button>
            <Tooltip 
              id="column-selector-tooltip" 
              place="top"
              content="Selecionar colunas visíveis"
            />
            
            {/* Dropdown de seleção de colunas */}
            {showColumnSelector && (
              <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2">
                <div className="border-b border-gray-200 pb-2 mb-2">
                  <h3 className="font-medium text-gray-700 text-sm">Selecionar colunas visíveis</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {availableColumns.map(column => (
                    <div key={column.id} className="flex items-center py-1 px-2 hover:bg-gray-50 rounded">
                      <input 
                        type="checkbox"
                        id={`column-${column.id}`}
                        checked={visibleColumns[column.id] || false}
                        onChange={() => toggleColumnVisibility(column.id)}
                        className="mr-2"
                      />
                      <label htmlFor={`column-${column.id}`} className="flex items-center text-sm cursor-pointer">
                        {column.icon}
                        {column.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Painel de Pesquisa Avançada */}
        {showSearchPanel && (
          <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-700">Pesquisa Avançada</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowSearchPanel(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-gray-100 mb-3">
              <p className="text-xs text-gray-500 mb-2">
                <AlertCircle className="h-3 w-3 inline mr-1 text-blue-500" />
                Preencha um ou mais campos para criar uma pesquisa personalizada. Todos os critérios serão combinados (operador E).
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pesquisa Geral */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pesquisa Geral</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Pesquisar em todos os campos..."
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={searchCriteria.general}
                    onChange={(e) => handleSearchCriteriaChange('general', e.target.value)}
                  />
                </div>
              </div>
              
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchCriteria.status}
                  onChange={(e) => handleSearchCriteriaChange('status', e.target.value)}
                >
                  <option value="">Qualquer status</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              {/* Empresa de Avaliação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa de Avaliação</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchCriteria.evaluationCompany}
                  onChange={(e) => handleSearchCriteriaChange('evaluationCompany', e.target.value)}
                >
                  <option value="">Qualquer empresa</option>
                  {evaluationCompanies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              
              {/* Localização */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <select
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchCriteria.location.state}
                      onChange={(e) => handleSearchCriteriaChange('location.state', e.target.value)}
                    >
                      <option value="">Todos os estados</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <input 
                      type="text"
                      placeholder="Cidade"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchCriteria.location.city}
                      onChange={(e) => handleSearchCriteriaChange('location.city', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Data de Criação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Criação</label>
                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <input 
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchCriteria.creationDateRange.start}
                      onChange={(e) => handleSearchCriteriaChange('creationDateRange.start', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <input 
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchCriteria.creationDateRange.end}
                      onChange={(e) => handleSearchCriteriaChange('creationDateRange.end', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Data de Vencimento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Vencimento</label>
                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                  <div className="flex-1">
                    <input 
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchCriteria.dueDateRange.start}
                      onChange={(e) => handleSearchCriteriaChange('dueDateRange.start', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <input 
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchCriteria.dueDateRange.end}
                      onChange={(e) => handleSearchCriteriaChange('dueDateRange.end', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Botões de Ação */}
            <div className="flex justify-end mt-4">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 mr-3"
                onClick={clearSearchCriteria}
              >
                Limpar
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                onClick={performSearch}
              >
                Pesquisar
              </button>
            </div>
          </div>
        )}
        
        {/* Filtros rápidos */}
        <div className="flex flex-wrap gap-2">
          {quickFilters.map(filter => (
            <button
              key={filter.id}
              className={`px-3 py-1 text-sm rounded-full ${
                activeFilter === filter.id 
                  ? 'bg-blue-100 text-blue-800 border border-blue-300' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Filtros avançados (expansível) */}
        {showAdvancedFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Filtro por Status */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                <div className="space-y-1">
                  {statusOptions.map(status => (
                    <div key={status} className="flex items-center">
                      <input 
                        type="checkbox"
                        id={`status-${status}`}
                        checked={advancedFilters.status.includes(status)}
                        onChange={() => handleAdvancedFilterChange('status', status)}
                        className="mr-2"
                      />
                      <label htmlFor={`status-${status}`} className="text-sm">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Filtro por Tipo de Propriedade */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Tipo de Imóvel</h3>
                <div className="space-y-1">
                  {propertyTypeOptions.map(type => (
                    <div key={type} className="flex items-center">
                      <input 
                        type="checkbox"
                        id={`type-${type}`}
                        checked={advancedFilters.propertyType.includes(type)}
                        onChange={() => handleAdvancedFilterChange('propertyType', type)}
                        className="mr-2"
                      />
                      <label htmlFor={`type-${type}`} className="text-sm">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Filtro por Avaliador */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Avaliador</h3>
                <input 
                  type="text"
                  placeholder="Nome do avaliador"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={advancedFilters.evaluator}
                  onChange={(e) => handleAdvancedFilterChange('evaluator', e.target.value)}
                />
              </div>
              
              {/* Filtros por intervalo de datas */}
              <div className="md:col-span-2 lg:col-span-1">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Período de Solicitação</h3>
                <div className="flex space-x-2">
                  <input 
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={advancedFilters.dateRange.start}
                    onChange={(e) => handleAdvancedFilterChange('dateRange', { ...advancedFilters.dateRange, start: e.target.value })}
                  />
                  <span className="self-center">até</span>
                  <input 
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={advancedFilters.dateRange.end}
                    onChange={(e) => handleAdvancedFilterChange('dateRange', { ...advancedFilters.dateRange, end: e.target.value })}
                  />
                </div>
              </div>
              
              {/* Filtros por valor */}
              <div className="md:col-span-2 lg:col-span-1">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Valor Estimado</h3>
                <div className="flex space-x-2">
                  <input 
                    type="text"
                    placeholder="Mínimo"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={advancedFilters.costRange.min}
                    onChange={(e) => handleAdvancedFilterChange('costRange', { ...advancedFilters.costRange, min: e.target.value })}
                  />
                  <span className="self-center">até</span>
                  <input 
                    type="text"
                    placeholder="Máximo"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={advancedFilters.costRange.max}
                    onChange={(e) => handleAdvancedFilterChange('costRange', { ...advancedFilters.costRange, max: e.target.value })}
                  />
                </div>
              </div>
            </div>
            
            {/* Botões de ação para filtros */}
            <div className="flex justify-end mt-4">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 mr-3"
                onClick={clearAllFilters}
              >
                Limpar Filtros
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                onClick={() => setShowAdvancedFilters(false)}
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Resumo de filtros aplicados */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          {filteredAndSortedProposals.length} propostas encontradas
          {activeFilter === 'recent30days' && 
            !Object.values(searchCriteria).some(v => v !== '' && typeof v === 'string') && 
            !Object.values(searchCriteria.location).some(v => v !== '') &&
            !Object.values(searchCriteria.creationDateRange).some(v => v !== '') &&
            !Object.values(searchCriteria.dueDateRange).some(v => v !== '') && (
            <span className="ml-1 text-gray-500">(mostrando últimos 30 dias)</span>
          )}
          {activeFilter === 'customSearch' && (
            <span className="ml-1 text-gray-500">
              (pesquisa personalizada: 
              {searchCriteria.general && <span className="font-medium"> texto "{searchCriteria.general}"</span>}
              {searchCriteria.status && <span className="font-medium"> + status "{searchCriteria.status}"</span>}
              {searchCriteria.evaluationCompany && <span className="font-medium"> + empresa "{searchCriteria.evaluationCompany}"</span>}
              {(searchCriteria.location.state || searchCriteria.location.city) && (
                <span className="font-medium">
                  {' + local '}
                  {searchCriteria.location.state && searchCriteria.location.state}
                  {searchCriteria.location.state && searchCriteria.location.city && '/'}
                  {searchCriteria.location.city && searchCriteria.location.city}
                </span>
              )}
              {(searchCriteria.creationDateRange.start || searchCriteria.creationDateRange.end) && (
                <span className="font-medium"> + data criação</span>
              )}
              {(searchCriteria.dueDateRange.start || searchCriteria.dueDateRange.end) && (
                <span className="font-medium"> + data vencimento</span>
              )}
              )
            </span>
          )}
        </div>
        <div className="flex items-center">
          <label htmlFor="items-per-page" className="text-sm text-gray-600 mr-2">Itens por página:</label>
          <select 
            id="items-per-page"
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      
      {/* Tabela de propostas */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {availableColumns.map(column => 
                  visibleColumns[column.id] && (
                    <th 
                      key={column.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort(column.id)}
                    >
                      <div className="flex items-center">
                        {column.label}
                        {sortConfig.key === column.id ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          )
                        ) : (
                          <ArrowUpDown className="h-4 w-4 ml-1 text-gray-300" />
                        )}
                      </div>
                    </th>
                  )
                )}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                // Indicador de carregamento
                <tr>
                  <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500 mr-3"></div>
                      <span>Carregando propostas...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedProposals.length === 0 ? (
                // Mensagem de nenhum resultado
                <tr>
                  <td colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="px-6 py-4 text-center">
                    <p className="text-gray-500">Nenhuma proposta encontrada com os filtros aplicados.</p>
                  </td>
                </tr>
              ) : (
                // Dados das propostas
                paginatedProposals.map(proposal => (
                  <tr 
                    key={proposal.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleViewProposal(proposal.id)}
                  >
                    {visibleColumns.id && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {proposal.id}
                      </td>
                    )}
                    {visibleColumns.propertyType && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {proposal.propertyType}
                      </td>
                    )}
                    {visibleColumns.address && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {proposal.address}
                      </td>
                    )}
                    {visibleColumns.city && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {proposal.city}
                      </td>
                    )}
                    {visibleColumns.state && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {proposal.state}
                      </td>
                    )}
                    {visibleColumns.requestDate && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {proposal.requestDate}
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                          {proposal.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.estimatedCost && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {proposal.estimatedCost}
                      </td>
                    )}
                    {visibleColumns.dueDate && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {proposal.dueDate}
                      </td>
                    )}
                    {visibleColumns.evaluator && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {proposal.evaluator || 'Não designado'}
                      </td>
                    )}
                    {visibleColumns.evaluationCompany && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {proposal.evaluationCompany || 'Não designada'}
                      </td>
                    )}
                    {visibleColumns.department && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {proposal.department}
                      </td>
                    )}
                    {visibleColumns.requestor && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {proposal.requestor}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3" onClick={e => e.stopPropagation()}>
                        <button 
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewProposal(proposal.id);
                          }}
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
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Paginação */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{Math.min(filteredAndSortedProposals.length, 1 + (currentPage - 1) * itemsPerPage)}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredAndSortedProposals.length)}</span> de <span className="font-medium">{filteredAndSortedProposals.length}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">Anterior</span>
                  <ChevronUp className="h-4 w-4 rotate-90" />
                </button>
                
                {/* Botões de página */}
                {Array.from({ length: Math.ceil(filteredAndSortedProposals.length / itemsPerPage) }).map((_, index) => {
                  const pageNumber = index + 1;
                  const isActive = pageNumber === currentPage;
                  
                  // Mostrar apenas algumas páginas para evitar sobrecarregar a UI
                  if (
                    pageNumber === 1 || 
                    pageNumber === Math.ceil(filteredAndSortedProposals.length / itemsPerPage) || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          isActive 
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  }
                  
                  // Mostrar elipses para indicar páginas omitidas
                  if (
                    (index === 1 && currentPage > 3) || 
                    (index === Math.ceil(filteredAndSortedProposals.length / itemsPerPage) - 2 && 
                      currentPage < Math.ceil(filteredAndSortedProposals.length / itemsPerPage) - 2)
                  ) {
                    return (
                      <span
                        key={`ellipsis-${index}`}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                      >
                        ...
                      </span>
                    );
                  }
                  
                  return null;
                })}
                
                <button
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredAndSortedProposals.length / itemsPerPage)))}
                  disabled={currentPage === Math.ceil(filteredAndSortedProposals.length / itemsPerPage)}
                >
                  <span className="sr-only">Próxima</span>
                  <ChevronDown className="h-4 w-4 rotate-90" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalsList;