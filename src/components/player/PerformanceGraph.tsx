
import { Player } from "@/data/mockData";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface PerformanceGraphProps {
  player: Player;
}

const PerformanceGraph = ({ player }: PerformanceGraphProps) => {
  // Format data for recharts
  const data = player.form.map((rating, index) => ({
    game: `Game ${player.form.length - index}`,
    rating,
  })).reverse();

  return (
    <div className="w-full h-52 mt-4">
      <h4 className="font-medium mb-2">Recent Form</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
          <XAxis dataKey="game" tick={{ fontSize: 12 }} />
          <YAxis domain={[5, 10]} tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value) => [`${value} Rating`, 'Performance']}
            contentStyle={{ 
              backgroundColor: 'rgba(26, 54, 93, 0.8)', 
              borderRadius: '8px',
              border: 'none',
              color: 'white'
            }}
          />
          <Bar 
            dataKey="rating" 
            fill="#38B2AC" 
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceGraph;
