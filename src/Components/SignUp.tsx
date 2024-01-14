import React from 'react';

const SignupPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-mainBackgroundColor text-mainBackgroundColor">
      <div className="w-full max-w-md p-8 bg-columnBackgroundColor rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Signup</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-white">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full bg-white rounded-md px-4 py-2 focus:outline-none font-semibold"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
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
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;