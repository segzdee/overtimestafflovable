
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

type SkillRating = "1" | "2" | "3" | "4" | "5";

interface SkillCategory {
  name: string;
  skills: {
    id: string;
    name: string;
    rating?: SkillRating;
  }[];
}

interface SkillsAssessmentFormProps {
  onSuccess?: () => void;
}

export function SkillsAssessmentForm({ onSuccess }: SkillsAssessmentFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const skillCategories: SkillCategory[] = [
    {
      name: "Service",
      skills: [
        { id: "customer_service", name: "Customer Service" },
        { id: "upselling", name: "Upselling" },
        { id: "conflict_resolution", name: "Conflict Resolution" },
      ]
    },
    {
      name: "Food & Beverage",
      skills: [
        { id: "food_prep", name: "Food Preparation" },
        { id: "bartending", name: "Bartending" },
        { id: "coffee_making", name: "Coffee Making" },
      ]
    },
    {
      name: "Administrative",
      skills: [
        { id: "inventory", name: "Inventory Management" },
        { id: "scheduling", name: "Scheduling" },
        { id: "pos_systems", name: "POS Systems" },
      ]
    }
  ];
  
  const [skillsData, setSkillsData] = useState(skillCategories);
  const [additionalSkills, setAdditionalSkills] = useState("");
  
  const form = useForm({
    defaultValues: {
      skills: {} as Record<string, SkillRating>
    }
  });
  
  const handleSkillRating = (skillId: string, rating: SkillRating) => {
    // Update the skill rating in our state
    const updatedCategories = skillsData.map(category => ({
      ...category,
      skills: category.skills.map(skill => 
        skill.id === skillId ? { ...skill, rating } : skill
      )
    }));
    
    setSkillsData(updatedCategories);
    
    // Also update the form state
    form.setValue(`skills.${skillId}`, rating);
  };
  
  const onSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Prepare data for submission
      const ratedSkills = skillsData
        .flatMap(category => category.skills)
        .filter(skill => skill.rating)
        .map(skill => ({
          id: skill.id,
          name: skill.name,
          rating: skill.rating
        }));
      
      // In a real implementation, this would call an API to submit the skills assessment
      // For demo purposes, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Skills assessment submitted",
        description: "Your skills assessment has been successfully recorded."
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error instanceof Error ? error.message : "An error occurred while submitting your skills."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills Assessment</CardTitle>
        <CardDescription>
          Rate your proficiency in the following skills on a scale of 1-5, where 1 is beginner and 5 is expert.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {skillsData.map((category) => (
              <div key={category.name} className="space-y-4">
                <h3 className="text-lg font-medium">{category.name}</h3>
                
                {category.skills.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor={skill.id}>{skill.name}</Label>
                      {skill.rating && (
                        <Badge variant="outline" className="ml-2">
                          Rating: {skill.rating}/5
                        </Badge>
                      )}
                    </div>
                    
                    <RadioGroup
                      defaultValue={skill.rating}
                      onValueChange={(value) => handleSkillRating(skill.id, value as SkillRating)}
                      className="flex flex-row space-x-1 sm:space-x-2"
                    >
                      {[1, 2, 3, 4, 5].map((value) => (
                        <div key={value} className="flex flex-col items-center">
                          <RadioGroupItem 
                            value={String(value)} 
                            id={`${skill.id}-${value}`} 
                            className="peer sr-only" 
                          />
                          <Label
                            htmlFor={`${skill.id}-${value}`}
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-input bg-background text-center text-sm font-medium ring-offset-background peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                          >
                            {value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>
            ))}
            
            <div className="space-y-2">
              <Label htmlFor="additional-skills">Additional Skills or Certifications</Label>
              <Textarea
                id="additional-skills"
                placeholder="List any other skills, certifications, or qualifications you have..."
                value={additionalSkills}
                onChange={(e) => setAdditionalSkills(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Skills Assessment"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
