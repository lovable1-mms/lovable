import { useState, useEffect } from "react";
import { products } from "@/data/products";
import { useSearchParams } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  inStock?: boolean;
  rating?: number;
}

export const onSaleProductIds = [1, 5, 6]; // MR16 LED, PAR38, MR16 GU10

export function useSearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchTerm, setSearchTerm] = useState(query);
  const [sortOption, setSortOption] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [showOnSale, setShowOnSale] = useState(false);
  const [showInStock, setShowInStock] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Filter and sort products based on search criteria
  useEffect(() => {
    let results = [...products];
    
    // Filter by search term
    if (query) {
      results = results.filter(
        product => 
          product.name.toLowerCase().includes(query.toLowerCase()) || 
          product.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by price range
    results = results.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by availability
    if (showInStock) {
      results = results.filter(product => product.inStock !== false);
    }
    
    // Filter by sale status
    if (showOnSale) {
      results = results.filter(product => onSaleProductIds.includes(product.id));
    }
    
    // Sort products
    switch (sortOption) {
      case "price-low":
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        results = [...results].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "relevance":
      default:
        // Keep default order or implement relevance sorting logic
        break;
    }
    
    setFilteredProducts(results);
  }, [query, sortOption, priceRange, showInStock, showOnSale]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ query: searchTerm });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  const resetFilters = () => {
    setSearchTerm("");
    setSearchParams({});
    setPriceRange([0, 150]);
    setSortOption("relevance");
    setShowOnSale(false);
    setShowInStock(true);
  };

  return {
    query,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    priceRange,
    handlePriceChange,
    showOnSale,
    setShowOnSale,
    showInStock,
    setShowInStock,
    filteredProducts,
    handleSearch,
    resetFilters,
  };
}
