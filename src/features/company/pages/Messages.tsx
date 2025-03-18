
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Search, 
  Send, 
  User, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Messages() {
  const [activeTab, setActiveTab] = useState("inbox");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data for conversations
  const [conversations] = useState([
    { id: 1, name: "Elite Staffing Agency", unread: 3, avatar: "", lastMessage: "We have staff available for your event on Saturday", time: "10:30 AM", isAgency: true },
    { id: 2, name: "Quick Temp Solutions", unread: 0, avatar: "", lastMessage: "Thank you for your recent booking", time: "Yesterday", isAgency: true },
    { id: 3, name: "Sarah Williams", unread: 0, avatar: "", lastMessage: "I'll be there 15 minutes early to prepare", time: "Yesterday", isAgency: false },
    { id: 4, name: "Premier Hospitality Agency", unread: 1, avatar: "", lastMessage: "Please confirm the dress code for Friday", time: "Mar 10", isAgency: true },
    { id: 5, name: "Michael Chen", unread: 0, avatar: "", lastMessage: "Thanks for the opportunity", time: "Mar 9", isAgency: false }
  ]);
  
  // Selected conversation for the detailed view
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  
  // Mock messages for the selected conversation
  const [messages] = useState([
    { id: 1, sender: "them", text: "Hello, we have several experienced staff members available for your event on Saturday.", time: "10:25 AM" },
    { id: 2, sender: "me", text: "Great! I need 3 servers and 2 bartenders. What's your availability?", time: "10:27 AM" },
    { id: 3, sender: "them", text: "We can definitely provide 3 servers and 2 bartenders for Saturday. What time does the event start and end?", time: "10:28 AM" },
    { id: 4, sender: "me", text: "The event is from 6 PM to 11 PM. Do your staff have formal attire for a corporate event?", time: "10:29 AM" },
    { id: 5, sender: "them", text: "Yes, all our staff have formal attire suitable for corporate events. Would you like them to arrive an hour before to help with setup?", time: "10:30 AM" }
  ]);
  
  // Filter conversations based on search term
  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Button size="sm" className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>New Message</span>
        </Button>
      </div>
      
      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
          {/* Left panel - Conversations list */}
          <div className="md:col-span-1 lg:col-span-2 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-4 pt-4">
                <TabsList className="w-full">
                  <TabsTrigger value="inbox" className="flex-1">Inbox</TabsTrigger>
                  <TabsTrigger value="agencies" className="flex-1">Agencies</TabsTrigger>
                  <TabsTrigger value="staff" className="flex-1">Staff</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="inbox" className="mt-0">
                <div className="h-[calc(100vh-280px)] overflow-y-auto">
                  {filteredConversations.map(conversation => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation.id === conversation.id ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback className={conversation.isAgency ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}>
                            {conversation.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                            <span className="text-xs text-gray-500">{conversation.time}</span>
                          </div>
                          
                          <p className="text-xs text-gray-500 mt-1 truncate">{conversation.lastMessage}</p>
                        </div>
                        
                        {conversation.unread > 0 && (
                          <Badge className="ml-2 bg-primary text-white">{conversation.unread}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="agencies" className="mt-0">
                <div className="h-[calc(100vh-280px)] overflow-y-auto">
                  {filteredConversations
                    .filter(conversation => conversation.isAgency)
                    .map(conversation => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedConversation.id === conversation.id ? 'bg-gray-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {conversation.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                              <span className="text-xs text-gray-500">{conversation.time}</span>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-1 truncate">{conversation.lastMessage}</p>
                          </div>
                          
                          {conversation.unread > 0 && (
                            <Badge className="ml-2 bg-primary text-white">{conversation.unread}</Badge>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="staff" className="mt-0">
                <div className="h-[calc(100vh-280px)] overflow-y-auto">
                  {filteredConversations
                    .filter(conversation => !conversation.isAgency)
                    .map(conversation => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedConversation.id === conversation.id ? 'bg-gray-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {conversation.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
                              <span className="text-xs text-gray-500">{conversation.time}</span>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-1 truncate">{conversation.lastMessage}</p>
                          </div>
                          
                          {conversation.unread > 0 && (
                            <Badge className="ml-2 bg-primary text-white">{conversation.unread}</Badge>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right panel - Message thread */}
          <div className="md:col-span-2 lg:col-span-3 flex flex-col h-[calc(100vh-200px)]">
            {/* Conversation header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback className={selectedConversation.isAgency ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}>
                    {selectedConversation.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedConversation.name}</h3>
                  <p className="text-xs text-gray-500">{selectedConversation.isAgency ? 'Agency' : 'Staff Member'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <User className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-500">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Message thread */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                {messages.map(message => (
                  <div key={message.id} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      message.sender === 'me' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-primary-100' : 'text-gray-500'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                <Textarea 
                  placeholder="Type a message..."
                  className="min-h-[60px] resize-none"
                />
                <Button className="bg-primary text-white h-[60px] px-4">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <div className="text-sm text-gray-500">Showing 5 of 24 conversations</div>
        <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
