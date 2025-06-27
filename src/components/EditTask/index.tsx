import { useState, type FC } from "react";
import { STATUS } from "../../constants";

interface Task {
  title: string;
  desc: string;
  id: number;
  status: string;
}

interface EditTaskFormProps {
  onEdit: () => void;
  editingTask: Task;
  onChangehandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onCancel:()=>void
}

const EditTask: FC<EditTaskFormProps> = ({
  onChangehandler,
  editingTask,
  onEdit,
  onCancel
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentStatus = STATUS?.find(s => s.value === editingTask.status) || STATUS[0];

return (
  <div className="mb-4 mt-4">
    <input
      value={editingTask?.title}
      onChange={(e) => onChangehandler(e)}
      placeholder="Enter the title"
      className="w-full p-2 border rounded mb-2"
      name={"title"}
    />
    <textarea
      value={editingTask?.desc}
      onChange={(e) => onChangehandler(e)}
      placeholder="Enter the description"
      className="w-full p-2 border rounded mb-4"
      name={"desc"}
    />

    <div className="relative mb-4">
        <button
          type="button"
          className="w-full flex items-center justify-between p-2 border rounded cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${currentStatus.color}`} />
            <span>{currentStatus.label}</span>
          </div>
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
            {STATUS?.map((status) => (
              <div
                key={status.value}
                onClick={() => {
                  onChangehandler({
                    target: { name: "status", value: status.value },
                  } as never);
                  setDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                <div className={`w-4 h-4 rounded-full ${status.color}`} />
                <span>{status.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between w-full mt-4">
      <button
        onClick={onCancel}
        className="bg-gray-300 text-black rounded hover:bg-gray-400 w-[110px] h-[40px]"
      >
        Cancel
      </button>

      <button
        onClick={onEdit}
        className="bg-[#034EA2] text-white rounded w-[110px] h-[40px]"
      >
        Update
      </button>
    </div>
  </div>)
};

export default EditTask;
