

import { useEffect, useState  } from "react";
import { Link } from "react-router-dom";
import API from "@/services/api";
import { toast } from "react-hot-toast";
import { Card,
        CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Trash2, Edit, PlusCircle } from "lucide-react";


export default function BudgetManage() {
     const [budgets, setBudgets] = useState([]);

  useEffect(() => {  
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
    try {
      const res = await API.get("/budgets");
      setBudgets(res.data.budgets);

    } catch (err) {
      toast.error("Failed to load budgets");
      console.error(err);
    }
  };


  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this budget?")) return;
    try {
      await API.delete(`/budgets/${id}`);
      toast.success("Budget deleted");
      setBudgets(budgets.filter((b) => b._id !== id));
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Budgets</h1>
        <Link to="/dashboard/budget/create">
          <Button className="flex items-center gap-2 cursor-pointer">
            <PlusCircle size={18} /> Create Budget
          </Button>
        </Link>
      </div>
     {Array.isArray(budgets) && budgets.length === 0 ? ( 
        <p className="text-gray-500">No budgets yet. Create one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {budgets.map((budget) => {
            const remaining = budget.total_amount - budget.spent_amount;
            const spentPercent = ((budget.spent_amount / budget.total_amount) * 100).toFixed(1);

            return (
              <Card
                key={budget.id}
                className="relative group hover:shadow-lg transition p-4"
              >
                <Link to={`/budgets/${budget._id}`}>
                  <CardContent>
                    <h2 className="text-lg font-semibold mb-2">{budget.name}</h2>
                    <p className="text-sm text-gray-600">Total: ₦{budget.total_amount}</p>
                    <p className="text-sm text-gray-600">Spent: ₦{budget.spent_amount}</p>
                    <p className="text-sm text-gray-600">Limit: ₦{budget.limit_amount}</p>
                    <p className={`text-sm ${remaining < 0 ? "text-red-500" : "text-green-600"}`}>
                      Remaining: ₦{remaining}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      {spentPercent}% spent
                    </div>
                  </CardContent>
                </Link>

                {/* Hover Buttons */}
                <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
                  <Link to={`/dashboard/budgets/${budget._id}/edit`}>
                    <Button variant="ghost" size="icon">
                      <Edit size={16} />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(budget._id)}>
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
          )}
    </div>
  )
}



















//   useEffect(() => {
//   console.log("Budgets updated:", budgets);
// }, [budgets]);
