
import React from "react";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface RelatedProductsProps {
  currentProductId: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ currentProductId }) => {
  // Filter out the current product and get related ones
  const relatedProducts = products.filter(product => product.id !== currentProductId);
  
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Customers Also Viewed</h2>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {relatedProducts.map((product) => (
            <CarouselItem key={product.id} className="pl-1 basis-1/5">
              <div className="p-1">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="border rounded-md overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square p-2 bg-slate-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <h3 className="text-sm font-medium truncate">{product.name}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </div>
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
