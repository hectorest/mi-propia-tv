// Mi TV — script para Scriptable (iPhone)
//
// La app Mi TV lo abre al tocar un canal:  scriptable:///run/MiTV?url=<url del canal>
// Pide el canal con una firma de reproductor aceptada por el proveedor (AppleCoreMedia),
// lee la redirección con el token sin seguirla y abre esa dirección en Safari,
// desde donde se puede enviar a la tele por AirPlay.
// Todo ocurre en el iPhone y desde tu propia conexión: el token queda ligado a tu IP.

const UA = 'AppleCoreMedia/1.0.0';
const params = args.queryParameters || {};
const url = params.url;

async function fail(msg) {
  const a = new Alert();
  a.title = 'Mi TV';
  a.message = msg;
  a.addAction('Vale');
  await a.presentAlert();
  Script.complete();
}

function absolute(loc, base) {
  if (/^https?:\/\//i.test(loc)) return loc;
  const origin = (base.match(/^https?:\/\/[^/]+/i) || [''])[0];
  return loc.startsWith('/') ? origin + loc : base.replace(/[^/]*$/, '') + loc;
}

if (!url) {
  await fail('Este script se abre desde la app Mi TV al tocar un canal.');
} else {
  try {
    let target = null;
    const req = new Request(url);
    req.headers = { 'User-Agent': UA };
    req.timeoutInterval = 15;
    req.onRedirect = (next) => { target = next.url; return null; }; // no seguir: solo queremos la dirección
    await req.load();
    const res = req.response || {};
    const h = res.headers || {};
    const loc = target || h.Location || h.location;
    if (loc) {
      Safari.open(absolute(loc, url));
      Script.complete();
    } else if (res.statusCode === 200) {
      Safari.open(url);
      Script.complete();
    } else {
      await fail(`El servidor respondió ${res.statusCode || 'sin código'} y no dio la dirección del vídeo.`);
    }
  } catch (e) {
    await fail('No se pudo contactar con el servidor: ' + e);
  }
}
