import React, { useState } from 'react';
import axiosService from '../Services/axiosService';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface SignupData {
  userName: string;
  emailId: string;
  password: string;
}

interface SignupPageProps {
  openModal: (content: React.ReactNode) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ openModal }) => {
  const [formData, setFormData] = useState<SignupData>({
    userName: '',
    emailId: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosService<any>('/auth/signup', 'post', formData);
      const user = response.data;
      if(user.success){
        navigate("/login");
      }else{
        openModal(<p>Error: {user.message}</p>);
      }
      console.log('Signed up user:', user);
      // Handle successful signup (e.g., redirect to dashboard)
    } catch (error: AxiosError) {
      console.error('Signup error:', error.message);
      openModal(<p>Error: {error.message}</p>);
      // Handle signup error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-mainBackgroundColor text-mainBackgroundColor">
      <div className="w-full max-w-md p-8 bg-columnBackgroundColor rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Signup</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label htmlFor="username" className="block text-white">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              required
              value={formData.userName}
              onChange={handleInputChange}
              className="w-full bg-white rounded-md px-4 py-2 focus:outline-none font-semibold text-mainBackgroundColor"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white">
              Email
            </label>
            <input
              type="email"
              id="emailId"
              name="emailId"
              required
              value={formData.emailId}
              onChange={handleInputChange}
              className="w-full bg-white rounded-md px-4 py-2 focus:outline-none font-semibold"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-white rounded-md px-4 py-2 focus:outline-none font-semibold"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition duration-300"
          >
            Signup
          </button>
        </form>
        <p className="text-white mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
