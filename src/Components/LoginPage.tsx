import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosService from '../Services/axiosService';
import { AxiosError } from 'axios';
import localStorageService from '../Services/localStorageServices';

interface LoginProps {
  openModal: (content: React.ReactNode) => void;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}


const LoginPage: React.FC<LoginProps> = ({openModal, setIsLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigator = useNavigate();

  useEffect(() => {
    const user = localStorageService.isLoggedIn();
    if(user)  setIsLoggedIn(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosService<any>("/auth/login",  'post',{ emailId: email, password: password });
      if(response.data.success){
        localStorageService.setItem("user", response.data.body.loginDetails.user);
        localStorageService.setItem("columns", response.data.body.loginDetails.columns);
        localStorageService.setItem("tasks", response.data.body.loginDetails.tasks);
        setIsLoggedIn(true);
        navigator("/kanban");
      }
      console.log('Logging in with:', email);
    } catch (error: AxiosError) {
      console.error('Login error:', error);
      openModal(<p>{error?.response?.data.message}</p>)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-mainBackgroundColor text-mainBackgroundColor">
      <div className="w-full max-w-md p-8 bg-columnBackgroundColor rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white rounded-md px-4 py-2 focus:outline-none font-semibold"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white rounded-md px-4 py-2 focus:outline-none font-semibold"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-white mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;