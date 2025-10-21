
import { useEffect, useState } from "react";
import { jwtDecode }  from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [ username, setUsername ] = useState("");
    const navigate = useNavigate();

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
        <h1>Welcome, <span className="font-bold">{username || "User"}</span>👋</h1>
        <p className="text-gray-600 mt-2">Glad to have you back!</p>
    </div>
  )
}



