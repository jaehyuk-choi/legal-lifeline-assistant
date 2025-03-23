
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;
      toast({
        title: "계정이 성공적으로 생성되었습니다",
        description: "이메일을 확인해주세요. 이메일 확인 링크를 클릭하여 가입을 완료해주세요.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "계정 생성 오류",
        description: error.message || "예상치 못한 오류가 발생했습니다",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === "Email not confirmed") {
          throw new Error("이메일 인증이 완료되지 않았습니다. 이메일함을 확인하거나 관리자에게 문의하세요.");
        }
        throw error;
      }
      
      toast({
        title: "로그인 성공",
        description: "Fairvio에 오신 것을 환영합니다!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "인증 실패",
        description: error.message || "이메일과 비밀번호를 확인해주세요",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "로그아웃 성공",
        description: "로그아웃되었습니다",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "로그아웃 오류",
        description: error.message || "예상치 못한 오류가 발생했습니다",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
