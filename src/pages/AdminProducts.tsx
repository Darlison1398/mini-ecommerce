import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import type { Product } from "../types/Product";
import toast from "react-hot-toast";
import { ConfirmModal } from "../components/ConfirmModal";

export const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editForm, setEditForm] = useState<Product | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [form, setForm] = useState({
        title: "",
        price: 0,
        description: "",
        category: "",
        image: "",
    });

    const loadProducts = async () => {
        const data = await productService.getAll();
        setProducts(data);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = (id: number) => {
        productService.delete(id);
        loadProducts();
    };

    const confirmDelete = () => {
        if (selectedId === null) return;

        productService.delete(selectedId);

        setIsConfirmOpen(false);
        setSelectedId(null);

        loadProducts();
    };



    const handleCreate = () => {
        if (!form.title || !form.price) return;

        productService.create(form);

        setIsOpen(false);

        setForm({
            title: "",
            price: 0,
            description: "",
            category: "",
            image: "",
        });
        toast.success("Produto criado!");

        loadProducts();
    };

    const handleEditOpen = (product: Product) => {
        setEditForm(product);
        setIsEditOpen(true);
    };

    const handleUpdate = () => {
        if (!editForm) return;
        productService.update(editForm);
        setIsEditOpen(false);
        setEditForm(null);
        loadProducts();
    };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Produtos</h1>
      <button
        onClick={() => setIsOpen(true)}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
        + Novo Produto
        </button>

      <div className="grid gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold dark:text-white">{p.title}</h2>
              <p className="text-green-600">R$ {p.price}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleEditOpen(p)} className="bg-yellow-500 px-3 py-1 rounded text-white">
                Editar
              </button>

              <button
                onClick={() => {
                    setSelectedId(p.id)
                    setIsConfirmOpen(true);
                }}
                className="bg-red-500 px-3 py-1 rounded text-white"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

        {isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Novo Produto</h2>

                    <div className="space-y-3">
                        <input
                        placeholder="Título"
                        className="w-full p-2 border rounded"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
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
                        onChange={(e) =>
                            setForm({ ...form, category: e.target.value })
                        }
                        />

                        <input
                        placeholder="URL da imagem"
                        className="w-full p-2 border rounded"
                        value={form.image}
                        onChange={(e) =>
                            setForm({ ...form, image: e.target.value })
                        }
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
                        <button
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                        >
                        Cancelar
                        </button>

                        <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                        Salvar
                        </button>
                    </div>
                </div>
            </div>
        )}


        {isEditOpen && editForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Editar Produto</h2>

                    <div className="space-y-3">
                        <input
                        value={editForm.title}
                        onChange={(e) =>
                            setEditForm({ ...editForm, title: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        />

                        <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) =>
                            setEditForm({
                            ...editForm,
                            price: Number(e.target.value),
                            })
                        }
                        className="w-full p-2 border rounded"
                        />

                        <input
                        value={editForm.category}
                        onChange={(e) =>
                            setEditForm({ ...editForm, category: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        />

                        <input
                        value={editForm.image}
                        onChange={(e) =>
                            setEditForm({ ...editForm, image: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                        />

                        <textarea
                        value={editForm.description}
                        onChange={(e) =>
                            setEditForm({
                            ...editForm,
                            description: e.target.value,
                            })
                        }
                        className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                        onClick={() => setIsEditOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded"
                        >
                        Cancelar
                        </button>

                        <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-green-600 text-white rounded"
                        >
                        Salvar Alterações
                        </button>
                    </div>
                </div>
            </div>
        )}

        <ConfirmModal
            isOpen={isConfirmOpen}
            title="Excluir produto"
            message="Tem certeza que deseja excluir este produto?"
            onCancel={() => setIsConfirmOpen(false)}
            onConfirm={confirmDelete}
        />
    </div>
  );
};