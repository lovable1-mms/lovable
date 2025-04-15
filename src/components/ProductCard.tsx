
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  className?: string;
  isMR16?: boolean;
  inStock?: boolean;
  rating?: number;
  isOnSale?: boolean;
  salePrice?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  className,
  isMR16,
  inStock = true,
  rating = 0,
  isOnSale = false,
  salePrice
}) => {
  const handleAddToCart = () => {
    // Get the current cart count from sessionStorage or default to 0
    const currentCount = parseInt(sessionStorage.getItem('cartCount') || '0');
    
    // Increment the count
    const newCount = currentCount + 1;
    
    // Store the new count
    sessionStorage.setItem('cartCount', newCount.toString());
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast.success(`Added ${name} to your cart!`);
  };

  // Format the rating to display properly (e.g., 4.5 stars)
  const displayRating = rating ? rating.toFixed(1) : "0.0";

  return (
    <Card 
      className={cn(
        "flex flex-col overflow-hidden border transition-all hover:shadow-lg shadow-md animate-fade-in opacity-0 dark:bg-[#161b22] dark:border-[#30363d]",
        isMR16 && "animate-blink border-amber-300 dark:border-amber-800",
        !inStock && "opacity-80",
        className
      )}
      style={{
        animationFillMode: "forwards",
        animationDelay: `${id * 0.1}s`
      }}
    >
      <Link to={`/product/${id}`} className="aspect-square overflow-hidden bg-slate-50 dark:bg-[#0d1117] p-4 relative">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-contain transition-transform hover:scale-105"
        />
        {!inStock && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Out of Stock
          </Badge>
        )}
        {isOnSale && (
          <Badge 
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
          >
            SALE
          </Badge>
        )}
      </Link>
      <CardContent className="flex flex-col space-y-2 p-4 flex-grow">
        <div className="flex items-center mb-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="text-sm text-gray-600 dark:text-[#8b949e]">{displayRating}</span>
        </div>
        <Link to={`/product/${id}`} className="hover:text-primary dark:text-[#c9d1d9] dark:hover:text-[#58a6ff] transition-colors">
          <h3 className="font-semibold text-lg">{name}</h3>
        </Link>
        <p className="text-sm text-gray-500 dark:text-[#8b949e] line-clamp-3">{description}</p>
        <div className="text-lg font-bold mt-auto dark:text-[#c9d1d9]">
          {isOnSale && salePrice ? (
            <div className="flex items-center gap-2">
              <span className="text-red-500 dark:text-red-400">${salePrice.toFixed(2)}</span>
              <span className="line-through text-gray-500 dark:text-[#8b949e] text-sm">${price.toFixed(2)}</span>
            </div>
          ) : (
            <span>${price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full gap-2 dark:bg-[#58a6ff] dark:text-white dark:hover:bg-[#6eb1ff]" 
          disabled={!inStock}
        >
          <ShoppingCart className="h-4 w-4" /> {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
