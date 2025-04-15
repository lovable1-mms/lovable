import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface QuoteRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  productData: {
    id: number;
    name: string;
    orderCode: string;
    model: string;
    image: string;
    price: number;
  };
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  note: string;
}

const QuoteRequestForm: React.FC<QuoteRequestFormProps> = ({ 
  isOpen, 
  onClose,
  productData
}) => {
  const [formData, setFormData] = useState<FormData>(() => {
    // Try to load from sessionStorage if available
    const savedData = sessionStorage.getItem('quoteRequestForm');
    return savedData ? JSON.parse(savedData) : {
      fullName: '',
      email: '',
      phone: '',
      note: ''
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Save form data to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('quoteRequestForm', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate sending an email (would be replaced with actual API call)
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Quote request sent successfully!");
      
      // Email content would be sent to server
      const emailContent = `
        <h2>Quote Request for ${productData.name}</h2>
        <p><strong>Customer:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Note:</strong> ${formData.note || 'No additional notes'}</p>
        <hr />
        <h3>Product Information</h3>
        <p><strong>Product:</strong> ${productData.name}</p>
        <p><strong>Order Code:</strong> ${productData.orderCode}</p>
        <p><strong>Model:</strong> ${productData.model}</p>
        <p><strong>Price:</strong> $${productData.price.toFixed(2)}</p>
      `;
      
      console.log("Email would be sent to mmsinfo@mms.ca and", formData.email);
      console.log("Email content:", emailContent);
      
      // We keep the form data for now
      onClose();
    }, 1500);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div onClick={handleBackdropClick} className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" />
      )}
      
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-gray-100">Request a Quote</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex border rounded-md overflow-hidden dark:border-gray-700">
            <div className="w-1/3 bg-gray-100 dark:bg-gray-800 p-3">
              <img 
                src={productData.image} 
                alt={productData.name}
                className="w-full object-contain"
              />
            </div>
            <div className="w-2/3 p-3">
              <h3 className="font-medium dark:text-gray-100">{productData.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Order Code: {productData.orderCode}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Model: {productData.model}</p>
              <p className="font-semibold mt-1 dark:text-gray-200">${productData.price.toFixed(2)}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="note">Additional Notes</Label>
              <Textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="border-t dark:border-gray-700 pt-4 mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                By submitting this form, you agree to be contacted regarding your quote request.
              </p>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Submit Quote Request"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QuoteRequestForm;
