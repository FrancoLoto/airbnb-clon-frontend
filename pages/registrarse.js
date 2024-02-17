import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import "../app/globals.css";


export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [isHost, setIsHost] = useState(false);

    const router = useRouter();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password1 !== password2) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        axios.post("http://127.0.0.1:8000/api/auth/registration/", {
            email: email,
            username: username,
            password1: password1,
            password2: password2,
        })
        .then((response) => {
            localStorage.setItem("token", response.data.key);
            router.push("/ingresar");
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    };

    return(
        <div className="flex items-center justify-center h-screen bg-red-50">
            <div className="w-full max-w-lg">
                <form
                  className="bg-white shadow-lg rounded-2xl px-8 pt-4 pb-6"
                  onSubmit={handleRegister}
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

                    <div className="text-center text-3xl my-5 font-semibold">Registrarse</div>
                    <div className="mb-4">
                        <label
                          className="block text-gray-700 text-lg font-bold mb-2"
                          htmlFor="username"
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

                    <div className="mb-4">
                        <label
                          className="block text-gray-700 text-lg font-bold mb-2"
                          htmlFor="username"
                        >
                            Email
                        </label>
                        <input 
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-sky-500 focus:ring-1"
                          id="email"
                          type="email"
                          placeholder="tu-email@ejemplo.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                          className="block text-gray-700 text-lg font-bold mb-2"
                          htmlFor="username"
                        >
                            Contraseña
                        </label>
                        <input 
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-sky-500 focus:ring-1"
                          id="password1"
                          type="password"
                          placeholder="*******************"
                          value={password1}
                          onChange={e => setPassword1(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                          className="block text-gray-700 text-lg font-bold mb-2"
                          htmlFor="username"
                        >
                            Confirmar contraseña
                        </label>
                        <input 
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-sky-500 focus:ring-1"
                          id="password2"
                          type="password"
                          placeholder="*******************"
                          value={password2}
                          onChange={e => setPassword2(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <button 
                          className="bg-[#ff385c] hover:bg-[#c51e3def] text-white font-bold py-2 px-4 rounded-lg mb-5 focus:outline-none focus:shadow-outline"
                          type="submit"
                        >
                            Registrar
                        </button>
                    </div>
                    Ya tienes una cuenta?<a href="/ingresar" className="text-blue-600 hover:underline pl-1.5">Ingresar</a>
                </form>
            </div>
        </div>
    )
}