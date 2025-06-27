import type { Task } from "../../types/task";
import { Pencil, Trash } from "lucide-react";

interface TaskItemProps {
  item: Task;
  handlDelete: (id: number) => void;
  handleEdit: (task: Task) => void;
}
export default function TaskItem({
  item,
  handlDelete,
  handleEdit,
}: TaskItemProps) {
  const date = new Date(item?.id);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  const formattedDate = ` ${day}, ${month} ${year}`;

  return (
    <div className="flex justify-between items-start">
      <div className="flex gap-3 w-full">
        <div className="w-10 h-10 rounded-full border-2 border-[#0052CC] text-[#0052CC] font-medium text-sm flex items-center justify-center">
          {item?.title?.charAt(0) || "?"}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-[#0052CC] font-semibold text-base">
              {item?.title}
            </h3>
            <div className="flex gap-1 text-sm text-[#111827] whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] mt-1"></span>
             
              {item?.status.charAt(0).toUpperCase() + item?.status.slice(1)}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-[#111827] mt-1">{item?.desc}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-[#9CA3AF]">{formattedDate}</p>
            <div className="flex gap-2">
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handlDelete(item?.id as unknown as number)}
              >
                <Trash size={16} />
              </button>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleEdit(item)}
              >
                <Pencil size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
