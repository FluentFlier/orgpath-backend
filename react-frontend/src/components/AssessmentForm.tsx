import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import questionsData from "../data/questions.json";

interface AssessmentFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function AssessmentForm({ onComplete, onCancel }: AssessmentFormProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questionsData[currentIndex];
  const progress = ((currentIndex) / questionsData.length) * 100;
  const isLastQuestion = currentIndex === questionsData.length - 1;

  const handleSelect = (val: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: val });
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      await submitAssessment();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    
    // Transform answers into the exact format our Node.js Backend expects!
    const formattedResponses = Object.entries(answers).map(([qId, val]) => {
      const q = questionsData.find((q) => q.id === parseInt(qId));
      return {
        category: q!.category,
        capability: q!.capability,
        value: val,
      };
    });

    const token = sessionStorage.getItem("orgpath_token");

    try {
      const res = await fetch("http://localhost:8080/api/assessment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          assessment_type: "self",
          responses: formattedResponses,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit assessment");
      
      onComplete(); // Tells dashboard to close this view and refresh
    } catch (err) {
      alert("Error submitting assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#106BB0]">OrgPath Assessment</h2>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
        <div 
          className="bg-[#06A119] h-2.5 rounded-full transition-all duration-500" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <Card className="border-2 shadow-lg">
        <CardHeader className="bg-slate-50 border-b">
          <div className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-2">
            {currentQuestion.category} • {currentQuestion.type}
          </div>
          <CardTitle className="text-2xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = answers[currentQuestion.id] === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected 
                      ? "border-[#106BB0] bg-blue-50" 
                      : "border-gray-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-[#106BB0]" : "border-gray-300"
                    }`}>
                      {isSelected && <div className="w-3 h-3 bg-[#106BB0] rounded-full"></div>}
                    </div>
                    <span className={`font-medium ${isSelected ? "text-[#106BB0]" : "text-gray-700"}`}>
                      {opt.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => setCurrentIndex(prev => prev - 1)}
              disabled={currentIndex === 0 || isSubmitting}
            >
              Previous
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={answers[currentQuestion.id] === undefined || isSubmitting}
              style={{ backgroundColor: isLastQuestion ? "#06A119" : "#106BB0", color: "white" }}
              className="px-8"
            >
              {isSubmitting ? "Submitting..." : isLastQuestion ? "Submit Assessment" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}