import ReusableSection from "../ReusableSection"
import "./styles.css"

interface ItineraryItem {
    icon: any
    title: string
    subtitle?: string
    button?: {
        label: string
        href: string
    }
    time?: string
}

interface ItineraryProps {
    items: ItineraryItem[]
}

const Itinerary = ({ items }: ItineraryProps) => {
    return (
        <div className="itinerary-container">
            <h2 className="itinerary-title">Itinerario</h2>
            {items.map((item, index) => (
                <ReusableSection
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    subtitle={item.time}
                    button={item.button}
                    divisors={true}
                    variant="white"
                />
            ))}
        </div>
    )
}

export default Itinerary
