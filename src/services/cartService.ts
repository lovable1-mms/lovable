
import { toast } from "sonner";

// CartItem interface
export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

// Get cart items from localStorage
export const getCartItems = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error("Error loading cart:", error);
    toast.error("There was an error loading your cart");
  }
  return [];
};

// Get cart count
export const getCartCount = (): number => {
  try {
    const cartItems = getCartItems();
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  } catch (error) {
    console.error("Error getting cart count:", error);
  }
  return 0;
};

// Add item to cart
export const addToCart = (product: {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}, quantity: number = 1): number => {
  const cartItems = getCartItems();
  
  // Check if product already exists in cart
  const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  
  if (existingItemIndex >= 0) {
    // Update quantity if product already exists
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // Add new product to cart
    const newItem = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: quantity,
      image: product.image
    };
    cartItems.push(newItem);
  }
  
  // Update localStorage
  saveCart(cartItems);
  
  // Calculate and return total count
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return totalCount;
};

// Remove item from cart
export const removeFromCart = (productId: number): number => {
  let cartItems = getCartItems();
  cartItems = cartItems.filter(item => item.id !== productId);
  
  // Update localStorage
  saveCart(cartItems);
  
  // Calculate and return total count
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return totalCount;
};

// Update item quantity
export const updateCartItemQuantity = (productId: number, quantity: number): number => {
  if (quantity < 1) return getCartCount();
  
  const cartItems = getCartItems();
  const itemIndex = cartItems.findIndex(item => item.id === productId);
  
  if (itemIndex >= 0) {
    cartItems[itemIndex].quantity = quantity;
    saveCart(cartItems);
  }
  
  // Calculate and return total count
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return totalCount;
};

// Clear cart
export const clearCart = (): void => {
  localStorage.removeItem('cartItems');
  localStorage.setItem('cartCount', '0');
  
  // Dispatch event to update cart count in header
  window.dispatchEvent(new Event('cartUpdated'));
};

// Save cart to localStorage and update count
const saveCart = (cartItems: CartItem[]): void => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
  // Calculate total quantity
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  localStorage.setItem('cartCount', totalCount.toString());
  
  // Dispatch event to update cart count in header
  window.dispatchEvent(new Event('cartUpdated'));
};
