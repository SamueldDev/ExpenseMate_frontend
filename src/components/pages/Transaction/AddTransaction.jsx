


// can be configured for mobile later
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import API from "@/services/api";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// // import { Calender } from "@/components/ui/calendar";
// import { Calendar } from "@/components/ui/calendar";
// import { Dialog,
//          DialogContent, 
//          DialogHeader, 
//          DialogTitle, 
//          DialogTrigger
//  } from "@/components/ui/dialog";
// import { RadioGroup,
//          RadioGroupItem 
//  } from "@/components/ui/radio-group";
// import { Popover,
//          PopoverContent,
//          PopoverTrigger   
// } from "@/components/ui/popover";
// import { Select, 
//          SelectContent, 
//          SelectItem, 
//          SelectTrigger, 
//          SelectValue  
// } from "@/components/ui/select";
// import { useForm } from "react-hook-form";
// import { format } from "date-fns";
// import { CalendarIcon, PlusCircle } from "lucide-react";


// export default function AddTransaction() {

//     const [open, setOpen] = useState(false);
//     const [budgets, setBudgets] = useState([]);
//     const [date, setDate] = useState(null);
//     const { register, handleSubmit, setValue, reset, watch } = useForm();
    
//     const transactionType = watch("type");


//      // Fetch budgets from backend
//     useEffect(() => {
//         API
//         .get("/budgets") // adjust to your backend route
//         .then((res) => setBudgets(res.data))
//         .catch(() => toast.error("Failed to load budgets"));
//     }, []);

//     const onSubmit = async (data) => {
//     try {
//       const payload = {
//         name: data.name,
//         type: data.type,
//         amount: parseFloat(data.amount),
//         category: data.category,
//         note: data.note,
//         budget: data.budget || null,
//         date: date ? format(date, "yyyy-MM-dd") : new Date(),
//       };

      
//       await API.post("/api/transactions", payload);
//       toast.success("Transaction added successfully!");
//       reset();
//       setDate(null);
//       setOpen(false);
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to add transaction");
//     }
//   };


//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="flex items-center gap-2">
//           <PlusCircle className="w-4 h-4" />
//           Add Transaction
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Add New Transaction</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
//           {/* Type */}
//           <div>
//             <Label>Transaction Type</Label>
//             <RadioGroup
//               onValueChange={(val) => setValue("type", val)}
//               className="flex gap-4 mt-2"
//             >
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="income" id="income" />
//                 <Label htmlFor="income">Income</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <RadioGroupItem value="expense" id="expense" />
//                 <Label htmlFor="expense">Expense</Label>
//               </div>
//             </RadioGroup>
//           </div>

//           {/* Name */}
//           <div>
//             <Label htmlFor="name">Name</Label>
//             <Input
//               id="name"
//               placeholder="e.g. Salary, Groceries, Rent"
//               {...register("name", { required: true })}
//             />
//           </div>

//           {/* Amount */}
//           <div>
//             <Label htmlFor="amount">Amount</Label>
//             <Input
//               id="amount"
//               type="number"
//               step="0.01"
//               placeholder="Enter amount"
//               {...register("amount", { required: true })}
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <Label htmlFor="category">Category</Label>
//             <Input
//               id="category"
//               placeholder="e.g. Food, Transport, Salary"
//               {...register("category")}
//             />
//           </div>

//           {/* Budget (optional, only after type is picked) */}
//           {transactionType && (
//             <div>
//               <Label>Select Budget (optional)</Label>
//               <Select onValueChange={(val) => setValue("budget", val)}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Choose a budget" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {budgets.length > 0 ? (
//                     budgets.map((b) => (
//                       <SelectItem key={b._id} value={b._id}>
//                         {b.name}
//                       </SelectItem>
//                     ))
//                   ) : (
//                     <SelectItem disabled>No budgets available</SelectItem>
//                   )}
//                 </SelectContent>
//               </Select>
//             </div>
//           )}

//           {/* Date Picker */}
//           <div>
//             <Label>Date</Label>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="w-full justify-start text-left font-normal"
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {date ? format(date, "PPP") : <span>Pick a date</span>}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent align="start" className="p-0">
//                 <Calendar mode="single" selected={date} onSelect={setDate} />
//               </PopoverContent>
//             </Popover>
//           </div>

//           {/* Note */}
//           <div>
//             <Label htmlFor="note">Note (optional)</Label>
//             <Textarea
//               id="note"
//               placeholder="Add a short note..."
//               {...register("note")}
//             />
//           </div>

//           {/* Save Button */}
//           <Button type="submit" className="w-full mt-2">
//             Save Transaction
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
