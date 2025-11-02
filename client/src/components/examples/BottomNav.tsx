import { useState } from 'react';
import BottomNav from '../BottomNav';

export default function BottomNavExample() {
  const [page, setPage] = useState<"home" | "history" | "settings">("home");
  
  return <BottomNav currentPage={page} onNavigate={setPage} />;
}
