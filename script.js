async function cargarArtistas() {
  try {
    const res = await fetch("artistas.json");
    const artistas = await res.json();
    renderArtistas(artistas);
  } catch (err) {
    console.error("Error al cargar artistas:", err);
  }
}

function renderArtistas(artistas) {
  const cont = document.getElementById("carrousel");
  cont.innerHTML = "";
  artistas.forEach(a => {
    const div = document.createElement("div");
    div.className = "artista";
    div.innerHTML = `
      <img src="${a.img}" alt="${a.nombre}" onerror="this.src='assets/logo.png'">
      <div class="info">
        <h2>${a.nombre}</h2>
        <p>${a.descripcion}</p>
      </div>`;
    cont.appendChild(div);
  });
}

window.onload = cargarArtistas;
