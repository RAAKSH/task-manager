import type { FC } from "react";


interface Task {
  title: string;
  desc: string;
  id: number;
  status: string;
}

interface TaskFormProps {
  onAdd: () => void;
  addTask: Task;
  onChangehandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onCancel: () => void;
}

const TaskForm: FC<TaskFormProps> = ({
  onChangehandler,
  addTask,
  onAdd,
  onCancel,
}) => (
  <div className="mb-4 mt-4">
    <input
      value={addTask?.title}
      onChange={(e) => onChangehandler(e)}
      placeholder="Enter the title"
      className="w-full p-2 border rounded mb-2"
      name={"title"}
    />
    <textarea
      value={addTask?.desc}
      onChange={(e) => onChangehandler(e)}
      placeholder="Enter the description"
      className="w-full p-2 border rounded mb-4"
      name={"desc"}
    />

    <div className="flex justify-between w-full mt-4">
      <button
        onClick={onCancel}
        className="bg-gray-300 text-black rounded hover:bg-gray-400 w-[110px] h-[40px]"
      >
        Cancel
      </button>

      <button
        onClick={onAdd}
        className="bg-[#034EA2] text-white rounded w-[110px] h-[40px]"
      >
        Add
      </button>
    </div>
  </div>
);

export default TaskForm;
