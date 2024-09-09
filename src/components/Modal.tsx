
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  theme: string;  
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, theme }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  font-inter flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className={`bg-white p-6 rounded-lg shadow-lg z-10 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      >
        <h2 className="text-2xl  mb-4">Are you sure you want to quit?</h2>
        <div className="flex justify-around mt-4">
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg ${theme === 'dark' ? ' text-red-600' : ' text-red-400'} hover:text-red-700 transition`}
          >
            Yes, Quit
          </button>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-[#32ab17] text-white' : 'bg-[#52e552] text-gray-800'} hover:bg-green-400 transition`}
          >
            Keep Playing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
