// Resolves a public/ asset path against the Vite base URL so assets work
// both on the GitHub Pages project path and on a future custom domain.
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`;
