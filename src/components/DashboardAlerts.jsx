import React from 'react';
import { Tooltip } from 'react-tooltip';
import { CalendarClock, AlertCircle, CheckCircle, ArrowUpRight, AlertTriangle, Clock } from 'lucide-react';

// Default values for alerts if they are undefined
const defaultAlerts = {
  dueToday: 0,
  delayed: 0,
  pendingApproval: 0,
  resolvedIssues: 0
};

const DashboardAlerts = ({ alerts = defaultAlerts, onAlertClick = () => {} }) => {
  // Ensure we have a valid alerts object by merging with defaults
  const safeAlerts = { ...defaultAlerts, ...alerts };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Due Today */}
      <div 
        className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onAlertClick('dueToday')}
        data-tooltip-id="due-today-tooltip"
      >
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
            <CalendarClock className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Vencimento Hoje</h3>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold text-gray-900">{safeAlerts.dueToday}</span>
              <span className="ml-2 text-xs text-gray-600">propostas</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end text-xs text-yellow-600">
          <span>Ver detalhes</span>
          <ArrowUpRight className="h-3 w-3 ml-1" />
        </div>
      </div>
      <Tooltip 
        id="due-today-tooltip" 
        place="top"
        content="Propostas com prazo de vencimento no dia de hoje que requerem atenção imediata."
      />
      
      {/* Delayed Evaluations */}
      <div 
        className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onAlertClick('delayed')}
        data-tooltip-id="delayed-tooltip"
      >
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Avaliações Atrasadas</h3>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold text-gray-900">{safeAlerts.delayed}</span>
              <span className="ml-2 text-xs text-gray-600">propostas</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end text-xs text-red-600">
          <span>Ver detalhes</span>
          <ArrowUpRight className="h-3 w-3 ml-1" />
        </div>
      </div>
      <Tooltip 
        id="delayed-tooltip" 
        place="top"
        content="Avaliações que já ultrapassaram o prazo estipulado e precisam ser escaladas."
      />
      
      {/* Pending Approvals */}
      <div 
        className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onAlertClick('pendingApproval')}
        data-tooltip-id="pending-approval-tooltip"
      >
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <Clock className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Aguardando Aprovação</h3>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold text-gray-900">{safeAlerts.pendingApproval}</span>
              <span className="ml-2 text-xs text-gray-600">propostas</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end text-xs text-blue-600">
          <span>Ver detalhes</span>
          <ArrowUpRight className="h-3 w-3 ml-1" />
        </div>
      </div>
      <Tooltip 
        id="pending-approval-tooltip" 
        place="top"
        content="Propostas que estão aguardando aprovação para prosseguir para a próxima etapa."
      />
      
      {/* Conditionally rendered fourth alert card */}
      {safeAlerts.resolvedIssues > 0 && (
        <div 
          className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500 cursor-pointer hover:shadow-lg transition-shadow md:col-span-3 lg:col-span-1"
          onClick={() => onAlertClick('resolvedIssues')}
          data-tooltip-id="resolved-issues-tooltip"
        >
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Pendências Resolvidas</h3>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-bold text-gray-900">{safeAlerts.resolvedIssues}</span>
                <span className="ml-2 text-xs text-gray-600">propostas</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end text-xs text-green-600">
            <span>Ver detalhes</span>
            <ArrowUpRight className="h-3 w-3 ml-1" />
          </div>
        </div>
      )}
      {safeAlerts.resolvedIssues > 0 && (
        <Tooltip 
          id="resolved-issues-tooltip" 
          place="top"
          content="Propostas que tiveram pendências resolvidas recentemente."
        />
      )}
    </div>
  );
};

export default DashboardAlerts;