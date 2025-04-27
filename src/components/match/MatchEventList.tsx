
import { MatchEvent } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { 
  Award, 
  Target, 
  Shield, 
  FileWarning, 
  AlertTriangle, 
  UserX, 
  ArrowRightLeft, 
  Activity,
  CircleDot // Using CircleDot as a replacement for soccer/football
} from "lucide-react";

interface MatchEventListProps {
  events: MatchEvent[];
  playerId?: number;
}

const MatchEventList = ({ events, playerId }: MatchEventListProps) => {
  // Filter events if playerId is provided
  const filteredEvents = playerId 
    ? events.filter(event => event.player === playerId) 
    : events;
  
  // Sort events by minute (most recent first)
  const sortedEvents = [...filteredEvents].sort((a, b) => b.minute - a.minute);

  // Get icon for event type
  const getEventIcon = (type: MatchEvent['type']) => {
    switch(type) {
      case 'goal': return CircleDot; // Using CircleDot instead of Soccer
      case 'assist': return Award;
      case 'shot': return Target;
      case 'save': return Shield;
      case 'tackle': return Shield;
      case 'foul': return FileWarning;
      case 'yellow': return AlertTriangle;
      case 'red': return UserX;
      case 'substitution': return ArrowRightLeft;
      case 'injury': return Activity;
      default: return CircleDot; // Using CircleDot instead of Soccer
    }
  };
  
  // Get color class based on impact
  const getImpactClass = (impact: MatchEvent['impact']) => {
    switch(impact) {
      case 'positive': return 'text-highValue border-highValue bg-highValue/10';
      case 'negative': return 'text-lowValue border-lowValue bg-lowValue/10';
      case 'neutral': return 'text-neutral border-neutral bg-neutral/10';
      default: return '';
    }
  };

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
      {sortedEvents.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No match events to display
        </div>
      ) : (
        sortedEvents.map((event) => {
          const EventIcon = getEventIcon(event.type);
          return (
            <div 
              key={event.id}
              className={cn(
                "flex items-start p-3 border rounded-lg animate-slide-in",
                getImpactClass(event.impact)
              )}
            >
              <div className="mr-3 mt-1">
                <EventIcon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium capitalize">{event.type}</span>
                  <span className="text-sm bg-background/50 px-2 rounded-full">
                    {event.minute}'
                  </span>
                </div>
                <p className="text-sm mt-1">{event.description}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MatchEventList;
