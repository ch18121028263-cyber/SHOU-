import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import GlassCard from '@/components/GlassCard';
import ScrollReveal from '@/components/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { FileText, Upload, ChevronDown } from 'lucide-react';

export default function DeferExempt() {
  const [type, setType] = useState<'defer' | 'exempt'>('defer');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) { toast.error('请填写申请原因'); return; }
    setSubmitted(true);
    toast.success('申请已提交，请等待审核');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <ScrollReveal>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            缓测/免测申请
          </h2>
        </ScrollReveal>

        {submitted ? (
          <ScrollReveal delay={0.1}>
            <GlassCard strong className="text-center py-10">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-semibold text-foreground">申请已提交</p>
              <p className="text-sm text-muted-foreground mt-2">审核结果将通过站内信通知，请耐心等待</p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSubmitted(false); setReason(''); }}
                className="glass rounded-lg px-6 py-2 mt-4 text-sm font-medium text-foreground"
              >
                返回
              </motion.button>
            </GlassCard>
          </ScrollReveal>
        ) : (
          <ScrollReveal delay={0.1}>
            <GlassCard strong>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">申请类型</label>
                  <div className="flex gap-3 mt-2">
                    {[
                      { value: 'defer' as const, label: '缓测' },
                      { value: 'exempt' as const, label: '免测' },
                    ].map((opt) => (
                      <motion.button
                        key={opt.value}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setType(opt.value)}
                        className={`glass rounded-lg px-6 py-2 text-sm font-medium transition-all ${
                          type === opt.value ? 'ring-2 ring-primary bg-primary/10 text-primary' : 'text-foreground'
                        }`}
                      >
                        {opt.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">申请原因</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="请详细描述申请原因..."
                    className="glass-input w-full rounded-lg p-3 mt-2 min-h-[120px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">上传证明材料</label>
                  <div className="glass rounded-lg p-6 mt-2 text-center cursor-pointer hover:brightness-110 transition-all">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">点击或拖拽上传医院证明</p>
                    <p className="text-xs text-muted-foreground mt-1">支持 JPG、PNG、PDF 格式</p>
                  </div>
                </div>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-semibold shadow-lg shadow-primary/25"
                >
                  提交申请
                </motion.button>
              </form>
            </GlassCard>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.2}>
          <GlassCard>
            <h3 className="font-semibold text-foreground mb-2">常见问题</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• 缓测：因临时身体不适申请延期测试，需在下一体测周期补测</p>
              <p>• 免测：因长期伤病无法参加体测，需提供三甲医院诊断证明</p>
              <p>• 审核周期一般为3-5个工作日</p>
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </AppLayout>
  );
}
