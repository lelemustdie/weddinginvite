// components/wedding-details/index.tsx
import ReusableSection from "../ReusableSection"
import { FaCar, FaCamera, FaCocktail } from "react-icons/fa"
import "./styles.css"

const RowItems = () => {
    return (
        <div className="wedding-details">
            <h2 className="wedding-title">DETALLES DE NUESTRA BODA</h2>
            <p className="wedding-subtitle">DATOS DE INTERÉS</p>

            <div className="wedding-items">
                <ReusableSection
                    reactIcon={<FaCar className="size-[1.5rem] m-3" />}
                    title="ESTACIONAMIENTO"
                    subtitle="Para autos hasta el día siguiente a la boda inclusive"
                    divisorDown
                />
                <ReusableSection
                    reactIcon={<FaCamera className="size-[1.5rem] m-3" />}
                    title="FOTÓGRAFOS"
                    subtitle="Los queremos lindos/as porque nuestros fotógrafos los van a hacer posar"
                    divisorDown
                />
                <ReusableSection
                    reactIcon={<FaCocktail className="size-[1.5rem] m-3" />}
                    title="TRAGOS"
                    subtitle="Tenemos una barra que es una locura"
                    divisorDown
                />
            </div>
        </div>
    )
}

export default RowItems
