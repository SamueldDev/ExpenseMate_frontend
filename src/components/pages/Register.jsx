
import { Input } from "../ui/input";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // basic form validation
    if (!name || !email || !password) {
      return alert("All fields must be filled.");
    }
    setLoading(true);
    try {
      const res = await API.post("/users/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
     <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Create an Account on ExpenseMate ✨
      </h1>
      <form onSubmit={handleSignUp} className="space-y-4">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                aria-label="Name"
              />
              <FieldDescription>Enter your full name.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email"
              />
              <FieldDescription>We'll use this to send you updates.</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                aria-label="Password"
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        <Button className="mb-2 w-full" type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>

      <p className="mt-4 text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
        Forgot your password?{" "}
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Reset it here
        </Link>
      </p>
    </div>
  );
}






