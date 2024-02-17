import { useState } from "react"
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import "../app/globals.css";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/api/auth/login/", {
            username: username,
            password: password
        })
        .then(response => {
            localStorage.setItem("token", response.data.key);
            router.push("/")
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    }

    return(
        <div className="flex items-center justify-center h-screen bg-red-50">
            <div className="w-full max-w-lg">
                <form 
                  className="bg-white shadow-lg rounded-2xl px-8 pt-4 pb-6 mb-4"
                  onSubmit={handleLogin}
                >
                    <a href="/">
                        <Image 
                          className="mx-auto w-auto"
                          src={"/Airbnb-logo.png"}
                          width={100}
                          height={100}
                          alt="Airbnb logo"
                        />
                    </a>
                    <div className="text-center text-3xl my-5 font-semibold">
                        Ingresar
                    </div>
                    <div className="mb-4">
                        <label
                          htmlFor="username"
                          className="block text-gray-700 text-lg font-bold mb-2"
                        >
                            Usuario
                        </label>
                        <input  
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-sky-500 focus:ring-1"
                          id="username"
                          type="text"
                          placeholder="Nombre de usuario"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                          htmlFor="password"
                          className="block text-gray-700 text-lg font-bold mb-2"
                        >
                            Contraseña
                        </label>
                        <input 
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-sky-500 focus:ring-1"
                          id="password"
                          type="password"
                          placeholder="*******************"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center mb-3">
                        <button 
                          className="bg-[#ff385c] hover:bg-[#c51e3def] text-white font-bold py-2 px-4 mb-5 rounded-lg focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                            Ingresar
                        </button>
                    </div>
                    No tienes una cuenta?<a href="/registrarse" className="text-blue-600 hover:underline pl-1.5">Regístrate</a>
                </form>
            </div>
        </div>
    )
}