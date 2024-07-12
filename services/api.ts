import { SearchProps, Genre } from "types/components";

export const searchGames = async ({ query, setResults, setTotalGamesCount, currentPage }: SearchProps) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/games?search=${query}&key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${currentPage}`);

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

export const getGames = async ({ setGamesList, setTotalGamesCount }: SearchProps ) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/games?page_size=30&key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const gamesList = await response.json();

        setGamesList && setGamesList(gamesList?.results || []);
        setTotalGamesCount && setTotalGamesCount(gamesList?.count);

        return gamesList || [];
    } catch (error) {
        console.error('Error getting games:', error);
        throw error;
    }
};

export const getGenres = async ({ genres, setGenres }: SearchProps ) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/genres?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const genresList = await response.json();
        const getGenresNames = genresList?.results?.map((genre: Genre) => genre.name);
        
        setGenres && setGenres(getGenresNames || genres);

        return getGenresNames || [];
    } catch (error) {
        console.error('Error getting games:', error);
        throw error;
    }
};