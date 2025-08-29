// components/reusable-section/index.tsx
import "./styles.css"
import Image, {StaticImageData} from "next/image";
import {IconType} from "react-icons";

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
                             subsubtitle,
                             subsubsubtitle,
                             button,
                             divisorUpper,
                             divisorDown,
                         }: ReusableSectionProps) => {
    const showUpper = divisors || !!divisorUpper
    const showDown = divisors || !!divisorDown

    return (
        <div className={`reusable-section ${variant}`}>
            {showUpper && <div className={`section-divider ${variant}`} />}

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
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
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
    )
}

export default ReusableSection
