
import { Player } from "@/data/mockData";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

interface StatsRadarProps {
  player: Player;
  color?: string;
}

const StatsRadar = ({ player, color = "#38B2AC" }: StatsRadarProps) => {
  // Format data for recharts
  const data = [
    { attribute: "Pace", value: player.stats.pace },
    { attribute: "Shooting", value: player.stats.shooting },
    { attribute: "Passing", value: player.stats.passing },
    { attribute: "Dribbling", value: player.stats.dribbling },
    { attribute: "Defending", value: player.stats.defending },
    { attribute: "Physical", value: player.stats.physical }
  ];

  return (
    <div className="w-full h-64">
      <h4 className="font-medium mb-2 text-center">Attribute Radar</h4>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="attribute" 
            tick={{ fontSize: 12, fill: "#525252" }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false}
            axisLine={false}
          />
          <Radar 
            name={player.name} 
            dataKey="value" 
            stroke={color} 
            fill={color} 
            fillOpacity={0.6}
            isAnimationActive={true}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsRadar;
