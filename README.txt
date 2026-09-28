GESTOR TALLER & CASA - v2.1
===========================

ARCHIVOS
- index.html            La aplicacion completa (abrala en Chrome / Safari)
- logo-prestige-racing.png   Logo de Prestige Racing (fondo transparente). Lo usa la intro.
- marca-agua.png / marca-agua-claro.png   El mismo logo, muy tenue, para el fondo.
- manifest.json         Para instalarla como app (con sus iconos)
- icon-192.png, icon-512.png, icon-maskable-512.png   Iconos de la app
- sw.js                 Funciona sin internet (requiere HTTPS o localhost)
- servidor.js           Servidor local SOLO para pruebas: node servidor.js -> http://localhost:8099
- _headers              Cabeceras de seguridad (Netlify / Cloudflare Pages)
- PROMPT_PARA_IA.md / contexto.txt   Historia y requisitos del proyecto

NOMBRES (para no confundirlos)
- Prestigestor    = la aplicacion (el cuaderno de cuentas).
- Prestige Racing = el taller (la marca del logo).

NOVEDADES v2.2 - MARCA Y NOMBRE
- La aplicacion ahora se llama PRESTIGESTOR (antes "Gestor Taller & Casa"):
  * titulo del navegador, nombre al instalarla, encabezado y candado.
  * los backups ahora salen como prestigestor_backup_FECHA_Nregs.json.
  * por dentro sigue igual: si ya tenia una copia vieja, se restaura sin problema.
- Intro de entrada: al abrir la pagina -y tambien despues de escribir el PIN- aparece una
  presentacion con el logo de Prestige Racing (rayos de velocidad, bandera de cuadros,
  destello), el nombre del taller y "Bienvenido a Prestigestor" con el saludo del dia y la
  fecha. Dura unos 6 segundos, se puede saltar tocando la pantalla (o Enter / Escape).
- El logo tambien es el FONDO: muy tenue (marca de agua) detras del encabezado y en el fondo
  de la pagina. Esta puesto como fondo, asi que nunca tapa ni cruza el texto.
- El candado del PIN lleva el medallon de la marca.
- Iconos nuevos (192, 512 y el redondeado/maskable): la pantalla de arranque del celular ya
  no muestra la llave, muestra la marca.
- Si el celular tiene activado "reducir movimiento", la intro sale sin animaciones.
- IMPORTANTE al subir esta version: suba TODA la carpeta (hacen falta el logo, las marcas de
  agua y los iconos nuevos, no basta con index.html). El cache de sw.js ya va en 'gestor-v8'.

COMO USAR
1. Publique la carpeta en Netlify (recomendado, usa _headers) o GitHub Pages.
   Mantenga SIEMPRE la misma direccion: los datos quedan guardados en el navegador,
   ligados a esa direccion.
2. Abra el enlace una vez con internet y en Chrome: Menu > "Agregar a pantalla de inicio".
3. Cada vez que se cambie index.html, suba el numero del cache en sw.js (CACHE = 'gestor-vN').

NOVEDADES v2.1
- Colores: boton pequeno (paleta, esquina de arriba a la derecha) con 6 temas:
  Laton, Azul, Turquesa, Naranja, Violeta y Claro. Se recuerda la eleccion.
- Seguridad:
  * Todo dato (guardado, importado o restaurado) se valida: tipos, fechas reales, valores,
    categorias e ids. Un backup manipulado ya no puede ejecutar codigo.
  * Politica de seguridad (CSP): la app no puede cargar ni enviar nada a otros sitios.
  * PIN: guardado con sal + PBKDF2 (150.000 vueltas). Tras 5 fallos espera 30 s, 1, 5 y
    15 min, y la espera NO se salta recargando la pagina. Los PIN antiguos se actualizan solos.
  * El PIN es un candado de pantalla: NO cifra los datos. Los backups tampoco van cifrados.
  * servidor.js ya no permite leer archivos fuera de la carpeta y solo escucha en este equipo.
- Datos:
  * Corregido: cancelar un borrado y luego guardar otra cosa podia borrar el registro cancelado.
  * Si la copia principal se vacia o daña, se recupera sola desde la copia espejo.
  * Registros daños se apartan en 'gestor_cuarentena_v1' (nunca se borran en silencio).
  * Pide al navegador proteger el almacenamiento para que no lo borre por falta de espacio.
  * Dos pestanas abiertas ya no se pisan entre si.
  * Quitada la descarga "automatica" de backup cada 30 dias (el navegador podia bloquearla
    y la app creia que ya habia copia). Queda el aviso cada 7 dias.
- Correcciones: "1 semana" cuenta 7 dias exactos (antes 8); "1 mes"/"1 ano" ya no se desbordan
  (31 de marzo - 1 mes); el texto de Promedios ya no dice "Hoy" en periodos largos.
- Sin internet: la pagina principal se actualiza sola cuando hay red; el resto sale de la copia.
- Iconos PNG reales, aviso si JavaScript esta desactivado, botones con nombre para lectores
  de pantalla, la app no aparece en buscadores (noindex).

DATOS: claves de localStorage
- gestor_datos_v1 / gestor_respaldo_v1   registros (principal + espejo)
- gestor_cuarentena_v1  registros daños apartados (si los hubo)
- gestor_cierres_v1 / gestor_cierres_espejo_v1   dias guardados
- gestor_servicios_v1   servicios frecuentes
- gestor_pin_v1 / gestor_pin_fallos   PIN (hash con sal) y control de intentos
- gestor_tema_v1        color elegido
- gestor_ultimo_backup  fecha de la ultima copia

LIMITES HONESTOS
- Los datos viven en el navegador de ESE celular: si borra los datos del navegador o
  desinstala, se pierden. La unica garantia real es el backup: guardelo cada semana
  (boton Backup / WhatsApp).
- GitHub Pages no permite cabeceras propias; la etiqueta CSP dentro de index.html
  protege igual, pero Netlify con _headers da una proteccion algo mayor.
