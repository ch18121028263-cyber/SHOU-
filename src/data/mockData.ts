// 学院代码映射
export const collegeCodeMap: Record<string, string> = {
  '01': '水产与生命学院',
  '02': '海洋科学学院',
  '03': '食品学院',
  '04': '经济管理学院',
  '05': '信息学院',
  '06': '海洋生态与环境学院',
  '07': '外国语学院',
  '08': '海洋文化与法律学院',
  '09': '工程学院',
  '10': '爱恩学院',
  '11': '海洋智能装备学院',
  '12': '马克思主义学院',
};

export function parseStudentId(studentId: string) {
  if (studentId.length < 8) return null;
  const year = studentId.substring(0, 4);
  const collegeCode = studentId.substring(4, 6);
  const college = collegeCodeMap[collegeCode] || '未知学院';
  const currentYear = new Date().getFullYear();
  const gradeNum = currentYear - parseInt(year) + 1;
  const grade = gradeNum <= 4 ? `大${['一', '二', '三', '四'][gradeNum - 1]}` : `第${gradeNum}年`;
  return { year, college, grade, collegeCode };
}

// 模拟用户数据
export const mockUsers: Record<string, { password: string; name: string; gender: '男' | '女'; phone: string }> = {
  '20230101001': { password: '123456', name: '张明', gender: '男', phone: '138****1234' },
  '20230501002': { password: '123456', name: '李婷', gender: '女', phone: '139****5678' },
  '20220301003': { password: '123456', name: '王强', gender: '男', phone: '137****9012' },
};

// 体测项目
export const testItems = {
  common: ['身高体重', '肺活量', '50米跑', '立定跳远', '坐位体前屈'],
  male: ['引体向上', '1000米跑'],
  female: ['1分钟仰卧起坐', '800米跑'],
};

// 可预约时段（体测周期内每周六日）
export interface TimeSlot {
  id: string;
  date: string;
  day: string;
  startTime: string;
  endTime: string;
  capacity: number;
  remaining: number;
}

export function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const dates = [
    { date: '2026-04-11', day: '周六' },
    { date: '2026-04-12', day: '周日' },
    { date: '2026-04-18', day: '周六' },
    { date: '2026-04-19', day: '周日' },
    { date: '2026-04-25', day: '周六' },
    { date: '2026-04-26', day: '周日' },
  ];
  const times = [
    { start: '08:00', end: '10:00' },
    { start: '10:00', end: '12:00' },
    { start: '12:00', end: '14:00' },
    { start: '14:00', end: '16:00' },
  ];
  dates.forEach((d) => {
    times.forEach((t, ti) => {
      slots.push({
        id: `${d.date}-${ti}`,
        date: d.date,
        day: d.day,
        startTime: t.start,
        endTime: t.end,
        capacity: 50,
        remaining: 50,
      });
    });
  });
  return slots;
}

// 模拟成绩数据
export interface ScoreRecord {
  semester: string;
  totalScore: number;
  finalScore: number;
  grade: string;
  bonusApplied: boolean;
  bonusReason?: string;
  items: { name: string; score: number; unit: string; result: number }[];
}

export const mockScores: Record<string, ScoreRecord[]> = {
  '20230101001': [
    {
      semester: '2025-2026学年第二学期',
      totalScore: 87,
      finalScore: 92,
      grade: '优秀',
      bonusApplied: true,
      bonusReason: '本次原始成绩87分（良好），较上次78分（及格）提升9分，满足等级升级加分规则，加5分，最终成绩92分（优秀）',
      items: [
        { name: '身高体重', score: 19.5, unit: 'BMI', result: 90 },
        { name: '肺活量', score: 4200, unit: 'ml', result: 85 },
        { name: '50米跑', score: 7.1, unit: '秒', result: 88 },
        { name: '立定跳远', score: 2.45, unit: '米', result: 90 },
        { name: '坐位体前屈', score: 15.2, unit: '厘米', result: 82 },
        { name: '引体向上', score: 12, unit: '个', result: 85 },
        { name: '1000米跑', score: 225, unit: '秒', result: 90 },
      ],
    },
    {
      semester: '2024-2025学年第二学期',
      totalScore: 78,
      finalScore: 78,
      grade: '及格',
      bonusApplied: false,
      items: [
        { name: '身高体重', score: 20.1, unit: 'BMI', result: 85 },
        { name: '肺活量', score: 3800, unit: 'ml', result: 75 },
        { name: '50米跑', score: 7.5, unit: '秒', result: 78 },
        { name: '立定跳远', score: 2.30, unit: '米', result: 80 },
        { name: '坐位体前屈', score: 12.0, unit: '厘米', result: 72 },
        { name: '引体向上', score: 8, unit: '个', result: 70 },
        { name: '1000米跑', score: 248, unit: '秒', result: 75 },
      ],
    },
  ],
};

