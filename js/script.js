let input;
let dodo;

const card = document.querySelector("[data-card]");

const textarea = document.querySelector("[data-search]");
const dataTemp = document.querySelector("[data-temp]");
const dataDescription = document.querySelector("[data-description]");
const dataCity = document.querySelector("[data-city]");
const dataData = document.querySelector("[data-data]");
const ul = document.querySelector("[data-list]");
const botao = document.querySelector("[data-buttonSeatch]");

const clickar = () => {
  input = textarea.value;
  city();
};

botao.addEventListener("click", clickar);
const l = 0;
async function city() {
  const output = await fetch(
    `https://nominatim.openstreetmap.org/search/${input}?format=json`
  );
  const latLot = await output.json();
  const { lat } = latLot[0];
  const { lon } = latLot[0];
  async function climates() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d36e176b74ed15f2b76f46ac6535c30e&&units=metric`
    );
    const dados = await response.json();
    const { temp } = dados.list[0].main;
    const { description } = dados.list[0].weather[0];
    const cidade = dados.city.name;
    const date = dados.list[0].dt_txt;

    const clone = card.cloneNode(true);
    clone.classList.remove("remove");
    clone.childNodes[5].innerText = Math.floor(temp);
    clone.childNodes[7].innerText = description;
    clone.childNodes[9].innerText = cidade;
    clone.childNodes[11].innerText = date;
    ul.appendChild(clone);
    const remover = clone.childNodes[1];

    console.log(localStorage.getItem("card"));
    function removerCard() {
      console.log(this.parentNode);
      this.parentNode.remove();
    }
    remover.addEventListener("click", removerCard);
  }

  climates();
}
