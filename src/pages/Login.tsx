import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await login(username, password);

    if (!success) {
      setError("Usuário ou senha inválidos");
      return;
    }

    navigate("/");
  };

  return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                    Login
                </h1>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                <div className="mb-4">
                    <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                        Username
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                        Password
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg"
                >
                    Entrar
                </button>

                <p className="text-xs text-gray-500 mt-4 text-center">
                    Use: <br />
                    admin → mor_2314 / 83r5^_ <br />
                    cliente → kevinryan / kev02937@
                </p>
            </form>
        </div>
    );



};