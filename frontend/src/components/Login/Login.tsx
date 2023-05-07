import { FormEvent, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../../Contexts/UserContext';
import axios from 'axios';
import './styles.css';

const Login = () => {
  const { userInfo, setUserInfo } = useContext(
    UserContext as React.Context<UserContextType>
  );

  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSignupFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const existingUser = await axios.post('http://localhost:5000/api/login', {
        username: userInfo.username,
        password: userInfo.password,
      });
      localStorage.setItem('userInfo', JSON.stringify(existingUser.data));
      setUserInfo(existingUser.data);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <form onSubmit={handleSignupFormSubmit}>
        <div className='login-container'>
          <h1>To-Do Application</h1>
          <div className='login-right'>
            <h2>Login</h2>

            <div className='login-inputFields'>
              <div className='login-inputGroup'>
                <input
                  type='text'
                  placeholder='Username'
                  name='username'
                  onChange={handleInput}
                  value={userInfo?.username}
                />
              </div>
              <div className='login-inputGroup'>
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  onChange={handleInput}
                  value={userInfo?.password}
                />
              </div>
            </div>

            <div className='login-buttonContainer'>
              <button type='submit'>Login</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
