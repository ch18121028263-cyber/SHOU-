import AppLayout from '@/components/AppLayout';
import  GlassCard  from '@/components/GlassCard';
import { BookOpen } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// 这里定义所有的体测项目数据
const guideData = [
  {
    id: "height-weight",
    title: "身高体重",
    rule: "脱鞋站立，自然站姿测量身高体重",
    tip: "着轻便服装，测前不要大量进食",
    standard: "根据BMI指数评分，18.5-23.9为正常范围"
  },
  {
    id: "lung-capacity",
    title: "肺活量",
    rule: "深呼吸后对准肺活量计吹嘴，尽力呼出全部气体",
    tip: "测前做2-3次深呼吸，测试时不要漏气",
    standard: "男生≥4800ml满分，女生≥3400ml满分"
  },
  {
    id: "50m-run",
    title: "50米跑",
    rule: "站立式起跑，听到发令枪后全力冲刺",
    tip: "做好热身运动，穿运动鞋，避免肌肉拉伤",
    standard: "男生≤6.7秒满分，女生≤7.5秒满分"
  },
  {
    id: "long-jump",
    title: "立定跳远",
    rule: "双脚同时起跳，不得助跑，取最好成绩",
    tip: "起跳前摆臂蓄力，落地时身体前倾",
    standard: "男生≥273cm满分，女生≥207cm满分"
  },
  {
    id: "sit-and-reach",
    title: "坐位体前屈",
    rule: "坐在垫上双腿伸直，上体前屈推动游标",
    tip: "测前做拉伸运动，动作缓慢匀速",
    standard: "男生≥24.9cm满分，女生≥25.8cm满分"
  },
  {
    id: "pull-ups",
    title: "引体向上（男）",
    rule: "正手握杠，身体悬垂后上拉至下颚过杠",
    tip: "平时加强臂力训练，动作规范不借力",
    standard: "≥19个满分"
  },
  {
    id: "1000m-run",
    title: "1000米跑（男）",
    rule: "站立式起跑，沿跑道完成1000米",
    tip: "合理分配体力，前半程匀速后半程加速",
    standard: "≤3'17\"满分"
  },
  {
    id: "sit-ups",
    title: "1分钟仰卧起坐（女）",
    rule: "仰卧垫上，双手抱头，1分钟内完成次数",
    tip: "利用腹部力量，保持节奏均匀",
    standard: "≥56个满分"
  },
  {
    id: "800m-run",
    title: "800米跑（女）",
    rule: "站立式起跑，沿跑道完成800米",
    tip: "合理分配体力，保持匀速跑",
    standard: "≤3'18\"满分"
  }
];

export default function Guide() {
  return (
    <AppLayout>
      <div className="space-y-6 pb-10">
        <ScrollReveal>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">体测指南</h2>
            </div>
            <p className="text-sm text-muted-foreground ml-8">
              了解各项目规则、标准动作与评分细则
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {/* type="single" 确保一次只能开一个，collapsible 允许点击已开启的项来关闭它 */}
          <Accordion type="single" collapsible className="space-y-4">
            {guideData.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id} 
                className="border-none" // 去掉默认的下划线
              >
                <GlassCard className="p-0 overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline font-semibold text-lg">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2 border-t border-white/10">
                    <div className="space-y-4 text-[15px]">
                      <div className="flex gap-2">
                        <span className="text-blue-500 font-bold shrink-0">规则：</span>
                        <span className="text-muted-foreground">{item.rule}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-green-500 font-bold shrink-0">技巧：</span>
                        <span className="text-muted-foreground">{item.tip}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-amber-500 font-bold shrink-0">满分标准：</span>
                        <span className="text-muted-foreground">{item.standard}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </GlassCard>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </AppLayout>
  );
}