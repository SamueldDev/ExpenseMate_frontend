

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 


export default function BudgetDetail() {
  const { id } = useParams();
  const [budget, setBudget] = useState(null);

   useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await API.get(`/budgets/${id}`);
        setBudget(res.data.budget);
      } catch (err) {
        toast.error("Failed to fetch budget details");
        console.error(err);
      }
    };
    fetchBudget();
  }, [id]);

  
  if (!budget) return <p>Loading...</p>;

  const remaining = budget.total_amount - budget.spent_amount;
  const spentPercent = ((budget.spent_amount / budget.total_amount) * 100).toFixed(1);


  return (
    <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
        <Link
          to="/dashboard/budget/manage"
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Manage Budgets
        </Link>
      </div>
      <h1 className="text-2xl font-semibold mb-4">{budget.name}</h1>
      <Card>
        <CardContent className="space-y-2">
          <p>Total: ₦{budget.total_amount}</p>
          <p>Spent: ₦{budget.spent_amount}</p>
          <p>Limit: ₦{budget.limit_amount}</p>
          <p className={remaining < 0 ? "text-red-500" : "text-green-600"}>
            Remaining: ₦{remaining}
          </p>
          <p className="text-sm text-gray-500">{spentPercent}% spent</p>
        </CardContent>
      </Card>
    </div>
  )
}
