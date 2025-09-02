// components/wedding-details/index.tsx
import ReusableSection from "../ReusableSection"
import { FaCar, FaCamera, FaCocktail } from "react-icons/fa"
import "./styles.css"

const RowItems = () => {
    return (
        <div className="wedding-details">
            <h2 className="wedding-title">DATOS DE INTERÉS</h2>
            <div className="wedding-items">
                <ReusableSection
                    reactIcon={<FaCar className="size-[1.5rem] m-3" />}
                    title="ESTACIONAMIENTO"
                    subtitle="CONTAMOS CON ESTACIONAMIENTO PRIVADO CON VIGILANCIA DENTRO DEL PREDIO"
                    subtitleClassName={"row-items-font"}
                    divisorDown
                />
                <ReusableSection
                    reactIcon={<FaCamera className="size-[1.5rem] m-3" />}
                    title="FOTÓGRAFOS"
                    subtitle="LOS QUEREMOS LINDOS/AS PORQUE NUESTROS FOTÓGRAFOS LOS VAN A HACER POSAR"
                    subtitleClassName={"row-items-font"}
                    divisorDown
                />
                <ReusableSection
                    reactIcon={<FaCocktail className="size-[1.5rem] m-3" />}
                    title="BARRA LIBRE"
                    subtitle="COPAS LLENAS, CORAZONES CONTENTOS Y RECUERDOS INOLVIDABLES"
                    subtitleClassName={"row-items-font"}
                    divisorDown
                />
            </div>
        </div>
    )
}

export default RowItems
