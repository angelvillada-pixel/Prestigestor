# PROMPT PROFESIONAL - GESTOR TALLER & CASA
## Para continuar el desarrollo de la aplicación web

---

## 📋 CONTEXTO DEL PROYECTO

Estoy desarrollando una aplicación web para mi hermano, quien es **mecánico de motos** y trabaja en un taller compartido. Actualmente lleva sus cuentas en hojas de papel o notas del celular, lo cual es caótico. Necesita un sistema digital simple pero completo que le permita llevar el control de sus finanzas personales y del taller de forma **independiente**.

**Usuario objetivo:** Mecánico de motos, no muy técnico, usa celular Android principalmente. Necesita algo rápido e intuitivo porque está trabajando con las manos ocupadas.

---

## 🎯 OBJETIVO PRINCIPAL

Crear una **aplicación web responsive** (funciona en celular y computadora) que funcione como su "cuaderno digital" con las siguientes características:

---

## 📱 ESTRUCTURA DE LA APLICACIÓN

### NAVEGACIÓN PRINCIPAL (4 pestañas):

#### 1. 🔧 TALLER
**Completamente independiente de Casa**

**Sub-opciones:**
- **Ingresos por trabajo:** Cuando arregla una moto y le pagan
- **Gastos del taller:** Repuestos, aceites, herramientas, etc.
- **💰 COSPIRE (OPCIÓN ESPECIAL):**
  - Nombre exacto: "Cospire"
  - Al seleccionarla, debe aparecer este mensaje: **"Aquí puede guardar ingresos extras o si hizo algún cospire"**
  - Es para trabajos extra que hace fuera del taller o por su cuenta
  - Debe tener un color/distintivo especial (dorado/ámbar)

**Funcionalidades:**
- Formulario simple: Tipo (ingreso/gasto/cospire), Descripción, Valor
- Lista de registros del día en tiempo real
- Resumen del día: Total ingresos, Total gastos, Total cospire
- Cada registro se puede **EDITAR** y **ELIMINAR**

#### 2. 🏠 CASA
**Completamente independiente del Taller**

**Categorías (sub-menú que se despliega):**
- 🏠 **Arriendo y Servicios** (agua, luz, gas, internet)
- 👧 **Luciana** (gastos de su hija: colegio, ropa, medicinas, comida)
- 🏍️ **Gastos de la Moto** (su moto personal, no la del taller)
- 💳 **Deudas** (dinero que debe, con opción de marcar como "pagada" después)
- 👤 **Gastos Personales** (comida, ropa, salidas)
- 📦 **Otros** (cualquier otro gasto)

**Funcionalidades:**
- Al tocar una categoría, se despliega el formulario
- Formulario: Descripción, Valor, (si es Deuda: checkbox "Es deuda pendiente")
- Lista de registros del día en tiempo real
- Resumen: Total gastos del día, Total deudas activas
- Cada registro se puede **EDITAR** y **ELIMINAR**

#### 3. 📅 HISTORIAL
**Búsqueda por fecha específica**

- Selector de fecha (calendario)
- Al seleccionar fecha, muestra:
  - Resumen: Ingresos Taller, Gastos Taller, Cospire, Gastos Casa
  - Lista detallada de Taller (con opción editar/eliminar)
  - Lista detallada de Casa (con opción editar/eliminar)
- Ejemplo de uso: "Quiero ver mis gastos del martes 12"

#### 4. 📊 PROMEDIOS
**Análisis y evaluación en tiempo real**

**Selector de período:**
- 1 Día
- 1 Semana
- 1 Mes
- 1 Año
- Todo el Historial

**Al seleccionar, muestra análisis detallado:**
- 🔧 Ingresos Taller (total del período)
- 🔧 Gastos Taller (total del período)
- 💰 Total Cospire (total del período)
- 🏠 Gastos Casa (total del período)
- 💳 Deudas Pendientes (total del período)

**Resumen por sector:**
- **Neto Taller:** (Ingresos + Cospire) - Gastos
- **Total Casa:** Suma de todos los gastos

**Resultado Final:**
- **Promedio Total (Taller + Casa):** Lo que realmente le queda en el bolsillo
- Fórmula: Neto Taller - Total Casa

---

## ⚙️ REQUISITOS TÉCNICOS

