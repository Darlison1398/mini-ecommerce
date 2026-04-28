import { useState, useEffect } from "react";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  title: string;
};

export const ProductFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}: Props) => {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
    }
  );

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div className="space-y-3">
          <input
            placeholder="Título"
            className="w-full p-2 border rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            type="number"
            placeholder="Preço"
            className="w-full p-2 border rounded"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />

          <input
            placeholder="Categoria"
            className="w-full p-2 border rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            placeholder="Imagem"
            className="w-full p-2 border rounded"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <textarea
            placeholder="Descrição"
            className="w-full p-2 border rounded"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};