
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const DealsPage = () => {
  // Define which products are on sale
  const onSaleProductIds = [1, 5, 6]; // MR16 LED, PAR38, MR16 GU10
  
  // Filter for on sale products
  const saleProducts = products.filter(product => 
    onSaleProductIds.includes(product.id)
  );

  // Add flashing animation for MR16 product (id=1)
  const getProductClass = (productId: number) => {
    if (productId === 1) {
      return "animate-pulse";
    }
    return "";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-red-50 dark:bg-[#161b22] py-12 border-b dark:border-[#30363d]">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-2 dark:text-[#c9d1d9]">Hot Deals & Promotions</h1>
            <p className="text-lg text-gray-600 dark:text-[#8b949e] max-w-2xl mx-auto">
              Limited-time offers on our most popular products. Save big before they're gone!
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6 dark:text-[#c9d1d9]">Current Sale Items</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => {
              const salePrice = (product.price * 0.8).toFixed(2);
              
              return (
                <div key={product.id} className={getProductClass(product.id)}>
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    isOnSale={true}
                    salePrice={Number(salePrice)}
                    rating={product.rating}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DealsPage;
