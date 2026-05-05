// src/utils/api.ts

// Since this is a Vite project, we use import.meta.env instead of process.env
// Fallback to localhost if the environment variable isn't set
const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://127.0.0.1:1337';

/**
 * Standardized fetch utility for Strapi
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  try {
    // Merge default and user options
    const mergedOptions = {
      // 'next' is specific to Next.js App Router, it is safely ignored by standard browser fetch in Vite
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    // Build request URL
    const queryString = new URLSearchParams(urlParamsObject).toString();
    const requestUrl = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'An error occurred during fetch');
    }

    return data;
  } catch (error) {
    console.error(`Fetch API Error at ${path}:`, error);
    throw error;
  }
}
