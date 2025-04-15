import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductImageGallery from "@/components/ProductImageGallery";
import RelatedProducts from "@/components/RelatedProducts";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import ProductCertifications from "@/components/ProductCertifications";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Phone, 
  Mail, 
  Info, 
  ShoppingCart, 
  MinusCircle, 
  PlusCircle,
  CreditCard,
  LogOut
} from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import BuyNowPanel from "@/components/BuyNowPanel";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");
  const [quoteFormOpen, setQuoteFormOpen] = useState(false);
  const [buyNowPanelOpen, setBuyNowPanelOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };
    
    checkLoginStatus();
    
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const product = products.find((p) => p.id === parseInt(id || "0"));

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold">Product not found</h2>
            <p className="mt-4">The product you're looking for does not exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const productDetails = {
    model: `Model ${product.name.replace(/[^a-zA-Z0-9]/g, "")}`,
    orderCode: `OC-${product.id}${product.name.slice(0, 3).toUpperCase()}`,
    specs: [
      { name: "Wattage", value: product.name.includes("LED") ? "5W" : "35W" },
      { name: "Lumens", value: product.name.includes("LED") ? "450lm" : "300lm" },
      { name: "Color Temperature", value: "3000K (Warm White)" },
      { name: "Beam Angle", value: product.name.includes("Spot") ? "25°" : "40°" },
      { name: "Lifespan", value: product.name.includes("LED") ? "25,000 hours" : "2,000 hours" },
      { name: "Dimmable", value: product.name.includes("Dimmable") ? "Yes" : "No" },
    ],
    isOnSale: product.name.includes("MR16") || product.name.includes("PAR38"),
    salePrice: product.name.includes("MR16") 
      ? (product.price * 0.8).toFixed(2)
      : product.name.includes("PAR38") 
        ? (product.price * 0.85).toFixed(2)
        : product.price.toFixed(2),
  };

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.name}${quantity > 1 ? "s" : ""} to your cart!`);
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const onSaleProductIds = [1, 5, 6]; // MR16 LED, PAR38, MR16 GU10
  const isOnSale = onSaleProductIds.includes(product.id);
  const salePrice = isOnSale ? (product.price * 0.8).toFixed(2) : null;

  const toggleQuoteForm = () => {
    setQuoteFormOpen(prev => !prev);
  };

  const handleBuyNow = () => {
    if (isLoggedIn) {
      setBuyNowPanelOpen(true);
    } else {
      toast.info("Please log in to continue with your purchase.");
      navigate("/login", { state: { redirectTo: `/product/${id}` } });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
  };

  const quoteProductData = {
    id: product.id,
    name: product.name,
    orderCode: productDetails.orderCode,
    model: productDetails.model,
    image: product.image,
    price: product.price,
  };

  const enhancedProductData = {
    ...product,
    isBestSeller: product.id === 1 || product.id === 3,
    isEcoFriendly: product.name.includes("LED"),
    isLimitedStock: product.id === 6 || product.id === 2,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {isLoggedIn && (
          <div className="mb-4 flex justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Logged in as: {localStorage.getItem("userEmail") || "User"}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 h-8" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <a href="/" className="text-blue-600 hover:underline">Home</a> / <span className="font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <ProductImageGallery product={product} />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-2xl font-bold">
                  {isOnSale ? (
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">${salePrice}</span>
                      <span className="text-gray-500 line-through text-lg">${product.price.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span>${product.price.toFixed(2)}</span>
                  )}
                </div>
                {isOnSale && (
                  <Badge className="bg-red-500">SALE</Badge>
                )}
              </div>

              <p className="text-gray-700 mb-4">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-y-2 mb-6">
                <div>
                  <span className="font-semibold">Model:</span> {productDetails.model}
                </div>
                <div>
                  <span className="font-semibold">Order Code:</span> {productDetails.orderCode}
                </div>
              </div>
              
              <ProductCertifications productName={product.name} />
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange(1)}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-grow"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-grow bg-green-600 hover:bg-green-700 text-white" 
                  onClick={handleBuyNow}
                >
                  <CreditCard className="mr-2 h-4 w-4" /> Buy Now
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-grow" 
                  onClick={toggleQuoteForm}
                >
                  Request Quote
                </Button>
              </div>
              
              <div className="text-xs text-gray-400 mt-2">
                * This item is non-refundable.
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                Share:
                <button className="p-1 hover:text-blue-600">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="p-1 hover:text-blue-400">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="p-1 hover:text-pink-500">
                  <Instagram className="h-5 w-5" />
                </button>
                <button className="p-1 hover:text-blue-600">
                  <Mail className="h-5 w-5" />
                </button>
              </div>
            </div>

            <Card className="p-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="sm:w-1/4">
                  <img 
                    src="/placeholder.svg" 
                    alt="Support Representative" 
                    className="rounded-full w-20 h-20 mx-auto object-cover border-2 border-primary"
                  />
                </div>
                <div className="sm:w-3/4 text-center sm:text-left">
                  <h3 className="font-bold text-lg">Need Help? Business Customer?</h3>
                  <p className="text-sm text-gray-600 mb-2">Get personalized assistance or special B2B pricing</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Phone className="h-4 w-4" /> Contact Sales
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Info className="h-4 w-4" /> B2B Login
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <div className="border-b border-gray-200 mb-4">
            <div className="flex flex-wrap -mb-px">
              <button
                className={`inline-block py-3 px-4 text-sm font-medium ${
                  selectedTab === "description"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setSelectedTab("description")}
              >
                Description
              </button>
              <button
                className={`inline-block py-3 px-4 text-sm font-medium ${
                  selectedTab === "specs"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setSelectedTab("specs")}
              >
                Specifications
              </button>
              <button
                className={`inline-block py-3 px-4 text-sm font-medium ${
                  selectedTab === "documentation"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setSelectedTab("documentation")}
              >
                Documentation
              </button>
            </div>
          </div>

          <div className="p-4">
            {selectedTab === "description" && (
              <div>
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <p className="mb-4">{product.description}</p>
                <p className="mb-4">
                  {product.name.includes("LED") 
                    ? "This LED lighting solution offers energy efficiency and long-lasting performance. Designed with the latest technology, it provides brilliant illumination while consuming minimal power."
                    : "This halogen lighting solution offers brilliant light output and excellent color rendering. Perfect for accent lighting and creating ambiance in any space."}
                </p>
                <p>
                  Features include {productDetails.specs[0].value} power consumption, {productDetails.specs[1].value} brightness, 
                  and a color temperature of {productDetails.specs[2].value} that creates a warm, inviting atmosphere.
                </p>
              </div>
            )}
            
            {selectedTab === "specs" && (
              <div>
                <h3 className="text-xl font-bold mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {productDetails.specs.map((spec, index) => (
                    <div key={index} className="flex justify-between border-b pb-2">
                      <span className="font-medium">{spec.name}</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedTab === "documentation" && (
              <div>
                <h3 className="text-xl font-bold mb-4">Product Documentation</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <a href="#" className="text-primary hover:underline">
                      Product Datasheet (PDF)
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <a href="#" className="text-primary hover:underline">
                      Installation Guide (PDF)
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <a href="#" className="text-primary hover:underline">
                      Warranty Information (PDF)
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <RelatedProducts currentProductId={product.id} />
        </div>
      </main>
      <Footer />
      
      <QuoteRequestForm 
        isOpen={quoteFormOpen} 
        onClose={() => setQuoteFormOpen(false)} 
        productData={quoteProductData}
      />

      <BuyNowPanel 
        isOpen={buyNowPanelOpen}
        onClose={() => setBuyNowPanelOpen(false)}
        product={enhancedProductData}
        hasSavedCard={true}
      />
    </div>
  );
};

export default ProductDetail;
