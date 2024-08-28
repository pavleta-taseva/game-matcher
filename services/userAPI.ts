import { getGameById } from './gamesAPI';
import { GameProps } from '@/src/types/components';
import { toast } from 'react-toastify';

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const getUserById = async (userId: string) => {
  try {
    if (!apiDomain) return [];

    const response = await fetch(`/api/user/${userId}`);

    const data = await response.json();

    if (!response.ok || response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const addFavoriteGamesToUser = async (
  userId: string,
  gameId: string,
  game: GameProps
) => {
  try {
    if (!apiDomain) return [];
    const id = gameId.toString();
    const gameDetails = await getGameById({ id });

    if (id && gameDetails) {
      const createGameDocument = await fetch(`/api/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game, userId }),
      });
      const response = await createGameDocument.json();

      if (!createGameDocument.ok || createGameDocument.status !== 200) {
        toast.error(response?.message);
      } else {
        toast.success(response?.message);
      }

      return response.gameData || {};
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
