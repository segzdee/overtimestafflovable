
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Send, 
  Plus,
  Paperclip,
  Smile,
  MessageSquare,
  ChevronDown,
  User,
  Users,
  Bell,
  PenLine
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function Messages() {
  const { toast } = useToast();
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  interface Chat {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    type: 'individual' | 'team' | 'company' | 'admin';
    messages: {
      id: number;
      sender: string;
      text: string;
      time: string;
      isMe: boolean;
    }[];
  }
  
  const [chats] = useState<Chat[]>([
    {
      id: 1,
      name: "Mark Johnson",
      avatar: "",
      lastMessage: "See you at the shift tomorrow!",
      time: "5m ago",
      unread: 2,
      type: 'individual',
      messages: [
        { id: 1, sender: "Mark Johnson", text: "Hi there! Just a reminder about the shift tomorrow.", time: "10:30 AM", isMe: false },
        { id: 2, sender: "Mark Johnson", text: "Please arrive 15 minutes early for briefing.", time: "10:32 AM", isMe: false },
        { id: 3, sender: "Me", text: "Thanks for the reminder. I'll be there on time.", time: "10:45 AM", isMe: true },
        { id: 4, sender: "Mark Johnson", text: "Great! Any questions before tomorrow?", time: "10:47 AM", isMe: false },
        { id: 5, sender: "Me", text: "No, I think I'm all set.", time: "10:50 AM", isMe: true },
        { id: 6, sender: "Mark Johnson", text: "Perfect. See you at the shift tomorrow!", time: "10:52 AM", isMe: false }
      ]
    },
    {
      id: 2,
      name: "Grand Hotel Team",
      avatar: "",
      lastMessage: "New uniforms are available for pickup",
      time: "Yesterday",
      unread: 0,
      type: 'team',
      messages: [
        { id: 1, sender: "Sarah (Manager)", text: "New uniforms are available for pickup at HR.", time: "Yesterday, 3:30 PM", isMe: false },
        { id: 2, sender: "Me", text: "Thanks for letting us know. When is the last day to pick them up?", time: "Yesterday, 4:15 PM", isMe: true },
        { id: 3, sender: "Sarah (Manager)", text: "You have until Friday to pick them up.", time: "Yesterday, 4:20 PM", isMe: false },
        { id: 4, sender: "John", text: "Are they the same design as before?", time: "Yesterday, 4:22 PM", isMe: false },
        { id: 5, sender: "Sarah (Manager)", text: "Yes, same design but better quality material.", time: "Yesterday, 4:25 PM", isMe: false }
      ]
    },
    {
      id: 3,
      name: "City Bistro HR",
      avatar: "",
      lastMessage: "Payment for last week has been processed",
      time: "2 days ago",
      unread: 0,
      type: 'company',
      messages: [
        { id: 1, sender: "HR Department", text: "Hello! Your payment for last week's shifts has been processed.", time: "2 days ago, 9:00 AM", isMe: false },
        { id: 2, sender: "HR Department", text: "You should see it in your account within 2 business days.", time: "2 days ago, 9:01 AM", isMe: false },
        { id: 3, sender: "Me", text: "Thank you for the update!", time: "2 days ago, 10:15 AM", isMe: true },
        { id: 4, sender: "HR Department", text: "You're welcome. Let us know if you have any questions.", time: "2 days ago, 10:30 AM", isMe: false }
      ]
    },
    {
      id: 4,
      name: "Support Team",
      avatar: "",
      lastMessage: "Your verification is being processed",
      time: "1 week ago",
      unread: 0,
      type: 'admin',
      messages: [
        { id: 1, sender: "Support", text: "Thank you for submitting your verification documents.", time: "1 week ago, 11:00 AM", isMe: false },
        { id: 2, sender: "Support", text: "We're currently processing them and will update you soon.", time: "1 week ago, 11:02 AM", isMe: false },
        { id: 3, sender: "Me", text: "Thanks. How long does this process usually take?", time: "1 week ago, 11:30 AM", isMe: true },
        { id: 4, sender: "Support", text: "Typically 3-5 business days. We'll notify you as soon as it's complete.", time: "1 week ago, 11:45 AM", isMe: false },
        { id: 5, sender: "Me", text: "Great, thank you!", time: "1 week ago, 12:00 PM", isMe: true }
      ]
    }
  ]);
  
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getTypeIcon = (type: Chat['type']) => {
    switch (type) {
      case 'individual': return <User className="h-3 w-3" />;
      case 'team': return <Users className="h-3 w-3" />;
      case 'company': return <Bell className="h-3 w-3" />;
      case 'admin': return <PenLine className="h-3 w-3" />;
    }
  };
  
  const getTypeBadgeColor = (type: Chat['type']) => {
    switch (type) {
      case 'individual': return 'bg-blue-100 text-blue-800';
      case 'team': return 'bg-green-100 text-green-800';
      case 'company': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
    }
  };
  
  const getCurrentChat = () => {
    return chats.find(chat => chat.id === selectedChat);
  };
  
  const sendNewMessage = () => {
    if (!message.trim() || selectedChat === null) return;
    
    // In a real app, you would send the message to the server
    // Here we're just simulating it with a toast
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${getCurrentChat()?.name}`
    });
    
    // Reset message input
    setMessage("");
  };

  return (
    <div className="h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-0 border rounded-lg overflow-hidden">
        {/* Sidebar */}
        <div className="md:col-span-1 border-r">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Messages</h2>
              <Button size="icon" variant="ghost">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(80vh-120px)]">
            {filteredChats.map(chat => (
              <div
                key={chat.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${selectedChat === chat.id ? 'bg-gray-50' : ''}`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <div className="font-medium truncate">{chat.name}</div>
                      <div className="text-xs text-muted-foreground">{chat.time}</div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate max-w-[140px]">
                        {chat.lastMessage}
                      </p>
                      
                      <div className="flex space-x-1">
                        <span className={`text-xs rounded-full px-1.5 flex items-center ${getTypeBadgeColor(chat.type)}`}>
                          {getTypeIcon(chat.type)}
                        </span>
                        
                        {chat.unread > 0 && (
                          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main chat area */}
        <div className="md:col-span-2 flex flex-col h-full">
          {selectedChat ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="" alt={getCurrentChat()?.name} />
                    <AvatarFallback>{getCurrentChat()?.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{getCurrentChat()?.name}</h2>
                    <span className={`text-xs rounded-full px-2 py-0.5 ${getTypeBadgeColor(getCurrentChat()?.type || 'individual')}`}>
                      {getCurrentChat()?.type === 'individual' ? 'Direct Message' : 
                       getCurrentChat()?.type === 'team' ? 'Team Channel' :
                       getCurrentChat()?.type === 'company' ? 'Company Updates' : 'Support'}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {getCurrentChat()?.messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${msg.isMe ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                      {!msg.isMe && (
                        <div className="font-medium text-xs mb-1">{msg.sender}</div>
                      )}
                      <p className="text-sm">{msg.text}</p>
                      <div className={`text-xs mt-1 ${msg.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input 
                    placeholder="Type a message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        sendNewMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={sendNewMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="font-medium text-lg mb-2">No Conversation Selected</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Choose a conversation from the sidebar or start a new one.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
