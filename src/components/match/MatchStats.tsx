
import { Match } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";

interface MatchStatsProps {
  match: Match;
}

const MatchStats = ({ match }: MatchStatsProps) => {
  // Get possession value for progress bar (home team)
  const possessionValue = match.stats.possession.home;
  
  // Calculate shot accuracy
  const homeShotAccuracy = match.stats.shots.home > 0 
    ? (match.stats.shotsOnTarget.home / match.stats.shots.home) * 100 
    : 0;
  
  const awayShotAccuracy = match.stats.shots.away > 0 
    ? (match.stats.shotsOnTarget.away / match.stats.shots.away) * 100 
    : 0;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Match Stats</h3>
      
      {/* Possession */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm">{match.stats.possession.home}%</span>
          <span className="text-sm font-medium">Possession</span>
          <span className="text-sm">{match.stats.possession.away}%</span>
        </div>
        <Progress value={possessionValue} className="h-2" />
      </div>
      
      {/* Shots */}
      <div className="grid grid-cols-3 gap-2 items-center">
        <div className="text-center">
          <p className="stat-value">{match.stats.shots.home}</p>
          <p className="stat-label">Shots</p>
        </div>
        <div className="text-center border-x px-4">
          <p className="stat-value">{match.stats.shotsOnTarget.home} - {match.stats.shotsOnTarget.away}</p>
          <p className="stat-label">On Target</p>
        </div>
        <div className="text-center">
          <p className="stat-value">{match.stats.shots.away}</p>
          <p className="stat-label">Shots</p>
        </div>
      </div>
      
      {/* Shot Accuracy */}
      <div className="grid grid-cols-3 gap-2 items-center">
        <div className="text-center">
          <p className="stat-value">{homeShotAccuracy.toFixed(0)}%</p>
          <p className="stat-label">Accuracy</p>
        </div>
        <div className="text-center border-x px-4">
          <p className="stat-value">{match.stats.corners.home} - {match.stats.corners.away}</p>
          <p className="stat-label">Corners</p>
        </div>
        <div className="text-center">
          <p className="stat-value">{awayShotAccuracy.toFixed(0)}%</p>
          <p className="stat-label">Accuracy</p>
        </div>
      </div>
      
      {/* Fouls */}
      <div className="grid grid-cols-3 gap-2 items-center">
        <div className="text-center">
          <p className="stat-value">{match.stats.fouls.home}</p>
          <p className="stat-label">Fouls</p>
        </div>
        <div className="text-center border-x px-4">
          <p className="stat-value">
            {match.score.home} - {match.score.away}
          </p>
          <p className="stat-label">Score</p>
        </div>
        <div className="text-center">
          <p className="stat-value">{match.stats.fouls.away}</p>
          <p className="stat-label">Fouls</p>
        </div>
      </div>
    </div>
  );
};

export default MatchStats;
