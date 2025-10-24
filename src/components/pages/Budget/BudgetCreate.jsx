

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card,
        CardHeader, 
        CardTitle, 
        CardContent 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


import API from "../../../services/api"

import toast from "react-hot-toast";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function CreateBudget() {
  const [formData, setFormData] = useState({
    name: "",
    total_amount: "",
    limit_amount: "",
    start_date: "",
    end_date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/budgets", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Budget created successfully!");
      navigate("/dashboard/budgets");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create budget");
    }
  };

  return (
    <div className="p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="max-w-lg mx-auto shadow-xl border dark:border-neutral-800">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Create a New Budget
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  placeholder="e.g., Entertainment saga"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label>Total Amount</Label>
                <Input
                  name="total_amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.total_amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label>Limit Amount</Label>
                <Input
                  name="limit_amount"
                  type="number"
                  placeholder="Enter limit_amount"
                  value={formData.limit_amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Budget
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}


