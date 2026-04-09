import { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, CalendarDays, BarChart3, BookOpen, User, LogOut } from 'lucide-react';

import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: '首页', path: '/dashboard' },
  { icon: CalendarDays, label: '预约', path: '/appointment' },
  { icon: BarChart3, label: '成绩', path: '/scores' },
  { icon: BookOpen, label: '指南', path: '/guide' },
  { icon: User, label: '我的', path: '/profile' },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isGuest } = useAuth();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 bg-white" style={{ zIndex: -1 }} />

      {/* Top bar */}
      {/* <header className="glass-strong sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
        <h1 className="text-sm font-bold text-gradient-primary">SHOU 体测平台</h1>
        <div className="flex items-center gap-3">
          {isGuest && <span className="text-xs text-muted-foreground">游客模式</span>}
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header> */}
    {/* Top bar */}
      <header className="glass-strong sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
        {/* 左侧：校徽 + 标题 */}
        <div className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="logo" 
            className="h-7 w-auto object-contain" 
          />
          <h1 className="text-sm font-bold text-gradient-primary">SHOU 体测平台</h1>
        </div>
        {/* 右侧：状态 + 退出按钮 */}
        <div className="flex items-center gap-3">
          {isGuest && <span className="text-xs text-muted-foreground">游客模式</span>}
          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive transition-colors flex items-center"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>
    

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24">
        {children}
      </main>

      {/* Bottom nav */}
      <nav className="glass-strong fixed bottom-0 left-0 right-0 z-40 flex justify-around py-2 px-2 safe-area-bottom">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 100, damping: 14 }}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg min-w-[48px] min-h-[48px] justify-center transition-colors ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
