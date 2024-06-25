import { SearchProps, GenresProps, Genre, GamesList } from "types/components";

export const searchGames = async ({ query, setResults}: SearchProps) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/games?search=${query}&key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const gamesList = await response.json();
        setResults && setResults(gamesList.results || []);

        return gamesList.results || [];
    } catch (error) {
        console.error('Error searching games:', error);
        throw error;
    }
};

export const getGames = async ({ setGamesList, setTotalGamesCount }: GamesList ) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page_size=30`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const gamesList = await response.json();

        setGamesList && setGamesList(gamesList?.results || []);
        setTotalGamesCount && setTotalGamesCount(gamesList?.count.toLocaleString('en'));

        return gamesList || [];
    } catch (error) {
        console.error('Error getting games:', error);
        throw error;
    }
};

export const getGenres = async ({ genres, setGenres }: GenresProps ) => {
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