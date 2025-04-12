
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Construction } from "lucide-react";

const Library = () => {
  const navigate = useNavigate();
  
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
        <h1 className="text-xl font-serif font-medium text-sage-800">Thư viện</h1>
      </header>
      
      <main className="flex-1 p-4 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-sage-700">
              <Construction className="mr-2 h-5 w-5" />
              Đang phát triển
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-sage-600">
              Thư viện kiến thức Phật giáo sẽ sớm được ra mắt trong phiên bản tiếp theo.
              Bạn sẽ có thể truy cập vào kho tàng giáo lý Phật giáo, lời dạy của các vị thiền sư,
              và nhiều nguồn tài nguyên hữu ích khác.
            </p>
            <Button onClick={() => navigate('/')}>
              Quay về trang chủ
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Library;
