
// Player Positions
export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'ST';

// Player Data Type
export interface Player {
  id: number;
  name: string;
  age: number;
  nationality: string;
  position: Position;
  club: string;
  marketValue: number; // in millions
  photo: string;
  stats: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
    technique: number;
    tactical: number;
    mental: number;
  };
  form: number[]; // Last 5 games performance rating (1-10)
  fitness: number; // 0-100%
  contract: {
    until: string;
    salary: number; // weekly in thousands
  };
  recentPerformance: {
    goals: number;
    assists: number;
    minutesPlayed: number;
    passAccuracy: number;
    distanceCovered: number;
    rating: number;
  };
}

// Match Event Type
export interface MatchEvent {
  id: number;
  minute: number;
  type: 'goal' | 'assist' | 'shot' | 'save' | 'tackle' | 'foul' | 'yellow' | 'red' | 'substitution' | 'injury';
  player: number; // Player ID
  description: string;
  impact: 'positive' | 'neutral' | 'negative';
}

// Match Data Type
export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  score: {
    home: number;
    away: number;
  };
  status: 'upcoming' | 'live' | 'completed';
  events: MatchEvent[];
  stats: {
    possession: {
      home: number;
      away: number;
    };
    shots: {
      home: number;
      away: number;
    };
    shotsOnTarget: {
      home: number;
      away: number;
    };
    corners: {
      home: number;
      away: number;
    };
    fouls: {
      home: number;
      away: number;
    };
  };
}

