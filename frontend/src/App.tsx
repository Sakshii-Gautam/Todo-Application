import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Private from './components/Private/Private';
import { UserProvider } from './Contexts/UserContext';
import { ToastContainer } from 'react-toastify';
import { TodoProvider } from './Contexts/TodoContext';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <UserProvider>
      <TodoProvider>
        <ToastContainer autoClose={1000} theme='dark' position='top-center' />
        <Routes>
          <Route element={<Private />}>
            <Route path='/' element={<Dashboard />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </TodoProvider>
    </UserProvider>
  );
};

export default App;
