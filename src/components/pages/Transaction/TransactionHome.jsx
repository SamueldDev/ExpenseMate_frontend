



import { Button } from "@/components/ui/button"
import { TabsContent,
         Tabs, 
         TabsList, 
         TabsTrigger, 
 } from "@/components/ui/tabs"
import { CardContent,
         Card, 
         CardHeader, 
         CardTitle,
 } from "@/components/ui/card"
import { Plus, Settings } from "lucide-react"
import { Link } from "react-router-dom";
import AddTransactionModal from "./AddTransactionModal";

export default function TransactionHome() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <div className="flex space-x-2">
        {/* Instead of linking to a new page, open modal */}
        <AddTransactionModal />
        {/* <Link to="/dashboard/transactions/add">
          <Button variant="outline" className="flex items-center space-x-1">
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </Button>
        </Link> */}
          <Button variant="outline" className="flex items-center space-x-1">
            <Settings className="w-4 h-4" />
            <span>Manage</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {/* All transactions table */}
        </TabsContent>
        <TabsContent value="income">
          {/* Income transactions */}
        </TabsContent>
        <TabsContent value="expense">
          {/* Expense transactions */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

