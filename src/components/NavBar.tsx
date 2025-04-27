
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { User, Users, BarChart3, Activity } from "lucide-react";

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: "Players", 
      path: "/", 
      icon: User 
    },
    { 
      name: "Comparison", 
      path: "/comparison", 
      icon: BarChart3 
    },
    { 
      name: "Match Tracker", 
      path: "/match-tracker", 
      icon: Activity 
    },
    { 
      name: "Squad", 
      path: "/squad", 
      icon: Users 
    }
  ];

  return (
    <nav className="bg-teamPrimary text-white p-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teamSecondary rounded-full flex items-center justify-center">
            <span className="font-bold">SC</span>
          </div>
          <h1 className="text-xl font-bold">Scout Savvy</h1>
        </div>
        
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                location.pathname === item.path 
                  ? "bg-teamSecondary text-white font-medium" 
                  : "hover:bg-teamPrimary/80"
              )}
            >
              <item.icon size={18} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
        <div className="md:hidden flex gap-4">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center",
                location.pathname === item.path 
                  ? "text-teamSecondary" 
                  : "text-white/80"
              )}
            >
              <item.icon size={20} />
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
