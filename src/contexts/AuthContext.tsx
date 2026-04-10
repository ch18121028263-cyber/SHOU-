import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { mockUsers, parseStudentId } from '@/data/mockData';

interface User {
  studentId: string;
  name: string;
  gender: '男' | '女';
  phone: string;
  college: string;
  grade: string;
  year: string;
}

interface AuthContextType {
  user: User | null;
  isGuest: boolean;
  // login: (studentId: string, password: string) => { success: boolean; error?: string };
  login: (studentId: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('shou_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
    const guest = localStorage.getItem('shou_guest');
    if (guest === 'true') setIsGuest(true);
  }, []);

  // const login = (studentId: string, password: string) => {
  //   const userData = mockUsers[studentId];
  //   if (!userData) return { success: false, error: '学号不存在' };
  //   if (userData.password !== password) return { success: false, error: '密码错误' };
  //   const parsed = parseStudentId(studentId);
  //   if (!parsed) return { success: false, error: '学号格式错误' };
  //   const u: User = {
  //     studentId,
  //     name: userData.name,
  //     gender: userData.gender,
  //     phone: userData.phone,
  //     college: parsed.college,
  //     grade: parsed.grade,
  //     year: parsed.year,
  //   };
  //   setUser(u);
  //   setIsGuest(false);
  //   localStorage.setItem('shou_user', JSON.stringify(u));
  //   localStorage.removeItem('shou_guest');
  //   return { success: true };
  // };
  // 把原来的 login 函数替换成这个支持“异步请求”的版本
 const login = async (studentId: string, password: string) => {
    try {
      // 发起请求，注意这里用的是同学给的最新地址
      const response = await fetch('https://55457e4e.r23.cpolar.top/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: studentId,
          password: password
        })
      });

      // 检查服务器响应是否正常
      if (!response.ok) {
        return { success: false, error: '后端服务器响应异常' };
      }

      const data = await response.json();

      if (data.success) {
        // 登录成功：更新状态
        setUser(data.user);
        setIsGuest(false);

        // 存入本地缓存
        localStorage.setItem('shou_user', JSON.stringify(data.user));
        localStorage.setItem('auth_token', data.token || '');
        localStorage.removeItem('shou_guest');

        return { success: true };
      } else {
        return { success: false, error: '学号或密码错误' };
      }
    } catch (error) {
      console.error("连接后端失败:", error);
      return { success: false, error: '无法连接到后端服务器，请检查 cpolar 是否在线' };
    }
  };

  
  const loginAsGuest = () => {
    setIsGuest(true);
    setUser(null);
    localStorage.setItem('shou_guest', 'true');
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('shou_user');
    localStorage.removeItem('shou_guest');
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, login, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
