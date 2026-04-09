import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  onClick?: () => void;
  animate?: boolean;
}

export default function GlassCard({ children, className, strong, onClick, animate = true }: GlassCardProps) {
  const Component = animate ? motion.div : 'div';
  const props = animate
    ? {
        whileHover: { scale: 1.01, transition: { type: 'spring', stiffness: 100, damping: 14 } },
        whileTap: onClick ? { scale: 0.98 } : undefined,
        transition: { type: 'spring', stiffness: 100, damping: 14 },
      }
    : {};

  return (
    <Component
      className={cn(strong ? 'glass-strong' : 'glass', 'rounded-lg p-6', className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}
