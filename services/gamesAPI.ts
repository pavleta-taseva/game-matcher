import { GamesProps, Genre, FetchingGameProps } from '@/src/types/components';
import { getUserById } from './userAPI';

export const searchGames = async ({
  query,
  setResults,
  setTotalGamesCount,
}: GamesProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/games?search=${query}&ordering=-rating&key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const gamesList = await response.json();

    setResults && setResults(gamesList.results || []);
    setTotalGamesCount && setTotalGamesCount(gamesList?.count);
    return gamesList.results || [];
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};

export const getGamesByPage = async ({
  setGamesList,
  setTotalGamesCount,
  currentPage,
}: GamesProps) => {
  try {
    const games = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/games?page_size=32&page=${currentPage}&key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );

    if (!games.ok) {
      throw new Error('Network response was not ok');
    }

    const gamesList = await games.json();

    setGamesList && setGamesList(gamesList?.results || []);
    setTotalGamesCount && setTotalGamesCount(gamesList?.count);
    return gamesList || [];
  } catch (error) {
    console.error('Error getting games:', error);
    throw error;
  }
};

export const getGenres = async ({ genres, setGenres }: GamesProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/genres?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const genresList = await response.json();
    const getGenresNames = genresList?.results?.map(
      (genre: Genre) => genre.name
    );

    setGenres && setGenres(getGenresNames || genres);

    return getGenresNames || [];
  } catch (error) {
    console.error('Error getting games:', error);
    throw error;
  }
};

export const getGameById = async ({ id, setGame }: FetchingGameProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/games/${id}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const currentGame = await response.json();

    if (currentGame && setGame) setGame(currentGame);

    return currentGame || {};
  } catch (error) {
    console.error('Error getting games:', error);
    throw error;
  }
};

export const getFavoriteGameById = async ({
  id,
  setGame,
}: FetchingGameProps) => {
  try {
    const response = await fetch(`/api/games/${id}`);

    const currentGame = await response.json();

    if (currentGame && setGame) setGame(currentGame);

    return currentGame || {};
  } catch (error) {
    console.error('Error getting games:', error);
    throw error;
  }
};

export const getFavoriteGamesByUser = async ({
  setGamesList,
  setTotalGamesCount,
  user,
}: GamesProps) => {
  try {
    if (user) {
      const currentUser = await getUserById(user.id);
      const userFavGames = currentUser?.favorites;
      let favorites = [];

      for (let id of userFavGames) {
        const fetchGame = await getGameById({ id });

        if (fetchGame) {
          favorites.push(fetchGame);
        }
      }

      if (favorites.length > 0) {
        setGamesList && setGamesList(favorites);
        setTotalGamesCount && setTotalGamesCount(favorites?.length ?? 0);
      }
      return favorites || [];
    }
  } catch (error) {
    console.error('Error getting games:', error);
    throw error;
  }
};
