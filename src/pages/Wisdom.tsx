
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type SavedWisdom = {
  quote: string;
  author: string;
  reflection: string;
  savedAt: string;
  intent: string;
};

const INTENTS_MAP: Record<string, { label: string; emoji: string }> = {
  "calm": { label: "Bình yên", emoji: "😌" },
  "insight": { label: "Hiểu biết", emoji: "💡" },
  "gratitude": { label: "Biết ơn", emoji: "🙏" },
  "confusion": { label: "Hoang mang", emoji: "😕" },
};

const Wisdom = () => {
  const [savedWisdom, setSavedWisdom] = useState<SavedWisdom[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [wisdomToDelete, setWisdomToDelete] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedWisdomStr = localStorage.getItem('hoiphat_saved_wisdom');
    if (savedWisdomStr) {
      setSavedWisdom(JSON.parse(savedWisdomStr));
    }
  }, []);

  const confirmDelete = (index: number) => {
    setWisdomToDelete(index);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (wisdomToDelete !== null) {
      const updatedWisdom = [...savedWisdom];
      updatedWisdom.splice(wisdomToDelete, 1);
      setSavedWisdom(updatedWisdom);
      localStorage.setItem('hoiphat_saved_wisdom', JSON.stringify(updatedWisdom));
      
      toast({
        description: "Đã xóa lời dạy khỏi bộ sưu tập của bạn.",
      });
    }
    setIsDeleteDialogOpen(false);
    setWisdomToDelete(null);
  };

  return (
    <div className="min-h-screen bg-sage-50 flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-serif font-medium text-sage-800">Lời dạy đã lưu</h1>
      </header>
      
      <main className="flex-1 p-4">
        {savedWisdom.length > 0 ? (
          <div className="space-y-4">
            {savedWisdom.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 pb-0 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {INTENTS_MAP[item.intent]?.emoji || "🪷"}
                      </span>
                      <span className="text-xs text-sage-500">
                        {format(new Date(item.savedAt), "d MMMM, yyyy", { locale: vi })}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-sage-400 hover:text-destructive"
                      onClick={() => confirmDelete(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="p-4">
                    <blockquote className="font-serif text-lg leading-relaxed text-sage-800 mb-2">
                      "{item.quote}"
                    </blockquote>
                    <p className="text-right text-sage-600 italic text-sm">
                      — {item.author}
                    </p>
                  </div>
                  
                  <div className="border-t border-sage-100 p-4 bg-sage-50/50">
                    <h3 className="font-medium mb-2 text-sage-700 text-sm">Suy ngẫm:</h3>
                    <p className="text-sage-600 text-sm">{item.reflection}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-4xl mb-4">🪷</div>
            <h2 className="font-serif text-xl text-sage-700 mb-2">Chưa có lời dạy nào</h2>
            <p className="text-sage-500 text-center mb-6">
              Hãy lưu lại những lời dạy của Đức Phật để xem lại sau này.
            </p>
            <Button onClick={() => navigate('/')}>
              Quay về trang chủ
            </Button>
          </div>
        )}
      </main>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa lời dạy này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Wisdom;
