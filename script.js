// Fondo de partículas
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

// Cargar artistas
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
            <p>${a.descripcion}</p>
          </div>
          <button class="btn" onclick="contratar('${a.nombre}')">🎤 Contratar Artista</button>
        </div>
      `;
      contenedor.appendChild(slide);
    });

    new Swiper('.swiper', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides: true,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
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

  } catch (err) {
    console.error('Error al cargar artistas:', err);
  }
}

// WhatsApp
function contratar(nombre){
  const numero = "5491157343551";
  const mensaje = encodeURIComponent(`Hola 👋, quiero contratar a ${nombre} (MMG | Representante de Artistas).`);
  window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
}

document.addEventListener('DOMContentLoaded', cargarArtistas);
