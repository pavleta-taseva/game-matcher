export const getUsers = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/users`);

    if (!response.ok || response.status !== 200) {
      throw new Error('Network response was not ok');
    }

    const usersList = await response.json();

    return usersList || [];
  } catch (error) {
    console.error('Error searching games:', error);
    throw error;
  }
};
