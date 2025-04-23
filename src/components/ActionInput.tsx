
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ActionInputProps {
  onSave: () => void;
}

const ActionInput = ({ onSave }: ActionInputProps) => {
  const [action, setAction] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <div className="mt-6 animate-fade-in space-y-4 p-4 bg-sage-50/50 rounded-lg">
      <h3 className="font-medium text-sage-800 mb-4">Tạo việc cần làm</h3>
      
      <div className="flex gap-4">
        <Input
          placeholder="Ví dụ: ngồi thiền 5 phút"
          value={action}
          onChange={(e) => setAction(e.target.value)}
          className="flex-1"
        />
        
        <Select value={selectedTime} onValueChange={setSelectedTime}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn thời gian" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5AM">5:00 AM</SelectItem>
            <SelectItem value="10PM">10:00 PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        className="w-full"
        onClick={onSave}
        disabled={!action || !selectedTime}
      >
        Lưu lại
      </Button>
    </div>
  );
};

export default ActionInput;
