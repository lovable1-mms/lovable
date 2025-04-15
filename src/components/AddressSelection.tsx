
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  default?: boolean;
}

interface AddressSelectionProps {
  addresses: Address[];
  selectedAddressId: string;
  onAddressChange: (id: string) => void;
}

const AddressSelection: React.FC<AddressSelectionProps> = ({
  addresses,
  selectedAddressId,
  onAddressChange,
}) => {
  // Sample delivery date calculation - would come from API in real implementation
  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 3);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 6);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Select a Shipping Address</h3>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span className="text-sm">Add New</span>
        </Button>
      </div>

      <RadioGroup
        value={selectedAddressId}
        onValueChange={onAddressChange}
        className="flex flex-col gap-3"
      >
        {addresses.map((address) => (
          <Card
            key={address.id}
            className={`p-3 cursor-pointer border ${
              selectedAddressId === address.id
                ? "border-primary ring-1 ring-primary"
                : ""
            }`}
            onClick={() => onAddressChange(address.id)}
          >
            <div className="flex items-start">
              <RadioGroupItem
                value={address.id}
                id={`address-${address.id}`}
                className="mt-1 mr-3"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <label
                    htmlFor={`address-${address.id}`}
                    className="font-medium cursor-pointer"
                  >
                    {address.name}
                    {address.default && (
                      <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Default
                      </span>
                    )}
                  </label>
                  <Button variant="ghost" size="sm" className="h-6 text-xs">
                    Edit
                  </Button>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {address.street}
                  <br />
                  {address.city}, {address.state} {address.zip}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </RadioGroup>

      {selectedAddressId && (
        <div className="mt-4 flex items-center text-sm">
          <span className="font-medium">
            Estimated Delivery: {formatDate(deliveryStart)}–{formatDate(deliveryEnd)}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="ml-1.5 text-gray-500 hover:text-gray-700">
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Shipping and delivery dates are approximate and may vary depending on the forwarder. Tracking information will be provided.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default AddressSelection;
