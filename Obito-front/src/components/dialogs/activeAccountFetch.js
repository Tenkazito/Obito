const onClickAccountFetch = async (accountId, updateProfile) => {
  const url = `${import.meta.env.VITE_BACK_URL}/setActive`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accountId }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    updateProfile({ active: data.result.active });
  } catch (error) {
    console.error('Error fetching account:', error);
  }
};

export default onClickAccountFetch;