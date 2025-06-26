import type { FC } from "react";

interface Task {
  title: string;
  desc: string;
  id: number ;
  status: string;
}

interface TaskFormProps {
  onAdd: () => void;
  addTask: Task;
  onChangehandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const TaskForm: FC<TaskFormProps> = ({ onChangehandler, addTask, onAdd }) => (
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
        onClick={onAdd}
        className="bg-[#034EA2] text-white px-4 py-2 rounded"
      >
        Add
      </button>

      <button
        //onClick={onCancel}
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  </div>
);

export default TaskForm;
