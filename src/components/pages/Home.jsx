

import {  Link } from "react-router-dom";

export default function Home() {
    
  return (
    <div>
      <h1 className="text-center mt-4 text-lg font-bold ">Onboarding to ExpenseMate</h1>
      <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
                Register
          </Link>
      </p>
      <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    
    </div>
  )
}

