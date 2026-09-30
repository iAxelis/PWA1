"use strict";

const coffeeCards = [
    {
        titulo: "Café 1",
        descripcion: "Un café equilibrado para disfrutar a cualquier hora.",
        imagen: "./Images/1.jpg",
        origen: "Origen por confirmar",
        tueste: "Medio",
        perfil: "Notas suaves de chocolate y caramelo.",
        preparacion: "Prueba con cafetera de filtro para resaltar su equilibrio."
    },
    {
        titulo: "Café 2",
        descripcion: "Una taza aromática con un perfil dulce y redondo.",
        imagen: "./Images/2.jpg",
        origen: "Origen por confirmar",
        tueste: "Medio",
        perfil: "Aroma a frutos secos y notas de cacao.",
        preparacion: "Ideal para prensa francesa; deja infusionar unos 4 minutos."
    },
    {
        titulo: "Café 3",
        descripcion: "Una opción de sabor intenso para los amantes del café.",
        imagen: "./Images/3.jpg",
        origen: "Origen por confirmar",
        tueste: "Medio oscuro",
        perfil: "Cuerpo marcado, con notas de chocolate oscuro.",
        preparacion: "Funciona muy bien en espresso o en cafetera moka."
    },
    {
        titulo: "Café 4",
        descripcion: "Un café fragante con un toque frutal y ligero.",
        imagen: "./Images/4.jpg",
        origen: "Origen por confirmar",
        tueste: "Claro",
        perfil: "Notas frutales y acidez brillante.",
        preparacion: "Usa método pour-over y agua justo antes de hervir."
    },
    {
        titulo: "Café 5",
        descripcion: "Un perfil suave y dulce que acompaña bien el desayuno.",
        imagen: "./Images/5.jpg",
        origen: "Origen por confirmar",
        tueste: "Medio",
        perfil: "Dulzor delicado con matices de nuez.",
        preparacion: "Prepáralo en filtro para una taza limpia y aromática."
    },
    {
        titulo: "Café 6",
        descripcion: "Una taza con cuerpo y un aroma cálido y persistente.",
        imagen: "./Images/6.jpg",
        origen: "Origen por confirmar",
        tueste: "Medio oscuro",
        perfil: "Cuerpo cremoso y notas tostadas.",
        preparacion: "Su cuerpo combina bien con leche en cappuccino o latte."
    },
    {
        titulo: "Café 7",
        descripcion: "Un café delicado para quienes prefieren sabores sutiles.",
        imagen: "./Images/7.jpg",
        origen: "Origen por confirmar",
        tueste: "Claro",
        perfil: "Notas florales y un final limpio.",
        preparacion: "V60 o Chemex ayudan a apreciar sus aromas más delicados."
    },
    {
        titulo: "Café 8",
        descripcion: "Una mezcla balanceada con dulzor y buen cuerpo.",
        imagen: "./Images/8.jpg",
        origen: "Origen por confirmar",
        tueste: "Medio",
        perfil: "Caramelo, cacao y acidez moderada.",
        preparacion: "Versátil en cafetera de filtro o espresso."
    },
    {
        titulo: "Café 9",
        descripcion: "Una taza vivaz con aromas frescos y agradables.",
        imagen: "./Images/9.jpg",
        origen: "Origen por confirmar",
        tueste: "Claro",
        perfil: "Toques cítricos y un final refrescante.",
        preparacion: "Prepáralo en filtro y evita el agua demasiado caliente."
    },
    {
        titulo: "Café 10",
        descripcion: "Un café de carácter reconfortante y sabor persistente.",
        imagen: "./Images/10.jpg",
        origen: "Origen por confirmar",
        tueste: "Medio oscuro",
        perfil: "Notas de especias dulces y chocolate.",
        preparacion: "La prensa francesa resalta su cuerpo y persistencia."
    }
];

function normalizeText(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
}

