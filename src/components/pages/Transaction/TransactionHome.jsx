

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import TransactionModal from "./TransactionModal";
import API from "@/services/api";
import { toast } from "react-hot-toast";

export default function TransactionHome() {
  const [transactions, setTransactions] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTransactions(res.data || res.data.transactions);
    } catch (err) {
      toast.error("Failed to load transactions");
      console.log("failed to load transactions", err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const incomeTx = transactions.filter((t) => t.type === "income");
  const expenseTx = transactions.filter((t) => t.type === "expense");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">💰 Transactions</h1>

        <div className="flex gap-2">
          <Button onClick={() => setAddModalOpen(true)} className="flex items-center gap-1">
            <Plus className="w-4 h-4" />
            Add Transaction
          </Button>

          <Link to="/dashboard/transactions/manage">
            <Button variant="outline" className="flex items-center gap-1">
              <Settings className="w-4 h-4" />
              Manage
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : transactions.length === 0 ? (
                <p>No transactions found.</p>
              ) : (
                <ul className="divide-y">
                  {transactions.slice(0, 5).map((tx) => (
                    <li key={tx.id} className="flex justify-between py-2">
                      <span>{tx.category}</span>
                      <span
                        className={tx.type === "income" ? "text-green-600" : "text-red-500"}
                      >
                        ₦{tx.amount.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income">
          <TransactionList type="income" data={incomeTx} loading={loading} />
        </TabsContent>

        <TabsContent value="expense">
          <TransactionList type="expense" data={expenseTx} loading={loading} />
        </TabsContent>
      </Tabs>

      {/* Controlled Transaction Modal */}
      <TransactionModal
        openExternally={addModalOpen}
        setOpenExternally={setAddModalOpen}
        onSuccess={() => {
          setAddModalOpen(false);
          // Optionally refresh transactions
        }}
        triggerButton={false} // don't show internal trigger
      />


    </div>
  );
}

/* Reusable list for income/expense tabs */
function TransactionList({ type, data, loading }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === "income" ? "Income Transactions" : "Expense Transactions"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p>Loading...</p>
        ) : data.length === 0 ? (
          <p>No {type} transactions found.</p>
        ) : (
          <ul className="divide-y">
            {data.slice(0, 5).map((tx) => (
              <li key={tx.id} className="flex justify-between py-2">
                <span>{tx.category}</span>
                <span
                  className={tx.type === "income" ? "text-green-600" : "text-red-500"}
                >
                  ₦{tx.amount.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
