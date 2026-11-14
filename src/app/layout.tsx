import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AEGIS — Monitoreo de salud en vuelo',
  description:
    'Herramienta de evaluación de salud para tripulaciones en misiones espaciales. No es un dispositivo médico.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-black text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
