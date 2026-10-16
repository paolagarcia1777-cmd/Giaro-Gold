/* =====================================================================
   GIARO GOLD - script.js
   Contiene: 1) el catálogo de contenido, 2) el buscador, 3) el formulario
   de contacto.
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. CATÁLOGO DE CONTENIDO
   JavaScript no puede "leer" automáticamente las otras páginas del sitio,
   así que definimos aquí una lista con lo que se puede buscar.
   Cada elemento tiene: título, descripción, página, enlace y palabras clave.
   --------------------------------------------------------------------- */
const catalogo = [
  {
    titulo: "Inicio",
    descripcion: "Giaro Gold: pulseras tejidas con balines y joyas por pedido en oro laminado 18 k.",
    pagina: "Inicio",
    url: "index.html",
    palabrasClave: ["portada", "principal", "joyeria", "emprendimiento", "pedido"]
  },
  {
    titulo: "Pulseras tejidas con balines",
    descripcion: "Pulseras tejidas a mano, con colores a elección y detalles dorados.",
    pagina: "Servicios",
    url: "servicios.html#pulseras",
    palabrasClave: ["pulsera", "manilla", "balin", "balines", "chaquira", "tejido", "colores", "muneca", "talla"]
  },
  {
    titulo: "Joyas por pedido",
    descripcion: "Anillos, cadenas, aretes, dijes, pulseras y tobilleras",
    pagina: "Servicios",
    url: "servicios.html#pedido",
    palabrasClave: ["anillo", "cadena", "aretes", "dije", "collar", "personalizado", "encargo", "exclusivo", "cotizacion"]
  },
  {
    titulo: "Oro laminado 18 k",
    descripcion: "Capa de oro de 18 k sobre una base metálica: aspecto de oro a un precio más accesible.",
    pagina: "Servicios",
    url: "servicios.html#laminado",
    palabrasClave: ["oro", "18k", "18 k", "quilates", "dorado", "material", "precio", "brillo", "base metalica"]
  },
  {
    titulo: "Cuidado de tus joyas",
    descripcion: "Evita perfumes, cremas y cloro, quítalas para bañarte y guárdalas secas y separadas.",
    pagina: "Servicios",
    url: "servicios.html#cuidado",
    palabrasClave: ["limpieza", "guardar", "perfume", "agua", "cloro", "duracion", "conservar", "mantenimiento"]
  },
  {
    titulo: "Nuestra historia",
    descripcion: "Giaro Gold empezó con encargos de joyas y crecio con pulseras tejidas a mano con cualquier diseño elegido por el clientes",
    pagina: "Nosotros",
    url: "nosotros.html#historia",
    palabrasClave: ["empresa", "origen", "emprendimiento", "quienes somos", "artesanal"]
  },
  {
    titulo: "Misión, visión y valores",
    descripcion: "Crear joyas en oro laminado 18 k que reflejen la personalidad de quien las lleva.",
    pagina: "Nosotros",
    url: "nosotros.html#mision",
    palabrasClave: ["mision", "vision", "valores", "honestidad", "compromiso", "artesanal"]
  },
  {
    titulo: "Quién está detrás de Giaro Gold",
    descripcion: "La creadora diseña la pulsera, la teje, y atiende a los clientes.",
    pagina: "Nosotros",
    url: "nosotros.html#equipo",
    palabrasClave: ["creadora", "fundadora", "equipo", "personas", "duena"]
  },
  {
    titulo: "Cómo cuidar tus joyas de oro laminado",
    descripcion: "Evita perfumes, cremas, cloro y agua salada, y límpialas con un paño suave y seco.",
    pagina: "Blog",
    url: "blog.html#post-cuidado",
    palabrasClave: ["cuidado", "limpiar", "pano", "guardar", "duracion", "consejos"]
  },
  {
    titulo: "Oro laminado, oro macizo y laminado: ¿en qué se diferencian?",
    descripcion: "Comparamos los tres materiales para que sepas qué estás comprando.",
    pagina: "Blog",
    url: "blog.html#post-diferencias",
    palabrasClave: ["macizo", "enchapado", "diferencia", "comparacion", "material", "capa", "oro"]
  },
  {
    titulo: "Cómo medir tu muñeca para una pulsera",
    descripcion: "Usa una cinta métrica flexible o un hilo y envíanos la medida con tu pedido.",
    pagina: "Blog",
    url: "blog.html#post-talla",
    palabrasClave: ["medida", "talla", "cinta", "hilo", "pulsera", "tamano", "ajuste"]
  },
  {
    titulo: "Cómo funciona un pedido personalizado",
    descripcion: "Nos cuentas tu idea, cotizamos, elaboramos la pieza y te la entregamos.",
    pagina: "Blog",
    url: "blog.html#post-pedido",
    palabrasClave: ["encargo", "cotizacion", "pasos", "entrega", "proceso", "personalizado"]
  },
  {
    titulo: "Contacto y pedidos",
    descripcion: "Formulario de pedido, Instagram, WhatsApp y correo de Giaro Gold.",
    pagina: "Contacto",
    url: "contacto.html",
    palabrasClave: ["instagram", "whatsapp", "telefono", "correo", "email", "formulario", "escribenos", "comprar", "pedir"]
  }
];

