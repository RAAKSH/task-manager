import { useEffect, useState, type ChangeEvent } from "react";
import Header from "../Header/index";
import SearchBar from "../SearchBar/index";
import TaskSection from "../TaskSection/index";
import TaskForm from "../TaskForm";
import type { Task } from "../../types/task";
import EditTask from "../EditTask";
import { getTasks, saveTasks } from "../../utils/TaskStore";
import { MAP_STATUS } from "../../constants";

type ActionMode = "list" | "add" | "edit" | "delete";

function Tasks() {
  const [mode, setMode] = useState<ActionMode>("list");
  const [editingTask, setEditingTask] = useState<Task>();
  const [activeSection, setActiveSection] = useState<string>("In Progress");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [addTask, setAddTask] = useState({
    id: 0,
    status: "pending",
    title: "",
    desc: "",
  });

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      const getAllTasks = getTasks();
      if (getAllTasks.length > 0) {
        setTaskList(getAllTasks);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    saveTasks(taskList);
  }, [taskList]);

  useEffect(() => {}, []);

  const handleShowAddTask = () => {
    setMode("add");
  };

  const addTaskHandler = () => {
    if (!addTask.title.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: addTask.title,
      desc: addTask.desc,
      status: addTask?.status,
    };
    console.log("=====", addTask);

    setTaskList((prev) => [newTask, ...prev]);

    setAddTask({
      id: 0,
      title: "",
      desc: "",
      status: "pending",
    });
    setMode("list");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name && value) {
      setAddTask((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleDelete = (id: number) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name && value) {
      setEditingTask((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleEdit = (item: Task) => {
    setMode("edit");
    setEditingTask(item);
  };

  const editTaskHandler = () => {
    if (!editingTask) return;

    setTaskList((prev) =>
      prev.map((task) => (task.id === editingTask.id ? editingTask : task))
    );
    setEditingTask({});
    setMode("list");
  };

  const onCancel = () => {
    setMode("list");
  };

  const showTasks = () => {
    return (
      <>
        {MAP_STATUS?.map((status) => {
          const filteredTasks = taskList?.filter((task) => {
            const matchedStatus = task?.status.toLowerCase() === status.toLowerCase();
            const matchedSearch = task?.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchedStatus && matchedSearch;
          });
          if (filteredTasks.length === 0) return null;
          return (
            <TaskSection
              key={status}
              title={status.charAt(0).toUpperCase() + status.slice(1)}
              count={filteredTasks.length}
              item={filteredTasks}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          );
        })}
      </>
    );
  };

  return (
    <div className="relative min-h-screen bg-white p-4 max-w-md mx-auto border-1 border-b-gray-300">
      {mode === "list" ? (
        <Header />
      ) : (
        <div className="bg-[#034EA2] text-white text-lg font-bold px-6 py-4 flex items-center gap-2 px-4 py-3">
          <button onClick={() => setMode("list")} className="text-xl">
            ←
          </button>
          <h2 className="text-lg font-semibold">
            {mode === "add" && "Add Task"}
            {mode === "edit" && "Edit Task"}
          </h2>
        </div>
      )}

      {mode === "list" && (
        <>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading tasks...
            </div>
          ) : (
            showTasks()
          )}
          <button
            className="absolute bottom-6 right-6 bg-[#034EA2] text-white w-14 h-14 rounded-full text-2xl flex items-center justify-center shadow-lg"
            onClick={handleShowAddTask}
          >
            +
          </button>
        </>
      )}

      {mode === "add" && (
        <TaskForm
          onChangehandler={(e) => handleChange(e)}
          addTask={addTask}
          onAdd={addTaskHandler}
          onCancel={onCancel}
        />
      )}

      {mode === "edit" && (
        <EditTask
          onChangehandler={(e) => handleEditChange(e)}
          editingTask={editingTask}
          onEdit={editTaskHandler}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}

export default Tasks;
