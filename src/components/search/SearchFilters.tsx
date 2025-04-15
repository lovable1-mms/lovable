
import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  sortOption: string;
  setSortOption: (option: string) => void;
  priceRange: number[];
  handlePriceChange: (value: number[]) => void;
  showInStock: boolean;
  setShowInStock: (value: boolean) => void;
  showOnSale: boolean;
  setShowOnSale: (value: boolean) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  sortOption,
  setSortOption,
  priceRange,
  handlePriceChange,
  showInStock,
  setShowInStock,
  showOnSale,
  setShowOnSale,
}) => {
  return (
    <div className="space-y-6 lg:col-span-1">
      <div className="bg-card rounded-lg p-4 border">
        <h3 className="font-medium mb-4">Sort By</h3>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger>
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg p-4 border">
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="pl-2 pr-2 pt-6">
          <Slider
            defaultValue={[0, 150]}
            min={0}
            max={150}
            step={5}
            value={priceRange}
            onValueChange={handlePriceChange}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="bg-card rounded-lg p-4 border">
        <h3 className="font-medium mb-4">Availability</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="in-stock">In Stock</Label>
            <Switch 
              id="in-stock" 
              checked={showInStock} 
              onCheckedChange={setShowInStock} 
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="on-sale">On Sale</Label>
            <Switch 
              id="on-sale" 
              checked={showOnSale} 
              onCheckedChange={setShowOnSale}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
