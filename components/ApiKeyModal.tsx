import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave }) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (isOpen) {
      const storedKey = localStorage.getItem('google-ai-api-key');
      if (storedKey) {
        setApiKey(storedKey);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    onSave(apiKey);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-lg w-full transform transition-all"
           onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-2xl font-bold text-white">Google AI API Key 설정</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>
        
        <p className="text-red-400 mb-4">
          이 앱을 사용하려면 Google AI API Key가 필요합니다. 아래에 입력해주세요.
        </p>
        
        <div className="mb-6">
          <label htmlFor="apiKeyInput" className="block text-sm font-medium text-gray-300 mb-1">
            Google AI API Key 입력
          </label>
          <input
            id="apiKeyInput"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="***************************************"
          />
          <p className="text-xs text-gray-500 mt-1">API Key는 브라우저에만 저장되며, 외부로 전송되지 않습니다.</p>
        </div>
        
        <div className="bg-gray-700/50 p-4 rounded-lg text-sm">
          <h3 className="font-semibold text-gray-200 mb-2">Google AI API Key 발급방법</h3>
          <ol className="list-decimal list-inside space-y-1 text-gray-300">
            <li><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google AI Studio</a> 페이지로 이동하여 로그인합니다.</li>
            <li>'Get API Key' 버튼을 클릭합니다.</li>
            <li>생성된 API Key를 복사합니다.</li>
            <li>복사한 Key를 위 입력창에 붙여넣고 'Key 저장' 버튼을 누릅니다.</li>
          </ol>
        </div>
        
        <div className="mt-8 text-right">
          <button 
            onClick={handleSave}
            className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          >
            Key 저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
