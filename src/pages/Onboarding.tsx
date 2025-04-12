
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Bell } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const OnboardingScreens = [
  {
    title: "Chào mừng bạn đến với Hỏi Phật",
    description: "Khám phá sự bình yên và trí tuệ từ lời dạy của Đức Phật mỗi ngày.",
    image: "🧘‍♂️"
  },
  {
    title: "Chọn ý định của bạn hôm nay",
    description: "Điều gì đang ở trong tâm trí bạn?",
    options: [
      { value: "calm", label: "Bình yên", emoji: "😌" },
      { value: "insight", label: "Hiểu biết", emoji: "💡" },
      { value: "gratitude", label: "Biết ơn", emoji: "🙏" },
      { value: "confusion", label: "Hoang mang", emoji: "😕" },
    ]
  },
  {
    title: "Nhận lời nhắc nhở hàng ngày",
    description: "Chúng tôi sẽ gửi cho bạn một lời dạy của Đức Phật mỗi ngày vào thời gian bạn chọn.",
    reminder: true
  }
];

const Onboarding = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [enableReminders, setEnableReminders] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleNext = () => {
    if (currentScreen < OnboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      // Save preferences to localStorage
      localStorage.setItem('hoiphat_intent', selectedIntent || 'calm');
      localStorage.setItem('hoiphat_reminders', enableReminders ? 'true' : 'false');
      
      // Show welcome toast
      toast({
        title: "Xin chào!",
        description: "Chúc bạn tìm thấy sự bình yên trong mỗi ngày."
      });
      
      // Navigate to home
      navigate('/');
    }
  };
  
  const isLastScreen = currentScreen === OnboardingScreens.length - 1;
  const currentData = OnboardingScreens[currentScreen];
  
  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 bg-sage-50 text-sage-900">
      <div className="w-full max-w-md">
        {/* Progress indicator */}
        <div className="flex gap-2 justify-center mb-8">
          {OnboardingScreens.map((_, index) => (
            <div 
              key={index} 
              className={`h-1 rounded-full transition-all ${
                index === currentScreen ? "w-8 bg-primary" : 
                index < currentScreen ? "w-4 bg-primary/60" : "w-4 bg-sage-200"
              }`} 
            />
          ))}
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm border-sage-100 shadow-sm">
          <CardContent className="pt-6 flex flex-col items-center">
            {/* Image/Emoji */}
            <div className="text-6xl mb-6">
              {currentData.image || "🪷"}
            </div>
            
            <h1 className="font-serif text-2xl font-medium text-center mb-4">
              {currentData.title}
            </h1>
            
            <p className="text-sage-700 text-center mb-8">
              {currentData.description}
            </p>
            
            {/* Screen-specific content */}
            {currentData.options && (
              <div className="grid grid-cols-2 gap-4 w-full mb-8">
                {currentData.options.map(option => (
                  <Button 
                    key={option.value}
                    variant={selectedIntent === option.value ? "default" : "outline"}
                    className={`h-24 flex flex-col gap-2 ${
                      selectedIntent === option.value 
                      ? "bg-primary text-white" 
                      : "hover:bg-sage-50 border-sage-200"
                    }`}
                    onClick={() => setSelectedIntent(option.value)}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span>{option.label}</span>
                  </Button>
                ))}
              </div>
            )}
            
            {currentData.reminder && (
              <div className="flex items-center gap-3 p-4 bg-sage-50 rounded-lg w-full mb-8">
                <Bell className="text-primary h-5 w-5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium">Nhắc nhở hàng ngày</h3>
                  <p className="text-xs text-sage-600">Nhận thông báo vào 7:00 sáng</p>
                </div>
                <button
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    enableReminders ? "bg-primary" : "bg-sage-200"
                  }`}
                  onClick={() => setEnableReminders(!enableReminders)}
                >
                  <span 
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                      enableReminders ? "left-7" : "left-1"
                    }`} 
                  />
                </button>
              </div>
            )}
            
            <Button 
              className="w-full font-medium"
              onClick={handleNext}
              disabled={currentScreen === 1 && !selectedIntent}
            >
              {isLastScreen ? "Bắt đầu" : "Tiếp theo"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
        
        {!isLastScreen && (
          <button 
            className="text-sage-500 text-sm mt-4 mx-auto block hover:text-sage-700"
            onClick={() => navigate('/')}
          >
            Bỏ qua
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
