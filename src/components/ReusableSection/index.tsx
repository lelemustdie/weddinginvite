// components/reusable-section/index.tsx
import "./styles.css"
import Image from "next/image";

interface ButtonProps {
    label: string
    href?: string       // opcional
    onClick?: () => void // nuevo para modal
}

interface ReusableSectionProps {
    /** @deprecated Usa divisorUpper/divisorDown. Si se pasa, activa ambos divisores. */
    divisors?: boolean
    /** Color scheme */
    variant?: "green" | "white"
    /** Icono opcional arriba del título */
    icon?: any
    /** Título de la sección */
    title?: string
    /** Subtítulo / descripción corta */
    subtitle?: string
    subsubtitle?: string
    subsubsubtitle?: string
    /** Botón opcional con label y href o onClick */
    button?: ButtonProps
    /** Muestra un divisor arriba del contenido */
    divisorUpper?: boolean
    /** Muestra un divisor abajo del contenido */
    divisorDown?: boolean
}

const ReusableSection = ({
                             // retrocompat: si vienen divisors=true, activamos ambos
                             divisors = false,
                             variant = "white",
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
