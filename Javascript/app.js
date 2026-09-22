const container = document.querySelector(".container");

const cards = [
    {
        titulo: "Café 1",
        descripcion: "Descripción del café número 1.",
        imagen: "Images/1.jpg"
    },
    {
        titulo: "Café 2",
        descripcion: "Descripción del café número 2.",
        imagen: "Images/2.jpg"
    },
    {
        titulo: "Café 3",
        descripcion: "Descripción del café número 3.",
        imagen: "Images/3.jpg"
    },
    {
        titulo: "Café 4",
        descripcion: "Descripción del café número 4.",
        imagen: "Images/4.jpg"
    },
    {
        titulo: "Café 5",
        descripcion: "Descripción del café número 5.",
        imagen: "Images/5.jpg"
    },
    {
        titulo: "Café 6",
        descripcion: "Descripción del café número 6.",
        imagen: "Images/6.jpg"
    },
    {
        titulo: "Café 7",
        descripcion: "Descripción del café número 7.",
        imagen: "Images/7.jpg"
    },
    {
        titulo: "Café 8",
        descripcion: "Descripción del café número 8.",
        imagen: "Images/8.jpg"
    },
    {
        titulo: "Café 9",
        descripcion: "Descripción del café número 9.",
        imagen: "Images/9.jpg"
    },
    {
        titulo: "Café 10",
        descripcion: "Descripción del café número 10.",
        imagen: "Images/10.jpg"
    }
];

cards.forEach(card => {

    const cardElement = document.createElement("div");

    cardElement.classList.add("card");

    cardElement.innerHTML = `
        <img src="${card.imagen}" alt="${card.titulo}">

        <div class="card-content">
            <h2>${card.titulo}</h2>

            <p>${card.descripcion}</p>

            <button>Ver más</button>
        </div>
    `;

    container.appendChild(cardElement);
});