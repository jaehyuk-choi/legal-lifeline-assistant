
import React from 'react';
import { cn } from "@/lib/utils";

interface BackgroundGradientProps {
  className?: string;
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({ className }) => {
  return (
    <div className={cn("fixed inset-0 -z-10 opacity-40", className)}>
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute top-1/4 right-1/3 w-[30rem] h-[30rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      <div className="absolute bottom-1/3 right-1/4 w-[35rem] h-[35rem] bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" />
    </div>
  );
};

export default BackgroundGradient;
