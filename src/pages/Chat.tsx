
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import BackgroundGradient from '@/components/BackgroundGradient';
import ChatMessage from '@/components/ChatMessage';
import LanguageSelector from '@/components/LanguageSelector';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '안녕하세요! 저는 당신의 법률 도우미입니다. 이민법이나 노동법에 관한 질문이 있으시면 도와드릴게요.',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // This would be replaced with your actual API call to the RAG system
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response - in production this would come from your backend
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: '죄송합니다만, 현재 이것은 데모 버전입니다. 실제 배포 시에는 이 부분에서 백엔드 API를 호출하여 RAG 모델의 응답을 받게 됩니다.',
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error fetching response:', error);
      toast({
        title: "에러 발생",
        description: "응답을 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneCall = async () => {
    setIsLoading(true);
    
    try {
      // This would be replaced with your actual API call to /initiate_call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "전화 연결 중",
        description: "잠시 후 전화가 연결됩니다.",
      });
    } catch (error) {
      console.error('Error initiating call:', error);
      toast({
        title: "전화 연결 실패",
        description: "전화 연결 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">법률 상담</h1>
          <LanguageSelector />
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 mb-4 flex-1 overflow-y-auto">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
            {isLoading && (
              <div className="flex items-center justify-center p-2">
                <div className="dot-flashing"></div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4">
          <form onSubmit={handleSendMessage} className="space-y-4">
            <Textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="질문을 입력하세요..."
              className="w-full p-2 rounded-md"
              disabled={isLoading}
              rows={3}
            />
            <div className="flex gap-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !input.trim()}
              >
                메시지 보내기
              </Button>
              <Button 
                type="button"
                variant="outline"
                className="w-full"
                onClick={handlePhoneCall}
                disabled={isLoading}
              >
                전화 상담하기
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chat;
