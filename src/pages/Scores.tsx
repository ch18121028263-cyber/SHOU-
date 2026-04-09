import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/AppLayout';
import GlassCard from '@/components/GlassCard';
import ScrollReveal from '@/components/ScrollReveal';
import { mockScores, getGrade } from '@/data/mockData';
import { BarChart3, TrendingUp, Award, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Scores() {
  const { user } = useAuth();
  const records = user ? mockScores[user.studentId] || [] : [];
  const latest = records[0];

  const chartData = [...records].reverse().map((r) => ({
    semester: r.semester.replace(/学年/, '\n'),
    score: r.finalScore,
  }));

  return (
    <AppLayout>
      <div className="space-y-6">
        <ScrollReveal>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            体测成绩
          </h2>
        </ScrollReveal>

        {!latest ? (
          <GlassCard>
            <p className="text-center text-muted-foreground">暂无成绩记录</p>
          </GlassCard>
        ) : (
          <>
            <ScrollReveal delay={0.1}>
              <GlassCard strong className="text-center">
                <p className="text-sm text-muted-foreground">{latest.semester}</p>
                <div className="mt-2">
                  <span className="text-5xl font-bold text-gradient-primary">{latest.finalScore}</span>
                  <span className="text-lg text-muted-foreground ml-1">分</span>
                </div>
                <div className="mt-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                    latest.grade === '优秀' ? 'bg-success/20 text-success' :
                    latest.grade === '良好' ? 'bg-primary/20 text-primary' :
                    latest.grade === '及格' ? 'bg-warning/20 text-warning' :
                    'bg-destructive/20 text-destructive'
                  }`}>
                    <Award className="h-4 w-4" />
                    {latest.grade}
                  </span>
                </div>
              </GlassCard>
            </ScrollReveal>

            {latest.bonusApplied && (
              <ScrollReveal delay={0.15}>
                <GlassCard className="border-l-4 border-l-success">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-success text-sm">等级升级加分 +5</p>
                      <p className="text-xs text-muted-foreground mt-1">{latest.bonusReason}</p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            )}

            <ScrollReveal delay={0.2}>
              <h3 className="text-lg font-semibold text-foreground">单项成绩</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                {latest.items.map((item) => {
                  const g = getGrade(item.result);
                  return (
                    <GlassCard key={item.name} className="flex items-center justify-between py-4">
                      <div>
                        <p className="font-medium text-foreground text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.score} {item.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{item.result}分</p>
                        <p className={`text-xs ${g.color}`}>{g.grade}</p>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </ScrollReveal>

            {records.some((r) => r.items.some((i) => i.result < 60)) && (
              <ScrollReveal delay={0.25}>
                <GlassCard className="border-l-4 border-l-warning">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-warning text-sm">成绩预警</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        部分项目成绩偏低，建议参考体测指南加强针对性训练。
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            )}

            {chartData.length > 1 && (
              <ScrollReveal delay={0.3}>
                <GlassCard>
                  <h3 className="font-semibold text-foreground mb-4">历次成绩趋势</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="semester" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                      <Tooltip
                        contentStyle={{
                          background: 'hsla(0,0%,100%,0.8)',
                          backdropFilter: 'blur(8px)',
                          border: '1px solid hsla(0,0%,100%,0.3)',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </GlassCard>
              </ScrollReveal>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
