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

// Crear carrusel
async function cargarArtistas() {
  try {
    const res = await fetch('artistas.json');
    const artistas = await res.json();
    const contenedor = document.getElementById('artistas-container');
    contenedor.innerHTML = '';

    const artistasLoop = [...artistas, ...artistas];
    artistasLoop.forEach(a => {
      const card = document.createElement('div');
      card.classList.add('artista');
      card.innerHTML = `
        <img src="${a.img || 'https://iili.io/KtXqRHJ.md.png'}" alt="${a.nombre}">
        <div class="info">
          <h2>${a.nombre}</h2>
          <p>${a.descripcion}</p>
        </div>
        <button class="btn" onclick="contratar('${a.nombre}')">🎤 Contratar Artista</button>
      `;
      contenedor.appendChild(card);
    });

    // --- Movimiento automático en PC ---
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
      let pos = 0;
      setInterval(() => {
        pos -= 0.6; // velocidad lenta
        contenedor.style.transform = `translateX(${pos}px)`;
        if (Math.abs(pos) > contenedor.scrollWidth / 2) pos = 0;
      }, 30);
    }

    // --- Flechas de control ---
    const btnIzq = document.querySelector('.flecha-izq');
    const btnDer = document.querySelector('.flecha-der');

    btnIzq.addEventListener('click', () => {
      contenedor.scrollBy({ left: -350, behavior: 'smooth' });
    });

    btnDer.addEventListener('click', () => {
      contenedor.scrollBy({ left: 350, behavior: 'smooth' });
    });

    // --- Swipe manual (para móviles y PC táctiles) ---
    let startX = 0;
    contenedor.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    contenedor.addEventListener('touchmove', e => {
      let diff = startX - e.touches[0].clientX;
      contenedor.scrollLeft += diff;
      startX = e.touches[0].clientX;
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
