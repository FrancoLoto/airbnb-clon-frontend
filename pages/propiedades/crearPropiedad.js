import { useState } from "react";
import { useRouter } from "next/router";
import "../../app/globals.css";

export default function createProperty() {
    const BASE_URL = "http://127.0.0.1:8000/api";

    const [formState, setFormState] = useState({
        title: "",
        description: "",
        localtion: "",
        price: "",
        available_start: "",
        available_end: "",
        photos: [{url: "", alt_text: "Imagen de propiedad"}],
        rooms: [{name: "", capacity: 3}],
        amenities: [{name: ""}],
        property_type: {name: ""},
    });

    const router = useRouter();

    const handleChange = (e, parentField=null, index=null) => {
        if (parentField) {
            let newItem = null;
            if (index !== null) {
                newItem = formState[parentField];
                newItem[index][e.target.name] = e.target.value;
            }
            else {
                newItem = formState[parentField];
                newItem[index][e.target.name] = e.target.value;
            }

            setFormState({ ...formState, [parentField]: newItem });
        } else {
            setFormState({ ...formState, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/propiedades/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(formState),
        })
        const data = await res.json();
        if (res.ok) {
            router.push("/propiedades/" + data.id);
        } else {
            console.error(data)
        }
    }

    return(
        <div className="container mx-auto my-10">
            <h1 className="my-5 text-3xl font-semibold">Crea tu Airbnb</h1>
            <form onSubmit={handleSubmit} className="space-y-5">
                <input 
                  type="text"
                  name="title"
                  placeholder="Título"
                  className="w-full p-2 border border-gray-200 rounded"
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="Descripción"
                  className="w-full p-2 border border-gray-200 rounded"
                  onChange={handleChange}
                  required
                ></textarea>
                <input 
                  type="text"
                  name="location"
                  placeholder="Ubicación"
                  className="w-full p-2 border border-gray-200 rounded"
                  onChange={handleChange}
                  required
                />
                <input 
                  type="number"
                  name="price"
                  placeholder="Precio (USD)"
                  className="w-full p-2 border border-gray-200 rounded"
                  onChange={handleChange}
                  required
                />
                <input 
                  type="date"
                  name="available_start"
                  className="w-full p-2 border border-gray-200 rounded"
                  onChange={handleChange}
                  required
                />
                <input 
                  type="date"
                  name="available_end"
                  className="w-full p-2 border border-gray-200 rounded"
                  onChange={handleChange}
                  required
                />
                <input 
                  type="text"
                  name="url"
                  placeholder="URL de imágen"
                  className="w-full p-2 border border-gray-200 rounded"
                  onChange={(e) => handleChange(e, 'photo', 0)}
                  required
                />
                <input 
                  type="text"
                  name="rooms"
                  placeholder="Habitación"
                  className="w-full p-2 border border-gray-200 rounded"
                  onChange={(e) => handleChange(e, 'rooms', 0)}
                  required
                />
                <input 
                  type="text"
                  name="amenities"
                  placeholder="Característica"
                  className="w-full p-2 border border-gray-200 rounded"
                  onChange={(e) => handleChange(e, 'amenitites', 0)}
                  required
                />
                <input 
                  type="text"
                  name="property_type"
                  placeholder="Tipo de propiedad"
                  className="w-full p-2 border border-gray-200 rounded"
                  onChange={e => handleChange(e, 'property_type', 0)}
                  required
                />
                <button className="w-full p-2 bg-[#ff385c] hover:bg-[#c51e3def] text-white rounded">Crear Airbnb</button>
            </form>
        </div>
    )
}