import React, {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';

interface Todo {
  title: string;
  subTasks: SubTask[];
}

interface SubTask {
  title: string;
}

export interface TodoContextType {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
