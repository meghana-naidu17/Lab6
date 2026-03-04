const createProductService = () => {
  let cache = null;
  let lastFetchTime = null;
  let fetchAttempts = 0;
  let activeRequestId = 0;

  const fetchProducts = async () => {
    fetchAttempts++;
    const requestId = ++activeRequestId;

    // Return cached data if available
    if (cache) {
      return Promise.resolve({
        data: cache,
        fromCache: true,
        fetchAttempts,
        lastFetchTime,
      });
    }

    const response = await fetch("https://dummyjson.com/products")
      .then(res => res.json());

    // Prevent race condition (ignore old responses)
    if (requestId !== activeRequestId) {
      return;
    }

    cache = response.products;
    lastFetchTime = Date.now();

    return {
      data: cache,
      fromCache: false,
      fetchAttempts,
      lastFetchTime,
    };
  };

  return { fetchProducts };
};

export const productService = createProductService();