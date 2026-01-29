import React from 'react';

interface Props {
  onInput: (val: string) => void;
  onBackspace: () => void;
  onClear: () => void;
}

const VirtualKeyboard: React.FC<Props> = ({ onInput, onBackspace, onClear }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

  return (
    <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded shadow-sm max-w-[280px] select-none">
      <div className="flex justify-between items-center mb-2">
         <span className="text-xs text-gray-600 font-bold">Virtual Keypad</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {keys.map(k => (
          <button
            key={k}
            onClick={() => onInput(k)}
            className="h-10 bg-white border border-gray-400 shadow-sm rounded hover:bg-blue-50 font-bold text-lg active:translate-y-0.5"
          >
            {k}
          </button>
        ))}
        <button
          onClick={onBackspace}
          className="h-10 bg-red-50 border border-red-300 shadow-sm rounded hover:bg-red-100 text-red-600 font-bold flex items-center justify-center active:translate-y-0.5"
        >
          ⌫
        </button>
      </div>
      <div className="grid grid-cols-1 mt-2">
         <button
            onClick={onClear}
            className="h-8 bg-gray-200 border border-gray-400 hover:bg-gray-300 text-sm font-semibold rounded active:translate-y-0.5"
         >
            Clear All
         </button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;