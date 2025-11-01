

import React from 'react'
import { useState } from 'react'
import API from '@/services/api'
import { Card, CardContent,  } from '@/components/ui/card'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AnalyticsHome() {

    const [ summary, setSummary ] = useState(null)
    const [ monthly, setMonthly ] = useState(null)
    const [ categories, setCategories ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    const fetchAnalytics = async () => {
     try {
        
        const [ summaryRes, monthlyRes, categoriesRes ] = await Promise.all([
            API.get("transactions/summary"),
            API.get("transactions/monthly"),
            API.get("transactions/categories")
        ])

        setSummary(summaryRes.data)
        setMonthly(monthlyRes.data)
        setCategories(categoriesRes.data)
     } catch (error) {
         console.error(error);
      toast.error("Failed to load analytics");
     } finally{
        setLoading(false)
     }
    }

    useEffect(() => {
    fetchAnalytics();
    }, []);

   if (loading) return <div className="text-center mt-10">Loading analytics...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <h2 className="text-lg font-semibold">Total Income</h2>
          <p className="text-green-600 text-2xl font-bold">
            ₦{summary?.totalIncome?.toLocaleString() ?? 0}
          </p>
        </Card>

        <Card className="p-4 text-center">
          <h2 className="text-lg font-semibold">Total Expense</h2>
          <p className="text-red-600 text-2xl font-bold">
            ₦{summary?.totalExpense?.toLocaleString() ?? 0}
          </p>
        </Card>

        <Card className="p-4 text-center">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-blue-600 text-2xl font-bold">
            ₦{summary?.balance?.toLocaleString() ?? 0}
          </p>
        </Card>
      </div>

      {/* --- Monthly Chart --- */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Monthly Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthly}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#16a34a" name="Income" />
              <Bar dataKey="expense" fill="#dc2626" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* --- Category Chart --- */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-2">Expenses by Category</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart width={400} height={400}>
                <Pie
                    data={categories}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label={({ name, value }) => `${name}: ₦${value.toLocaleString()}`}
                >
                    {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>

                <Tooltip
                    formatter={(value) => `₦${value.toLocaleString()}`}
                />
                <Legend />
         </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
