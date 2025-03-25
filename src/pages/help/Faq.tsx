
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, ArrowLeft } from "lucide-react";

const FaqPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqCategories = {
    general: [
      {
        question: "What is OvertimeStaff?",
        answer: "OvertimeStaff is a platform that connects healthcare facilities with qualified shift workers looking for extra shifts. We streamline the process of finding and booking extra shifts, making it easier for both facilities and healthcare professionals."
      },
      {
        question: "How do I create an account?",
        answer: "To create an account, click on the 'Sign Up' button on our homepage. You'll need to select whether you're a healthcare professional looking for shifts or a facility needing staff, then provide your email, create a password, and fill out some basic profile information."
      },
      {
        question: "Is OvertimeStaff available in my area?",
        answer: "OvertimeStaff is currently available in major metropolitan areas across the United States. We're constantly expanding our service area. Please check our coverage map on the homepage or contact our support team to inquire about availability in your specific location."
      }
    ],
    shifts: [
      {
        question: "How do I find available shifts?",
        answer: "Once you're logged in as a healthcare professional, navigate to the 'Find Shifts' page where you can browse available shifts. You can filter shifts by location, specialty, date, and pay rate to find ones that match your preferences."
      },
      {
        question: "How do I apply for a shift?",
        answer: "When you find a shift you're interested in, click on the 'Apply' button. You'll be asked to confirm your qualifications and availability. Once submitted, the facility will review your application and notify you if you're selected."
      },
      {
        question: "What happens if I need to cancel a shift?",
        answer: "If you need to cancel a shift, please do so as early as possible through your dashboard. Cancellations made less than 24 hours before the shift may affect your rating and eligibility for future shifts. Repeated last-minute cancellations could result in account restrictions."
      }
    ],
    payment: [
      {
        question: "How and when do I get paid?",
        answer: "Payment is processed after the completion and verification of your shift. Payments are typically made within 3-5 business days directly to your linked bank account or payment method specified in your profile settings."
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept direct bank deposits, which is the fastest way to receive your payments. You can set up your payment details in your profile settings under the 'Banking Information' section."
      },
      {
        question: "Are there any fees for using OvertimeStaff?",
        answer: "For healthcare professionals, there are no upfront fees to use OvertimeStaff. For facilities, there is a service fee applied to each successfully filled shift. Please refer to our pricing page for detailed information on our fee structure."
      }
    ]
  };

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/help" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Help Center
          </Link>
        </Button>
        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600">
          Find answers to the most common questions about using OvertimeStaff.
        </p>
      </div>
      
      <div className="relative mb-8">
        <Input
          type="text"
          placeholder="Search FAQs..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      </div>
      
      <Tabs defaultValue="general" className="mb-12">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="shifts">Shifts</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        
        {Object.entries(faqCategories).map(([category, questions]) => (
          <TabsContent key={category} value={category}>
            <Accordion type="single" collapsible className="w-full">
              {questions.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${category}-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="bg-primary/5 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Didn't find what you're looking for?</h2>
        <p className="text-gray-600 mb-4">
          Our support team is ready to assist you with any questions you may have.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/contact">Contact Support</Link>
          </Button>
          <Button asChild>
            <Link to="/help/ticket">Submit a Ticket</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