// Generate Player Data
export const players: Player[] = [
  {
    id: 1,
    name: "Marcus Johnson",
    age: 24,
    nationality: "England",
    position: "ST",
    club: "Arsenal FC",
    marketValue: 35.5,
    photo: "/placeholder.svg",
    stats: {
      pace: 88,
      shooting: 85,
      passing: 78,
      dribbling: 86,
      defending: 45,
      physical: 76,
      technique: 84,
      tactical: 79,
      mental: 82
    },
    form: [8.2, 7.5, 8.8, 7.9, 8.4],
    fitness: 95,
    contract: {
      until: "2026-06-30",
      salary: 120
    },
    recentPerformance: {
      goals: 4,
      assists: 2,
      minutesPlayed: 450,
      passAccuracy: 78,
      distanceCovered: 34.2,
      rating: 8.4
    }
  },
  {
    id: 2,
    name: "Thomas Mueller",
    age: 22,
    nationality: "Germany",
    position: "CAM",
    club: "Bayern Munich",
    marketValue: 28.7,
    photo: "/placeholder.svg",
    stats: {
      pace: 79,
      shooting: 82,
      passing: 89,
      dribbling: 87,
      defending: 52,
      physical: 72,
      technique: 88,
      tactical: 86,
      mental: 84
    },
    form: [7.8, 8.5, 7.6, 9.1, 8.2],
    fitness: 92,
    contract: {
      until: "2025-06-30",
      salary: 95
    },
    recentPerformance: {
      goals: 2,
      assists: 5,
      minutesPlayed: 450,
      passAccuracy: 91,
      distanceCovered: 36.8,
      rating: 8.3
    }
  },
  {
    id: 3,
    name: "Carlos Mendes",
    age: 21,
    nationality: "Portugal",
    position: "LW",
    club: "Sporting CP",
    marketValue: 18.2,
    photo: "/placeholder.svg",
    stats: {
      pace: 92,
      shooting: 79,
      passing: 81,
      dribbling: 90,
      defending: 41,
      physical: 68,
      technique: 86,
      tactical: 75,
      mental: 78
    },
    form: [7.2, 8.1, 7.5, 8.3, 7.9],
    fitness: 88,
    contract: {
      until: "2026-06-30",
      salary: 45
    },
    recentPerformance: {
      goals: 1,
      assists: 3,
      minutesPlayed: 420,
      passAccuracy: 83,
      distanceCovered: 33.6,
      rating: 7.9
    }
  },
  {
    id: 4,
    name: "Jean Dubois",
    age: 28,
    nationality: "France",
    position: "CB",
    club: "Paris Saint-Germain",
    marketValue: 42.0,
    photo: "/placeholder.svg",
    stats: {
      pace: 76,
      shooting: 55,
      passing: 78,
      dribbling: 72,
      defending: 91,
      physical: 89,
      technique: 75,
      tactical: 88,
      mental: 86
    },
    form: [8.5, 8.2, 8.7, 8.3, 8.9],
    fitness: 96,
    contract: {
      until: "2024-06-30",
      salary: 135
    },
    recentPerformance: {
      goals: 0,
      assists: 1,
      minutesPlayed: 450,
      passAccuracy: 92,
      distanceCovered: 31.4,
      rating: 8.7
    }
  },
  {
    id: 5,
    name: "Kevin De Silva",
    age: 25,
    nationality: "Belgium",
    position: "CM",
    club: "Manchester City",
    marketValue: 65.0,
    photo: "/placeholder.svg",
    stats: {
      pace: 75,
      shooting: 86,
      passing: 93,
      dribbling: 88,
      defending: 72,
      physical: 78,
      technique: 91,
      tactical: 90,
      mental: 88
    },
    form: [9.2, 8.7, 8.5, 9.0, 8.8],
    fitness: 94,
    contract: {
      until: "2027-06-30",
      salary: 280
    },
    recentPerformance: {
      goals: 2,
      assists: 6,
      minutesPlayed: 450,
      passAccuracy: 94,
      distanceCovered: 37.2,
      rating: 9.1
    }
  },
  {
    id: 6,
    name: "Alberto Moreno",
    age: 20,
    nationality: "Spain",
    position: "RB",
    club: "FC Barcelona",
    marketValue: 22.5,
    photo: "/placeholder.svg",
    stats: {
      pace: 85,
      shooting: 64,
      passing: 78,
      dribbling: 82,
      defending: 80,
      physical: 76,
      technique: 79,
      tactical: 81,
      mental: 75
    },
    form: [7.4, 7.8, 8.2, 7.5, 7.9],
    fitness: 90,
    contract: {
      until: "2026-06-30",
      salary: 65
    },
    recentPerformance: {
      goals: 0,
      assists: 2,
      minutesPlayed: 430,
      passAccuracy: 85,
      distanceCovered: 38.5,
      rating: 7.8
    }
  },
  {
    id: 7,
    name: "Marco Rossi",
    age: 23,
    nationality: "Italy",
    position: "ST",
    club: "Inter Milan",
    marketValue: 29.8,
    photo: "/placeholder.svg",
    stats: {
      pace: 86,
      shooting: 87,
      passing: 72,
      dribbling: 83,
      defending: 42,
      physical: 80,
      technique: 83,
      tactical: 77,
      mental: 81
    },
    form: [7.8, 8.3, 7.5, 8.2, 8.6],
    fitness: 92,
    contract: {
      until: "2025-06-30",
      salary: 90
    },
    recentPerformance: {
      goals: 3,
      assists: 1,
      minutesPlayed: 440,
      passAccuracy: 75,
      distanceCovered: 32.8,
      rating: 8.1
    }
  },
  {
    id: 8,
    name: "Jamal Wilson",
    age: 19,
    nationality: "USA",
    position: "CM",
    club: "Chelsea FC",
    marketValue: 15.2,
    photo: "/placeholder.svg",
    stats: {
      pace: 82,
      shooting: 74,
      passing: 85,
      dribbling: 84,
      defending: 68,
      physical: 73,
      technique: 82,
      tactical: 76,
      mental: 79
    },
    form: [7.1, 7.5, 7.8, 7.3, 7.6],
    fitness: 89,
    contract: {
      until: "2027-06-30",
      salary: 45
    },
    recentPerformance: {
      goals: 1,
      assists: 2,
      minutesPlayed: 380,
      passAccuracy: 87,
      distanceCovered: 35.4,
      rating: 7.5
    }
  }
];

