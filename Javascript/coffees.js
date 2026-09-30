const params = new URLSearchParams(window.location.search);
const coffeeIndex = Number(params.get("id"));
const coffee = Number.isInteger(coffeeIndex) ? coffeeCards[coffeeIndex] : null;
const details = document.querySelector("#coffee-detail");
const notFound = document.querySelector("#coffee-not-found");


if (coffee) {
    document.title = `${coffee.titulo} | Coffee PWA`;
    document.querySelector("#coffee-image").src = `./${coffee.imagen}`;
    document.querySelector("#coffee-image").alt = coffee.titulo;
    document.querySelector("#coffee-title").textContent = coffee.titulo;
    document.querySelector("#coffee-description").textContent = coffee.descripcion;
    document.querySelector("#coffee-origin").textContent = coffee.origen;
    document.querySelector("#coffee-roast").textContent = coffee.tueste;
    document.querySelector("#coffee-profile").textContent = coffee.perfil;
    document.querySelector("#coffee-preparation").textContent = coffee.preparacion;
    details.hidden = false;
} else {
    notFound.hidden = false;
}