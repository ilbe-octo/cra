const CACHE_KEY: readonly unknown[] = ['portfolio'];

export const portfolioCacheKey = (keyElements?: unknown[]) => {
  if (keyElements) {
    return CACHE_KEY.concat(...keyElements);
  }
  return CACHE_KEY;
};
