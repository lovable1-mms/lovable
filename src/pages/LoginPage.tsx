
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter your password" }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock users for simulated login
const mockUsers = [
  { email: "user@example.com", password: "user", role: "user" },
  { email: "admin@example.com", password: "admin", role: "admin" },
  // Add the requested credential formats
  { email: "user@user.com", password: "user", role: "user" },
  { email: "admin@admin.com", password: "admin", role: "admin" },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Get redirect path from location state or default to home
  const redirectPath = location.state?.redirectTo || "/";
  
  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate(redirectPath);
    }
  }, [navigate, redirectPath]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsLoggingIn(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Check credentials against mock users
      const user = mockUsers.find(
        u => (u.email === data.email || 
             (data.email === "user" && u.email === "user@example.com") || 
             (data.email === "admin" && u.email === "admin@example.com")) && 
             u.password === data.password
      );
      
      if (user) {
        // Set login state in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userEmail", user.email);
        
        toast.success("Login successful!");
        
        // Redirect to the previous page or home
        navigate(redirectPath);
      } else {
        toast.error("Invalid email or password");
        setIsLoggingIn(false);
      }
    }, 800);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg shadow-lg p-6 border">
            <h1 className="text-3xl font-bold text-center mb-6">Sign In</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Username</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com or username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-sm text-right">
                  <Link to="/forgot-password" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>
                
                <div className="mt-4 text-sm text-center text-muted-foreground">
                  <div className="mb-2">
                    Demo credentials:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 dark:bg-[#161b22] p-2 rounded-md">
                    <div>Email: <span className="font-mono">user@user.com</span></div>
                    <div>Password: <span className="font-mono">user</span></div>
                    <div>Email: <span className="font-mono">admin@admin.com</span></div>
                    <div>Password: <span className="font-mono">admin</span></div>
                  </div>
                </div>
              </form>
            </Form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-primary hover:underline font-medium">
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
