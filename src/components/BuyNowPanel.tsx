
import React, { useState, useEffect, useRef } from "react";
import { X, MinusCircle, PlusCircle, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AddressSelection from "@/components/AddressSelection";
import SwipeConfirm from "@/components/SwipeConfirm";
import { toast } from "sonner";

// Mock addresses - would come from API in real implementation
const mockAddresses = [
  {
    id: "addr1",
    name: "Home",
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    default: true,
  },
  {
    id: "addr2",
    name: "Office",
    street: "456 Market Street",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
  },
];

interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isBestSeller?: boolean;
  isEcoFriendly?: boolean;
  isLimitedStock?: boolean;
}

interface BuyNowPanelProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductData;
  hasSavedCard?: boolean;
}

const BuyNowPanel: React.FC<BuyNowPanelProps> = ({
  isOpen,
  onClose,
  product,
  hasSavedCard = true,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState(mockAddresses[0].id);
  const [isProcessing, setIsProcessing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Reset state when panel is closed
  useEffect(() => {
    if (!isOpen) {
      // Use timeout to prevent visual reset while animating closed
      const timer = setTimeout(() => {
        setQuantity(1);
        setSelectedAddressId(mockAddresses[0].id);
        setIsProcessing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  // Handle click outside to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const addToCart = (completeCheckout: boolean = false) => {
    // Get existing cart from localStorage
    let cartItems = [];
    try {
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        cartItems = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }

    // Check if product already exists in cart
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    
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
    
    // Update localStorage and cart count
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    // Calculate total count and update
    const totalCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
    localStorage.setItem('cartCount', totalCount.toString());
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
    
    return totalCount;
  };

  const handleConfirmPurchase = () => {
    setIsProcessing(true);
    
    // Add to cart first
    const newCartCount = addToCart(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Purchase completed successfully!");
      setIsProcessing(false);
      onClose();
      // In real implementation, redirect to order confirmation page
    }, 1500);
  };

  const handleAddToCart = () => {
    addToCart();
    toast.success(`Added ${quantity} ${product.name}${quantity > 1 ? "s" : ""} to your cart!`);
    onClose();
  };
  
  // Calculate estimated delivery date (3-5 days from now)
  const getEstimatedDelivery = () => {
    const today = new Date();
    const minDays = 3;
    const maxDays = 5;
    
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + minDays);
    
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxDays);
    
    // Format dates to Apr 16–19 style
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const minDateStr = minDate.toLocaleDateString('en-US', options);
    const maxDateStr = maxDate.toLocaleDateString('en-US', options);
    
    return `${minDateStr}–${maxDateStr}`;
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Panel */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-background dark:bg-[#161b22] shadow-lg dark:shadow-black/30 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-labelledby="buy-now-panel"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="border-b dark:border-[#30363d] p-4 flex justify-between items-center sticky top-0 bg-background dark:bg-[#161b22] z-10">
          <h2 className="font-semibold text-lg dark:text-[#c9d1d9]" id="buy-now-panel">Complete Purchase</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Close panel"
            className="dark:hover:bg-[#30363d] dark:text-[#c9d1d9]"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product summary */}
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gray-100 dark:bg-[#0d1117] rounded overflow-hidden flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-medium dark:text-[#c9d1d9]">{product.name}</h3>
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-lg dark:text-[#c9d1d9]">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                  {quantity > 1 && (
                    <span className="text-xs text-gray-500 dark:text-[#8b949e]">
                      ${product.price.toFixed(2)} each
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 my-2">
                {product.isBestSeller && (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50">
                    Best Seller
                  </Badge>
                )}
                {product.isEcoFriendly && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50">
                    Eco-Friendly
                  </Badge>
                )}
                {product.isLimitedStock && (
                  <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50">
                    Limited Stock
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center mt-3">
                <span className="mr-2 dark:text-[#c9d1d9]">Quantity:</span>
                <div className="flex items-center border dark:border-[#30363d] rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 dark:hover:bg-[#30363d]"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1 || isProcessing}
                  >
                    <MinusCircle className="h-4 w-4 dark:text-[#8b949e]" />
                  </Button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= 1) {
                        setQuantity(val);
                      }
                    }}
                    className="w-12 text-center border-0 focus:ring-0 dark:bg-[#161b22] dark:text-[#c9d1d9]"
                    min="1"
                    disabled={isProcessing}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 dark:hover:bg-[#30363d]"
                    onClick={() => handleQuantityChange(1)}
                    disabled={isProcessing}
                  >
                    <PlusCircle className="h-4 w-4 dark:text-[#8b949e]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-b dark:border-[#30363d] py-4">
            {/* Address selection */}
            <AddressSelection
              addresses={mockAddresses}
              selectedAddressId={selectedAddressId}
              onAddressChange={setSelectedAddressId}
            />
            
            {/* Estimated delivery info */}
            <div className="mt-3 flex items-start gap-2">
              <div className="text-sm dark:text-[#c9d1d9]">
                <span className="font-medium">Estimated Delivery:</span> {getEstimatedDelivery()}
                <div className="text-xs text-gray-500 dark:text-[#8b949e] mt-1">
                  Shipping and delivery dates are approximate and may vary depending on the forwarder. 
                  Tracking information will be provided via email.
                </div>
              </div>
            </div>
          </div>
          
          {/* Payment section */}
          {hasSavedCard ? (
            <div>
              <div className="rounded-md bg-gray-50 dark:bg-[#0d1117] dark:border dark:border-[#30363d] p-3 mb-4 flex items-center">
                <div className="h-8 w-12 bg-blue-900 rounded mr-3 flex items-center justify-center text-white text-xs font-bold">VISA</div>
                <div>
                  <div className="text-sm font-medium dark:text-[#c9d1d9]">Visa ending in 4242</div>
                  <div className="text-xs text-gray-500 dark:text-[#8b949e]">Expires 12/25</div>
                </div>
                <div className="ml-auto">
                  <Button variant="ghost" size="sm" disabled={isProcessing} className="dark:hover:bg-[#30363d] dark:text-[#c9d1d9]">
                    Change
                  </Button>
                </div>
              </div>
              
              <SwipeConfirm onConfirm={handleConfirmPurchase} disabled={isProcessing} />
              
              {isProcessing && (
                <div className="text-center p-2">
                  <div className="animate-pulse text-primary dark:text-[#58a6ff]">Processing your order...</div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                className="w-full gap-2 dark:bg-[#58a6ff] dark:text-white dark:hover:bg-[#6eb1ff]"
                onClick={handleAddToCart}
                disabled={isProcessing}
              >
                Add to Cart & Proceed to Checkout
              </Button>
              <p className="text-sm text-gray-500 dark:text-[#8b949e] text-center">
                You'll be redirected to enter payment information on the next step.
              </p>
            </div>
          )}
          
          <div className="text-center text-xs text-gray-500 dark:text-[#8b949e] flex items-center justify-center gap-2">
            <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
            Secure checkout
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNowPanel;
