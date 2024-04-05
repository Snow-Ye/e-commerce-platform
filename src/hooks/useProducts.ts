import { useState } from "react";
import { useAppContext } from "../components/AppProvider";
import { Filter, Product } from "../types";
import { useLocation } from "react-router-dom";

export function useProducts() {
  const { setProducts, brands, productNames } = useAppContext();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const minPrice = parseInt(queryParams.get("minPrice") ?? "0") ?? 0;
  const maxPrice = parseInt(queryParams.get("maxPrice") ?? "2000") ?? 2000;
  const categories =
    queryParams.get("categories")?.split(",").filter(Boolean) ?? [];

  const [filters, setFilters] = useState<Filter>({
    keyword: queryParams.get("keyword") ?? "",
    price: [minPrice, maxPrice],
    brand: queryParams.get("brand") ?? "",
    categories,
  });

  const [visibleBrands, setVisibleBrands] = useState<{ value: string }[]>(
    brands.map((x) => ({ value: x })) as { value: string }[]
  );
  const [visibleNames, setVisibleNames] = useState<{ value: string }[]>(
    productNames.map((x) => ({ value: x })) as { value: string }[]
  );
  const search = () => {
    let q = `q=${filters.keyword}`;
    fetch(`https://dummyjson.com/products/search?limit=999&${q}`)
      .then((res) => res.json())
      .then((data) => {
        let products: Product[] = data.products;
        products = products.filter(
          (x) => x.price >= filters.price[0] && x.price <= filters.price[1]
        );
        if (filters.categories.length) {
          console.log("has categories", filters.categories);
          products = products.filter((x) =>
            filters.categories.includes(x.category)
          );
        }
        if (filters.brand) {
          console.log("has brand", filters.brand);
          products = products.filter((x) => x.brand == filters.brand);
        }
        setProducts(products);
      });
  };

  const filterBrands = (inputValue: string) => {
    const items = brands
      .filter((i) => i.toLowerCase().includes(inputValue.toLowerCase()))
      .map((x) => ({ value: x }));
    setVisibleBrands(items);
  };

  const filterNames = (inputValue: string) => {
    const items = productNames
      .filter((i) => i.toLowerCase().includes(inputValue.toLowerCase()))
      .map((x) => ({ value: x }));
    setVisibleNames(items);
  };

  return {
    filters,
    setFilters,
    search,
    visibleBrands,
    filterBrands,
    visibleNames,
    filterNames,
  };
}
