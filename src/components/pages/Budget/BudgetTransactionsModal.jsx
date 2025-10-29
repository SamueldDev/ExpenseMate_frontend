

import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import API from '@/services/api';
import { 
        Dialog, 
        DialogContent, 
        DialogHeader, 
        DialogTitle 
} from "@/components/ui/dialog";
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button"

export default function BudgetTransactionsModal({ budget, onClose }) {

const [transactions, setTransactions] = useState([]);

useEffect(() => {
    if (!budget?._id) return;
    const fetchTransactions = async () => {
      try {
        const res = await API.get(`/transactions/budget/${budget._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTransactions(res.data.transactions || res.data);
      } catch (err) {
        toast.error("Failed to fetch transactions");
        console.error("Failed to fetch transactions", err)
      }
    };
    fetchTransactions();
  }, [budget]);



  return (
      <Dialog open={!!budget} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{budget?.name} — Transactions</DialogTitle>
        </DialogHeader>

        {transactions.length > 0 ? (
          <div className="max-h-[400px] overflow-y-auto space-y-2 mt-3">
            {transactions.map((tx) => (
              <div
                key={tx._id}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span>{tx.name}</span>
                <span className={`${tx.type === "income" ? "text-green-600" : "text-red-500"} font-medium`}>
                  ₦{tx.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">No transactions found for this budget.</p>
        )}

        <Button onClick={onClose} className="w-full mt-4">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}
