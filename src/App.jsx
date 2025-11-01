

import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/pages/Home"
import Dashboard from "./components/pages/Dashboard"
import DashboardLayout from "./layouts/DashboardLayout"

import BudgetCreate from "./components/pages/Budget/BudgetCreate"
import BudgetManage from "./components/pages/Budget/BudgetManage"
import BudgetTransaction from "./components/pages/Budget/BudgetTransaction"
import BudgetHome from "./components/pages/Budget/BudgetHome"
import BudgetEdit from "./components/pages/Budget/BudgetEdit"

import TransactionHome from "./components/pages/Transaction/TransactionHome"
import ManageTransaction from "./components/pages/Transaction/ManageTransaction"
import BudgetDetail from "./components/pages/Budget/BudgetDetail"
import AnalyticsHome from "./components/pages/Analytics/AnalyticsHome"


import { Toaster } from "react-hot-toast"

export default function App() {
  return (
     <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Pages */}
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 px-4">
              <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 sm:p-8">
                <Home />
              </div>
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 px-4">
              <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 sm:p-8">
                <Login />
              </div>
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 px-4">
              <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 sm:p-8">
                <Register />
              </div>
            </div>
          }
        />

          {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

            {/* Budget Section */}
          <Route path="budgets" element={<BudgetHome />} />
          <Route path="budget/create" element={<BudgetCreate />} />
          <Route path="budget/manage" element={<BudgetManage />} />
          <Route path="budget/transactions" element={<BudgetTransaction />} />
          <Route path="budgets/:id" element={<BudgetDetail />} />
          <Route path="budgets/:id/edit" element={<BudgetEdit />} />

          {/* Transaction section */}
          <Route path="transactions" element={<TransactionHome />} />
          <Route path="transactions/manage" element={<ManageTransaction />} />

          {/* Analytics Section */}
          <Route path="analytics" element={<AnalyticsHome />} />
          
        </Route>
      </Routes>
    </BrowserRouter>

  )
}




