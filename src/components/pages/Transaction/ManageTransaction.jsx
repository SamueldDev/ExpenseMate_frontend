

import { useState, useEffect } from "react";
import TransactionTable from "./TransactionTable";
import TransactionFilter from "./TransactionFilter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TransactionModal from "./TransactionModal";

import API from "@/services/api";
import { toast } from "react-hot-toast";

export default function ManageTransaction() {
  const [filter, setFilter] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);

  //  Fetch transactions
  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTransactions(res.data.transactions || res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Transaction deleted");
      fetchTransactions();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <section className="p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">⚙️ Manage Transactions</h2>
        <Button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add New
        </Button>
      </div>

      {/* Search/Filter */}
      <TransactionFilter filter={filter} setFilter={setFilter} />

      {/* Transaction Table */}
      <TransactionTable
        transactions={transactions}
        filter={filter}
        onEdit={(tx) => {
          setSelectedTx(tx);
          setEditModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/*  Add Transaction Modal */}
      {addModalOpen && (
        <TransactionModal
          openExternally={addModalOpen}
          setOpenExternally={setAddModalOpen}
          onSuccess={fetchTransactions}
          triggerButton={false}
        />
      )}

      {/*  Edit Transaction Modal (reuses same component) */}
      {editModalOpen && (
        <TransactionModal
          editData={selectedTx}
          openExternally={editModalOpen}
          setOpenExternally={setEditModalOpen}
          onSuccess={fetchTransactions}
          triggerButton={false}
        />
      )}
    </section>
  );
}