function renderCoffeeCards(container, coffees) {
    const fragment = document.createDocumentFragment();

    coffees.forEach(({ coffee, index }) => {
        const card = document.createElement("article");
        card.className = "card";

        const image = document.createElement("img");
        image.src = coffee.imagen;
        image.alt = `Presentación de ${coffee.titulo}`;
        image.loading = "lazy";
        image.decoding = "async";

        const content = document.createElement("div");
        content.className = "card-content";

        const roast = document.createElement("p");
        roast.className = "roast-label";
        roast.textContent = `Tueste ${coffee.tueste.toLowerCase()}`;

        const title = document.createElement("h3");
        title.textContent = coffee.titulo;

        const description = document.createElement("p");
        description.className = "card-description";
        description.textContent = coffee.descripcion;

        const link = document.createElement("a");
        link.className = "coffee-link";
        link.href = `./cafe.html?id=${index}`;
        link.textContent = "Descubrir café";
        link.setAttribute("aria-label", `Descubrir ${coffee.titulo}`);

        content.append(roast, title, description, link);
        card.append(image, content);
        fragment.append(card);
    });

    container.replaceChildren(fragment);
}

function initializeCoffeeCollection() {
    const container = document.querySelector(".container");
    if (!container) return;

    const searchInput = document.querySelector("#coffee-search");
    const roastFilter = document.querySelector("#roast-filter");
    const resultCount = document.querySelector("#coffee-count");
    const emptyState = document.querySelector("#empty-state");
    const roasts = [...new Set(coffeeCards.map((coffee) => coffee.tueste))];

    roasts.forEach((roast) => {
        const option = document.createElement("option");
        option.value = roast;
        option.textContent = `Tueste ${roast.toLowerCase()}`;
        roastFilter.append(option);
    });

    function updateCollection() {
        const query = normalizeText(searchInput.value.trim());
        const selectedRoast = roastFilter.value;
        const filteredCoffees = coffeeCards
            .map((coffee, index) => ({ coffee, index }))
            .filter(({ coffee }) => {
                const matchesRoast = selectedRoast === "all" || coffee.tueste === selectedRoast;
                const searchableText = normalizeText([
                    coffee.titulo,
                    coffee.descripcion,
                    coffee.origen,
                    coffee.tueste,
                    coffee.perfil,
                    coffee.preparacion
                ].join(" "));

                return matchesRoast && searchableText.includes(query);
            });

        renderCoffeeCards(container, filteredCoffees);
        resultCount.textContent = `${filteredCoffees.length} ${filteredCoffees.length === 1 ? "café" : "cafés"}`;
        emptyState.hidden = filteredCoffees.length > 0;
    }

    searchInput.addEventListener("input", updateCollection);
    roastFilter.addEventListener("change", updateCollection);
    updateCollection();
}

function initializeCoffeeDetail() {
    const detail = document.querySelector("#coffee-detail");
    if (!detail) return;

    const notFound = document.querySelector("#coffee-not-found");
    const rawIndex = new URLSearchParams(window.location.search).get("id");
    const coffeeIndex = rawIndex !== null && /^\d+$/.test(rawIndex) ? Number(rawIndex) : -1;
    const coffee = Number.isSafeInteger(coffeeIndex) ? coffeeCards[coffeeIndex] : null;

    if (!coffee) {
        notFound.hidden = false;
        return;
    }

    document.title = `${coffee.titulo} | Coffee PWA`;
    document.querySelector("#coffee-image").src = coffee.imagen;
    document.querySelector("#coffee-image").alt = `Presentación de ${coffee.titulo}`;
    document.querySelector("#coffee-title").textContent = coffee.titulo;
    document.querySelector("#coffee-roast-label").textContent = `Tueste ${coffee.tueste}`.toLocaleUpperCase("es");
    document.querySelector("#coffee-description").textContent = coffee.descripcion;
    document.querySelector("#coffee-origin").textContent = coffee.origen;
    document.querySelector("#coffee-roast").textContent = coffee.tueste;
    document.querySelector("#coffee-profile").textContent = coffee.perfil;
    document.querySelector("#coffee-preparation").textContent = coffee.preparacion;
    detail.hidden = false;
}

function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;

    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./servicesworker.js")
            .catch((error) => console.error("No se pudo registrar el service worker:", error));
    });
}

initializeCoffeeCollection();
initializeCoffeeDetail();
registerServiceWorker();
