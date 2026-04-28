import { useEffect, useState } from "react";
import { productService } from "../services/productService";
import type { Product } from "../types/Product";
import toast from "react-hot-toast";
import { ConfirmModal } from "../components/ConfirmModal";
import { ProductFormModal } from "../components/ProductFormModal";

export const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const loadProducts = async () => {
    const data = await productService.getAll();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = (data: any) => {
    productService.create(data);
    toast.success("Produto criado!");
    setIsFormOpen(false);
    loadProducts();
  };

  const handleUpdate = (data: Product) => {
    productService.update(data);
    setEditingProduct(null);
    toast.success("Produto editado com sucesso!");
    loadProducts();
  };

  const confirmDelete = () => {
    if (!selectedId) return;

    productService.delete(selectedId);
    setSelectedId(null);
    toast.success("Produto excluído com sucesso!");
    loadProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Produtos</h1>

      <button
        onClick={() => setIsFormOpen(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        + Novo Produto
      </button>

      <div className="grid gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between"
          >
            <div>
              <h2 className="font-semibold dark:text-white">{p.title}</h2>
              <p className="text-green-600">R$ {p.price}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditingProduct(p)}
                className="bg-yellow-500 px-3 py-1 text-white rounded"
              >
                Editar
              </button>

              <button
                onClick={() => setSelectedId(p.id)}
                className="bg-red-500 px-3 py-1 text-white rounded"
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreate}
        title="Novo Produto"
      />

      <ProductFormModal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSubmit={handleUpdate}
        initialData={editingProduct}
        title="Editar Produto"
      />

      <ConfirmModal
        isOpen={!!selectedId}
        onCancel={() => setSelectedId(null)}
        onConfirm={confirmDelete}
        message="Tem certeza que deseja excluir?"
      />
    </div>
  );
};