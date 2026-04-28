type ConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmModal = ({
  isOpen,
  title = "Confirmar ação",
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-sm shadow-lg animate-fadeIn">
        
        <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">
          {title}
        </h2>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {message}
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};