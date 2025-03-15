import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

// Componente de tooltip que pode ser usado em qualquer parte do dashboard
const InfoTooltip = ({ content, position = 'top', iconSize = 'small' }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Determina as classes CSS com base na posição
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full mt-1';
      case 'left':
        return 'right-full mr-1';
      case 'right':
        return 'left-full ml-1';
      case 'top':
      default:
        return 'bottom-full mb-1';
    }
  };

  // Determina o tamanho do ícone
  const getIconSize = () => {
    switch (iconSize) {
      case 'large':
        return 'h-5 w-5';
      case 'medium':
        return 'h-4 w-4';
      case 'small':
      default:
        return 'h-3 w-3';
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className="text-gray-400 hover:text-gray-600 focus:outline-none ml-1"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        aria-label="Informação adicional"
      >
        <HelpCircle className={getIconSize()} />
      </button>
      
      {isVisible && (
        <div 
          className={`absolute z-50 ${getPositionClasses()} w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg`}
        >
          <div className="relative">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

// Componente de tooltip que aparece ao passar o mouse sobre o elemento pai
export const HoverTooltip = ({ content, children, position = 'top', delay = 500 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // Determina as classes CSS com base na posição
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full mt-1';
      case 'left':
        return 'right-full mr-1';
      case 'right':
        return 'left-full ml-1';
      case 'top':
      default:
        return 'bottom-full mb-1';
    }
  };

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {isVisible && (
        <div 
          className={`absolute z-50 ${getPositionClasses()} w-48 bg-gray-800 text-white text-xs rounded py-1 px-2 shadow-lg pointer-events-none`}
        >
          <div className="relative">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;