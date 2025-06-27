

import type { Task } from "../types/task";


const TASKS_KEY = "taskList";

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(TASKS_KEY, JSON?.stringify(tasks));
}

export function getTasks() {
  const data = localStorage?.getItem(TASKS_KEY);
  return data ? JSON.parse(data) : [];
}
