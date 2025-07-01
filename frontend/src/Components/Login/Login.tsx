import { FormEvent, useState } from "react";
import { api } from "../../api";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await api.post("/login", {
                username,
                password,
            });

            const { token } = response.data;

            console.log("Login bem-sucedido:", token);
            localStorage.setItem("token", token);
            window.location.href = "/adminpainel";
        } catch (err: any) {
            if (err.response && err.response.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Erro ao conectar ao servidor");
            }
            console.error("Erro:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center h-[400px]">
            <div className="flex flex-col justify-center items-center gap-4 w-[250px] h-[250px] shadow-xl border-solid border-2 hover:border-gray-300">
                <div className="flex flex-col items-start gap-5">
                    <span className="flex flex-col items-start">
                        <label className="block mb-1 text-sm font-medium text-gray-900">Login:</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-solid border-2 shadow-xl border-gray-500 rounded-md bg-gray-200 hover:border-black p-1"
                            required
                        />
                    </span>

                    <span className="flex flex-col items-start">
                        <label className="block mb-1 text-sm font-medium text-gray-900">Senha:</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-solid border-2 shadow-xl border-gray-500 rounded-md bg-gray-200 hover:border-black p-1" 
                            required
                        />
                    </span>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button 
                    type="submit"
                    className="cursor-pointer bg-red-500 rounded-xl w-[120px] h-[30px] text-white hover:font-bold hover:shadow-lg"
                >
                    Entrar
                </button>
            </div>
        </form>
    );
};
