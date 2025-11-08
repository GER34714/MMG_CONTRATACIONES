async function cargarArtistas() {
  try {
    const res = await fetch('artistas.json');
    const artistas = await res.json();

    const contenedor = document.getElementById('artistas-container');
    contenedor.innerHTML = '';

    artistas.forEach(a => {
      const card = document.createElement('div');
      card.classList.add('artista');

      card.innerHTML = `
        <img src="${a.img || 'https://iili.io/KtXqRHJ.md.png'}" alt="${a.nombre}">
        <div class="info">
          <h2>${a.nombre}</h2>
          <p>${a.descripcion}</p>
          <button class="btn" onclick="contratar('${a.nombre}')">🎤 Contratar Artista</button>
        </div>
      `;
      contenedor.appendChild(card);
    });

  } catch (error) {
    console.error('Error al cargar artistas:', error);
  }
}

function contratar(nombre) {
  const numero = "5491157343551";
  const mensaje = encodeURIComponent(`Hola 👋, quiero contratar a ${nombre} (MMG | Representante de Artistas).`);
  window.open(`https://wa.me/${numero}?text=${mensaje}`, '_blank');
}

document.addEventListener('DOMContentLoaded', cargarArtistas);
