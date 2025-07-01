import { SchengenVisaForm } from "../components/visa";

export const SchengenPage = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fa', marginTop: 40 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ maxWidth: 700, width: '100%', padding: 28, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', color: '#222', marginBottom: 40 }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1976d2', marginBottom: 8 }}>Schengen Visa Application Form</h1>
                    <div style={{ fontSize: 15, color: '#888', marginBottom: 24 }}>(Note: For internal use - Client Data collection Only)</div>
                    <SchengenVisaForm />
                </div>
            </div>
        </div>
    )
}