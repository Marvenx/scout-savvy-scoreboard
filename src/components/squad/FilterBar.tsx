
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Position } from "@/data/mockData";
import { Search, Filter } from "lucide-react";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  positionFilter: string;
  onPositionChange: (value: string) => void;
  marketValueFilter: string;
  onMarketValueChange: (value: string) => void;
  onReset: () => void;
}

const FilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  positionFilter, 
  onPositionChange,
  marketValueFilter,
  onMarketValueChange,
  onReset
}: FilterBarProps) => {
  const positions: Position[] = ['GK', 'CB', 'LB', 'RB', 'CDM', 'CM', 'CAM', 'LW', 'RW', 'ST'];
  
  return (
    <div className="bg-muted/30 rounded-lg p-4 mb-6 space-y-4">
      <div className="flex items-center">
        <Filter size={20} className="mr-2 text-teamPrimary" />
        <h3 className="font-medium">Filter Players</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search by name */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {/* Filter by position */}
        <Select value={positionFilter} onValueChange={onPositionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            {positions.map((position) => (
              <SelectItem key={position} value={position}>
                {position}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Filter by market value */}
        <Select value={marketValueFilter} onValueChange={onMarketValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Market Value" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Value</SelectItem>
            <SelectItem value="under20">Under €20M</SelectItem>
            <SelectItem value="20to40">€20M - €40M</SelectItem>
            <SelectItem value="over40">Over €40M</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Reset filters */}
        <Button 
          variant="outline" 
          onClick={onReset}
          className="border-teamSecondary text-teamSecondary hover:bg-teamSecondary/10"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
