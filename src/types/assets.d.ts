/**
 * Declaraciones de módulos sin tipos.
 * Next.js permite importar CSS global por efecto secundario, pero TypeScript
 * estricto necesita saber que el módulo existe.
 */

declare module '*.css';
declare module '*.svg';
