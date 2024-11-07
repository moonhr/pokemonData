import { PokemonData } from "./PokemonData";
import fs from "fs";
import path from "path";

import { IdGenerator } from "./IdGenerator";

const filePath = path.resolve(__dirname, "../pokemonData.json");
const pokemonData: PokemonData[] = JSON.parse(
  fs.readFileSync(filePath, "utf-8")
);

interface HasUUID {
  id: string;
  createdAt: Date;
}

interface PokemonDataID extends PokemonData {
  uuid: HasUUID;
}

// UUID를 추가하는 함수
function addUUIDToPokemonData(pokemonData: PokemonData[]): PokemonDataID[] {
  return pokemonData.map((pokemon) => {
    const uuid = IdGenerator.generate(); // UUID 생성
    return {
      ...pokemon,
      uuid: {
        id: uuid,
        createdAt: new Date(), // 생성일자
      },
    };
  });
}

const pokemonDataArray: PokemonData[] = pokemonData;

const pokemonDataWithUUID = addUUIDToPokemonData(pokemonDataArray);

fs.writeFileSync(
  "PokemonDataUUID.json",
  JSON.stringify(pokemonDataWithUUID, null, 2)
);
console.log(pokemonDataWithUUID);
