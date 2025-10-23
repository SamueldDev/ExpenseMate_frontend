
import { useEffect, useState } from "react";
import { jwtDecode }  from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

import { DropdownMenu,
         DropdownMenuContent,
        DropdownMenuGroup,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
 } from "../ui/dropdown-menu";

 import {
  NavigationMenu,  
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"

import { Avatar,
        AvatarFallback,
        AvatarImage
 } from "../ui/avatar"

// import { Button } from "../ui/button";

import { Menu, Bell } from "lucide-react"  

export default function Dashboard() {
    const [ username, setUsername ] = useState("");
    const navigate = useNavigate();

     // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT or session
    navigate("/login"); // redirect to login page
  };

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login");
            return;
        }
        if(token){
            try{
                const decoded = jwtDecode(token)
                setUsername(decoded.name)
            }catch(err){
                 console.error("Invalid token", err);
                 navigate("/login");
            }
        }
    }, [navigate])

  return (  
    <div className="p-6 text-center">
     <nav className="flex items-center justify-between px-6 py-4 border-b">
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {/* <Button variant="outline">Open</Button> */}
            <Menu variant="outline" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Home</DropdownMenuLabel>
            <DropdownMenuGroup>
            <DropdownMenuItem>
                Budget
            </DropdownMenuItem>
            <DropdownMenuItem>
                Transactions
            </DropdownMenuItem>
            <DropdownMenuItem>
                Analytics
            </DropdownMenuItem>
            <DropdownMenuItem>
                Notifications            
            </DropdownMenuItem>
            <DropdownMenuItem>
                Profile       
            </DropdownMenuItem>
            <DropdownMenuItem>
                Settings     
            </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
            Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <h1>Hello, <span className="font-bold">{username || "User"}</span>👋</h1>

     {/* Center/Right section — Navigation Menu */}
    <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                {/* <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link to="/login">Docs</Link>
                </NavigationMenuLink>  */}
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link to="/notifications" >
                       <span className="flex items-center gap-1">
                            <Bell />
                       </span>
                    </Link>
                </NavigationMenuLink>   
             </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>

      <DropdownMenu>
      {/* ✅ Trigger (clickable avatar) */}
      <DropdownMenuTrigger asChild>
        <button className="rounded-full focus:outline-none">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      {/* ✅ Dropdown Content */}
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    {/* <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
    </Avatar> */}
     </nav>
        
        <p className="text-gray-600 mt-2">Glad to have you back!</p>
        
    </div>
  )
}



