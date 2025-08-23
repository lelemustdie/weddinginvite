// components/reusable-section/index.tsx
import "./styles.css"

interface ButtonProps {
    label: string
    href: string
}

interface ReusableSectionProps {
    /** @deprecated Usa divisorUpper/divisorDown. Si se pasa, activa ambos divisores. */
    divisors?: boolean
    /** Color scheme */
    variant?: "green" | "white"
    /** Icono opcional arriba del título */
    icon?: React.ReactNode
    /** Título de la sección */
    title?: string
    /** Subtítulo / descripción corta */
    subtitle?: string
    /** Botón opcional con label y href */
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
                             button,
                             divisorUpper,
                             divisorDown,
                         }: ReusableSectionProps) => {
    const showUpper = divisors || !!divisorUpper
    const showDown = divisors || !!divisorDown

    return (
        <div className={`reusable-section ${variant}`}>
            {showUpper && <div className={`section-divider ${variant}`} />}

            {icon && <div className="section-icon">{icon}</div>}
            {title && <h3 className="section-title">{title}</h3>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}

            {button && (
                <a
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="section-button"
                >
                    {button.label}
                </a>
            )}

            {showDown && <div className={`section-divider ${variant}`} />}
        </div>
    )
}

export default ReusableSection