/* ---------------------------------------------------------------------
   2. FUNCIONES DEL BUSCADOR
   --------------------------------------------------------------------- */

/* Quita tildes, pasa a minúsculas y elimina espacios sobrantes.
   Así "Muñeca", "MUNECA" y "muneca" se consideran iguales. */
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")                 // separa la letra de su tilde
    .replace(/[\u0300-\u036f]/g, "")  // elimina las tildes
    .trim();
}

/* Evita que el texto escrito por el usuario se interprete como HTML. */
function escaparHTML(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

/* Recibe el término y devuelve los elementos del catálogo que coinciden.
   Si el usuario escribe varias palabras, TODAS deben aparecer. */
function buscar(termino) {
  const palabras = normalizar(termino).split(/\s+/);

  return catalogo.filter(function (item) {
    const textoItem = normalizar(
      item.titulo + " " + item.descripcion + " " + item.pagina + " " + item.palabrasClave.join(" ")
    );
    return palabras.every(function (palabra) {
      return textoItem.includes(palabra);
    });
  });
}

/* Escribe en el modal el mensaje o la lista de resultados. */
function mostrarResultados(termino, resultados) {
  const contenedor = document.getElementById("contenedorResultados");

  // Caso 1: campo vacío
  if (normalizar(termino) === "") {
    contenedor.innerHTML =
      '<div class="alert alert-info mb-0">Escribe una palabra para buscar. ' +
      'Por ejemplo: <strong>pulsera</strong>, <strong>oro</strong> o <strong>pedido</strong>.</div>';
    return;
  }

  // Caso 2: sin coincidencias
  if (resultados.length === 0) {
    contenedor.innerHTML =
      '<div class="alert alert-warning mb-0">No encontramos resultados para <strong>«' +
      escaparHTML(termino) + '»</strong>. Revisa la ortografía o prueba con otra palabra.</div>';
    return;
  }

  // Caso 3: hay coincidencias
  const total = resultados.length;
  let html = '<p class="text-muted">' + total + (total === 1 ? " resultado" : " resultados") +
             ' para <strong>«' + escaparHTML(termino) + '»</strong></p>';
  html += '<div class="list-group">';

  resultados.forEach(function (item) {
    html +=
      '<a class="list-group-item list-group-item-action resultado" href="' + item.url + '">' +
        '<div class="d-flex justify-content-between align-items-start gap-2">' +
          '<h3>' + item.titulo + '</h3>' +
          '<span class="etiqueta-pagina">' + item.pagina + '</span>' +
        '</div>' +
        '<p class="mb-0 small text-muted">' + item.descripcion + '</p>' +
      '</a>';
  });

  html += "</div>";
  contenedor.innerHTML = html;
}

/* ---------------------------------------------------------------------
   3. EVENTOS DEL BUSCADOR
   Se ejecutan cuando el HTML ya terminó de cargar.
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formBuscador");
  const campo = document.getElementById("campoBusqueda");
  const elementoModal = document.getElementById("modalResultados");
  const contenedor = document.getElementById("contenedorResultados");
  const btnLimpiar = document.getElementById("btnLimpiar");
  const modal = bootstrap.Modal.getOrCreateInstance(elementoModal);

  // Evento "submit": se activa al pulsar el botón Buscar o la tecla Enter.
  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();               // evita que la página se recargue
    const termino = campo.value;           // texto escrito por el usuario
    const resultados = buscar(termino);    // lista de coincidencias
    mostrarResultados(termino, resultados);
    modal.show();                          // abre la ventana de resultados
  });

  // Si el usuario hace clic en un resultado de la misma página, cerramos el modal.
  contenedor.addEventListener("click", function (evento) {
    if (evento.target.closest("a")) {
      modal.hide();
    }
  });

  // Botón "Limpiar búsqueda": borra el campo y deja listo para escribir de nuevo.
  btnLimpiar.addEventListener("click", function () {
    campo.value = "";
    contenedor.innerHTML = "";
    modal.hide();
    campo.focus();
  });
});

/* ---------------------------------------------------------------------
   4. FORMULARIO DE CONTACTO (solo existe en contacto.html)
   No hay servidor, así que solo validamos y mostramos un mensaje.
   --------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  const formContacto = document.getElementById("formContacto");
  if (!formContacto) return;               // en las demás páginas no hace nada

  const mensaje = document.getElementById("mensajeFormulario");

  formContacto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    if (!formContacto.checkValidity()) {
      formContacto.classList.add("was-validated");   // muestra los avisos de Bootstrap
      return;
    }

    const nombre = document.getElementById("nombre").value.trim();
    mensaje.innerHTML =
      '<div class="alert alert-success">Gracias, ' + escaparHTML(nombre) +
      '. Recibimos tu pedido y te responderemos pronto.</div>';
    formContacto.reset();
    formContacto.classList.remove("was-validated");
  });
});
