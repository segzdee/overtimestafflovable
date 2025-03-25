
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Loader2, ArrowLeft, TicketIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const ticketSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string({
    required_error: "Please select a category",
  }),
  priority: z.string({
    required_error: "Please select a priority level",
  }),
  description: z.string().min(20, "Please provide a detailed description (minimum 20 characters)"),
  email: z.string().email("Please enter a valid email address"),
  attachment: z.any().optional(),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

const SupportTicket = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      subject: "",
      category: "",
      priority: "medium",
      description: "",
      email: "",
    },
  });

  const onSubmit = async (data: TicketFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    console.log("Ticket data:", data);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Support ticket submitted",
        description: "We've received your request and will respond shortly.",
      });
      
      // In a real app, you'd navigate after successful submission
      navigate("/help");
    }, 1500);
  };

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <Button variant="ghost" className="mb-4" asChild>
        <Link to="/help" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Help Center
        </Link>
      </Button>
      
      <div className="mb-8 flex items-center gap-3">
        <TicketIcon className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Submit a Support Ticket</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        Need help with something specific? Fill out the form below and our support team will get back to you as soon as possible.
      </p>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of your issue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="account">Account Management</SelectItem>
                        <SelectItem value="shift">Shift Problems</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please provide as much detail as possible about your issue" 
                      className="h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include any relevant details such as error messages, steps to reproduce, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Your email address for correspondence"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    We'll use this email to follow up on your ticket.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="attachment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachments (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="file" 
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload screenshots or documents that may help us understand your issue.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Ticket"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SupportTicket;
