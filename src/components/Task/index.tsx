import { useState, type ChangeEvent } from "react";
import Header from "../Header/index";
import SearchBar from "../SearchBar/index";
import TaskSection from "../TaskSection/index";
import TaskForm from "../TaskForm";
import type { Task } from "../../types/task";

type ActionMode = "list" | "add" | "edit" | "delete";


function Tasks() {
  const [mode, setMode] = useState<ActionMode>("list");
  const [activeSection, setActiveSection] = useState<string | null>(
    "In Progress"
  );
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [addTask, setAddTask] = useState({
    id: 0,
    status: "Pending",
    title: "",
    desc: "",
  });

  const handleShowAddTask = () => {
    setMode("add");
  };

  const addTaskHandler = () => {
    console.log("=====", addTask);
    if (!addTask.title.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: addTask.title,
      desc: addTask.desc,
      status: addTask?.status,
    };
    setTaskList((prev) => [newTask, ...prev]);
    setAddTask({
      id: 0,
      title: "",
      desc: "",
      status: "",
    });
  };

  console.log("=====", taskList);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name && value) {
      setAddTask((prevState) => ({ ...prevState, [name]: value }));
    }
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
            {mode === "delete" && "Delete Task"}
          </h2>
        </div>
      )}

      {mode === "list" && (
        <>
          <SearchBar />
         

          {taskList?.map((item) => (
            <TaskSection
              key={item?.id}
              title={item?.title}
              count={item?.id}
              item={item}
              //isOpen={activeSection === "In Progress"}
            //   onToggle={() =>
            //     setActiveSection(
            //       activeSection === "In Progress" ? null : "In Progress"
            //     )
            //   }
            />
          ))}

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
        />
      )}
    </div>
  );
}

export default Tasks;
