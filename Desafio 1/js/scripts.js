const inputName = document.querySelector("#inputNameToAdd");
const divPeople = document.querySelector("#people");
const divAbout = document.querySelector("#aboutSearch");

let peopleJson = null;
let countMasc = 0;
let countFem = 0;
let totalAge = 0;

window.addEventListener("load", () => {
  preventFormSubmit();
  activateInput();
  getPeople();
});

function preventFormSubmit() {
  let form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

function activateInput() {
  inputName.focus();
  inputName.addEventListener("keyup", (event) => {
    render(searchPeople(event.target.value));
  });
}

async function getPeople() {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  peopleJson = await res.json();
  render(searchPeople(" "));
}

function searchPeople(namePerson) {
  let jsonFiltered = peopleJson.results.filter((person) => {
    let name = (person.name.first + " " + person.name.last).toLowerCase();
    return name.includes(namePerson.toLowerCase());
  });
  countFem = 0;
  countMasc = 0;
  totalAge = 0;
  return jsonFiltered.map((person) => {
    if (person.gender === "female") {
      countFem++;
    } else {
      countMasc++;
    }
    totalAge = totalAge + person.dob.age;
    return {
      name: person.name,
      picture: person.picture.thumbnail,
      age: person.dob.age,
    };
  });
}

function render(peopleList) {
  renderPeople(peopleList);
  renderInfo(peopleList.length);
}

function renderPeople(peopleList) {
  divPeople.innerHTML = "";
  let ul = document.createElement("ul");
  peopleList.forEach((person) => {
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.src = person.picture;
    let name = document.createElement("span");
    name.textContent = person.name.first + " " + person.name.last;
    let age = document.createElement("span");
    age.textContent = ", age: " + person.age;

    li.appendChild(img);
    li.appendChild(name);
    li.appendChild(age);
    ul.appendChild(li);
  });
  let h1 = document.createElement("h1");
  h1.innerHTML = `${peopleList.length} pessoas encontradas`;
  divPeople.appendChild(h1);
  divPeople.appendChild(ul);
}

function renderInfo(countPeople) {
  if (countPeople > 0) {
    let averageAge = (totalAge / countPeople).toFixed(2);
    divAbout.innerHTML = `
      <ul>
        <li><span>Masculino: </span> ${countMasc}</li>
        <li><span>Feminino: </span> ${countFem}</li>
        <li><span>Soma idades: </span> ${totalAge}</li>
        <li><span>Média idades: </span> ${averageAge}</li>
      </ul>`;
  } else {
    divAbout.innerHTML = "";
  }
}
