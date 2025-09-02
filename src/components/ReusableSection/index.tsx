// components/reusable-section/index.tsx
import "./styles.css"
import Image, {StaticImageData} from "next/image";
import { motion } from "framer-motion";

interface ButtonProps {
    label: string
    href?: string       // opcional
    onClick?: () => void // nuevo para modal
}

interface ReusableSectionProps {

    divisors?: boolean
    variant?: "green" | "white"
    reactIcon?: React.ReactNode
    icon?: StaticImageData | string
    title?: string
    subtitle?: string
    subtitleClassName?: string
    subsubtitle?: string
    subsubsubtitle?: string
    button?: ButtonProps
    divisorUpper?: boolean
    divisorDown?: boolean
}

const ReusableSection = ({
                             // retrocompat: si vienen divisors=true, activamos ambos
                             divisors = false,
                             variant = "white",
                             reactIcon,
                             icon,
                             title,
                             subtitle,
                             subtitleClassName,
                             subsubtitle,
                             subsubsubtitle,
                             button,
                             divisorUpper,
                             divisorDown,
                         }: ReusableSectionProps) => {
    const showUpper = divisors || !!divisorUpper
    const showDown = divisors || !!divisorDown

    return (
        <motion.div
            initial={{opacity: 0, y: 50}} // estado inicial oculto
            whileInView={{opacity: 1, y: 0}} // cuando aparece en pantalla
            viewport={{once: true, amount: 0.3}}
            transition={{duration: 0.8, ease: "easeOut"}}
            className="mb-8 motion-container"
        >
    <div className={`reusable-section ${variant}`}>
        {showUpper && <div className={`section-divider ${variant}`}/>}

        {icon && (
            <Image
                src={icon}
                className="section-icon"
                alt="image"
                width={100}
                height={100}
            />
            )}
            {reactIcon && (
                <>
                    {reactIcon}
                </>
            )}
            {title && <h3 className="section-title">{title}</h3>}
            {subtitle && (
            <p className={`section-subtitle ${subtitleClassName ?? ""}`}>
                {subtitle}
            </p>
        )}
            {subsubsubtitle && <p className="section-subtitle">{subsubsubtitle}</p>}
            {subsubtitle && <p className="section-subsubtitle">{subsubtitle}</p>}

            {button && (
                <>
                    {button.href ? (
                        <a
                            href={button.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="section-button"
                        >
                            {button.label}
                        </a>
                    ) : (
                        <button
                            onClick={button.onClick}
                            className="section-button"
                        >
                            {button.label}
                        </button>
                    )}
                </>
            )}

            {showDown && <div className={`section-divider ${variant}`} />}
        </div>
        </motion.div>
    )
}

export default ReusableSection
