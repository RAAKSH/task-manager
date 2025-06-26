import { useState, type FC } from "react";
import TaskItem from "../TaskItem";
import type { Task } from "../../types/task";

interface TaskListProps {
//   title: string;
//   description: string;
//   setTitle: (value: string) => void;
//   setDescription: (value: string) => void;
//   onAdd: () => void;
}

const TaskList: FC<TaskListProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  const changeStatus = (id: number, status: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };
  return (
    <div className="mb-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onEdit={setEditingTask}
          onStatusChange={changeStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;
