
import { useState, useEffect } from "react";
import { matches, players } from "@/data/mockData";
import MatchEventList from "@/components/match/MatchEventList";
import MatchStats from "@/components/match/MatchStats";
import PlayerCard from "@/components/player/PlayerCard";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  Clock, 
  Activity, 
  Users, 
  LineChart 
} from "lucide-react";
import { cn } from "@/lib/utils";

const MatchTracker = () => {
  const [activeMatch, setActiveMatch] = useState(matches[0]);
  const [time, setTime] = useState(activeMatch.status === "live" ? 59 : 0);
  
  // Simulate live match time updates
  useEffect(() => {
    if (activeMatch.status === "live") {
      const timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime >= 90) {
            clearInterval(timer);
            return 90;
          }
          return prevTime + 1;
        });
      }, 60000); // Update every minute
      
      return () => clearInterval(timer);
    }
  }, [activeMatch]);
  
  // Filter players that are involved in the match
  const involvedPlayerIds = activeMatch.events
    .map(event => event.player)
    .filter((id, index, self) => self.indexOf(id) === index);
    
  const matchPlayers = players.filter(player => 
    involvedPlayerIds.includes(player.id)
  );

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Live Match Tracker</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Match Feed & Events - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Match Header */}
          <Card className={cn(
            "relative overflow-hidden border-4",
            activeMatch.status === "live" ? "border-lowValue" : "border-muted"
          )}>
            <div className="absolute inset-0 bg-teamPrimary opacity-5 z-0"></div>
            
            {activeMatch.status === "live" && (
              <div className="absolute top-2 right-2 flex items-center px-2 py-1 bg-lowValue text-white rounded-full animate-pulse-stat">
                <span className="h-2 w-2 rounded-full bg-white mr-1"></span>
                LIVE
              </div>
            )}
            
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Clock size={18} className="mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {new Date(activeMatch.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </div>
                
                {activeMatch.status === "live" && (
                  <Badge variant="outline" className="bg-lowValue text-white border-none">
                    {time}′
                  </Badge>
                )}
                
                {activeMatch.status === "completed" && (
                  <Badge variant="outline">Full Time</Badge>
                )}
                
                {activeMatch.status === "upcoming" && (
                  <Badge variant="outline">Upcoming</Badge>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-center flex-1">
                  <h3 className="font-bold text-xl">{activeMatch.homeTeam}</h3>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-center px-6">
                    <div className="text-3xl font-bold">
                      {activeMatch.score.home} - {activeMatch.score.away}
                    </div>
                  </div>
                </div>
                
                <div className="text-center flex-1">
                  <h3 className="font-bold text-xl">{activeMatch.awayTeam}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Match Events */}
          <Tabs defaultValue="all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium flex items-center">
                <Activity size={18} className="mr-2" />
                Match Events
              </h2>
              
              <TabsList>
                <TabsTrigger value="all">All Events</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="key">Key Events</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <Card>
                <CardContent className="p-4">
                  <MatchEventList events={activeMatch.events} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="goals" className="mt-0">
              <Card>
                <CardContent className="p-4">
                  <MatchEventList 
                    events={activeMatch.events.filter(e => e.type === 'goal')} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="key" className="mt-0">
              <Card>
                <CardContent className="p-4">
                  <MatchEventList 
                    events={activeMatch.events.filter(e => 
                      ['goal', 'assist', 'red', 'injury'].includes(e.type)
                    )} 
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Match Stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <LineChart size={18} className="mr-2" />
                Match Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <MatchStats match={activeMatch} />
            </CardContent>
          </Card>
          
          {/* Alert Section for Live Matches */}
          {activeMatch.status === "live" && (
            <Card className="border-teamSecondary">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-teamSecondary mt-1" />
                  <div>
                    <h3 className="font-medium">Scout Alert</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Marcus Johnson has scored his second goal of the match, bringing his total to 4 in the last 3 games. His market value is trending upward and he's showing excellent form.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Players In Match - Right Column */}
        <div>
          <h2 className="text-lg font-medium flex items-center mb-4">
            <Users size={18} className="mr-2" />
            Players In Focus
          </h2>
          
          <div className="space-y-4">
            {matchPlayers.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
            
            {matchPlayers.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-medium text-muted-foreground">
                    No tracked players in this match
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add players to your watchlist to track their performance
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchTracker;
