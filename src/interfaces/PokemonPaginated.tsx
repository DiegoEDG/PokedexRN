// Generated by https://quicktype.io

export interface PokemonPaginated {
  count: number;
  next: string;
  previous: null;
  results: ListedPokemon[];
}

export interface ListedPokemon {
  name: string;
  url: string;
}

export interface BasicPokemon {
  id: string;
  name: string;
  picture: string;
}
