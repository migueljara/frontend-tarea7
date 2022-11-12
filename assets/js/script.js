class Character {
    constructor (name, species, image) {
        this.name = name;
        this.species = species;
        this.image = image;
    }

    get getName() {
        return this.name;
    }

    get getSpecies() {
        return this.species;
    }

    get getImage() {
        return this.image;
    }

    show() {
        const row = document.querySelector("main").querySelector(".row");
        const template = document.getElementById("success").content;
        const card = template.cloneNode(true);
        const fragment = document.createDocumentFragment();

        card.querySelector(".card-img-top").setAttribute("src", this.getImage);
        card.querySelector(".card-img-top").setAttribute("alt", this.getName);
        card.querySelector(".card-title").innerHTML = this.getName;
        card.querySelector(".card-text").innerHTML = this.getSpecies;

        fragment.appendChild(card);
        row.appendChild(fragment);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getCharacters();
});

const getCharacters = async () => {
    try {
        const res = await axios.get("https://rickandmortyapi.com/api/character");
        if (res.status === 200) {
            res.data.results.forEach(ch => {
                let character = new Character(ch.name, ch.species, ch.image);
                character.show();
            });
        } else {
            console.log("error res getCharacters", res);
            shorError();
        }
    } catch (error) {
        console.log("error getCharacters", error);
        shorError();
    }
}

const shorError = () => {
    const row = document.querySelector("main").querySelector(".row");
    const template = document.getElementById("error").content;
    const alert = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    fragment.appendChild(alert);
    row.appendChild(fragment);
}