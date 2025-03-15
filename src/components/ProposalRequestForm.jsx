import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, 
  FileText, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Check,
  ArrowLeft,
  Send
} from 'lucide-react';

const ProposalRequestForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyType: '',
    area: '',
    location: '',
    serviceType: '',
    urgency: 'normal',
    purpose: '',
    additionalInfo: '',
    attachments: []
  });
  const [selectedService, setSelectedService] = useState(null);

  // Sample data for service types
  const serviceTypes = [
    { id: 1, name: 'Avaliação para Financiamento Residencial', description: 'Avaliação padrão para financiamentos de imóveis residenciais', templateId: 1, cost: 'R$ 800,00', estimatedDays: 7, status: 'Ativo' },
    { id: 2, name: 'Avaliação para Garantia Comercial', description: 'Avaliação detalhada para garantias de imóveis comerciais', templateId: 2, cost: 'R$ 1.500,00', estimatedDays: 10, status: 'Ativo' },
    { id: 3, name: 'Avaliação Rural Básica', description: 'Avaliação simplificada para propriedades rurais', templateId: 3, cost: 'R$ 2.000,00', estimatedDays: 12, status: 'Ativo' },
  ];

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceSelection = (service) => {
    setSelectedService(service);
    setFormData({
      ...formData,
      serviceType: service.id
    });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFileUpload = (e) => {
    const newAttachments = [...formData.attachments];
    for (let i = 0; i < e.target.files.length; i++) {
      newAttachments.push(e.target.files[i]);
    }
    setFormData({
      ...formData,
      attachments: newAttachments
    });
  };

  const removeAttachment = (index) => {
    const newAttachments = [...formData.attachments];
    newAttachments.splice(index, 1);
    setFormData({
      ...formData,
      attachments: newAttachments
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the backend
    alert('Solicitação de proposta enviada com sucesso! Número de referência: REF-2025-0104');
    // Reset form or redirect
  };

  // Calculate estimated completion date based on urgency
  const getEstimatedDate = () => {
    const today = new Date();
    let days = selectedService?.estimatedDays || 7;
    
    if (formData.urgency === 'urgent') {
      days = Math.ceil(days * 0.6); // 40% faster for urgent requests
    }
    
    const estimatedDate = new Date(today);
    estimatedDate.setDate(today.getDate() + days);
    
    return estimatedDate.toLocaleDateString('pt-BR');
  };

  // Step indicators component
  const StepIndicator = () => {
    return (
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`h-1 w-12 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className={`h-1 w-12 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto pt-8 pb-16 px-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Nova Solicitação de Proposta</h1>
        <p className="text-gray-600 mb-8">Preencha os dados abaixo para solicitar uma avaliação imobiliária</p>
        
        <StepIndicator />
        
        <div className="bg-white rounded shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">
              {currentStep === 1 && "Dados do Imóvel"}
              {currentStep === 2 && "Tipo de Serviço"}
              {currentStep === 3 && "Revisão e Confirmação"}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Property Information */}
            {currentStep === 1 && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Imóvel</label>
                    <select 
                      name="propertyType" 
                      value={formData.propertyType}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="residencial">Residencial</option>
                      <option value="comercial">Comercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="rural">Rural</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Área (m²)</label>
                    <input 
                      type="number" 
                      name="area"
                      value={formData.area}
                      onChange={handleFormChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input 
                      type="text" 
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      placeholder="Endereço completo"
                      className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Finalidade da Avaliação</label>
                  <select 
                    name="purpose" 
                    value={formData.purpose}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="financiamento">Financiamento</option>
                    <option value="compra_venda">Compra e Venda</option>
                    <option value="garantia">Garantia</option>
                    <option value="seguro">Seguro</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgência</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="urgency" 
                        value="normal" 
                        checked={formData.urgency === 'normal'}
                        onChange={handleFormChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-sm">Normal (7-10 dias)</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="radio" 
                        name="urgency" 
                        value="urgent" 
                        checked={formData.urgency === 'urgent'}
                        onChange={handleFormChange}
                        className="form-radio text-blue-600"
                      />
                      <span className="ml-2 text-sm">Urgente (3-5 dias) <span className="text-xs text-red-600">+30% no custo</span></span>
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Service Type Selection */}
            {currentStep === 2 && (
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Selecione o tipo de serviço que melhor atende às suas necessidades. 
                  Cada tipo de serviço está associado a um modelo específico de laudo.
                </p>
                
                <div className="space-y-4 mb-6">
                  {serviceTypes.map(service => (
                    <div 
                      key={service.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedService?.id === service.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => handleServiceSelection(service)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-gray-800">{service.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center text-sm text-gray-700">
                              <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                              {service.cost}
                            </div>
                            <div className="flex items-center text-sm text-gray-700">
                              <Clock className="h-4 w-4 mr-1 text-gray-500" />
                              {service.estimatedDays} dias úteis
                            </div>
                          </div>
                        </div>
                        {selectedService?.id === service.id && (
                          <div className="flex items-center justify-center h-6 w-6 bg-blue-600 rounded-full">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-700">Importante</h4>
                    <p className="text-sm text-yellow-600">
                      O tipo de serviço determina o modelo de laudo que será preenchido pelo engenheiro avaliador. 
                      Certifique-se de escolher a opção mais adequada para sua necessidade.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Additional Information and Confirmation */}
            {currentStep === 3 && (
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Informações Adicionais (opcional)</label>
                  <textarea 
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    rows="3"
                    placeholder="Adicione qualquer informação relevante para a avaliação..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Anexos (opcional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center justify-center"
                    >
                      <FileText className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm font-medium text-blue-600">Clique para selecionar arquivos</p>
                      <p className="text-xs text-gray-500 mt-1">ou arraste aqui</p>
                      <p className="text-xs text-gray-500 mt-2">Anexe fotos, plantas, ou documentos do imóvel</p>
                    </label>
                  </div>
                  
                  {formData.attachments.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Arquivos selecionados ({formData.attachments.length})</p>
                      <div className="space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded"
                          >
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm text-gray-700 truncate max-w-xs">{file.name}</span>
                            </div>
                            <button 
                              type="button" 
                              onClick={() => removeAttachment(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3">Resumo da Solicitação</h3>
                  <div className="grid grid-cols-2 gap-y-3 text-sm">
                    <div className="text-gray-600">Tipo de Imóvel:</div>
                    <div className="font-medium text-gray-800 capitalize">{formData.propertyType || '-'}</div>
                    
                    <div className="text-gray-600">Área:</div>
                    <div className="font-medium text-gray-800">{formData.area ? `${formData.area} m²` : '-'}</div>
                    
                    <div className="text-gray-600">Localização:</div>
                    <div className="font-medium text-gray-800">{formData.location || '-'}</div>
                    
                    <div className="text-gray-600">Tipo de Serviço:</div>
                    <div className="font-medium text-gray-800">{selectedService?.name || '-'}</div>
                    
                    <div className="text-gray-600">Finalidade:</div>
                    <div className="font-medium text-gray-800 capitalize">{formData.purpose?.replace('_', ' ') || '-'}</div>
                    
                    <div className="text-gray-600">Urgência:</div>
                    <div className="font-medium text-gray-800 capitalize">{formData.urgency || '-'}</div>
                    
                    <div className="text-gray-600">Custo Estimado:</div>
                    <div className="font-medium text-gray-800">
                      {selectedService ? (
                        formData.urgency === 'urgent' 
                          ? `${parseFloat(selectedService.cost.replace('R$ ', '').replace('.', '').replace(',', '.')) * 1.3}`
                          : selectedService.cost
                      ) : '-'}
                    </div>
                    
                    <div className="text-gray-600">Data Prevista:</div>
                    <div className="font-medium text-gray-800">{selectedService ? getEstimatedDate() : '-'}</div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-6 border-t border-gray-200 flex justify-between">
              {currentStep > 1 ? (
                <button 
                  type="button" 
                  onClick={handlePreviousStep}
                  className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 3 ? (
                <button 
                  type="button" 
                  onClick={handleNextStep}
                  className="px-4 py-2 bg-blue-600 rounded text-sm font-medium text-white hover:bg-blue-700 flex items-center"
                  disabled={
                    (currentStep === 1 && (!formData.propertyType || !formData.area || !formData.location || !formData.purpose)) ||
                    (currentStep === 2 && !selectedService)
                  }
                >
                  Próximo
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 rounded text-sm font-medium text-white hover:bg-blue-700 flex items-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Solicitação
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProposalRequestForm;