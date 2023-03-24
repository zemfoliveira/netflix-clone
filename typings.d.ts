export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  name: string;
  title: string;
  overview: string;
  backdrop_path: string;
  media_type?: string;
  genre_ids: number[];
  original_name: string;
  original_language: string;
  origin_country: string[];
  release_date?: string;
  first_air_date: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Element {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
}
