import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import TaskItem from "../TaskItem";
import type { Task } from "../../types/task";

interface Item {
  id: string;
  status: string;
  title: string;
  desc: string;
}

interface TaskSectionProps {
  title: string;
  count: number;
  item: Item;
  handleDelete:(id:number)=>void;
  handleEdit:(item:Task)=>void;
}

export default function TaskSection({ title, count, item,handleDelete,handleEdit }: TaskSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4">
      <div
        className="flex justify-between items-center bg-[#F5F7FA] px-4 py-3 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base text-[#111827]">
          {title} <span className="font-bold">({count})</span>
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-[#0052CC]" />
        ) : (
          <ChevronDown className="w-5 h-5 text-[#0052CC]" />
        )}
      </div>

      {isOpen && (
        <div className="mt-4 space-y-4">
          <TaskItem  item={item} handlDelete={handleDelete} handleEdit={handleEdit}/>
        </div>
      )}
    </div>
  );
}
