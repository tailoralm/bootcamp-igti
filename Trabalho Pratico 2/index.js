import { promises as fs } from "fs";
let brStates = null;
let brCities = null;
let statesCities = [];

start();

async function start() {
  await loadJsons();
  //atividade 1
  criarJsonParaCadaEstado();
  //atividade 2
  // await contarCidadesPorUF();
  await contarCidadesDeTodosUF();
  await sleep(100);
  //atividade 3
  console.log(contarEstadosComMaisCidades().slice(0, 5));
  //atividade 4  contarEstadosComMenosCidades();
  console.log(contarEstadosComMenosCidades().slice(0, 5));
  //ordenar alfabeticamente para metodos seguintes
  ordenarJsons();
  //atividade 5
  console.log(cidadeMaiorNomePorEstado());
  //atividade 6
  console.log(cidadeMenorNomePorEstado());
  //atividade 7
  console.log(cidadeMaiorNome());
  //atividade 8
  console.log(cidadeMenorNome());
}

async function loadJsons() {
  brCities = JSON.parse(await fs.readFile("./data/Cidades.json"));
  brStates = JSON.parse(await fs.readFile("./data/Estados.json"));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ordenarJsons() {
  brCities = brCities.sort((a, b) => {
    if (a.Nome > b.Nome) {
      return 1;
    }
    if (a.Nome < b.Nome) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
}

function getCitiesFromState(state) {
  return brCities.filter((citie) => {
    return citie.Estado === state;
  });
}

function criarJsonParaCadaEstado() {
  brStates.forEach((state) => {
    let cities = getCitiesFromState(state.ID);
    fs.writeFile(`./estados/${state.Sigla}.json`, JSON.stringify(cities));
  });
}

async function contarCidadesDeTodosUF() {
  statesCities = [];
  await brStates.forEach(async (state) => {
    let retorno = await contarCidadesPorUF(state.Sigla);
    // console.log(`Estado: ${state.Sigla} / Cidades: ${retorno}`);
    statesCities.push({
      sigla: state.Sigla,
      cities: retorno,
    });
  });
}

async function contarCidadesPorUF(uf) {
  try {
    return JSON.parse(await fs.readFile(`./estados/${uf}.json`)).length;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

function contarEstadosComMaisCidades() {
  return statesCities.sort(
    (a, b) => parseFloat(b.cities) - parseFloat(a.cities)
  );
}

function contarEstadosComMenosCidades() {
  return statesCities.sort(
    (a, b) => parseFloat(a.cities) - parseFloat(b.cities)
  );
}

function cidadeMaiorNomePorEstado() {
  let citiesNames = [];
  brStates.forEach((state) => {
    let cities = getCitiesFromState(state.ID);
    let size = 0;
    let name = null;
    cities.forEach((city) => {
      if (city.Nome.length > size) {
        size = city.Nome.length;
        name = city.Nome;
      }
    });
    citiesNames.push(`${name} - ${state.Sigla}`);
  });
  return citiesNames;
}

function cidadeMenorNomePorEstado() {
  let citiesNames = [];
  brStates.forEach((state) => {
    let cities = getCitiesFromState(state.ID);
    let size = 100;
    let name = null;
    cities.forEach((city) => {
      if (city.Nome.length < size) {
        size = city.Nome.length;
        name = city.Nome;
      }
    });
    citiesNames.push(`${name} - ${state.Sigla}`);
  });
  return citiesNames;
}

function getSiglaEstadoById(id) {
  return brStates.filter((state) => {
    return state.ID == id;
  });
}

function cidadeMaiorNome() {
  let size = 0;
  let name = null;
  brCities.forEach((city) => {
    if (city.Nome.length > size) {
      size = city.Nome.length;
      name = `${city.Nome} - ${getSiglaEstadoById(city.Estado)[0].Sigla}`;
    }
  });
  return name;
}

function cidadeMenorNome() {
  let size = 100;
  let name = null;
  brCities.forEach((city) => {
    if (city.Nome.length < size) {
      size = city.Nome.length;
      name = `${city.Nome} - ${getSiglaEstadoById(city.Estado)[0].Sigla}`;
    }
  });
  return name;
}
