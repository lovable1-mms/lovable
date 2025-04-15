
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";

// Added category filter functionality
const ProductsGrid = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  // Simple filter function to demonstrate functionality
  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(product => 
        activeFilter === "led" ? product.name.includes("LED") : 
        activeFilter === "halogen" ? product.name.includes("Halogen") : 
        true
      );

  // Define which products are on sale
  const onSaleProductIds = [1, 5, 6]; // MR16 LED, PAR38, MR16 GU10

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <Button 
          variant={activeFilter === "all" ? "default" : "outline"} 
          onClick={() => setActiveFilter("all")}
          size="sm"
        >
          All Products
        </Button>
        <Button 
          variant={activeFilter === "led" ? "default" : "outline"} 
          onClick={() => setActiveFilter("led")}
          size="sm"
        >
          LED Only
        </Button>
        <Button 
          variant={activeFilter === "halogen" ? "default" : "outline"} 
          onClick={() => setActiveFilter("halogen")}
          size="sm"
        >
          Halogen Only
        </Button>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isOnSale = onSaleProductIds.includes(product.id);
          const salePrice = isOnSale ? Number((product.price * 0.8).toFixed(2)) : undefined;
          
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              isMR16={product.name.includes("MR16")}
              isOnSale={isOnSale}
              salePrice={salePrice}
              inStock={product.inStock}
              rating={product.rating}
            />
          );
        })}
      </div>

      {/* If no products found */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No products found matching your criteria.</p>
          <Button 
            variant="outline" 
            onClick={() => setActiveFilter("all")}
            className="mt-4"
          >
            View All Products
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
