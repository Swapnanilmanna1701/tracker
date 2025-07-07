import React from 'react';

interface GlassInputProps {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

const GlassInput: React.FC<GlassInputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  id
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-3 bg-black/20 backdrop-blur-xl rounded-xl
          border-2 border-transparent bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-violet-500/20
          focus:border-gradient-to-r focus:from-cyan-400 focus:via-blue-400 focus:to-violet-400
          text-white placeholder-gray-400 transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:shadow-lg focus:shadow-blue-500/25
          hover:shadow-md hover:shadow-blue-500/20
          disabled:opacity-50 disabled:cursor-not-allowed
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

export default GlassInput;