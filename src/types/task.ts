export interface Task {
    id: number;
    title: string;
    desc: string;
    status: 'Pending' | 'In Progress' | 'Completed';
  }
  