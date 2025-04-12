
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 bg-sage-50">
      <div className="text-6xl mb-6">🪷</div>
      <h1 className="font-serif text-3xl font-medium text-sage-800 mb-2">Trang không tìm thấy</h1>
      <p className="text-sage-600 text-center mb-8">
        Con đường bạn đang tìm không tồn tại.
        <br/>
        Có lẽ đây là lúc để quay về với hiện tại.
      </p>
      <Button onClick={() => navigate('/')}>
        Quay về trang chủ
      </Button>
    </div>
  );
};

export default NotFound;
