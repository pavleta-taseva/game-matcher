export interface GameProps {
  added: number;
  background_image: string;
  esrb_rating: { id: number; name: string; slug: string };
  genres: [{ id: number; name: string; slug: string; games_count: number }];
  id: number;
  metacritic: number;
  name: string;
  parent_platforms: [{ platform: { id: number; name: string; slug: string } }];
  platforms: [
    {
      platform: {
        games_count: number;
        id: number;
        image: string | null;
        image_background: string;
        name: string;
        slug: string;
        year_end: null;
        year_start: null;
      };
      released_at: string;
      requirements_en: null;
      requirements_ru: null;
    },
  ];
  playtime: number;
  rating: number;
  rating_top: number;
  ratings: [{ id: number; title: string; count: number; percent: number }];
  ratings_count: number;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  short_screenshots: [{ id: number; image: string }];
  slug: string;
  stores: [{ store: { id: number; name: string; slug: string } }];
  suggestions_count: number;
  tags: [
    {
      id: number;
      name: string;
      slug: string;
      language: string;
      games_count: number;
    },
  ];
  tba: boolean;
  updated: string;
  user_game: null;
}

export interface Genre {
  games: GameProps[];
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}
export interface SearchProps {
  query?: string;
  results?: GameProps[];
  setResults?: (results: GameProps[]) => void;
  gamesList?: GameProps[];
  setGamesList?: (results: GameProps[]) => void;
  totalGamesCount?: number;
  setTotalGamesCount?: (totalGamesCount: number) => void;
  currentPage?: number;
  setCurrentPage?: (currentPage: number) => void;
  genres?: string[];
  setGenres?: (results: string[]) => void;
  isSearching?: boolean;
  setIsSearching?: (isSearching: boolean) => void;
  isFiltered?: boolean;
  setIsFiltered?: (isFiltered: boolean) => void;
}
export interface CheckboxGroupProps {
  options: string[] | undefined;
  checkBoxValues: string[];
  onChange: (option: string) => void;
}

export interface GameDetailsProps {
  game: GameProps;
}

export interface LoadingSpinnerProps {
  loading: boolean;
}

export interface FetchingGameProps {
  id: string | string[];
  setGame: (game: GameProps) => void;
}
