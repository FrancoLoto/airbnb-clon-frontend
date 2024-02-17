import Image from "next/image"
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';


export default function Card({ props }) {

    const formatDates = (dateString) => {
        const date = new Date(dateString);
        return format(date, "dd 'de' MMM.", { locale: esLocale, monthFormat: 'MMM' })
    }


    return (
        <div className="">
            <a href={"/propiedades/" + props.id} className="m-3 rounded-lg hover:cursor-pointer">
                {props.photos &&
                    props.photos.map((photo) => {
                        return(
               
                            <Image 
                              className="rounded-xl h-72"
                              key={photo.id}
                              src={photo.url}
                              width={300}
                              height={500}
                              alt={photo.alt_text}
                            />
                        )
                    })
                }
                <p className=" pt-2">{props.location}</p>
                <p className="text-gray-500 text-sm">{props.title}</p>
                <p className="text-gray-500 text-sm">{formatDates(props.available_start)} al {formatDates(props.available_end)}</p>
                <p className="text-m pt-1">${Math.floor(props.price)} <span className="">noche</span></p>
            </a>
        </div>
    )
}