// Generate Match Data
export const matches: Match[] = [
  {
    id: 1,
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    date: "2025-04-27",
    score: {
      home: 2,
      away: 1
    },
    status: "live",
    events: [
      {
        id: 1,
        minute: 12,
        type: "goal",
        player: 1, // Marcus Johnson
        description: "Great finish from inside the box after a cross from the right wing",
        impact: "positive"
      },
      {
        id: 2,
        minute: 34,
        type: "yellow",
        player: 4, // Jean Dubois
        description: "Tactical foul to stop a counter attack",
        impact: "negative"
      },
      {
        id: 3,
        minute: 41,
        type: "goal",
        player: 7, // Marco Rossi
        description: "Headed goal from a corner",
        impact: "positive"
      },
      {
        id: 4,
        minute: 58,
        type: "assist",
        player: 5, // Kevin De Silva
        description: "Brilliant through ball to set up the goal",
        impact: "positive"
      },
      {
        id: 5,
        minute: 59,
        type: "goal",
        player: 1, // Marcus Johnson
        description: "Clinical finish one-on-one with the goalkeeper",
        impact: "positive"
      },
      {
        id: 6,
        minute: 72,
        type: "substitution",
        player: 8, // Jamal Wilson
        description: "Tactical substitution to strengthen midfield",
        impact: "neutral"
      }
    ],
    stats: {
      possession: {
        home: 54,
        away: 46
      },
      shots: {
        home: 14,
        away: 10
      },
      shotsOnTarget: {
        home: 6,
        away: 3
      },
      corners: {
        home: 6,
        away: 4
      },
      fouls: {
        home: 8,
        away: 12
      }
    }
  },
  {
    id: 2,
    homeTeam: "Arsenal FC",
    awayTeam: "Manchester City",
    date: "2025-04-30",
    score: {
      home: 0,
      away: 0
    },
    status: "upcoming",
    events: [],
    stats: {
      possession: {
        home: 0,
        away: 0
      },
      shots: {
        home: 0,
        away: 0
      },
      shotsOnTarget: {
        home: 0,
        away: 0
      },
      corners: {
        home: 0,
        away: 0
      },
      fouls: {
        home: 0,
        away: 0
      }
    }
  },
  {
    id: 3,
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    date: "2025-04-25",
    score: {
      home: 3,
      away: 2
    },
    status: "completed",
    events: [
      {
        id: 7,
        minute: 8,
        type: "goal",
        player: 2, // Thomas Mueller
        description: "First-time volley from the edge of the box",
        impact: "positive"
      },
      {
        id: 8,
        minute: 23,
        type: "goal",
        player: 3, // Carlos Mendes
        description: "Counter-attack goal after a defensive error",
        impact: "positive"
      },
      {
        id: 9,
        minute: 37,
        type: "assist",
        player: 2, // Thomas Mueller
        description: "Perfect cross for the header",
        impact: "positive"
      },
      {
        id: 10,
        minute: 52,
        type: "goal",
        player: 6, // Alberto Moreno
        description: "Long-range shot into the top corner",
        impact: "positive"
      },
      {
        id: 11,
        minute: 68,
        type: "injury",
        player: 7, // Marco Rossi
        description: "Pulled hamstring, forced to leave the pitch",
        impact: "negative"
      },
      {
        id: 12,
        minute: 75,
        type: "red",
        player: 4, // Jean Dubois
        description: "Second yellow card for a late challenge",
        impact: "negative"
      }
    ],
    stats: {
      possession: {
        home: 58,
        away: 42
      },
      shots: {
        home: 18,
        away: 9
      },
      shotsOnTarget: {
        home: 8,
        away: 4
      },
      corners: {
        home: 7,
        away: 3
      },
      fouls: {
        home: 10,
        away: 14
      }
    }
  }
];
