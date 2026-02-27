import React, { useState, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { API_ENDPOINTS } from "../../utils/api";

export function Register() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "chair",
    dept: "CSE",
    position: "Student",
    year: "1",
  });

  const navigateTo = useNavigate();
  const hasSubmittedRef = useRef(false);

  const onChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    // Validation
    if (!input.fullname || !input.email || !input.password || !input.confirmPassword) {
      toast.error("Please fill all required fields");
      hasSubmittedRef.current = false;
      return;
    }

    if (input.password !== input.confirmPassword) {
      toast.error("Passwords do not match");
      hasSubmittedRef.current = false;
      return;
    }

    if (input.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      hasSubmittedRef.current = false;
      return;
    }

    setLoading(true);

    try {
      const userData = {
        fullname: input.fullname,
        email: input.email,
        password: input.password,
        role: input.role,
        academics: {
          dept: input.dept,
          position: input.position,
          year: input.year,
        },
      };

      const res = await axios.post(
        API_ENDPOINTS.USER_REGISTER,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Registration successful!");
        navigateTo("/login");
      } else {
        toast.error(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
      hasSubmittedRef.current = false;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Join IEEE GCET Student Branch</p>
        </div>

        <form onSubmit={onFormSubmitHandler} className="space-y-4">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullname">Full Name *</Label>
            <Input
              id="fullname"
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={onChangeEventHandler}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={input.email}
              onChange={onChangeEventHandler}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={onChangeEventHandler}
              placeholder="Enter password (min 6 characters)"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={onChangeEventHandler}
              placeholder="Confirm your password"
              required
            />
          </div>

          {/* Role */}
          <div>
            <Label htmlFor="role">Role *</Label>
            <Select
              value={input.role}
              onValueChange={(value) => setInput({ ...input, role: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chair">Chair</SelectItem>
                <SelectItem value="advisor">Advisor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Department */}
          <div>
            <Label htmlFor="dept">Department *</Label>
            <Select
              value={input.dept}
              onValueChange={(value) => setInput({ ...input, dept: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSE">Computer Science</SelectItem>
                <SelectItem value="IT">Information Technology</SelectItem>
                <SelectItem value="ECE">Electronics & Communication</SelectItem>
                <SelectItem value="EEE">Electrical & Electronics</SelectItem>
                <SelectItem value="MECH">Mechanical</SelectItem>
                <SelectItem value="CIVIL">Civil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Year (for students) */}
          {input.role === "chair" && (
            <div>
              <Label htmlFor="year">Year</Label>
              <Select
                value={input.year}
                onValueChange={(value) => setInput({ ...input, year: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">First Year</SelectItem>
                  <SelectItem value="2">Second Year</SelectItem>
                  <SelectItem value="3">Third Year</SelectItem>
                  <SelectItem value="4">Fourth Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
