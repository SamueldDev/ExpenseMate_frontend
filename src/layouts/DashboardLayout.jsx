
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

import { Avatar, AvatarImage, AvatarFallback  } from "@/components/ui/avatar";

import { DropdownMenuItem,
        DropdownMenu, 
        DropdownMenuTrigger,
        DropdownMenuContent,
        DropdownMenuLabel,
        DropdownMenuSeparator, 
  
} from "@/components/ui/dropdown-menu";  

import { Bell, Menu } from "lucide-react";


export default function DashboardLayout() {
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUsername(decoded.name);
    } catch (err) {
      console.error("Invalid token", err);
      navigate("/login");
    }
  }, [navigate]);


  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* SIDEBAR */}
      <aside
        className={`${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white border-r shadow-sm transform transition-transform duration-200 ease-in-out z-40 flex flex-col`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">ExpenseMate</h2>
        </div>

        <nav className="flex flex-col gap-3 p-4 text-gray-700 font-medium flex-1">
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
          <Link to="/dashboard/budgets" onClick={() => setMenuOpen(false)}>
            Budgets
          </Link>
          <Link to="/dashboard/transactions" onClick={() => setMenuOpen(false)}>
            Transactions
          </Link>
          <Link to="/dashboard/transactions" onClick={() => setMenuOpen(false)}>
            Analytics
          </Link>
          <Link to="/dashboard/settings" onClick={() => setMenuOpen(false)}>
            Settings
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="mt-auto text-red-600 font-medium"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* MAIN SECTION */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Top Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
          <button
            className="md:hidden p-2 border rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>

          <h1 className="text-lg font-semibold">
            Hello, <span className="font-bold">{username || "User"}</span> 👋
          </h1>

          <div className="flex items-center gap-4">
            <Link to="/dashboard/notifications">
              <Bell className="w-5 h-5" />
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full focus:outline-none">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                    <AvatarFallback>{username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-gray-50">
          {/*  This renders nested pages like /dashboard/settings */}
          <Outlet />
        </main>
      </div>
    </div>







  )
}
