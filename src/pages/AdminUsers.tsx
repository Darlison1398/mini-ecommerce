import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import type { User } from "../types/User";
import toast from "react-hot-toast";
import { ConfirmModal } from "../components/ConfirmModal";

export const AdminUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "client" as "admin" | "client",
    });

    const loadUsers = async () => {
        const data = await userService.getAll();
        setUsers(data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreate = () => {
        userService.create(form);
        toast.success("Usuário criado!");
        setIsOpen(false);
        loadUsers();
    };

    const confirmDelete = () => {
        console.log("Confirmou delete", selectedId);
        if (selectedId === null) return;

        userService.delete(selectedId);

        setIsConfirmOpen(false);
        setSelectedId(null);

        toast.success("Usuário removido!");
        loadUsers();
    };
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Usuários</h1>

      <button
        onClick={() => setIsOpen(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Novo Usuário
      </button>

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between"
          >
            <div>
              <p className="font-semibold dark:text-white">{u.username}</p>
              <p className="text-sm text-gray-500">{u.role}</p>
            </div>

            <button
              onClick={() => {
                setSelectedId(u.id);
                setIsConfirmOpen(true);
            }}
              className="text-red-500"
            >
              Deletar
            </button>
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80">
            <h2 className="mb-4 font-bold">Novo Usuário</h2>

            <input
              placeholder="Username"
              className="w-full mb-2 p-2 border"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            <input
              placeholder="Senha"
              className="w-full mb-2 p-2 border"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <select
              className="w-full mb-4 p-2 border"
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value as "admin" | "client",
                })
              }
            >
              <option value="client">Cliente</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Criar
            </button>
          </div>
        </div>
      )}

        <ConfirmModal
            isOpen={isConfirmOpen}
            title="Excluir usuário"
            message="Tem certeza que deseja excluir este usuário?"
            onCancel={() => setIsConfirmOpen(false)}
            onConfirm={confirmDelete}
        />

    </div>
  );
};