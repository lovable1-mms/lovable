
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, User, Clock, Sun, Moon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const { mode, setMode, isDarkMode } = useTheme();

  // Handle theme toggle
  const toggleTheme = () => {
    setMode(isDarkMode ? 'light' : 'dark');
  };

  // Set auto mode
  const setAutoMode = () => {
    setMode('auto');
  };

  // Get cart count from sessionStorage on component mount and when it changes
  useEffect(() => {
    const updateCartCount = () => {
      const count = parseInt(localStorage.getItem('cartCount') || '0');
      setCartCount(count);
    };

    // Initial count
    updateCartCount();

    // Setup event listener for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search page with query parameter
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categoryItems = [
    { name: "Office Supplies", href: "/category/office" },
    { name: "Lighting", href: "/category/lighting" },
    { name: "Electronics", href: "/category/electronics" },
    { name: "Furniture", href: "/category/furniture" },
    { name: "Cleaning", href: "/category/cleaning" },
  ];

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail');

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-[#0d1117] shadow-sm border-b dark:border-[#30363d]">
      <div className="container mx-auto px-4 py-4">
        {/* Top Header Bar */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary dark:text-[#58a6ff]">
              Mass Market Supplies
              <span className="text-sm font-normal ml-1 text-gray-500 dark:text-[#8b949e]">(MMS)</span>
            </Link>
          </div>
          
          {/* Search Bar (desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pr-10 dark:bg-[#161b22] dark:border-[#30363d] dark:text-[#c9d1d9] dark:placeholder:text-[#8b949e]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon"
                className="absolute right-0 top-0 dark:hover:bg-[#30363d]"
              >
                <Search className="h-5 w-5 dark:text-[#8b949e]" />
              </Button>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={setAutoMode}
                className={`${mode === 'auto' ? 'bg-secondary dark:bg-[#30363d]' : ''}`}
                aria-label="Auto mode"
              >
                <Clock className="h-5 w-5 text-green-600 dark:text-[#58a6ff]" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`${mode !== 'auto' ? 'bg-secondary dark:bg-[#30363d]' : ''}`}
                aria-label={isDarkMode ? "Light mode" : "Dark mode"}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-600" />
                )}
              </Button>
            </div>
            
            {isLoggedIn ? (
              <div className="hidden md:flex items-center">
                <div className="text-sm mr-2 text-gray-600 dark:text-[#8b949e]">
                  {userEmail}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('userRole');
                    localStorage.removeItem('userEmail');
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex items-center">
                <User className="h-5 w-5 text-gray-600 hover:text-primary dark:text-[#8b949e] dark:hover:text-[#c9d1d9] transition-colors" />
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-primary dark:text-[#8b949e] dark:hover:text-[#c9d1d9] transition-colors" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 dark:bg-red-500 text-white dark:text-white">
                  {cartCount}
                </Badge>
              )}
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden dark:hover:bg-[#30363d]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6 dark:text-[#c9d1d9]" />
            </Button>
          </div>
        </div>

        {/* Navigation Menu (desktop) */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className="dark:text-[#c9d1d9] dark:bg-transparent dark:hover:bg-[#30363d] dark:data-[state=open]:bg-[#30363d]"
                  onClick={(e) => {
                    // Prevent default behavior to maintain open state
                    e.preventDefault();
                  }}
                >
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] dark:bg-[#161b22] dark:border dark:border-[#30363d]">
                    {categoryItems.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={item.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:hover:bg-[#30363d] dark:text-[#c9d1d9]"
                            )}
                          >
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/deals" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:text-[#c9d1d9] dark:hover:bg-[#30363d]">
                  Special Deals
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/b2b" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:text-[#c9d1d9] dark:hover:bg-[#30363d]">
                  Business Solutions
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/contact" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:text-[#c9d1d9] dark:hover:bg-[#30363d]">
                  Contact Us
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Menu (expandable) */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4 dark:border-[#30363d]">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pr-10 dark:bg-[#161b22] dark:border-[#30363d] dark:text-[#c9d1d9] dark:placeholder:text-[#8b949e]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="icon"
                  className="absolute right-0 top-0 dark:hover:bg-[#30363d]"
                >
                  <Search className="h-5 w-5 dark:text-[#8b949e]" />
                </Button>
              </div>
            </form>
            <ul className="space-y-2">
              {isLoggedIn && (
                <li className="flex justify-between items-center p-2">
                  <span className="text-sm dark:text-[#c9d1d9]">{userEmail}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      localStorage.removeItem('isLoggedIn');
                      localStorage.removeItem('userRole');
                      localStorage.removeItem('userEmail');
                      window.location.reload();
                    }}
                  >
                    Logout
                  </Button>
                </li>
              )}
              <li><Link to="/category/office" className="block p-2 hover:bg-gray-100 dark:hover:bg-[#30363d] dark:text-[#c9d1d9] rounded">Office Supplies</Link></li>
              <li><Link to="/category/lighting" className="block p-2 hover:bg-gray-100 dark:hover:bg-[#30363d] dark:text-[#c9d1d9] rounded">Lighting</Link></li>
              <li><Link to="/category/electronics" className="block p-2 hover:bg-gray-100 dark:hover:bg-[#30363d] dark:text-[#c9d1d9] rounded">Electronics</Link></li>
              <li><Link to="/category/furniture" className="block p-2 hover:bg-gray-100 dark:hover:bg-[#30363d] dark:text-[#c9d1d9] rounded">Furniture</Link></li>
              <li><Link to="/category/cleaning" className="block p-2 hover:bg-gray-100 dark:hover:bg-[#30363d] dark:text-[#c9d1d9] rounded">Cleaning</Link></li>
              <li><Link to="/deals" className="block p-2 hover:bg-gray-100 dark:hover:bg-[#30363d] dark:text-[#c9d1d9] rounded">Special Deals</Link></li>
              <li><Link to="/b2b" className="block p-2 hover:bg-gray-100 dark:hover:bg-[#30363d] dark:text-[#c9d1d9] rounded">Business Solutions</Link></li>
              {!isLoggedIn && (
                <li><Link to="/login" className="block p-2 hover:bg-gray-100 dark:hover:bg-[#30363d] dark:text-[#c9d1d9] rounded">My Account</Link></li>
              )}
              <li><Link to="/contact" className="block p-2 hover:bg-gray-100 dark:hover:bg-[#30363d] dark:text-[#c9d1d9] rounded">Contact Us</Link></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
