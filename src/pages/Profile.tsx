import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/AppLayout';
import GlassCard from '@/components/GlassCard';
import ScrollReveal from '@/components/ScrollReveal';
import { faqList } from '@/data/mockData';
import { User, Phone, Mail, HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile() {
  const { user } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!user) return null;

  return (
    <AppLayout>
      <div className="space-y-6">
        <ScrollReveal>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            个人中心
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <GlassCard strong>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.college} · {user.grade}</p>
                <p className="text-xs text-muted-foreground">学号：{user.studentId}</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <GlassCard>
            <h3 className="font-semibold text-foreground mb-3">个人信息</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">性别：</span>{user.gender}</div>
              <div><span className="text-muted-foreground">入学年份：</span>{user.year}</div>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">手机：</span>{user.phone}
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">我的消息</h3>
            </div>
            <div className="space-y-2">
              <div className="glass rounded-lg p-3 text-sm">
                <p className="font-medium text-foreground">预约提醒</p>
                <p className="text-xs text-muted-foreground mt-1">您已预约4月11日08:00-10:00体测，请准时参加</p>
              </div>
              <div className="glass rounded-lg p-3 text-sm">
                <p className="font-medium text-foreground">成绩更新</p>
                <p className="text-xs text-muted-foreground mt-1">2025-2026学年第二学期体测成绩已发布</p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">常见问题</h3>
          </div>
          {faqList.map((faq, i) => (
            <GlassCard
              key={i}
              className="mb-3 cursor-pointer"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              animate={false}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{faq.q}</p>
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 14 }}
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </div>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 14 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-muted-foreground mt-3">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <GlassCard>
            <h3 className="font-semibold text-foreground mb-2">联系我们</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>🏢 体育部办公室：行政楼B区208室</p>
              <p>📞 咨询电话：021-61900XXX</p>
              <p>📧 邮箱：tiyu@shou.edu.cn</p>
              <p>🕐 工作时间：周一至周五 8:30-16:30</p>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </AppLayout>
  );
}
