
import React, { useState, useId } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

interface FilterBlockProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

const FilterBlock: React.FC<FilterBlockProps> = ({ title, children, defaultOpen = true, className = '' }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-neutral-200/60 overflow-hidden transition-all duration-300 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-start font-semibold text-white bg-brand-primary hover:opacity-90 transition-opacity"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span>{title}</span>
        <ChevronUpIcon className={`h-5 w-5 text-white/80 transform transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} />
      </button>
      <div 
        id={contentId}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
        <div className="overflow-hidden">
          <div className="p-4 bg-white/50">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBlock;
