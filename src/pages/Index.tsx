
import React from "react";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Footer from "@/components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Featured banners for the hero carousel
  const banners = [
    {
      id: 1,
      title: "Office Essentials",
      description: "Everything you need to equip your workplace",
      buttonText: "Shop Now",
      linkTo: "/category/office",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      id: 2,
      title: "Lighting Solutions",
      description: "Premium LED and halogen options for every space",
      buttonText: "Explore",
      linkTo: "/category/lighting",
      bgColor: "bg-amber-50 dark:bg-amber-950",
    },
    {
      id: 3,
      title: "Bulk Discounts",
      description: "Save more when you buy more",
      buttonText: "See Deals",
      linkTo: "/deals",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Carousel */}
        <div className="mb-12">
          <Carousel className="w-full">
            <CarouselContent>
              {banners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div className={`${banner.bgColor} py-16 md:py-24 px-4`}>
                    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center">
                      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{banner.title}</h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
                          {banner.description}
                        </p>
                        <Button asChild>
                          <a href={banner.linkTo}>{banner.buttonText}</a>
                        </Button>
                      </div>
                      <div className="md:w-1/2 flex justify-center">
                        <div className="w-64 h-64 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                          <img src="/placeholder.svg" alt={banner.title} className="w-48 h-48" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>

        {/* Featured Categories */}
        <div className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['Office', 'Lighting', 'Electronics', 'Furniture', 'Cleaning'].map((category) => (
              <a 
                key={category} 
                href={`/category/${category.toLowerCase()}`}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto" style={{width: "120px", height: "120px"}}>
                  <img src="/placeholder.svg" alt={category} className="w-16 h-16" />
                </div>
                <h3 className="font-medium">{category}</h3>
              </a>
            ))}
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="bg-gray-50 dark:bg-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <a href="/products" className="text-primary hover:underline">View All</a>
            </div>
            <ProductsGrid />
          </div>
        </div>

        {/* Business Solutions Banner */}
        <div className="container mx-auto px-4 py-12">
          <div className="bg-primary text-white rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Business Solutions</h2>
              <p className="mb-6">
                Tailored supply solutions for businesses of all sizes. Bulk pricing, dedicated account management, and custom ordering options.
              </p>
              <Button variant="outline" className="text-primary-foreground bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
                Learn More About B2B
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
