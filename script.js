// 🟣 Fondo de partículas
particlesJS('particles-js', {
  "particles": {
    "number": { "value": 70 },
    "color": { "value": ["#d4af37", "#b97cff"] },
    "opacity": { "value": 0.5, "random": true },
    "size": { "value": 3, "random": true },
    "move": { "enable": true, "speed": 1.5 },
    "line_linked": { "enable": false }
  },
  "retina_detect": true
});

// 🟣 Cargar artistas
async function cargarArtistas() {
  try {
    const res = await fetch('artistas.json');
    const artistas = await res.json();
    const contenedor = document.getElementById('artistas-container');
    contenedor.innerHTML = '';

    artistas.forEach(a => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.innerHTML = `
        <div class="artista">
          <img src="${a.img || 'https://iili.io/KtXqRHJ.md.png'}" alt="${a.nombre}">
          <div class="info">
            <h2>${a.nombre}</h2>
            <p class="descripcion-corta">${a.descripcion}</p>
            <button class="leer-mas" style="display:none;">Leer más</button>
          </div>
          <button class="btn" onclick="contratar('${a.nombre}')">🎤 Contratar Artista</button>
        </div>
      `;
      contenedor.appendChild(slide);
    });

    // 🟣 Inicializar Swiper
    new Swiper('.swiper', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      grabCursor: true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
      speed: 1200,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });

    // 🟣 Detectar textos largos y mostrar botón "Leer más"
    setTimeout(() => {
      document.querySelectorAll('.descripcion-corta').forEach(parrafo => {
        const texto = parrafo.textContent.trim();
        if (texto.length > 80) { // ← Límite reducido a 80 caracteres
          const boton = parrafo.nextElementSibling;
          boton.style.display = 'inline-block';
        }
      });

      // 🟣 Evento de Leer más / Leer menos
      document.querySelectorAll(".leer-mas").forEach(boton => {
        boton.addEventListener("click", () => {
          const parrafo = boton.previousElementSibling;
          const tarjeta = boton.closest('.artista');

          parrafo.classList.toggle("expandido");
          boton.textContent = parrafo.classList.contains("expandido") ? "Leer menos" : "Leer más";

          // Suave transición de altura + brillo dorado al expandir
          tarjeta.style.transition = "all 0.4s ease";
          if (parrafo.classList.contains("expandido")) {
            tarjeta.style.height = "auto";
            tarjeta.style.boxShadow = "0 0 45px rgba(212,175,55,0.8), 0 0 80px rgba(185,124,255,0.7)";
          } else {
            tarjeta.style.height = "520px";
            tarjeta.style.boxShadow = "0 0 25px rgba(185,124,255,0.5)";
          }
        });
      });
    }, 300);

  } catch (err) {
    console.error('Error al cargar artistas:', err);
  }
}

// 🟣 WhatsApp redirección
function contratar(nombre){
  const numero = "5491157343551";
  const mensaje = encodeURIComponent(`Hola 👋, quiero contratar a ${nombre} (MMG | Representante de Artistas).`);
  window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
}

// 🟣 Cargar todo al inicio
document.addEventListener('DOMContentLoaded', cargarArtistas);
