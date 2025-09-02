"use client";

import { useMemo, useState } from "react";
import "./styles.css";

type Attendance = "asistire" | "no-asistire";

export type RsvpPayload = {
    attendance: Attendance;
    firstName: string;
    lastName: string;
    diet?:
        | "celiaco"
        | "vegano"
        | "vegetariano"
        | "hipertenso"
        | "intolerante-lactosa"
        | "diabetico"
        | "otro"
        | "ninguno";
    dietOtherText?: string;
};

interface RsvpFormProps {
    title?: string;
    subtitle?: string;
    onSubmit?: (data: RsvpPayload) => Promise<void> | void;
    googleScriptUrl?: string; // Add this prop for the Google Apps Script URL
}

const DIET_OPTIONS = [
    { value: "ninguno", label: "Ninguno" },
    { value: "celiaco", label: "Celíaco/a" },
    { value: "vegano", label: "Vegano/a" },
    { value: "vegetariano", label: "Vegetariano/a" },
    { value: "hipertenso", label: "Hipertenso/a (bajo sodio)" },
    { value: "intolerante-lactosa", label: "Intolerante a la lactosa" },
    { value: "diabetico", label: "Diabético/a" },
    { value: "otro", label: "Otro (especificar)" },
] as const;

export default function RsvpForm({
                                     title = "CONFIRMÁ TU ASISTENCIA",
                                     subtitle = "Antes del 6 de noviembre",
                                     onSubmit,
                                     googleScriptUrl, // Your Google Apps Script URL
                                 }: RsvpFormProps) {
    const [attendance, setAttendance] = useState<Attendance>("asistire");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [diet, setDiet] = useState<RsvpPayload["diet"]>("ninguno");
    const [dietOtherText, setDietOtherText] = useState("");
    const [loading, setLoading] = useState(false);
    const [okMsg, setOkMsg] = useState<string | null>(null);
    const [errMsg, setErrMsg] = useState<string | null>(null);

    const needsDiet = attendance === "asistire";
    const needsDietOtherText = needsDiet && diet === "otro";

    const isValid = useMemo(() => {
        if (!firstName.trim() || !lastName.trim()) return false;
        if (needsDietOtherText && !dietOtherText.trim()) return false;
        return true;
    }, [firstName, lastName, needsDietOtherText, dietOtherText]);

    const submitToGoogleSheets = async (payload: RsvpPayload) => {
        if (!googleScriptUrl) {
            throw new Error("Google Script URL not provided");
        }

        await fetch(googleScriptUrl, {
            method: "POST",
            mode: "no-cors", // Important for Google Apps Script
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setOkMsg(null);
        setErrMsg(null);

        if (!isValid) {
            setErrMsg("Completá los campos obligatorios.");
            return;
        }

        const payload: RsvpPayload = {
            attendance,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            diet: needsDiet ? diet : undefined,
            dietOtherText: needsDietOtherText ? dietOtherText.trim() : undefined,
        };

        try {
            setLoading(true);

            if (onSubmit) {
                // Use custom onSubmit if provided
                await onSubmit(payload);
            } else if (googleScriptUrl) {
                // Submit to Google Sheets
                await submitToGoogleSheets(payload);
            } else {
                // Fallback to your existing API
                await fetch("/api/rsvp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }

            setOkMsg("¡Tu respuesta fue registrada! Gracias ❤️");

            // Reset form after successful submission
            setFirstName("");
            setLastName("");
            setAttendance("asistire");
            setDiet("ninguno");
            setDietOtherText("");

        } catch (error) {
            console.error("Submission error:", error);
            setErrMsg("Hubo un problema al enviar tu respuesta. Intentalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        /* FONDO VERDE PLEIN-WIDTH */
        <div className="rsvp-bg">
            <section className="rsvp-wrapper">
                <header className="rsvp-header">
                    <h2 className="rsvp-title">{title}</h2>
                    <p className="rsvp-subtitle">{subtitle}</p>
                </header>

                <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
                    {/* asistencia */}
                    <label className="rsvp-label" htmlFor="attendance">
                        ¿Vas a asistir?
                    </label>
                    <div className="rsvp-select-wrap">
                        <select
                            id="attendance"
                            className="rsvp-select"
                            value={attendance}
                            onChange={(e) => setAttendance(e.target.value as Attendance)}
                        >
                            <option value="asistire">Asistiré</option>
                            <option value="no-asistire">No asistiré</option>
                        </select>
                    </div>

                    {/* nombre / apellido */}
                    <div className="rsvp-row">
                        <div className="rsvp-col">
                            <label className="rsvp-label" htmlFor="firstName">
                                Nombre *
                            </label>
                            <input
                                id="firstName"
                                className="rsvp-input"
                                type="text"
                                autoComplete="given-name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="rsvp-col">
                            <label className="rsvp-label" htmlFor="lastName">
                                Apellido *
                            </label>
                            <input
                                id="lastName"
                                className="rsvp-input"
                                type="text"
                                autoComplete="family-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* dietas condicional */}
                    {needsDiet && (
                        <>
                            <label className="rsvp-label" htmlFor="diet">
                                ¿Algún requerimiento en la alimentación?
                            </label>
                            <div className="rsvp-select-wrap">
                                <select
                                    id="diet"
                                    className="rsvp-select"
                                    value={diet}
                                    onChange={(e) => setDiet(e.target.value as RsvpPayload["diet"])}
                                >
                                    {DIET_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {needsDietOtherText && (
                                <div className="rsvp-col" style={{ marginTop: ".25rem" }}>
                                    <label className="rsvp-label" htmlFor="dietOther">
                                        Especificá tu restricción
                                    </label>
                                    <input
                                        id="dietOther"
                                        className="rsvp-input"
                                        type="text"
                                        value={dietOtherText}
                                        onChange={(e) => setDietOtherText(e.target.value)}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    <div className="rsvp-actions">
                        <button
                            className="rsvp-submit"
                            type="submit"
                            disabled={loading || !isValid}
                        >
                            {loading ? "Enviando..." : "Confirmar"}
                        </button>
                    </div>

                    {okMsg && <p className="rsvp-ok">{okMsg}</p>}
                    {errMsg && <p className="rsvp-error">{errMsg}</p>}
                </form>
            </section>
        </div>
    );
}
