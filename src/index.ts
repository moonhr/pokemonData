import { PokemonData } from "./PokemonData";
import fs from "fs";
import path from "path";

import { IdGenerator } from "./IdGenerator";

// 절대 경로로 수정
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

// 예시 데이터
const pokemonDataArray: PokemonData[] = pokemonData;

// UUID 추가된 데이터 생성
const pokemonDataWithUUID = addUUIDToPokemonData(pokemonDataArray);

fs.writeFileSync(
  "PokemonDataUUID.json",
  JSON.stringify(pokemonDataWithUUID, null, 2)
);
console.log(pokemonDataWithUUID);
