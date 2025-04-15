
import React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  Award, 
  Leaf, 
  BatteryFull,
  Info
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock certification data (will come from backend in the future)
export interface CertificationData {
  isCUL: boolean;
  isEnergyStar: boolean;
  isROHS: boolean;
  isFiveYearWarranty: boolean;
  isDimmable: boolean;
}

// Helper function to generate mock certification data based on product name
// This can be replaced with actual backend data in the future
export const getMockCertifications = (productName: string): CertificationData => {
  return {
    isCUL: productName.includes("LED") || productName.includes("PAR"),
    isEnergyStar: productName.includes("LED"),
    isROHS: true, // All products are ROHS compliant
    isFiveYearWarranty: productName.includes("LED") || productName.includes("Dimmable"),
    isDimmable: productName.includes("Dimmable"),
  };
};

interface CertificationIconProps {
  icon: React.ReactNode;
  label: string;
  color?: string;
}

const CertificationIcon: React.FC<CertificationIconProps> = ({ icon, label, color = "bg-soft-gray" }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center justify-center p-2 rounded-full ${color}`}>
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface ProductCertificationsProps {
  productName: string;
}

const ProductCertifications: React.FC<ProductCertificationsProps> = ({ productName }) => {
  const certifications = getMockCertifications(productName);
  
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium mb-2">Certifications & Features</h3>
      <div className="flex flex-wrap gap-3 items-center">
        {certifications.isCUL && (
          <CertificationIcon 
            icon={<ShieldCheck className="h-5 w-5 text-blue-600" />} 
            label="CUL Certified"
            color="bg-blue-50" 
          />
        )}
        
        {certifications.isEnergyStar && (
          <CertificationIcon 
            icon={<Leaf className="h-5 w-5 text-green-600" />} 
            label="Energy Star Rated"
            color="bg-green-50" 
          />
        )}
        
        {certifications.isROHS && (
          <CertificationIcon 
            icon={<Info className="h-5 w-5 text-purple-600" />} 
            label="ROHS Compliant"
            color="bg-purple-50" 
          />
        )}
        
        {certifications.isFiveYearWarranty && (
          <CertificationIcon 
            icon={<Award className="h-5 w-5 text-amber-600" />} 
            label="5 Year Warranty"
            color="bg-amber-50" 
          />
        )}
        
        {certifications.isDimmable && (
          <CertificationIcon 
            icon={<BatteryFull className="h-5 w-5 text-emerald-600" />} 
            label="Dimmable"
            color="bg-emerald-50" 
          />
        )}
      </div>
    </div>
  );
};

export default ProductCertifications;
