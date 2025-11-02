import { Home, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavPage = "home" | "history" | "settings";

interface BottomNavProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
}

export default function BottomNav({ currentPage, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: "home" as NavPage, icon: Home, label: "Главная" },
    { id: "history" as NavPage, icon: BarChart3, label: "История" },
    { id: "settings" as NavPage, icon: Settings, label: "Настройки" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50" data-testid="bottom-nav">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className="flex flex-col h-16 gap-1"
              onClick={() => onNavigate(item.id)}
              data-testid={`nav-${item.id}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
              <span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
