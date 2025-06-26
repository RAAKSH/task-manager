import type { Task } from "../../types/task";
import { Pencil, Trash } from 'lucide-react';


interface TaskItemProps {
    item: Task;
  }
export default function TaskItem({ item }: TaskItemProps) {
  const date = new Date(item?.id);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const formattedDate = ` ${day}, ${month} ${year}`;

  return (
    <div className="flex justify-between items-start">
      <div className="flex gap-3 w-full">
        <div className="w-10 h-10 rounded-full border-2 border-[#0052CC] text-[#0052CC] font-medium text-sm flex items-center justify-center">
          L
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-[#0052CC] font-semibold text-base">
              {item?.title}
            </h3>
            <div className="flex gap-1 text-sm text-[#111827] whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] mt-1"></span>
              {item?.status}
            </div>
          </div>

          <p className="text-sm text-[#111827] mt-1">{item?.desc}</p>
          <p className="text-sm text-[#9CA3AF] mt-2">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
