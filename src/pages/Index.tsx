
import { useState } from "react";
import { Link } from "react-router-dom";
import { players } from "@/data/mockData";
import PlayerCard from "@/components/player/PlayerCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Search, 
  Filter, 
  ArrowUpDown,
  SlidersHorizontal
} from "lucide-react";

const PlayerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'name' | 'value' | 'form' | 'age'>('value');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Filter players by search term
  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.club.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.nationality.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort players
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    let valueA, valueB;
    
    switch (sortBy) {
      case 'name':
        valueA = a.name;
        valueB = b.name;
        break;
      case 'value':
        valueA = a.marketValue;
        valueB = b.marketValue;
        break;
      case 'form':
        valueA = a.form.reduce((sum, val) => sum + val, 0) / a.form.length;
        valueB = b.form.reduce((sum, val) => sum + val, 0) / b.form.length;
        break;
      case 'age':
        valueA = a.age;
        valueB = b.age;
        break;
      default:
        valueA = a.marketValue;
        valueB = b.marketValue;
    }
    
    if (sortDirection === 'asc') {
      return typeof valueA === 'string' 
        ? valueA.localeCompare(valueB as string) 
        : (valueA as number) - (valueB as number);
    } else {
      return typeof valueA === 'string' 
        ? valueB.localeCompare(valueA as string) 
        : (valueB as number) - (valueA as number);
    }
  });
  
  // Handle sort change
  const handleSortChange = (key: 'name' | 'value' | 'form' | 'age') => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('desc');
    }
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center">
            <User size={24} className="mr-2 text-teamPrimary" />
            Player Database
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and analyze potential signings for your squad
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            <span>Filters</span>
          </Button>
          
          <div className="relative">
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal size={16} />
              <span>Sort</span>
              <Badge className="ml-1 bg-teamSecondary text-xs">
                {sortBy}
              </Badge>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Sort options */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`gap-1 ${sortBy === 'name' ? 'bg-muted' : ''}`}
          onClick={() => handleSortChange('name')}
        >
          Name
          {sortBy === 'name' && (
            <ArrowUpDown size={14} className={sortDirection === 'asc' ? 'rotate-180' : ''} />
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`gap-1 ${sortBy === 'value' ? 'bg-muted' : ''}`}
          onClick={() => handleSortChange('value')}
        >
          Market Value
          {sortBy === 'value' && (
            <ArrowUpDown size={14} className={sortDirection === 'asc' ? 'rotate-180' : ''} />
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`gap-1 ${sortBy === 'form' ? 'bg-muted' : ''}`}
          onClick={() => handleSortChange('form')}
        >
          Form
          {sortBy === 'form' && (
            <ArrowUpDown size={14} className={sortDirection === 'asc' ? 'rotate-180' : ''} />
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`gap-1 ${sortBy === 'age' ? 'bg-muted' : ''}`}
          onClick={() => handleSortChange('age')}
        >
          Age
          {sortBy === 'age' && (
            <ArrowUpDown size={14} className={sortDirection === 'asc' ? 'rotate-180' : ''} />
          )}
        </Button>
      </div>
      
      {sortedPlayers.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-medium text-muted-foreground">
              No players found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedPlayers.map(player => (
            <Link key={player.id} to={`/player/${player.id}`}>
              <PlayerCard player={player} />
            </Link>
          ))}
        </div>
      )}
      
      {/* Featured comparison */}
      <Card className="mt-12 bg-gradient-to-r from-teamPrimary to-teamPrimary/90 text-white">
        <CardHeader>
          <CardTitle>Player Comparison Tool</CardTitle>
          <CardDescription className="text-white/80">
            Compare two players side-by-side to make better recruitment decisions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/90">
              Our intelligent comparison system analyzes player stats, form, and market value to help you identify the best signings for your squad.
            </p>
            <Link to="/comparison">
              <Button size="lg" className="bg-white text-teamPrimary hover:bg-white/90">
                Start Comparing Players
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerList;
