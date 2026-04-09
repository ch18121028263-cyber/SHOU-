import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AppLayout from '@/components/AppLayout';
import GlassCard from '@/components/GlassCard';
import ScrollReveal from '@/components/ScrollReveal';
import { generateTimeSlots, testItems, type TimeSlot } from '@/data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, MapPin, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Appointment {
  id: string;
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
  items: string[];
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export default function Appointment() {
  const { user } = useAuth();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [step, setStep] = useState<'date' | 'slot' | 'items' | 'confirm' | 'list'>('date');

  useEffect(() => {
    const saved = localStorage.getItem('shou_slots');
    if (saved) setSlots(JSON.parse(saved));
    else {
      const s = generateTimeSlots();
      setSlots(s);
      localStorage.setItem('shou_slots', JSON.stringify(s));
    }
    const savedAppt = localStorage.getItem('shou_appointments');
    if (savedAppt) setAppointments(JSON.parse(savedAppt));
  }, []);

  const saveSlots = useCallback((s: TimeSlot[]) => {
    setSlots(s);
    localStorage.setItem('shou_slots', JSON.stringify(s));
  }, []);

  const saveAppointments = useCallback((a: Appointment[]) => {
    setAppointments(a);
    localStorage.setItem('shou_appointments', JSON.stringify(a));
  }, []);

  const dates = [...new Set(slots.map((s) => s.date))];
  const filteredSlots = slots.filter((s) => s.date === selectedDate);
  const gender = user?.gender || '男';
  const availableItems = [...testItems.common, ...(gender === '男' ? testItems.male : testItems.female)];
  const myAppointments = appointments.filter((a) => a.status !== 'cancelled');

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleConfirm = () => {
    if (!selectedSlot || selectedItems.length === 0) return;

    const conflict = appointments.find(
      (a) => a.slotId === selectedSlot && a.status === 'pending'
    );
    if (conflict) {
      toast.error('你已预约该时段，不可重复预约');
      return;
    }

    const slot = slots.find((s) => s.id === selectedSlot)!;
    if (slot.remaining <= 0) {
      toast.error('该时段名额已满');
      return;
    }

    const newSlots = slots.map((s) =>
      s.id === selectedSlot ? { ...s, remaining: s.remaining - 1 } : s
    );
    saveSlots(newSlots);

    const newAppt: Appointment = {
      id: Date.now().toString(),
      slotId: selectedSlot,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      items: selectedItems,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    saveAppointments([...appointments, newAppt]);

    toast.success('预约成功！');
    setSelectedSlot(null);
    setSelectedItems([]);
    setStep('list');
  };

  const handleCancel = (apptId: string) => {
    const appt = appointments.find((a) => a.id === apptId);
    if (!appt) return;

    const slotTime = new Date(`${appt.date}T${appt.startTime}`);
    if (slotTime.getTime() - Date.now() < 24 * 3600000) {
      toast.error('距测试开始不足24小时，无法取消');
      return;
    }

    const newSlots = slots.map((s) =>
      s.id === appt.slotId ? { ...s, remaining: s.remaining + 1 } : s
    );
    saveSlots(newSlots);

    const newAppts = appointments.map((a) =>
      a.id === apptId ? { ...a, status: 'cancelled' as const } : a
    );
    saveAppointments(newAppts);
    toast.success('已取消预约');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <ScrollReveal>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-primary" />
              体测预约
            </h2>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(step === 'list' ? 'date' : 'list')}
              className="glass rounded-lg px-4 py-2 text-sm font-medium text-foreground"
            >
              {step === 'list' ? '新预约' : '我的预约'}
            </motion.button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <GlassCard animate={false}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <MapPin className="h-4 w-4" />
              <span>上海海洋大学东操场西看台</span>
            </div>
          </GlassCard>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {step === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 14 }}
              className="space-y-4"
            >
              {myAppointments.length === 0 ? (
                <GlassCard>
                  <p className="text-center text-muted-foreground">暂无预约记录</p>
                </GlassCard>
              ) : (
                myAppointments.map((appt) => (
                  <GlassCard key={appt.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">{appt.date} {appt.startTime}-{appt.endTime}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          项目：{appt.items.join('、')}
                        </p>
                        <span className={`text-xs mt-2 inline-block px-2 py-0.5 rounded-full ${
                          appt.status === 'pending' ? 'bg-primary/20 text-primary' : 'bg-success/20 text-success'
                        }`}>
                          {appt.status === 'pending' ? '待核销' : '已完成'}
                        </span>
                      </div>
                      {appt.status === 'pending' && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCancel(appt.id)}
                          className="text-xs text-destructive hover:underline"
                        >
                          取消
                        </motion.button>
                      )}
                    </div>
                  </GlassCard>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="booking"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 100, damping: 14 }}
              className="space-y-4"
            >
              {/* Step indicator */}
              <div className="flex items-center gap-2 justify-center">
                {['选择日期', '选择时段', '选择项目', '确认预约'].map((s, i) => {
                  const stepNames = ['date', 'slot', 'items', 'confirm'];
                  const currentIdx = stepNames.indexOf(step);
                  const isActive = i <= currentIdx;
                  return (
                    <div key={s} className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground'
                      }`}>
                        {i + 1}
                      </div>
                      <span className={`text-xs ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{s}</span>
                      {i < 3 && <div className="w-4 h-px bg-border" />}
                    </div>
                  );
                })}
              </div>

              {step === 'date' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {dates.map((d) => {
                    const slot = slots.find((s) => s.date === d)!;
                    const isPast = new Date(d) < new Date(new Date().toDateString());
                    return (
                      <motion.button
                        key={d}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={isPast}
                        onClick={() => { setSelectedDate(d); setStep('slot'); }}
                        className={`glass rounded-lg p-4 text-left transition-all ${
                          isPast ? 'opacity-40 cursor-not-allowed' : 'hover:brightness-110 cursor-pointer'
                        }`}
                      >
                        <p className="font-semibold text-foreground">{d}</p>
                        <p className="text-xs text-muted-foreground">{slot.day}</p>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {step === 'slot' && (
                <div className="space-y-3">
                  <button onClick={() => setStep('date')} className="text-sm text-primary hover:underline">← 重选日期</button>
                  <div className="grid grid-cols-2 gap-3">
                    {filteredSlots.map((slot) => {
                      const isFull = slot.remaining <= 0;
                      const booked = appointments.some(
                        (a) => a.slotId === slot.id && a.status === 'pending'
                      );
                      return (
                        <motion.button
                          key={slot.id}
                          whileHover={!isFull && !booked ? { scale: 1.02 } : undefined}
                          whileTap={!isFull && !booked ? { scale: 0.97 } : undefined}
                          disabled={isFull || booked}
                          onClick={() => { setSelectedSlot(slot.id); setStep('items'); }}
                          className={`glass rounded-lg p-4 text-left transition-all ${
                            isFull || booked ? 'opacity-40 cursor-not-allowed' : 'hover:brightness-110 cursor-pointer'
                          } ${selectedSlot === slot.id ? 'ring-2 ring-primary' : ''}`}
                        >
                          <p className="font-semibold text-foreground">{slot.startTime} - {slot.endTime}</p>
                          <p className={`text-xs mt-1 ${isFull ? 'text-destructive' : 'text-success'}`}>
                            {booked ? '已预约' : isFull ? '已满' : `剩余 ${slot.remaining} 名额`}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 'items' && (
                <div className="space-y-3">
                  <button onClick={() => setStep('slot')} className="text-sm text-primary hover:underline">← 重选时段</button>
                  <p className="text-sm text-muted-foreground">请勾选需要测试的项目：</p>
                  <div className="grid grid-cols-2 gap-3">
                    {availableItems.map((item) => (
                      <motion.button
                        key={item}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleItem(item)}
                        className={`glass rounded-lg p-3 text-left text-sm transition-all flex items-center gap-2 ${
                          selectedItems.includes(item) ? 'ring-2 ring-primary bg-primary/10' : ''
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          selectedItems.includes(item) ? 'bg-primary border-primary' : 'border-muted-foreground/30'
                        }`}>
                          {selectedItems.includes(item) && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        {item}
                      </motion.button>
                    ))}
                  </div>
                  {selectedItems.length > 0 && (
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setStep('confirm')}
                      className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-semibold shadow-lg shadow-primary/25"
                    >
                      下一步
                    </motion.button>
                  )}
                </div>
              )}

              {step === 'confirm' && (
                <div className="space-y-4">
                  <button onClick={() => setStep('items')} className="text-sm text-primary hover:underline">← 返回修改</button>
                  <GlassCard strong>
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      确认预约信息
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">日期：</span>{selectedDate}</p>
                      <p><span className="text-muted-foreground">时段：</span>
                        {slots.find((s) => s.id === selectedSlot)?.startTime} - {slots.find((s) => s.id === selectedSlot)?.endTime}
                      </p>
                      <p><span className="text-muted-foreground">地点：</span>东操场西看台</p>
                      <p><span className="text-muted-foreground">项目：</span>{selectedItems.join('、')}</p>
                    </div>
                  </GlassCard>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleConfirm}
                    className="w-full bg-primary text-primary-foreground rounded-lg py-3 font-semibold shadow-lg shadow-primary/25"
                  >
                    确认预约
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
