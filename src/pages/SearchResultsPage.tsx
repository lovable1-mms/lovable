
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSearchResults } from "@/hooks/useSearchResults";
import SearchForm from "@/components/search/SearchForm";
import SearchFilters from "@/components/search/SearchFilters";
import SearchResults from "@/components/search/SearchResults";

const SearchResultsPage = () => {
  const {
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
  } = useSearchResults();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {query ? `Search Results for "${query}"` : "All Products"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"} found
          </p>
        </div>

        <SearchForm 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          handleSearch={handleSearch}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <SearchFilters
            sortOption={sortOption}
            setSortOption={setSortOption}
            priceRange={priceRange}
            handlePriceChange={handlePriceChange}
            showInStock={showInStock}
            setShowInStock={setShowInStock}
            showOnSale={showOnSale}
            setShowOnSale={setShowOnSale}
          />

          <div className="lg:col-span-3">
            <SearchResults
              products={filteredProducts}
              query={query}
              resetFilters={resetFilters}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
