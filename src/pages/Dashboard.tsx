import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/GlassCard';
import Countdown from '@/components/Countdown';
import AnnouncementBar from '@/components/AnnouncementBar';
import ScrollReveal from '@/components/ScrollReveal';
import AppLayout from '@/components/AppLayout';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, BarChart3, BookOpen, FileText, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Home3D from '@/components/Home3D';

const quickLinks = [
  { icon: CalendarDays, label: '预约体测', path: '/appointment', color: 'text-primary', desc: '选择时段与项目' },
  { icon: BarChart3, label: '成绩查询', path: '/scores', color: 'text-success', desc: '查看体测成绩' },
  { icon: BookOpen, label: '体测指南', path: '/guide', color: 'text-accent', desc: '项目规则与标准' },
  { icon: FileText, label: '缓测/免测', path: '/defer', color: 'text-warning', desc: '在线申请通道' },
  { icon: User, label: '个人中心', path: '/profile', color: 'text-primary', desc: '信息与消息' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-6">
        <ScrollReveal>
          <AnnouncementBar />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {/* <GlassCard strong>
            <h2 className="text-xl font-bold text-foreground">
              你好，{user?.name} 👋
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {user?.college} · {user?.grade} · 学号 {user?.studentId}
            </p>
          </GlassCard> */}

    <GlassCard strong className="flex flex-row items-center justify-between p-6 overflow-hidden relative">
    {/* 左侧文字：占据大部分空间 */}
    <div className="flex-1 z-10">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        你好，{user?.name} <span className="animate-bounce">👋</span>
      </h2>
      <p className="text-sm text-muted-foreground mt-1">
        {user?.college} · {user?.grade} · 学号 {user?.studentId}
      </p>
    </div>

    {/* 右侧 3D：占据右边的一块区域 */}
    <div className="w-40 h-32 -mr-6 -mb-4 flex items-center justify-center"> 
      <Home3D />
    </div>
  </GlassCard>



        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Countdown />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <h3 className="text-lg font-semibold text-foreground mb-3">快捷入口</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickLinks.map((item, i) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 100, damping: 14 }}
              >
                <GlassCard
                  className="cursor-pointer text-center hover:brightness-110 transition-all"
                  onClick={() => navigate(item.path)}
                  animate={false}
                >
                  <item.icon className={`h-8 w-8 mx-auto mb-2 ${item.color}`} />
                  <div className="font-semibold text-foreground text-sm">{item.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <GlassCard>
            <h3 className="font-semibold text-foreground mb-2">📍 体测地点</h3>
            <p className="text-sm text-muted-foreground">上海海洋大学东操场西看台</p>
            <p className="text-xs text-muted-foreground mt-1">请提前15分钟到场，携带学生证或校园卡签到</p>
          </GlassCard>
        </ScrollReveal>
      </div>
    </AppLayout>
  );
}
