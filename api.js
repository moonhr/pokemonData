import fs from "fs";

//pokeapi 기본 주소
const baseURL = "https://pokeapi.co/api/v2/pokemon-species";
//각 포켓몬 기본주소
const pokemonURL = "https://pokeapi.co/api/v2/pokemon";

/**
 * 포켓몬 목록을 가져오는 함수
 * @returns Array
 */
async function getAllPokemonList() {
  try {
    const response = await fetch(`${baseURL}?limit=1025`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error:", error.message);
    return [];
  }
}

/**
 * 포켓몬 이름과 타입을 가져오는 함수
 * @param {string} pokemonURL - 포켓몬 종 URL
 * @returns {Object}
 */
async function getAllPokemonNameAndType(pokemonURL) {
  try {
    const response = await fetch(`${pokemonURL}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    const EnglishName = data.names.find((item) => item.language.name === "en");
    const koreanName = data.names.find((item) => item.language.name === "ko");

    // 포켓몬의 타입을 가져오기
    const typeData = await getAllPokemonType(EnglishName.name.toLowerCase());
    const pokemonType = typeData.types.map((item) => item.type.name);

    // 결과 객체 생성
    // 한국어 이름이 없는 경우 예외처리
    const namesObject = {
      pokemonName: koreanName ? koreanName.name : "Unknown",
      pokemonType: pokemonType,
    };

    return namesObject;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

/**
 * 포켓몬의 타입 정보를 가져오는 함수
 * @param {string} pokemon - 포켓몬의 영문 이름
 * @returns {Object}
 */
async function getAllPokemonType(pokemon) {
  try {
    const response = await fetch(`${pokemonURL}/${pokemon}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}

/**
 * 모든 포켓몬의 이름과 타입을 출력하는 함수
 */
async function displayAllPokemonNames() {
  try {
    const pokemonList = await getAllPokemonList();
    if (pokemonList.length === 0) {
      console.error("No Pokemon data to display.");
      return;
    }

    // 모든 포켓몬 이름과 타입 정보를 병렬로 가져오기
    const pokemonNamesAndTypes = await Promise.all(
      pokemonList.map((pokemon) => getAllPokemonNameAndType(pokemon.url))
    );

    // null인 데이터를 필터링하여 JSON 파일로 저장
    const filteredPokemonData = pokemonNamesAndTypes.filter(
      (pokemon) => pokemon !== null
    );

    fs.writeFileSync(
      "pokemonData.json",
      JSON.stringify(filteredPokemonData, null, 2)
    );

    console.log("pokemonData.json 파일이 생성되었습니다.");
  } catch (error) {
    console.error("Error in displayAllPokemonNames:", error.message);
  }
}

displayAllPokemonNames();
