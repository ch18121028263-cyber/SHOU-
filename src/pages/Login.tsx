import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

import { Eye, EyeOff, User, Lock } from 'lucide-react';

export default function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();

//  const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     if (!studentId || !password) {
//       setError('请输入学号和密码');
//       return;
//     }
//     const result = login(studentId, password); // 原来的同步写法
//     if (result.success) {
//       navigate('/dashboard');
//     } else {
//       setError(result.error || '登录失败');
//     }

  const handleLogin = async (e: React.FormEvent) => { // 1. 这里加上了 async
    e.preventDefault();
    setError('');
    
    if (!studentId || !password) { 
      setError('请输入学号和密码'); 
      return; 
    }
    // 2. 这里加上了 await，代表“等待后端回信”
    const result = await login(studentId, password);

    // 现在的 result 是真正的结果，而不是一个“等待凭据”了
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || '登录失败');
    }
  };
  
  const handleGuest = () => {
    loginAsGuest();
    navigate('/guide');
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-white" />
    


      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 14 }}
        className="glass-strong relative z-10 w-full max-w-md mx-4 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">上海海洋大学</h1>
          <p className="text-lg text-gradient-primary font-semibold mt-1">体测全流程服务平台</p>
          <p className="text-sm text-muted-foreground mt-2">登录后即可预约体测、查询成绩</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="请输入学号"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="glass-input w-full rounded-lg py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="请输入密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input w-full rounded-lg py-3 pl-10 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-foreground/70 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="rounded"
              />
              记住密码
            </label>
            <button type="button" className="text-primary hover:underline">忘记密码</button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 100, damping: 14 }}
            className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:brightness-110 transition-all"
          >
            登 录
          </motion.button>

          <motion.button
            type="button"
            onClick={handleGuest}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 100, damping: 14 }}
            className="w-full glass rounded-lg py-3 font-medium text-foreground/70 hover:brightness-110 transition-all"
          >
            游客模式浏览
          </motion.button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          测试账号：20230101001 / 123456
        </p>
      </motion.div>
    </div>
  );
}
