
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import ChatMessage from '@/components/ChatMessage';
import Header from '@/components/Header';
import BackgroundGradient from '@/components/BackgroundGradient';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

// Define message type
type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const Chat = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { user } = useAuth();
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your AI legal assistant. How can I help you today?',
      timestamp: new Date(),
    };
    
    setMessages([welcomeMessage]);
    
    // Check if we have a summary from a call
    const summaryFromState = location.state?.summary;
    if (summaryFromState) {
      // Add a message based on the call summary
      const summaryMessage: Message = {
        id: 'summary',
        role: 'assistant',
        content: `Based on our recent call, here's what I understand about your situation: ${summaryFromState}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, summaryMessage]);
    } else {
      // Check sessionStorage as fallback
      const storedSummary = sessionStorage.getItem('callSummary');
      if (storedSummary) {
        const summaryMessage: Message = {
          id: 'summary',
          role: 'assistant',
          content: `Based on our recent call, here's what I understand about your situation: ${storedSummary}`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, summaryMessage]);
        // Clear the session storage to avoid showing this again
        sessionStorage.removeItem('callSummary');
      }
    }
  }, [location]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Convert to the format expected by our API
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the new user message
      conversationHistory.push({
        role: 'user',
        content: message
      });

      // Call our Edge Function
      const { data, error } = await supabase.functions.invoke('chat-llm', {
        body: {
          message,
          conversationHistory
        }
      });

      if (error) throw error;

      // Add assistant's response
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data?.response || "I'm having trouble processing your request right now.",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto p-4">
        <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden">
          {/* Chat header */}
          <div className="bg-primary px-4 py-3 text-white">
            <h1 className="text-lg font-medium">Legal Assistant Chat</h1>
            <p className="text-xs opacity-75">Ask any questions about your workplace concerns</p>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
            
            {isLoading && (
              <div className="flex justify-center items-center py-2">
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
                <span className="ml-2 text-sm text-gray-500">AI is typing...</span>
              </div>
            )}
          </div>
          
          {/* Message input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="min-h-[60px] resize-none"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={isLoading || !message.trim()}
                className="shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
