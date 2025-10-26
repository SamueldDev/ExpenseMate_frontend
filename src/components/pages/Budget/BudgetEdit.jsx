

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "@/services/api";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

export default function BudgetEdit() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    total_amount: "",
    spent_amount: "",
    limit_amount: "",
    start_date: "",
    end_date: ""
  });

   useEffect(() => {
    fetchBudget();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


   const fetchBudget = async () => {
    try {
      const res = await API.get(`/budgets/${id}`);
      const { name, total_amount, limit_amount, start_date, end_date } = res.data;
      
      setFormData({
      name: name || "",
      total_amount: total_amount || "",
      limit_amount: limit_amount || "",
      start_date: start_date || "",
      end_date: end_date || ""
    });
    } catch (err) {
      toast.error("Failed to load budget");
      console.error(err);
    }
  };

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/budgets/${id}`, formData);
      toast.success("Budget updated successfully!");
      navigate("/dashboard/budgets");
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Edit Budget</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Total Amount</label>
          <input
            name="total_amount"
            type="number"
            value={formData.total_amount}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Limit Amount</label>
          <input
            name="limit_amount"
            type="number"
            value={formData.limit_amount}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium ">Start Date</label>
          <Input
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">End Date</label>
          <Input
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  )
}
