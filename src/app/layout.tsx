import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AEGIS — Monitoreo de salud en vuelo',
  description:
    'Herramienta de evaluación de salud para tripulaciones en misiones espaciales. No es un dispositivo médico.',
  applicationName: 'AEGIS',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0e13',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-black text-neutral-100 antialiased">
        {children}
        <RegisterServiceWorker />
      </body>
    </html>
  );
}

/**
 * Registra el service worker. Solo en producción: en desarrollo el SW
 * interfiere con el HMR de Next y cachea respuestas obsoletas.
 */
function RegisterServiceWorker() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function () {
              navigator.serviceWorker.register('/sw.js').catch(function (error) {
                console.warn('[AEGIS] SW no registrado:', error);
              });
            });
          }
        `,
      }}
    />
  );
}
