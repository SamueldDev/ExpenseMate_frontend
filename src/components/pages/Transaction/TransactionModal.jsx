
import { useState, useEffect } from "react";
import { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import API from "@/services/api";


export default function TransactionModal({
  editData = null,
  triggerButton = true,
  onSuccess,
  openExternally,
  setOpenExternally,
  }) {
  
  const isEdit = !!editData;
  const [open, setOpen] = useState(false);
  const isControlled = openExternally !== undefined && setOpenExternally !== undefined;
  const [budgets, setBudgets] = useState([]);
  const [date, setDate] = useState(null);
  const [transactionType, setTransactionType] = useState("");
  const { register, handleSubmit, setValue, reset } = useForm();

  const actualOpen = isControlled ? openExternally : open;
  const setActualOpen = isControlled ? setOpenExternally : setOpen;


  // Sync external open state (used for Manage Transactions table)
  useEffect(() => {
    if (openExternally !== undefined) setOpen(openExternally);
  }, [openExternally]);

    const fetchBudgets = useCallback(async () => {
    try {
        const res = await API.get("/budgets", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBudgets(res.data.budgets || res.data);
    } catch (err) {
        toast.error("Unable to fetch budgets");
        console.error("Unable to fetch budgets", err);
    }
    }, []);

  // Preload edit data
  useEffect(() => {
    if (isEdit && editData) {
      reset({
        name: editData.name,
        type: editData.type,
        amount: editData.amount,
        category: editData.category,
        note: editData.note,
        budget: editData.budgetId || "",
      });
      setDate(new Date(editData.date));
      setTransactionType(editData.type);
      if (editData.type === "expense") fetchBudgets();
    }
  }, [isEdit, editData, reset, fetchBudgets]);


  const handleTypeChange = (value) => {
    setTransactionType(value);
    setValue("type", value);
    if (value === "income") {
      setBudgets([]);
      setValue("budget", "");
    } else {
      fetchBudgets();
    }
  };


  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      type: data.type,
      amount: parseFloat(data.amount),
      category: data.category,
      note: data.note,
      budgetId: data.budget || null,
      date: date ? format(date, "yyyy-MM-dd") : new Date(),
    };

    try {
      if (isEdit) {
        await API.put(`/transactions/${editData._id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("Transaction updated successfully!");
      } else {
        await API.post("/transactions", payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        toast.success("Transaction added successfully!");
      }

      reset();
      setDate(null);
      setTransactionType("");
      setOpen(false);
      setOpenExternally?.(false);
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  return (
  <Dialog open={actualOpen} onOpenChange={setActualOpen}>

      {triggerButton && (
        <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            {isEdit ? "Edit Transaction" : "Add Transaction"}
            </Button>
        </DialogTrigger>
        )}


      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Transaction" : "Add New Transaction"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* Type */}
          <div>
            <Label>Transaction Type</Label>
            <RadioGroup
              onValueChange={handleTypeChange}
              value={transactionType}
              className="flex gap-4 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="income" id="income" />
                <Label htmlFor="income">Income</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="expense" id="expense" />
                <Label htmlFor="expense">Expense</Label>
              </div>
            </RadioGroup>
          </div>

      
          <div>
            <Label>Name</Label>
            <Input placeholder="e.g. Salary, Groceries, Rent" {...register("name", { required: true })} />
          </div>

      
          <div>
            <Label>Amount</Label>
            <Input type="number" step="0.01" placeholder="Enter amount" {...register("amount", { required: true })} />
          </div>

       
          <div>
            <Label>Category</Label>
            <Input placeholder="e.g. Food, Transport" {...register("category")} />
          </div>

          {/* Budget (only if Expense) */}
          {transactionType === "expense" && (
            <div>
              <Label>Select Budget (optional)</Label>
              <Select onValueChange={(val) => setValue("budget", val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgets.length > 0 ? (
                    budgets.map((b) => (
                      <SelectItem key={b._id} value={b._id}>
                        {b.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled>No budgets available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label>Note (optional)</Label>
            <Textarea placeholder="Add a short note..." {...register("note")} />
          </div>

          <Button type="submit" className="w-full mt-2">
            {isEdit ? "Update Transaction" : "Save Transaction"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

