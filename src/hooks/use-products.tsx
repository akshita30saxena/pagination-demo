import { use, useEffect, useState } from "react";
import { APP_CONST } from "../constants/app.constant";
import { ENDPOINTS } from "../constants/endpoints.constant";

// const API_URL=`${APP_CONST.API_URL()}${ENDPOINTS.GET_PRODUCTS(limit, skip)}`;

export function useProducts(limit = 10, skip = 0) {
  // API state pending, response, error
  const [products, setProducts] = useState();
  const [isPending, setIsPending] = useState(false);
  const [error, setIsError] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsPending(true);
      try {
        const response = await fetch(
          `${APP_CONST.API_URL()}${ENDPOINTS.GET_PRODUCTS(limit, skip)}`
        );
        const data = await response.json();
        setProducts(data.products);
        setTotal(data.total);
        setIsPending(false);
      } catch (e) {
        setIsError(e as any);
        setIsPending(false);
        console.error(e);
      }
    };

    fetchProducts();
  }, [limit, skip]);

  return { products, total, isPending, error };
}
