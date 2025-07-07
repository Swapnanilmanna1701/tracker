import React from 'react';

interface GlassTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  id?: string;
}

const GlassTextarea: React.FC<GlassTextareaProps> = ({
  value,
  onChange,
  placeholder,
  rows = 3,
  className = '',
  id
}) => {
  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-4 py-3 bg-black/20 backdrop-blur-xl rounded-xl
          border-2 border-transparent bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20
          focus:border-gradient-to-r focus:from-cyan-400 focus:via-blue-400 focus:to-violet-400
          text-white placeholder-gray-400 transition-all duration-300 resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:shadow-lg focus:shadow-blue-500/25
          hover:shadow-md hover:shadow-blue-500/20
          ${className}
        `}
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 49, 83, 0.1) 50%, rgba(139, 92, 246, 0.1) 100%)',
          borderImage: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3), rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3)) 1'
        }}
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-violet-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default GlassTextarea;