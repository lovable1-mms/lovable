
import React, { useState } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";

interface ProductImageGalleryProps {
  product: {
    id: number;
    name: string;
    image: string;
  };
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ product }) => {
  // Mock additional images for the gallery
  const images = [
    product.image,
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden bg-white p-8 flex items-center justify-center">
        <img 
          src={selectedImage} 
          alt={product.name} 
          className="max-h-[400px] w-auto object-contain mx-auto"
        />
      </div>
      
      <Carousel className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-1/4 sm:basis-1/5">
              <div 
                className={`rounded cursor-pointer border-2 p-2 aspect-square flex items-center justify-center ${
                  selectedImage === image ? "border-primary" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - Image ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>
            </CarouselItem>
          ))}
          <CarouselItem className="basis-1/4 sm:basis-1/5">
            <div 
              className={`rounded cursor-pointer border-2 border-gray-200 p-2 aspect-square flex items-center justify-center bg-gray-100`}
            >
              <div className="text-gray-500 text-xs text-center">
                Video Preview
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default ProductImageGallery;
