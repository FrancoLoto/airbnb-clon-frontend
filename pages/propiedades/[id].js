import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CurrencyDollarIcon, MapPinIcon, HomeIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

const { default: RootLayout } = require("@/app/layout");
const { default: axios } = require("axios");
const { default: Image } = require("next/image");

function PropertyDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        console.log(token)

        if (id) {
            axios.get("http://127.0.0.1:8000/api/properties/" + id, {
                headers: { Authorization: `Token ${token}`}
            })
            .then((res) => {
                setProperty(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [id]);

    if (!property) {
        return <div>Cargando...</div>
    }

    return (
            <RootLayout>
                <div className="flex flex-col items-center justify-center min-h-screen py-2">
                    <div className="w-full max-w-3xl p-4 bg-white rounded-md shadow-md">
                        <div className="flex justify-center">
                            <Image 
                            className="rounded-lg shadow-lg"
                            src={property.photos[0].url}
                            alt={property.photos[0].alt_text}
                            width={1000}
                            height={600}
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <h1 className="text-xl font-semibold text-gray-700">{property.title}</h1>
                            <p className="mt-2 text-m text-gray-600">{property.description}</p>
                        </div>

                        <div className="flex justify-between mt-4">
                            <div className="mt-4">
                                <MapPinIcon className="h-6 mb-1 inline-block"></MapPinIcon>
                                <span className="text-m ml-1 font-light text-gray-700">{property.location}</span>
                            </div>
                            <div className="mt-4">
                                <CurrencyDollarIcon className="h-6 mb-1 inline-block"></CurrencyDollarIcon>
                                <span className="text-m ml-1 font-light text-gray-700">{property.price}</span>
                            </div>
                        </div>
                            <div className="mt-4">
                                <UserCircleIcon className="h-6 mb-1 inline-block"></UserCircleIcon>
                                <span className="text-m ml-1 font-light text-gray-700">Anfitrión: {property.host.username}</span>
                            </div>
                            <div className="mt-4">
                                <HomeIcon className="h-6 mb-1 inline-block"></HomeIcon>
                                <span className="text-m ml-1 font-light text-gray-700">Tipo de propiedad: {property.property_type.name}</span>
                            </div>
                            <div className="mt-4">
                                <InformationCircleIcon className="h-6 mb-1 inline-block"></InformationCircleIcon>
                                ¿Qué ofrece este lugar? - {property.amenities.map((amenity) => {
                                    return <span key={amenity.id} className="text-m ml-1 mt-4 font-light text-gray-700">{amenity.name}</span>
                                })}
                            </div>
                            <div className="mt-4">
                                <button className="bg-[#ff385c] hover:bg-[#c51e3def] text-white font-bold py-2 px-4 rounded">Reservar</button>
                            </div>
                        </div>
                </div>
            </RootLayout>
    )
}

export default PropertyDetail