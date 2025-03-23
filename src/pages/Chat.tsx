
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import BackgroundGradient from '@/components/BackgroundGradient';
import ChatMessage from '@/components/ChatMessage';
import LanguageSelector from '@/components/LanguageSelector';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { ArrowLeft, Send, Phone } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your legal assistant. I can help you with questions about labor laws or workplace issues. How can I assist you today?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [conversationSummary, setConversationSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
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
        content: 'This is a demo version. In production, this would call the backend API to get a response from the RAG model.',
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error fetching response:', error);
      toast({
        title: "Error",
        description: "There was an error getting a response. Please try again.",
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
        title: "Call connecting",
        description: "You will receive a call shortly.",
      });
    } catch (error) {
      console.error('Error initiating call:', error);
      toast({
        title: "Call connection failed",
        description: "There was an error connecting your call. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndChat = async () => {
    setIsSummarizing(true);
    
    try {
      // Mock API call to generate a summary
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, this would be a real summary from your backend
      setConversationSummary(
        "Based on our conversation, it appears you've experienced a potential wage theft issue at your workplace. " +
        "You mentioned working overtime without receiving proper compensation for several weeks. " +
        "This may constitute a violation of labor laws regarding overtime pay requirements."
      );
      
      setShowSummaryDialog(true);
    } catch (error) {
      console.error('Error summarizing conversation:', error);
      toast({
        title: "Error",
        description: "Failed to summarize the conversation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleCreateReport = () => {
    // In a real implementation, save the conversation data to use in the report
    navigate('/report-confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Legal Assistance Chat</h1>
          </div>
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
              placeholder="Type your question here..."
              className="w-full p-2 rounded-md"
              disabled={isLoading || isSummarizing}
              rows={3}
            />
            <div className="flex gap-2">
              <Button 
                type="submit" 
                className="w-full flex items-center gap-2" 
                disabled={isLoading || isSummarizing || !input.trim()}
              >
                <span>Send Message</span>
                <Send className="h-4 w-4" />
              </Button>
              <Button 
                type="button"
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={handleEndChat}
                disabled={isLoading || isSummarizing || messages.length <= 1}
              >
                End & Summarize
              </Button>
              <Button 
                type="button"
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={handlePhoneCall}
                disabled={isLoading || isSummarizing}
              >
                <Phone className="h-4 w-4" />
                <span>Call Instead</span>
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Conversation Summary</DialogTitle>
            <DialogDescription>
              Here's a summary of our conversation about your workplace issue.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded">
            <p>{conversationSummary}</p>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowSummaryDialog(false)}
              className="sm:w-auto w-full"
            >
              Continue Chatting
            </Button>
            <Button
              onClick={handleCreateReport}
              className="sm:w-auto w-full"
            >
              Create Report from Summary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Chat;
