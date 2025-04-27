
import { Player } from "@/data/mockData";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  showDetails?: boolean;
}

const PlayerCard = ({ player, showDetails = false }: PlayerCardProps) => {
  // Calculate average form rating
  const avgForm = player.form.reduce((sum, rating) => sum + rating, 0) / player.form.length;
  
  // Determine form direction
  const formDirection = () => {
    const lastTwoGames = player.form.slice(-2);
    const diff = lastTwoGames[1] - lastTwoGames[0];
    
    if (diff > 0.5) return { icon: TrendingUp, class: "text-highValue" };
    if (diff < -0.5) return { icon: TrendingDown, class: "text-lowValue" };
    return { icon: Minus, class: "text-neutral" };
  };
  
  const { icon: FormIcon, class: formClass } = formDirection();

  return (
    <Card className="player-card overflow-hidden h-full">
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg">{player.name}</h3>
            <Badge variant="outline" className="bg-teamPrimary text-white">
              {player.position}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{player.club}</p>
        </div>
        <Badge className="bg-teamSecondary">
          €{player.marketValue}M
        </Badge>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-2 mt-2">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xl font-semibold">{player.age}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="stat-label">Fitness</span>
              <span className="text-sm font-medium">{player.fitness}%</span>
            </div>
            <Progress value={player.fitness} className="h-2" />
            
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center gap-1">
                <span className="stat-label">Form</span>
                <FormIcon size={14} className={formClass} />
              </div>
              <div className="flex items-center">
                <Star size={16} className="text-highlight fill-highlight" />
                <span className="text-sm font-medium ml-1">{avgForm.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-muted/50 rounded">
              <p className="stat-value">{player.recentPerformance.goals}</p>
              <p className="stat-label">Goals</p>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <p className="stat-value">{player.recentPerformance.assists}</p>
              <p className="stat-label">Assists</p>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <p className="stat-value">{player.recentPerformance.rating.toFixed(1)}</p>
              <p className="stat-label">Rating</p>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <p className="stat-value">{player.stats.pace}</p>
              <p className="stat-label">Pace</p>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <p className="stat-value">{player.stats.shooting}</p>
              <p className="stat-label">Shooting</p>
            </div>
            <div className="text-center p-2 bg-muted/50 rounded">
              <p className="stat-value">{player.stats.passing}</p>
              <p className="stat-label">Passing</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
