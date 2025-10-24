

import { Card, CardContent } from "../components/ui/card"
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function QuickActionCard({ to, icon, label, color = "text-blue-500" }) {
    const Icon = Icons[icon];
    
  return (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          className={`group transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]`}
        >
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Icon
              className={`w-10 h-10 mb-3 ${color} transition-transform duration-300 group-hover:scale-110`}
            />
            <h2 className="font-semibold text-lg text-center transition-colors duration-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {label}
            </h2>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}


















 //  <Link to={to}>
    //   <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
    //     <CardContent className="flex flex-col items-center justify-center py-8">
    //       <Icon className={`w-10 h-10 mb-2 ${color}`} />
    //       <h2 className="font-semibold text-lg text-center">{label}</h2>
    //     </CardContent>
    //   </Card>
    // </Link>
