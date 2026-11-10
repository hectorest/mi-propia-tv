# Mi propia TV

PWA para usar una cuenta IPTV Xtream desde el iPhone y ver los canales en la tele por AirPlay.

- **Listas en el móvil:** login, categorías, búsqueda, favoritos, recientes y guía (ahora y a continuación).
- **Vídeo en la tele:** al tocar un canal se abre el stream en el reproductor de Safari; desde ahí, AirPlay.
- **Sin servidor:** todo funciona en GitHub Pages. Usuario, contraseña y favoritos se guardan solo en el dispositivo (`localStorage`); nada de eso está en este repositorio.

## Uso

1. Abre `https://hectorest.github.io/mi-propia-tv/` en Safari.
2. Compartir → «Añadir a pantalla de inicio».
3. Entra con la dirección **https://** de la API, tu usuario y tu contraseña.

## Por qué se abre fuera de la app

La API del proveedor admite HTTPS y CORS, pero los streams solo van por HTTP. Una página HTTPS no puede cargar vídeo HTTP dentro de ella (ni en `<video>` ni en un iframe), pero sí abrir esa URL directamente en el reproductor de Safari.

## Archivos

- `index.html`: la app.
- `diagnostico.html`: prueba HTTPS, CORS, streams y AirPlay contra el servidor.
- `sw.js`, `manifest.webmanifest`, iconos: soporte PWA.
