const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export const getUsers = async () => {
  try {
    if (!apiDomain) return [];

    const response = await fetch(`${apiDomain}/users`);

    if (!response.ok || response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const usersList = await response.json();

    return usersList || [];
  } catch (error) {
    console.error('Error searching games:', error);
    return [];
  }
};
