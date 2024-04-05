import { useAppContext } from "../components/AppProvider";
import { Product } from "../types";

export function useCart() {
  const { cartItems, setCartItems, loggedIn, setLoginVisible } =
    useAppContext();

  const addToCart = (item: Product) => {
    if (!loggedIn) {
      return setLoginVisible(true);
    }

    const { id, title, price, discountPercentage, brand, category, thumbnail } =
      item;

    const existingItem = cartItems.find((it) => it.id === id);
    if (existingItem) {
      return updateQuantity(id, 1 + existingItem.quantity);
    }

    setCartItems((prevItems) => [
      ...prevItems,
      {
        id,
        title,
        price,
        discountPercentage,
        brand,
        category,
        thumbnail,
        quantity: 1,
      },
    ]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart };
}
