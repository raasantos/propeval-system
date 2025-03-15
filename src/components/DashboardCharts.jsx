import React, { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, HelpCircle } from 'lucide-react';

const DashboardCharts = ({ onFilterClick }) => {
  // Sample data for the charts
  const [statusData] = useState([
    { name: 'Aguardando avaliação', value: 18, color: '#FCD34D' },
    { name: 'Em análise', value: 27, color: '#60A5FA' },
    { name: 'Reavaliação solicitada', value: 7, color: '#F87171' },
    { name: 'Concluído', value: 42, color: '#34D399' }
  ]);

  const [trendsData] = useState([
    { month: 'Jan', count: 32 },
    { month: 'Fev', count: 45 },
    { month: 'Mar', count: 58 },
    { month: 'Abr', count: 39 },
    { month: 'Mai', count: 47 },
    { month: 'Jun', count: 54 },
    { month: 'Jul', count: 61 },
    { month: 'Ago', count: 43 },
    { month: 'Set', count: 38 },
    { month: 'Out', count: 42 },
    { month: 'Nov', count: 51 },
    { month: 'Dez', count: 37 }
  ]);

  const [timePerformanceData] = useState([
    { type: 'Residencial', expected: 7, actual: 6.2 },
    { type: 'Comercial', expected: 10, actual: 9.5 },
    { type: 'Industrial', expected: 14, actual: 15.3 },
    { type: 'Rural', expected: 12, actual: 10.8 }
  ]);

  // Custom tooltip for status chart
  const StatusTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm text-xs">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-gray-700">{`Quantidade: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-12 gap-6 mb-8">
      {/* Status Distribution Chart */}
      <div className="col-span-4 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-medium text-gray-700">Distribuição de Status</h3>
          <div data-tooltip-id="status-chart-tooltip">
            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
          </div>
        </div>
        <div className="p-4">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      onClick={() => onFilterClick(entry.name)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<StatusTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {statusData.map(item => (
              <div 
                key={item.name} 
                className="flex items-center text-xs cursor-pointer hover:bg-gray-50 p-1 rounded"
                onClick={() => onFilterClick(item.name)}
              >
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-700">{item.name}</span>
                <span className="ml-auto font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ReactTooltip 
        id="status-chart-tooltip" 
        place="top"
        content="Gráfico mostrando a distribuição das propostas por status atual. Clique em uma seção para ver a lista filtrada."
      />
      
      {/* Monthly Trends Chart */}
      <div className="col-span-5 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-medium text-gray-700">Tendência Mensal de Propostas</h3>
          <div data-tooltip-id="trends-chart-tooltip">
            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
          </div>
        </div>
        <div className="p-4">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ fontSize: '12px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                  formatter={(value) => [`${value} propostas`, 'Quantidade']}
                  labelFormatter={(value) => `Mês: ${value}`}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  activeDot={{ r: 6, onClick: (e, payload) => onFilterClick(`month_${payload.payload.month}`) }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className="text-xs text-gray-500">
              <span className="text-green-500 font-medium">+15%</span> vs. último ano
            </div>
            <button 
              className="text-xs text-blue-600 flex items-center"
              onClick={() => onFilterClick('monthlyReport')}
            >
              <span>Ver relatório detalhado</span>
              <ArrowUpRight className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      </div>
      <ReactTooltip 
        id="trends-chart-tooltip" 
        place="top"
        content="Evolução do número de propostas recebidas por mês. Clique em um ponto para ver as propostas daquele mês."
      />
      
      {/* Time Performance Chart */}
      <div className="col-span-3 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-medium text-gray-700">Desempenho de Prazos</h3>
          <div data-tooltip-id="performance-chart-tooltip">
            <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
          </div>
        </div>
        <div className="p-4">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timePerformanceData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="type" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} label={{ value: 'Dias', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ fontSize: '12px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                  formatter={(value) => [`${value} dias`, '']}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconSize={10} 
                  fontSize={10}
                  onClick={(e) => onFilterClick(`performance_${e.dataKey}`)}
                />
                <Bar 
                  dataKey="expected" 
                  fill="#3B82F6" 
                  name="Esperado" 
                  barSize={15}
                  onClick={(data) => onFilterClick(`performance_${data.type}`)}
                />
                <Bar 
                  dataKey="actual" 
                  fill={(data) => data.actual <= data.expected ? "#34D399" : "#F87171"} 
                  name="Realizado" 
                  barSize={15}
                  onClick={(data) => onFilterClick(`performance_${data.type}`)}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 bg-blue-500 mr-2"></div>
              <span className="text-gray-700">Esperado</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 bg-green-500 mr-2"></div>
              <span className="text-gray-700">Realizado</span>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip 
        id="performance-chart-tooltip" 
        place="top"
        content="Comparação entre prazos estimados e reais por tipo de propriedade. Verde indica cumprimento do prazo, vermelho indica atraso."
      />
    </div>
  );
};

export default DashboardCharts;