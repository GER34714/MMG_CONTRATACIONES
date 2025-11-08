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

// Crear carrusel infinito duplicando artistas
async function cargarArtistas() {
  try {
    const res = await fetch('artistas.json');
    const artistas = await res.json();

    const contenedor = document.getElementById('artistas-container');
    contenedor.innerHTML = '';

    // Duplicar lista para loop continuo
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
