
import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductsGrid from "@/components/ProductsGrid";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold capitalize">{categoryName} Products</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Browse our selection of {categoryName.toLowerCase()} products.</p>
          </div>
        </div>
        
        <div className="container mx-auto py-8">
          <ProductsGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
