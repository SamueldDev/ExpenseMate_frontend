

import QuickActionCard from "@/components/QuickActionCard"

export default function BudgetHome() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Your Budgets</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage, create, and track your budgets all in one place.
        </p>
      </div>

      {/* Quick Actions for Budgets */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <QuickActionCard
          to="/dashboard/budget/create"
          icon="PlusCircle"
          label="Create New Budget"
          color="text-green-500"
        />
        <QuickActionCard
          to="/dashboard/budget/manage"
          icon="Settings"
          label="Manage Budgets"
          color="text-blue-500"
        />
        <QuickActionCard
          to="/dashboard/budget/transactions"
          icon="Wallet"
          label="Add Transactions"
          color="text-purple-500"
        />
      </div>
    </div>
  )
}





