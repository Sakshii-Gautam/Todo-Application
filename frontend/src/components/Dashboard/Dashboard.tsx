import React, { useState, useContext } from 'react';
import './styles.css';
import { UserContext, UserContextType } from '../../Contexts/UserContext';
import { toast } from 'react-toastify';
import { TodoContext, TodoContextType } from '../../Contexts/TodoContext';
import { useNavigate } from 'react-router-dom';

interface SubTaskInput {
  index: number;
  value: string;
}

const Dashboard = () => {
  const [newTodo, setNewTodo] = useState('');
  const [subTaskInputs, setSubTaskInputs] = useState<SubTaskInput[]>([]);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(
    UserContext as React.Context<UserContextType>
  );
  const { todos, setTodos } = useContext(
    TodoContext as React.Context<TodoContextType>
  );
  const addTodos = () => {
    if (newTodo.trim() !== '') {
      setTodos((prevTodos) => [...prevTodos, { title: newTodo, subTasks: [] }]);
      setNewTodo('');
    }
  };

  const addSubTask = (index: number) => {
    setSubTaskInputs((prevInputs) => [...prevInputs, { index, value: '' }]);
  };

  const handleSubTaskInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    setSubTaskInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.index === index ? { ...input, value } : input
      )
    );
  };

  const submitSubTask = (index: number) => {
    const inputObj = subTaskInputs.find((input) => input.index === index);
    if (inputObj && inputObj.value.trim() !== '') {
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        const newSubtask = {
          title: inputObj.value,
        };
        if (
          !updatedTodos[index].subTasks.some(
            (subTask) => subTask.title === newSubtask.title
          )
        ) {
          updatedTodos[index].subTasks.push(newSubtask);
        }
        return updatedTodos;
      });
    }

    setSubTaskInputs((prevInputs) =>
      prevInputs.filter((input) => input.index !== index)
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserInfo({ email: '', password: '' });
    toast.success('Successfully logged out!');
    navigate('/login');
  };

  const handleDeleteTodo = (index: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
  };

  return (
    <div className='dashboard-wrapper'>
      <div className='dashboard-header'>
        <h2>Dashboard</h2>
        <a style={{ cursor: 'pointer' }} onClick={handleLogout}>
          Logout &nbsp;
          <i className='fas fa-regular fa-arrow-right-from-bracket'></i>
        </a>
      </div>
      <div className='dashboard-container'>
        <p className='welcome-text'>
          Welcome{' '}
          {userInfo?.username ||
            JSON.parse(localStorage.getItem('userInfo') ?? 'null').username}
          !
        </p>
        <div className='input-container'>
          <input
            type='text'
            placeholder='New Todo'
            value={newTodo}
            onKeyDown={(e) => e.key === 'Enter' && addTodos()}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={addTodos}>Add Todo</button>
        </div>
        <ul className='todo-list'>
          {todos.map((todo, index) => (
            <li key={index} className='todo-item'>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className='todo-title'>{todo.title}</span>
                <i
                  className='fas fa-solid fa-trash-can'
                  style={{ marginLeft: '1rem', cursor: 'pointer' }}
                  onClick={() => handleDeleteTodo(index)}
                ></i>
              </div>
              <div className='subtask-input-container'>
                {subTaskInputs.find((input) => input.index === index) ? (
                  <>
                    <input
                      type='text'
                      placeholder='New Sub-Task'
                      value={
                        subTaskInputs.find((input) => input.index === index)
                          ?.value || ''
                      }
                      onKeyDown={(e) =>
                        e.key === 'Enter' && submitSubTask(index)
                      }
                      onChange={(e) => handleSubTaskInputChange(e, index)}
                    />
                    <button
                      className='add-subtask-btn'
                      onClick={() => submitSubTask(index)}
                    >
                      Add
                    </button>
                  </>
                ) : (
                  <button
                    className='add-subtask-btn'
                    onClick={() => addSubTask(index)}
                  >
                    Add sub-task
                  </button>
                )}
              </div>

              <ul className='subtask-list'>
                {todo.subTasks.map((subTask, subIndex) => (
                  <li key={subIndex} className='subtask-item'>
                    {subTask.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
