
import React from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Product, onSaleProductIds } from "@/hooks/useSearchResults";

interface SearchResultsProps {
  products: Product[];
  query: string;
  resetFilters: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  products,
  query,
  resetFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-muted rounded-lg">
        <h3 className="text-xl font-bold mb-2">No products found</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          Try adjusting your search or filter criteria
        </p>
        <Button onClick={resetFilters} variant="outline">
          Reset All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => {
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
            inStock={product.inStock !== false}
            rating={product.rating}
          />
        );
      })}
    </div>
  );
};

export default SearchResults;
