export const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5000'
    : 'https://awes.us';

export const ACCOUNT_URL = `${BASE_URL}/api/account`;
