import { useEffect, useState, useRef } from "react";
import { productService } from "../api/productService";
import ProductList from "../components/ProductList";
import ProductSkeleton from "../components/ProductSkeleton";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    const loadProducts = async () => {
      setLoading(true);

      const result = await productService.fetchProducts();

      // Prevent stale state update
      if (!isMountedRef.current || !result) return;

      setProducts(result.data);
      setLoading(false);
    };

    loadProducts();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  if (loading) return <ProductSkeleton />;

  return <ProductList products={products} />;
};

export default ProductContainer;