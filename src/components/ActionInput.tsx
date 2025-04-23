
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
  const [todos, setTodos] = useState<{ action: string; time: string }[]>([
    { action: "", time: "" },
    { action: "", time: "" },
    { action: "", time: "" }
  ]);

  const addTodo = () => {
    setTodos([...todos, { action: "", time: "" }]);
  };

  const updateTodo = (index: number, field: 'action' | 'time', value: string) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], [field]: value };
    setTodos(newTodos);
  };

  return (
    <div className="mt-6 animate-fade-in space-y-4 p-4 bg-sage-50/50 rounded-lg">
      <h3 className="font-medium text-sage-800 mb-4">Tạo việc cần làm</h3>
      
      {todos.map((todo, index) => (
        <div key={index} className="flex gap-4">
          <Input
            placeholder="Ví dụ: ngồi thiền 5 phút"
            value={todo.action}
            onChange={(e) => updateTodo(index, 'action', e.target.value)}
            className="flex-1"
          />
          
          <Select
            value={todo.time}
            onValueChange={(value) => updateTodo(index, 'time', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5AM">5:00 AM</SelectItem>
              <SelectItem value="10PM">10:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ))}
      
      <Button 
        variant="outline"
        className="w-full"
        onClick={addTodo}
      >
        + Thêm việc cần làm
      </Button>
      
      <Button 
        className="w-full"
        onClick={onSave}
        disabled={!todos.some(todo => todo.action && todo.time)}
      >
        Lưu lại
      </Button>
    </div>
  );
};

export default ActionInput;
