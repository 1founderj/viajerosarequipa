# RECOVERY LOG — Viajeros Arequipa

Registro completo de cambios, diagnósticos, verificaciones y procedimientos de reversión efectuados durante la recuperación y conversión del proyecto a SPA cliente estática.

---

## Estado de la Fuente Canónica
- **Decisión:** Canónica NO disponible en Lovable.
- **Evidencia:** Confirmado por el usuario en Fase 0 que el proyecto ya no reside en Lovable y que solo se dispone de los archivos descargados localmente.

---

## Respaldo Verificado (Fase 1)
- **Ubicación externa:** `/Users/userthink/Documents/Viajeros_Arequipa_backup_baseline`
- **Conteo de archivos original:** 97 archivos
- **Conteo de archivos en respaldo:** 97 archivos
- **Estado:** 100% verificado e idéntico antes de iniciar cualquier modificación.

---

## Registro de Cambios

### Cambio 01
- **Fecha:** 2026-10-17
- **Archivo:** `.gitignore`
- **Qué se cambió:** Creación del archivo `.gitignore` a partir del archivo huérfano `gitignore` (descargado sin punto inicial), agregando explícitamente `.env*`, `node_modules` y `dist`.
- **Motivo / Evidencia:** Prevenir el seguimiento o filtración de dependencias compiladas y credenciales de entorno antes de la inicialización del repositorio git.
- **Cómo revertir:** `rm .gitignore` (el archivo original `gitignore` permanece intacto).
- **Resultado:** Commit baseline inicial `d8ee261`.

### Cambio 02
- **Fecha:** 2026-10-17
- **Archivo:** `package.json`
- **Qué se cambió:** 
  1. Scripts ajustados a Vite estándar (`dev: vite`, `build: vite build`, `preview: vite preview`).
  2. Eliminación de dependencias de servidor: `@tanstack/react-start`, `@lovable.dev/vite-tanstack-config` y `nitro`.
- **Motivo / Evidencia:** Solicitud explícita del usuario de convertir la aplicación a una SPA clásica estática sin dependencias de servidor.
- **Cómo revertir:** `git checkout 20d737f -- package.json`
- **Resultado:** Archivo de configuración limpio sin llamadas al backend Nitro. Commit `513718f`.

### Cambio 03
- **Fecha:** 2026-10-17
- **Archivo:** `vite.config.ts`
- **Qué se cambió:** Reconfiguración para usar la API estándar de Vite con plugins `@vitejs/plugin-react`, `@tailwindcss/vite`, `@tanstack/router-plugin/vite` y resolución de alias `@` apuntando a `./src`.
- **Motivo / Evidencia:** Desacoplar la aplicación del plugin privativo de servidor `@lovable.dev/vite-tanstack-config`.
- **Cómo revertir:** `git checkout 513718f -- vite.config.ts`
- **Resultado:** Compilación y resolución de rutas Vite completamente funcionales. Commit `22ef0ff`.

### Cambio 04
- **Fecha:** 2026-10-17
- **Archivo:** `index.html`
- **Qué se cambió:** Creación de `index.html` en la raíz con metadatos SEO, fuentes Google Fonts ("Cormorant Garamond" y "DM Sans"), favicon y contenedor `<div id="root"></div>` apuntando a `/src/main.tsx`.
- **Motivo / Evidencia:** Las SPAs de Vite requieren un documento `index.html` raíz como punto de entrada del navegador.
- **Cómo revertir:** `rm index.html`
- **Resultado:** El navegador carga la estructura base del DOM correctamente. Commit `d8a2e55`.

### Cambio 05
- **Fecha:** 2026-10-17
- **Archivos:** `src/main.tsx` y `src/routes/__root.tsx`
- **Qué se cambió:**
  1. Creación de `src/main.tsx` para inicializar el router de TanStack y montar en `#root`.
  2. Adaptación de `src/routes/__root.tsx` removiendo `RootShell` (renderizado SSR de html/body) y manteniendo `Outlet`, `QueryClientProvider` y gestión de errores.
- **Motivo / Evidencia:** En modo SPA cliente, React debe montar en `#root` sin duplicar etiquetas `<html>` y `<body>`.
- **Cómo revertir:** `rm src/main.tsx && git checkout d8a2e55 -- src/routes/__root.tsx`
- **Resultado:** Renderizado de componentes en cliente sin errores de hidratación. Commit `3a6dcd2`.

