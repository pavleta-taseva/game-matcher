import { getGameById } from './gamesAPI';

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
  gameId: string
) => {
  try {
    if (!apiDomain) return [];
    const id = gameId.toString();
    const game = await getGameById({ id });

    const response = await fetch(`/api/user/favorites`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, game }),
    });

    const data = await response.json();

    if (!response.ok || response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    return data.user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
