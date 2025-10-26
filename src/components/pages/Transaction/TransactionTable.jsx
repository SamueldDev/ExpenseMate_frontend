

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";

export default function TransactionTable({ transactions = [], filter, onEdit, onDelete }) {
    
  // Filter transactions by search input (client-side filtering)
  const filteredTransactions = transactions.filter((tx) =>
    tx.name?.toLowerCase().includes(filter.toLowerCase()) ||
    tx.category?.toLowerCase().includes(filter.toLowerCase()) ||
    tx.type?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            filteredTransactions.map((tx) => (
              <TableRow key={tx._id || tx.id}>
                <TableCell>
                  {new Date(tx.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{tx.name}</TableCell>
                <TableCell>{tx.category || "-"}</TableCell>
                <TableCell>₦{Number(tx.amount).toLocaleString()}</TableCell>
                <TableCell
                  className={
                    tx.type === "income" ? "text-green-600" : "text-red-500"
                  }
                >
                  {tx.type}
                </TableCell>
                <TableCell>{tx.note || "-"}</TableCell>

                {/* Actions */}
                <TableCell className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(tx)}
                    title="Edit Transaction"
                  >
                    <Pencil className="w-4 h-4 text-blue-500" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(tx._id || tx.id)}
                    title="Delete Transaction"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}



