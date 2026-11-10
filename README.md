# Mi propia TV

PWA para usar una cuenta IPTV Xtream desde el iPhone y ver los canales en la tele por AirPlay.

- **Listas en el móvil:** login, categorías, búsqueda, favoritos, recientes y guía (ahora y a continuación).
- **Vídeo en la tele:** al tocar un canal se abre el stream en el reproductor de Safari; desde ahí, AirPlay.
- **Sin servidor:** todo funciona en GitHub Pages. Usuario, contraseña y favoritos se guardan solo en el dispositivo (`localStorage`); nada de eso está en este repositorio.

## Uso

1. Abre `https://hectorest.github.io/mi-propia-tv/` en Safari.
2. Compartir → «Añadir a pantalla de inicio».
3. Entra con la dirección **https://** de la API, tu usuario y tu contraseña.

## Cómo llega el vídeo a Safari

La API del proveedor admite HTTPS y CORS, pero los streams no:

1. La URL del canal (`http://DOMINIO/live/...`, detrás de Cloudflare) rechaza a los navegadores por su User-Agent y solo acepta reproductores (`AppleCoreMedia`, VLC…). Responde con una redirección a un servidor por IP con un token.
2. Ese token va ligado a la IP pública de quien lo pide.
3. El servidor final acepta cualquier User-Agent con el token.

Por eso, al tocar un canal, la app abre el script `scriptable/MiTV.js` en **Scriptable** (iPhone). El script pide la URL como `AppleCoreMedia` desde tu propia conexión, lee la redirección sin seguirla y abre la dirección con el token en Safari, desde donde se envía por AirPlay.

Configuración: en la app, Ajustes → Scriptable → «Copiar script», y pégalo en Scriptable como un script nuevo llamado `MiTV`.

## Archivos

- `index.html`: la app.
- `diagnostico.html`: prueba HTTPS, CORS, streams y AirPlay contra el servidor.
- `scriptable/MiTV.js`: script para Scriptable que obtiene la URL con token.
- `sw.js`, `manifest.webmanifest`, iconos: soporte PWA.
