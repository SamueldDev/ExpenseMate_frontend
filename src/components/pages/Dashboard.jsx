

import QuickActionCard from "../QuickActionCard"

export default function Dashboard() {
 

  return (  
    
     <div className="p-6 space-y-8">
      {/* Greeting */}
      <div>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your financial overview for today.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <QuickActionCard
          to="/dashboard/budget/create"
          icon="PlusCircle"
          label="Create Budget"
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
          label="Add Transaction"
          color="text-purple-500"
        />
      </div>
    </div>

  )
}































































{/* <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link to="/login">Docs</Link>
                </NavigationMenuLink>  */}

 {/* <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
    </Avatar> */}