import { ChevronDown, ChevronUp } from "lucide-react";
import TaskItem from "../TaskItem";
import type { Task } from "../../types/task";

// interface tas] {
//   id: string;
//   status: string;
//   title: string;
//   desc: string;
// }

interface TaskSectionProps {
  title: string;
  count: number;
  item: Task[];
  handleDelete:(id:number)=>void;
  handleEdit:(item:Task)=>void;
  activeSection: string;
  setActiveSection:(section: string)=>void
}

export default function TaskSection({ title, count, item,handleDelete,handleEdit,activeSection, setActiveSection, }: TaskSectionProps) {
  const isOpen = activeSection === title;

  console.log("======",item)

  return (
    <div className="mb-4">
      <div
        className="flex justify-between items-center bg-[#F5F7FA] px-4 py-3 rounded-md cursor-pointer"
        onClick={() => setActiveSection(isOpen ? "" : title)}
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
          {item?.map((item) => (
            <TaskItem
              key={item.id}
              item={item as unknown as  Task}
              handlDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
