
import { useParams, Link } from "react-router-dom";
import { players } from "@/data/mockData";
import PlayerCard from "@/components/player/PlayerCard";
import PerformanceGraph from "@/components/player/PerformanceGraph";
import StatsRadar from "@/components/player/StatsRadar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowLeft, Heart, Mail, Share2 } from "lucide-react";

const PlayerProfile = () => {
  const { id } = useParams();
  const playerId = Number(id);
  
  // Find player by ID
  const player = players.find(p => p.id === playerId);
  
  if (!player) {
    return (
      <div className="container py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Player Not Found</h2>
        <p className="mb-6">The requested player could not be found.</p>
        <Link to="/">
          <Button>Back to Players</Button>
        </Link>
      </div>
    );
  }

  // Calculate contract years remaining
  const currentYear = new Date().getFullYear();
  const contractYear = new Date(player.contract.until).getFullYear();
  const yearsRemaining = contractYear - currentYear;

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft size={16} /> Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-4">Player Profile</h1>
        <div className="ml-auto flex space-x-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Heart size={16} /> Watchlist
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Mail size={16} /> Contact
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 size={16} /> Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Player info */}
        <div>
          <PlayerCard player={player} showDetails={true} />
          
          <Card className="mt-6">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Contract Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Current Club</span>
                  <span className="font-medium">{player.club}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Contract Until</span>
                  <div className="flex items-center">
                    <CalendarDays size={14} className="mr-1 text-teamSecondary" />
                    <span className="font-medium">{player.contract.until}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Years Remaining</span>
                  <Badge variant={yearsRemaining > 2 ? "default" : "destructive"}>
                    {yearsRemaining} years
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Weekly Salary</span>
                  <span className="font-medium">€{player.contract.salary}k</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Middle column - Performance & Stats */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="stat-label">Goals</p>
                  <p className="stat-value text-2xl">{player.recentPerformance.goals}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="stat-label">Assists</p>
                  <p className="stat-value text-2xl">{player.recentPerformance.assists}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="stat-label">Minutes Played</p>
                  <p className="stat-value">{player.recentPerformance.minutesPlayed}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="stat-label">Pass Accuracy</p>
                  <p className="stat-value">{player.recentPerformance.passAccuracy}%</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="stat-label">Distance (km)</p>
                  <p className="stat-value">{player.recentPerformance.distanceCovered}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="stat-label">Rating</p>
                  <p className="stat-value text-2xl text-highlight">{player.recentPerformance.rating.toFixed(1)}</p>
                </div>
              </div>
              
              <PerformanceGraph player={player} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Player Bio</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Age</span>
                  <span className="font-medium">{player.age} years</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Nationality</span>
                  <span className="font-medium">{player.nationality}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Position</span>
                  <Badge variant="outline">{player.position}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Market Value</span>
                  <span className="font-medium text-highlight">€{player.marketValue}M</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Technical Skills */}
        <div>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Technical Analysis</h3>
              <StatsRadar player={player} />
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="stat-label">Technique</p>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-teamSecondary h-2 rounded-full" 
                        style={{ width: `${player.stats.technique}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 font-medium">{player.stats.technique}</span>
                  </div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="stat-label">Tactical</p>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-teamSecondary h-2 rounded-full" 
                        style={{ width: `${player.stats.tactical}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 font-medium">{player.stats.tactical}</span>
                  </div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="stat-label">Mental</p>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-teamSecondary h-2 rounded-full" 
                        style={{ width: `${player.stats.mental}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 font-medium">{player.stats.mental}</span>
                  </div>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="stat-label">Physical</p>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-teamSecondary h-2 rounded-full" 
                        style={{ width: `${player.stats.physical}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 font-medium">{player.stats.physical}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Link to={`/comparison?player1=${player.id}`}>
                  <Button className="w-full">Compare With Other Players</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