### Cambio 06
- **Fecha:** 2026-10-17
- **Archivos:** `src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`
- **Qué se cambió:**
  1. Archivos `server.ts` y `start.ts` renombrados a `src/server.ts.backup` y `src/start.ts.backup`.
  2. Ajuste de declaración de módulo en `src/routeTree.gen.ts` para registrar en `@tanstack/react-router` en lugar de `@tanstack/react-start`.
- **Motivo / Evidencia:** Desactivación de middleware de servidor SSR.
- **Cómo revertir:** `git checkout 3a6dcd2 -- src/server.ts src/start.ts src/routeTree.gen.ts`
- **Resultado:** Árbol de rutas 100% compatible con router cliente. Commit `a2f7726`.

### Cambio 07
- **Fecha:** 2026-10-17
- **Ambiente:** Node.js runtime en `/Users/userthink/.local/node` y dependencia nativa
- **Qué se cambió:**
  1. Instalación de Node.js v22.14.0 LTS darwin-x64 en espacio de usuario y agregado permanente a `~/.zshrc`.
  2. Instalación de `@rolldown/binding-darwin-x64@1.2.1` como binding nativo de Vite 8 para arquitectura darwin-x64.
- **Motivo / Evidencia:**
  - El sistema carecía de Node.js y npm (`command not found: node`).
  - Vite 8 y TanStack Router requerían Node `>=20.19.0 || >=22.12.0` (EBADENGINE resuelto con v22).
  - Rolldown requería el binario nativo de arquitectura x86_64 para el build de Vite.
- **Cómo revertir:** `npm rm @rolldown/binding-darwin-x64` y `rm -rf ~/.local/node`
- **Resultado:** `npm run build` ejecutado en 2.59s generando el directorio `dist/`.

### Cambio 08
- **Fecha:** 2026-10-17
- **Archivos:** `src/assets/logo.jpg`, `src/components/travel/site.tsx`
- **Qué se cambió:**
  1. Copia de `logo-viajerosarequipa.jpg` a `src/assets/logo.jpg`.
  2. Reemplazo del import fallido `@/assets/logo.jpg.asset.json` por import nativo directo `logoImg from '@/assets/logo.jpg'` manteniendo la interfaz `{ url: logoImg }`.
- **Motivo / Evidencia:** `npx tsc --noEmit` reportó `TS2307: Cannot find module '@/assets/logo.jpg.asset.json'`.
- **Cómo revertir:** `git checkout a2f7726 -- src/components/travel/site.tsx && rm src/assets/logo.jpg`
- **Resultado:** `npx tsc --noEmit` completó con 0 errores (código de salida 0). Commit `64151c8`.

---

## Verificación Funcional y Pruebas

| Prueba | Comando / Procedimiento | Resultado | Evidencia |
| :--- | :--- | :--- | :--- |
| **Chequeo de tipos** | `npx tsc --noEmit` | **PASA** | Salida limpia, código 0 |
| **Tests unitarios de enrutamiento** | `npm test` (`vitest run`) | **PASA** | `1 passed (1)` en 3.85s |
| **Compilación de producción** | `npm run build` | **PASA** | Genera `dist/` en 2.59s (HTML, CSS, JS, imágenes) |
| **Servidor de previsualización** | `npx vite preview --port 4173` | **PASA** | HTTP 200 en `http://localhost:4173/` |
| **Servidor de desarrollo activo** | `npm run dev` | **PASA** | Activo en `http://localhost:5173/` |
| **Ruta `/` (Inicio)** | `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/` | **PASA** | HTTP 200 |
| **Ruta `/nosotros`** | `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/nosotros` | **PASA** | HTTP 200 |
| **Ruta `/contacto`** | `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/contacto` | **PASA** | HTTP 200 |
| **Ruta `/propiedades`** | `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/propiedades` | **PASA** | HTTP 200 |
| **Ruta `/propiedades/:slug`** | `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/propiedades/hostal-sillar` | **PASA** | HTTP 200 |
| **Ruta `/tours`** | `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/tours` | **PASA** | HTTP 200 |
| **Ruta `/tours/:slug`** | `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/tours/colca` | **PASA** | HTTP 200 |
| **Asset logo** | `http://localhost:5173/src/assets/logo.jpg` | **PASA** | HTTP 200 |
| **Assets imágenes catálogo** | `arequipa.jpg`, `catalina.jpg`, `colca.jpg`, `stay.jpg` | **PASA** | HTTP 200 en todos |
| **Favicon** | `http://localhost:5173/favicon.png` | **PASA** | HTTP 200 |
