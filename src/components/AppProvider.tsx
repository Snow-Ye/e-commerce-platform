import React, {
  createContext,
  useState,
  useContext,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { CartItem, Product, User } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Step 1: Create a new context
const AppContext = createContext<{
  loginVisible: boolean;
  setLoginVisible: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
  loggedIn: boolean;
  setLoggedIn: Dispatch<SetStateAction<boolean>>;
  categories: string[];
  brands: string[];
  productNames: string[];
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}>({
  loginVisible: false,
  setLoginVisible: function () {},
  user: null,
  setUser: function () {},
  loggedIn: false,
  setLoggedIn: function () {},
  categories: [],
  brands: [],
  products: [],
  productNames: [],
  setProducts: function () {},
  cartItems: [],
  setCartItems: function () {},
});

// Step 2: Create a provider component
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [productNames, setProductNames] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useLocalStorage("cart", []);

  const token = localStorage.getItem("token");

  const login = () => {
    fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((user) => {
        setUser(user);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (token) {
      login();
    }
  }, [token]);

  useEffect(() => {
    const fetchCategories = async () => {
      fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
        });
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      fetch("https://dummyjson.com/products?limit=999")
        .then((res) => res.json())
        .then((data) => {
          const brands = data.products.map((product: Product) => product.brand);
          setBrands([...new Set(brands)]);
          const productNames = data.products.map(
            (product: Product) => product.title
          );
          setProductNames([...new Set(productNames)]);
        });
    };

    fetchProducts();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loginVisible,
        setLoginVisible,
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        categories,
        products,
        setProducts,
        cartItems,
        setCartItems,
        brands,
        productNames,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Step 3: Create a custom hook for other components to use
export const useAppContext = () => {
  return useContext(AppContext);
};
