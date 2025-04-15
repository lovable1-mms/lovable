
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const BusinessPage = () => {
  const handleContactRequest = () => {
    toast.success("Thank you! A B2B specialist will contact you shortly.");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-primary dark:bg-[#161b22] text-white py-16 md:py-24 dark:border-b dark:border-[#30363d]">
          <div className="container mx-auto px-4 text-center md:text-left">
            <div className="max-w-3xl mx-auto md:mx-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">B2B Solutions for Every Business</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Streamline your procurement process with customized supply solutions, bulk pricing, and dedicated account management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 dark:bg-[#58a6ff] dark:text-white dark:hover:bg-[#6eb1ff]">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 dark:border-[#30363d]">
                  Schedule a Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="py-16 bg-gray-50 dark:bg-[#0d1117]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center dark:text-[#c9d1d9]">Why Choose Mass Market Supplies for Your Business</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-[#161b22] rounded-lg shadow-sm border dark:border-[#30363d] p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 dark:bg-[#30363d] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary dark:text-[#58a6ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-[#c9d1d9]">Bulk Pricing</h3>
                <p className="text-gray-600 dark:text-[#8b949e]">
                  Save up to 30% with our tiered pricing structure designed specifically for business purchases.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[#161b22] rounded-lg shadow-sm border dark:border-[#30363d] p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 dark:bg-[#30363d] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary dark:text-[#58a6ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-[#c9d1d9]">Dedicated Account Manager</h3>
                <p className="text-gray-600 dark:text-[#8b949e]">
                  Work with a personal account manager who understands your business needs and procurement cycles.
                </p>
              </div>
              
              <div className="bg-white dark:bg-[#161b22] rounded-lg shadow-sm border dark:border-[#30363d] p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 dark:bg-[#30363d] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary dark:text-[#58a6ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-[#c9d1d9]">Custom Ordering Portal</h3>
                <p className="text-gray-600 dark:text-[#8b949e]">
                  Access a personalized ordering system with approval workflows, budget controls, and reporting tools.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Business Plans */}
        <div className="py-16 dark:bg-[#0d1117]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center dark:text-[#c9d1d9]">Choose the Right Plan for Your Business</h2>
            <p className="text-center text-gray-600 dark:text-[#8b949e] mb-12 max-w-2xl mx-auto">
              Whether you're a small business or a large enterprise, we have flexible options to meet your needs.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Small Business */}
              <Card className="border-2 dark:border-[#30363d] dark:bg-[#161b22] overflow-hidden">
                <div className="bg-gray-50 dark:bg-[#1e1e1e] p-6 text-center">
                  <h3 className="text-lg font-bold dark:text-[#c9d1d9]">Small Business</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold dark:text-[#c9d1d9]">$0</span>
                    <span className="text-gray-600 dark:text-[#8b949e]">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-[#8b949e] mt-2">Perfect for teams with occasional ordering needs</p>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">5% discount on orders over $250</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">Net-30 payment terms</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">Basic reporting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">Email support</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 dark:bg-[#161b22] dark:border dark:border-[#30363d] dark:hover:bg-[#30363d]" variant="outline" onClick={handleContactRequest}>
                    Sign Up Free
                  </Button>
                </CardContent>
              </Card>
              
              {/* Mid-Size */}
              <Card className="border-2 border-primary dark:border-[#58a6ff] overflow-hidden shadow-md relative dark:bg-[#161b22]">
                <div className="absolute top-0 right-0 bg-primary dark:bg-[#58a6ff] text-white text-xs px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
                <div className="bg-primary/10 dark:bg-[#58a6ff]/10 p-6 text-center">
                  <h3 className="text-lg font-bold dark:text-[#c9d1d9]">Mid-Size Business</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold dark:text-[#c9d1d9]">$99</span>
                    <span className="text-gray-600 dark:text-[#8b949e]">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-[#8b949e] mt-2">Ideal for growing businesses with regular needs</p>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">15% discount on all orders</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">Net-60 payment terms</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">Priority shipping</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">Phone & email support</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 dark:bg-[#58a6ff] dark:hover:bg-[#6eb1ff]" onClick={handleContactRequest}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
              
              {/* Enterprise */}
              <Card className="border-2 dark:border-[#30363d] dark:bg-[#161b22] overflow-hidden">
                <div className="bg-gray-50 dark:bg-[#1e1e1e] p-6 text-center">
                  <h3 className="text-lg font-bold dark:text-[#c9d1d9]">Enterprise</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold dark:text-[#c9d1d9]">Custom</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-[#8b949e] mt-2">For large organizations with complex requirements</p>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">Custom volume pricing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">Custom payment terms</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">Custom ordering portal</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">Integration with your systems</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="dark:text-[#c9d1d9]">24/7 dedicated support</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6 dark:bg-[#161b22] dark:border dark:border-[#30363d] dark:hover:bg-[#30363d]" variant="outline" onClick={handleContactRequest}>
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="bg-gray-50 dark:bg-[#0d1117] py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white dark:bg-[#161b22] rounded-lg shadow-sm border dark:border-[#30363d] p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-[#c9d1d9]">Ready to get started?</h2>
                <p className="text-gray-600 dark:text-[#8b949e] max-w-2xl mx-auto">
                  Our B2B specialists are ready to create a customized solution for your business. Fill out the form below and we'll be in touch shortly.
                </p>
              </div>
              
              <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); handleContactRequest(); }}>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#c9d1d9]">Company Name</label>
                  <input type="text" className="w-full border-gray-300 dark:border-[#30363d] dark:bg-[#1e1e1e] dark:text-[#c9d1d9] rounded-md shadow-sm px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#c9d1d9]">Your Name</label>
                  <input type="text" className="w-full border-gray-300 dark:border-[#30363d] dark:bg-[#1e1e1e] dark:text-[#c9d1d9] rounded-md shadow-sm px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#c9d1d9]">Business Email</label>
                  <input type="email" className="w-full border-gray-300 dark:border-[#30363d] dark:bg-[#1e1e1e] dark:text-[#c9d1d9] rounded-md shadow-sm px-4 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-[#c9d1d9]">Phone Number</label>
                  <input type="tel" className="w-full border-gray-300 dark:border-[#30363d] dark:bg-[#1e1e1e] dark:text-[#c9d1d9] rounded-md shadow-sm px-4 py-2" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1 dark:text-[#c9d1d9]">How can we help your business?</label>
                  <textarea className="w-full border-gray-300 dark:border-[#30363d] dark:bg-[#1e1e1e] dark:text-[#c9d1d9] rounded-md shadow-sm px-4 py-2" rows={4} required></textarea>
                </div>
                <div className="md:col-span-2 text-center">
                  <Button size="lg" type="submit" className="dark:bg-[#58a6ff] dark:hover:bg-[#6eb1ff]">
                    Submit Request
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessPage;
