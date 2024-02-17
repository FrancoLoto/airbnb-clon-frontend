
import Card from "../components/Card";
import "../app/globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";

export default function Home({ properties }) {
    const description = "Alojamiento para vacaciones, cabañas, casas en la playa..."

    return(
        <div>
            <Head>
                <title>Airbnb Clone | {description}</title>
            </Head>

            <Navbar />

            {/* Properties Cards */}
            <div className="mx-10 my-7">
                <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                    {properties.map((property) => {
                        return <Card key={property.id} props={property} />
                    })}
                </section>
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const res = await fetch("http://127.0.0.1:8000/api/properties/");
    const properties = await res.json();

    return {
        props: { properties },
    };
}