### Frontend:
- HTML5, CSS3, JavaScript vanilla (sin frameworks pesados)
- **Responsive Design** (mobile-first, funciona en celular)
- Dark mode (tema oscuro, fácil de leer en taller)
- Colores distintivos:
  - Taller: Azul (#3b82f6)
  - Casa: Verde (#10b981)
  - Cospire: Dorado/Ámbar (#f59e0b)
  - Deudas: Rojo (#ef4444)

### Almacenamiento:
- **LocalStorage** del navegador (datos quedan en el dispositivo)
- Estructura de datos:
```json
{
  "id": timestamp,
  "fecha": "YYYY-MM-DD",
  "sector": "taller" | "casa",
  "tipo": "ingreso" | "gasto" | "cospire",
  "categoria": "arriendo" | "luciana" | "moto" | "deudas" | "personal" | "otros" | null,
  "descripcion": "string",
  "valor": number,
  "esDeuda": boolean,
  "pagada": boolean (opcional, para deudas),
  "timestamp": ISO string
}
```

### Validaciones y Seguridad:
- No permitir valores negativos o cero
- No permitir descripción vacía
- Confirmación antes de eliminar
- Límite razonable de caracteres en descripción (100 chars)
- Sanitizar inputs para prevenir XSS

### Extras:
- **Calculadora flotante** en esquina inferior derecha (botón circular)
- Formato de moneda: Pesos colombianos ($1.000.000)
- Fecha actual visible en header
- Animaciones suaves al agregar/eliminar registros

---

## ✅ LO QUE YA ESTÁ HECHO

1. ✅ Estructura HTML completa con las 4 secciones
2. ✅ Sistema de navegación por pestañas
3. ✅ Formularios de Taller (ingreso/gasto/cospire) con banner de Cospire
4. ✅ Formularios de Casa con 6 categorías
5. ✅ Sistema de guardado en LocalStorage
6. ✅ Renderizado de listas en tiempo real
7. ✅ Funcionalidad de Editar y Eliminar registros
8. ✅ Historial por fecha con resúmenes
9. ✅ Cálculo de promedios por período
10. ✅ Calculadora flotante funcional
11. ✅ Diseño responsive dark mode
12. ✅ Validaciones básicas (campos requeridos, valores positivos)

---

## 🔧 LO QUE FALTA POR HACER (Mejoras)

### Prioridad ALTA:
1. **Marcar deuda como pagada:** En la lista de Casa, si es una deuda, botón para marcarla como pagada (cambiar estado)
2. **Exportar/Importar datos:** Botón para descargar backup en JSON y cargarlo (por si cambia de celular)
3. **Filtros en listas:** Poder filtrar por categoría dentro de Casa (ej: solo ver gastos de Luciana)
4. **Búsqueda en historial:** Buscar por texto en descripción

### Prioridad MEDIA:
5. **Gráficas simples:** Barras o torta mostrando distribución de gastos por categoría
6. **Notificaciones:** Recordatorio de deudas pendientes al abrir la app
7. **Copia de seguridad automática:** Exportar a Google Drive o similar (opcional)
8. **Modo offline mejorado:** Service Worker para funcionar sin internet

### Prioridad BAJA (Nice to have):
9. **Múltiples usuarios:** Si el taller tiene más mecánicos (login simple por PIN)
10. **Fotos de recibos:** Adjuntar imagen al gasto (requiere más almacenamiento)
11. **Metas de ahorro:** Establecer meta mensual y ver progreso
12. **Widget para pantalla de inicio:** Android widget con resumen rápido

---

## 🐛 BUGS CONOCIDOS / POR VERIFICAR

1. Verificar que `event.target` funcione correctamente en todos los navegadores móviles (se usó para pasar el elemento en onclick)
2. La calculadora usa `eval()` - considerar reemplazar con parser seguro
3. Al editar un registro, no se puede cambiar la categoría (solo descripción y valor)

---

## 📁 ARCHIVOS ENTREGADOS

- `index.html` - Aplicación completa (HTML + CSS + JS en un solo archivo para fácil despliegue)

---

## 🚀 INSTRUCCIONES PARA CONTINUAR

1. Revisa el código actual en `index.html`
2. Implementa las mejoras de Prioridad ALTA primero
3. Mantén el código simple y comentado (el usuario no es técnico)
4. Prueba en modo responsive (celular)
5. Asegúrate de que los datos de Taller y Casa NUNCA se mezclen
6. El mensaje de Cospire debe ser EXACTAMENTE: "Aquí puede guardar ingresos extras o si hizo algún cospire"

---

## 💡 NOTAS IMPORTANTES

- El usuario es de Colombia, maneja Pesos Colombianos (COP)
- "Cospire" es una palabra coloquial colombiana para trabajo extra/informal
- Luciana es su hija, categoría importante para él
- La app debe funcionar SIN internet (LocalStorage)
- Diseño pensado para uso con una mano (botones grandes, fácil navegación)

---

**Fecha de creación:** Septiembre 2026
**Versión:** 1.0 (MVP funcional)
**Próxima versión objetivo:** 1.1 con mejoras de Prioridad ALTA
