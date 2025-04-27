
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Player, players } from "@/data/mockData";
import StatsRadar from "@/components/player/StatsRadar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const PlayerComparison = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [player1, setPlayer1] = useState<Player | null>(null);
  const [player2, setPlayer2] = useState<Player | null>(null);
  
  // Initialize from URL parameters
  useEffect(() => {
    const player1Id = searchParams.get('player1');
    const player2Id = searchParams.get('player2');
    
    if (player1Id) {
      const foundPlayer = players.find(p => p.id === Number(player1Id));
      setPlayer1(foundPlayer || null);
    }
    
    if (player2Id) {
      const foundPlayer = players.find(p => p.id === Number(player2Id));
      setPlayer2(foundPlayer || null);
    }
  }, [searchParams]);
  
  // Handle player selection
  const handleSelectPlayer1 = (playerId: string) => {
    const selectedPlayer = players.find(p => p.id === Number(playerId));
    setPlayer1(selectedPlayer || null);
    
    // Update URL params
    searchParams.set('player1', playerId);
    setSearchParams(searchParams);
  };
  
  const handleSelectPlayer2 = (playerId: string) => {
    const selectedPlayer = players.find(p => p.id === Number(playerId));
    setPlayer2(selectedPlayer || null);
    
    // Update URL params
    searchParams.set('player2', playerId);
    setSearchParams(searchParams);
  };
  
  // Determine statistical advantages
  const getComparisonResult = () => {
    if (!player1 || !player2) return null;
    
    const stats1 = player1.stats;
    const stats2 = player2.stats;
    
    // Count advantages for each player
    let player1Advantages = 0;
    let player2Advantages = 0;
    
    // Check each stat
    Object.keys(stats1).forEach(key => {
      const stat = key as keyof typeof stats1;
      if (stats1[stat] > stats2[stat]) player1Advantages++;
      if (stats2[stat] > stats1[stat]) player2Advantages++;
    });
    
    // Check form
    const avg1 = player1.form.reduce((a, b) => a + b, 0) / player1.form.length;
    const avg2 = player2.form.reduce((a, b) => a + b, 0) / player2.form.length;
    
    if (avg1 > avg2) player1Advantages++;
    if (avg2 > avg1) player2Advantages++;
    
    // Check fitness
    if (player1.fitness > player2.fitness) player1Advantages++;
    if (player2.fitness > player1.fitness) player2Advantages++;
    
    return {
      player1Advantages,
      player2Advantages,
      recommended: player1Advantages > player2Advantages ? player1 : player2
    };
  };
  
  const comparisonResult = getComparisonResult();

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Player Comparison</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Player 1 Selection */}
        <div>
          <h2 className="text-lg font-medium mb-3">Select Player 1</h2>
          <Select 
            value={player1?.id.toString() || ""} 
            onValueChange={handleSelectPlayer1}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a player" />
            </SelectTrigger>
            <SelectContent>
              {players.map(player => (
                <SelectItem 
                  key={player.id} 
                  value={player.id.toString()}
                  disabled={player.id === player2?.id}
                >
                  {player.name} ({player.position}) - {player.club}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Player 2 Selection */}
        <div>
          <h2 className="text-lg font-medium mb-3">Select Player 2</h2>
          <Select 
            value={player2?.id.toString() || ""} 
            onValueChange={handleSelectPlayer2}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a player" />
            </SelectTrigger>
            <SelectContent>
              {players.map(player => (
                <SelectItem 
                  key={player.id} 
                  value={player.id.toString()}
                  disabled={player.id === player1?.id}
                >
                  {player.name} ({player.position}) - {player.club}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {player1 && player2 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Player 1 Info */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center border-b pb-3 mb-4">
                  <h3 className="font-bold text-lg">{player1.name}</h3>
                  <p className="text-sm text-muted-foreground">{player1.club}</p>
                  <div className="flex justify-center mt-2">
                    <Badge className="mr-2">{player1.position}</Badge>
                    <Badge variant="outline" className="bg-teamPrimary text-white">
                      €{player1.marketValue}M
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Age:</span>
                    <span className="font-medium">{player1.age} years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Nationality:</span>
                    <span className="font-medium">{player1.nationality}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fitness:</span>
                    <span className="font-medium">{player1.fitness}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Contract Until:</span>
                    <span className="font-medium">{player1.contract.until}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weekly Salary:</span>
                    <span className="font-medium">€{player1.contract.salary}k</span>
                  </div>
                </div>
                
                <StatsRadar player={player1} color="#1A365D" />
              </CardContent>
            </Card>
            
            {/* Comparison Results */}
            <Card className="bg-gradient-to-b from-teamPrimary to-teamPrimary/80 text-white">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-center mb-6">Comparison Analysis</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-3 text-center pb-4 border-b border-white/20">
                    <div>
                      <p className="text-3xl font-bold">{comparisonResult?.player1Advantages}</p>
                      <p className="text-xs">Advantages</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">VS</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{comparisonResult?.player2Advantages}</p>
                      <p className="text-xs">Advantages</p>
                    </div>
                  </div>
                  
                  <div className="text-center pb-4 border-b border-white/20">
                    <p className="text-sm mb-2">Recommended Player</p>
                    <p className="text-xl font-bold">
                      {comparisonResult?.recommended?.name}
                    </p>
                    <Badge className="bg-teamSecondary mt-2">
                      €{comparisonResult?.recommended?.marketValue}M
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Key Differences</h4>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="bg-white/10 p-2 rounded">
                        <p className="text-xs">Pace</p>
                        <div className="flex justify-center gap-2 mt-1">
                          <span className={player1.stats.pace > player2.stats.pace ? "font-bold" : ""}>
                            {player1.stats.pace}
                          </span>
                          <span>vs</span>
                          <span className={player2.stats.pace > player1.stats.pace ? "font-bold" : ""}>
                            {player2.stats.pace}
                          </span>
                        </div>
                      </div>
                      <div className="bg-white/10 p-2 rounded">
                        <p className="text-xs">Shooting</p>
                        <div className="flex justify-center gap-2 mt-1">
                          <span className={player1.stats.shooting > player2.stats.shooting ? "font-bold" : ""}>
                            {player1.stats.shooting}
                          </span>
                          <span>vs</span>
                          <span className={player2.stats.shooting > player1.stats.shooting ? "font-bold" : ""}>
                            {player2.stats.shooting}
                          </span>
                        </div>
                      </div>
                      <div className="bg-white/10 p-2 rounded">
                        <p className="text-xs">Passing</p>
                        <div className="flex justify-center gap-2 mt-1">
                          <span className={player1.stats.passing > player2.stats.passing ? "font-bold" : ""}>
                            {player1.stats.passing}
                          </span>
                          <span>vs</span>
                          <span className={player2.stats.passing > player1.stats.passing ? "font-bold" : ""}>
                            {player2.stats.passing}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center pt-2">
                    <p className="text-sm font-medium">
                      Market Value Difference
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      €{Math.abs(player1.marketValue - player2.marketValue).toFixed(1)}M
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Player 2 Info */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center border-b pb-3 mb-4">
                  <h3 className="font-bold text-lg">{player2.name}</h3>
                  <p className="text-sm text-muted-foreground">{player2.club}</p>
                  <div className="flex justify-center mt-2">
                    <Badge className="mr-2">{player2.position}</Badge>
                    <Badge variant="outline" className="bg-teamPrimary text-white">
                      €{player2.marketValue}M
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Age:</span>
                    <span className="font-medium">{player2.age} years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Nationality:</span>
                    <span className="font-medium">{player2.nationality}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fitness:</span>
                    <span className="font-medium">{player2.fitness}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Contract Until:</span>
                    <span className="font-medium">{player2.contract.until}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Weekly Salary:</span>
                    <span className="font-medium">€{player2.contract.salary}k</span>
                  </div>
                </div>
                
                <StatsRadar player={player2} color="#38B2AC" />
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-4">Scout Report</h3>
              
              <div className="prose max-w-none">
                <p>Based on our detailed comparison between <strong>{player1.name}</strong> and <strong>{player2.name}</strong>, we recommend {comparisonResult?.recommended?.name} as the better recruitment option at this time.</p>
                
                <p className="mt-4">{comparisonResult?.recommended?.name} shows superior performance in {comparisonResult?.recommended === player1 ? comparisonResult.player1Advantages : comparisonResult?.player2Advantages} key performance metrics, with notable advantages in {comparisonResult?.recommended === player1 ? 
                  `${player1.stats.pace > player2.stats.pace ? 'pace' : ''}${player1.stats.shooting > player2.stats.shooting ? ', shooting' : ''}${player1.stats.passing > player2.stats.passing ? ', passing' : ''}` 
                  : 
                  `${player2.stats.pace > player1.stats.pace ? 'pace' : ''}${player2.stats.shooting > player1.stats.shooting ? ', shooting' : ''}${player2.stats.passing > player1.stats.passing ? ', passing' : ''}`
                }.</p>
                
                <p className="mt-4">Their market value of €{comparisonResult?.recommended?.marketValue}M represents {
                  comparisonResult?.recommended?.marketValue < (comparisonResult?.recommended === player1 ? player2.marketValue : player1.marketValue) ? 'better value for money' : 'a premium price reflecting their quality'
                }.</p>
                
                <p className="mt-4">Recent form indicates a {
                  comparisonResult?.recommended?.form[comparisonResult.recommended.form.length - 1] > 
                  comparisonResult?.recommended?.form[comparisonResult.recommended.form.length - 2] ? 
                  'positive trend' : 'consistent performance'
                } with a rating of {comparisonResult?.recommended?.recentPerformance.rating.toFixed(1)} over the last 5 matches.</p>
              </div>
            </CardContent>
          </Card>
        </>
      )}
      
      {(!player1 || !player2) && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-medium text-muted-foreground">
              Please select two players to compare
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The comparison tool will provide a detailed analysis once you've selected two players
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PlayerComparison;
