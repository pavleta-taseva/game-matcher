import { GetGamesProps, SearchProps } from "types/components";

export const searchGames = async ({ query, setEffect}: SearchProps) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/games?search=${query}&key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setEffect(true);
        return result;
    } catch (error) {
        console.error('Error searching games:', error);
        throw error;
    }
};

export const getGames = async ({ setEffect}: GetGamesProps ) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setEffect(true);
        return result;
    } catch (error) {
        console.error('Error getting games:', error);
        throw error;
    }
};
