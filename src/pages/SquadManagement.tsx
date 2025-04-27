
import { useState } from "react";
import { players } from "@/data/mockData";
import FilterBar from "@/components/squad/FilterBar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertCircle, 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Star, 
  Heart, 
  UserPlus, 
  Filter,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const SquadManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [marketValueFilter, setMarketValueFilter] = useState("any");
  
  // Calculate average form rating for a player
  const getAvgForm = (formValues: number[]) => {
    return formValues.reduce((sum, rating) => sum + rating, 0) / formValues.length;
  };
  
  // Determine form direction icon
  const getFormDirectionIcon = (formValues: number[]) => {
    const lastTwoGames = formValues.slice(-2);
    const diff = lastTwoGames[1] - lastTwoGames[0];
    
    if (diff > 0.5) return { icon: TrendingUp, class: "text-highValue" };
    if (diff < -0.5) return { icon: TrendingDown, class: "text-lowValue" };
    return { icon: Minus, class: "text-neutral" };
  };
  
  // Filter players based on search term and filters
  const filteredPlayers = players.filter(player => {
    // Filter by search term
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by position
    const matchesPosition = positionFilter === "all" || player.position === positionFilter;
    
    // Filter by market value
    let matchesMarketValue = true;
    if (marketValueFilter === "under20") {
      matchesMarketValue = player.marketValue < 20;
    } else if (marketValueFilter === "20to40") {
      matchesMarketValue = player.marketValue >= 20 && player.marketValue <= 40;
    } else if (marketValueFilter === "over40") {
      matchesMarketValue = player.marketValue > 40;
    }
    
    return matchesSearch && matchesPosition && matchesMarketValue;
  });
  
  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setPositionFilter("all");
    setMarketValueFilter("any");
  };

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Shield size={24} className="mr-2 text-teamPrimary" />
          Squad Management
        </h1>
        
        <Button className="gap-2">
          <UserPlus size={16} />
          <span>Add Player</span>
        </Button>
      </div>
      
      {/* Filters */}
      <FilterBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        positionFilter={positionFilter}
        onPositionChange={setPositionFilter}
        marketValueFilter={marketValueFilter}
        onMarketValueChange={setMarketValueFilter}
        onReset={handleResetFilters}
      />
      
      {/* Squad Alerts */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium flex items-center">
            <AlertCircle size={18} className="mr-2 text-lowValue" />
            Squad Alerts
          </h2>
          <Badge variant="outline">3 Items</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-lowValue">
            <CardContent className="p-4">
              <h3 className="font-medium">Carlos Mendes</h3>
              <p className="text-sm text-muted-foreground">Fitness Concern (88%)</p>
              <Progress value={88} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-lowValue">
            <CardContent className="p-4">
              <h3 className="font-medium">Marco Rossi</h3>
              <p className="text-sm text-muted-foreground">Contract expires in 12 months</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs">Today</span>
                <Progress value={75} className="h-2 w-3/4" />
                <span className="text-xs">Jun 2025</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-lowValue">
            <CardContent className="p-4">
              <h3 className="font-medium">Thomas Mueller</h3>
              <p className="text-sm text-muted-foreground">Form dip in last 2 games</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <TrendingDown size={16} className="text-lowValue mr-1" />
                  <span className="text-sm font-medium">-0.9 rating</span>
                </div>
                <Badge variant="outline" className="bg-lowValue text-white border-none">
                  Monitor
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Player List */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-medium flex items-center">
            <Users size={18} className="mr-2" />
            Player Squad ({filteredPlayers.length})
          </h2>
          
          <div className="flex items-center">
            <Filter size={16} className="mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {filteredPlayers.length} players shown
            </span>
          </div>
        </div>
        
        <div className="bg-muted rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-teamPrimary text-white">
                  <th className="py-3 px-4 text-left">Player</th>
                  <th className="py-3 px-4 text-center">Age</th>
                  <th className="py-3 px-4 text-center">Position</th>
                  <th className="py-3 px-4 text-center">Fitness</th>
                  <th className="py-3 px-4 text-center">Form</th>
                  <th className="py-3 px-4 text-center">Value</th>
                  <th className="py-3 px-4 text-center">Contract</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPlayers.map(player => {
                  const { icon: FormIcon, class: formClass } = getFormDirectionIcon(player.form);
                  return (
                    <tr 
                      key={player.id}
                      className="bg-card hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-teamSecondary/20 flex items-center justify-center text-xs font-medium mr-3">
                            {player.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <div className="font-medium">{player.name}</div>
                            <div className="text-xs text-muted-foreground">{player.club}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">{player.age}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="outline">{player.position}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <div className="w-24">
                            <Progress 
                              value={player.fitness} 
                              className={cn(
                                "h-2",
                                player.fitness < 85 ? "bg-lowValue" : ""
                              )}
                            />
                          </div>
                          <span className="ml-2 text-sm">{player.fitness}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center">
                          <FormIcon size={16} className={formClass} />
                          <div className="flex items-center ml-1">
                            <Star size={14} className="text-highlight fill-highlight" />
                            <span className="ml-1">{getAvgForm(player.form).toFixed(1)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge className="bg-teamSecondary">
                          €{player.marketValue}M
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-sm">{player.contract.until.split("-")[0]}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Heart size={16} />
                          </Button>
                          <Link to={`/player/${player.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ExternalLink size={16} />
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                
                {filteredPlayers.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-muted-foreground">
                      No players match your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquadManagement;