export function getGrade(score: number): { grade: string; color: string } {
  if (score >= 90) return { grade: '优秀', color: 'text-success' };
  if (score >= 80) return { grade: '良好', color: 'text-primary' };
  if (score >= 60) return { grade: '及格', color: 'text-warning' };
  return { grade: '不及格', color: 'text-destructive' };
}

export function calculateBonus(current: number, previous: number | null): { finalScore: number; applied: boolean; reason: string } {
  if (previous === null) return { finalScore: current, applied: false, reason: '' };
  const currentGrade = getGrade(current).grade;
  const previousGrade = getGrade(previous).grade;
  const upgraded = current > previous && currentGrade !== previousGrade;
  if (upgraded) {
    const final = Math.min(current + 5, 100);
    return {
      finalScore: final,
      applied: true,
      reason: `本次原始成绩${current}分（${currentGrade}），较上次${previous}分（${previousGrade}）提升${current - previous}分，满足等级升级加分规则，加5分，最终成绩${final}分（${getGrade(final).grade}）`,
    };
  }
  return { finalScore: current, applied: false, reason: '' };
}

// 公告
export const announcements = [
  '📢 2026年春季体测将于4月11日-4月26日进行，请同学们及时预约！',
  '🏃 体测地点：上海海洋大学东操场西看台，请提前15分钟到场签到',
  '⚠️ 如有身体不适请及时申请缓测/免测，携带医院证明',
  '🎯 本学期体测成绩占体育课成绩30%，请同学们认真对待',
];

// 体测指南
export const testGuides = [
  {
    name: '身高体重',
    rules: '脱鞋站立，自然站姿测量身高体重',
    tips: '着轻便服装，测前不要大量进食',
    standard: '根据BMI指数评分，18.5-23.9为正常范围',
  },
  {
    name: '肺活量',
    rules: '深吸气后对准肺活量计吹嘴，尽力呼出全部气体',
    tips: '测前做2-3次深呼吸，测试时不要漏气',
    standard: '男生≥4800ml满分，女生≥3400ml满分',
  },
  {
    name: '50米跑',
    rules: '站立式起跑，听到发令枪后全力冲刺',
    tips: '做好热身运动，穿运动鞋，避免肌肉拉伤',
    standard: '男生≤6.7秒满分，女生≤7.5秒满分',
  },
  {
    name: '立定跳远',
    rules: '双脚同时起跳，不得助跑，取最好成绩',
    tips: '起跳前摆臂蓄力，落地时身体前倾',
    standard: '男生≥273cm满分，女生≥207cm满分',
  },
  {
    name: '坐位体前屈',
    rules: '坐在垫上双腿伸直，上体前屈推动游标',
    tips: '测前做拉伸运动，动作缓慢匀速',
    standard: '男生≥24.9cm满分，女生≥25.8cm满分',
  },
  {
    name: '引体向上（男）',
    rules: '正手握杠，身体悬垂后上拉至下颏过杠',
    tips: '平时加强臂力训练，动作规范不借力',
    standard: '≥19个满分',
  },
  {
    name: '1000米跑（男）',
    rules: '站立式起跑，沿跑道完成1000米',
    tips: '合理分配体力，前半程匀速后半程加速',
    standard: '≤3\'17"满分',
  },
  {
    name: '1分钟仰卧起坐（女）',
    rules: '仰卧垫上，双手抱头，1分钟内完成次数',
    tips: '利用腹部力量，保持节奏均匀',
    standard: '≥56个满分',
  },
  {
    name: '800米跑（女）',
    rules: '站立式起跑，沿跑道完成800米',
    tips: '合理分配体力，保持匀速跑',
    standard: '≤3\'18"满分',
  },
];

// FAQ
export const faqList = [
  { q: '体测可以不参加吗？', a: '体测为必测项目，如有特殊情况可申请缓测或免测。未参加体测的同学成绩记为0分，将影响毕业资格。' },
  { q: '如何申请缓测/免测？', a: '在系统中提交缓测/免测申请，上传医院证明等材料，等待体育部审核。' },
  { q: '体测成绩什么时候出？', a: '体测结束后一般2-3周内公布成绩，届时可在系统中查看。' },
  { q: '一个时段可以测多少项目？', a: '预约时可选择多个项目，但同一时段不能重复预约。建议合理安排时间。' },
  { q: '如何取消已预约的时段？', a: '在"我的预约"中找到对应预约记录，测试开始前24小时可取消。' },
  { q: '体测加分规则是什么？', a: '本次体测成绩较上次提升且实现等级升级时，最终成绩加5分（上限100分）。' },
];

// 体测倒计时目标日期
export const testDeadline = '2026-04-26T16:00:00';
