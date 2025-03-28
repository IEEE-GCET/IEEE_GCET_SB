import React, { useState, useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Import Toast
import axios from "axios";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../features/authSlice";

function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "", // Ensure role state is managed correctly
  });
  
  const navigateTo = useNavigate();

  // Create a reference for the email input field and for guarding submission
  const emailInputRef = useRef(null);
  const hasSubmittedRef = useRef(false);

  // Handle form input changes
  const onChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    // Guard to prevent duplicate submissions
    if (hasSubmittedRef.current) {
      return;
    }
    hasSubmittedRef.current = true;
    
    // Set loading state in Redux
    dispatch(setLoading(true));

    try {
      const res = await axios.post(
        "http://localhost:3000/api/ieeegcetsb/user/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // Store user data in Redux.
        dispatch(setUser(res.data.user));
      } else {
        toast.error(res.data.message || "Login failed.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      dispatch(setLoading(false));
      hasSubmittedRef.current = false; // Reset guard for future submissions
    }
  };

  // Navigate after successful login
  useEffect(() => {
    if (user) {
      navigateTo("/");
    }
  }, [user, navigateTo]);

  // Focus the email input field when the component mounts
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  return (
    (!user) && // Ensure user is not logged in and loading is false
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#00629b1a] via-[#00629b4d] to-[#00629b81] text-[#00629B]">
      <form
        onSubmit={onFormSubmitHandler}
        className="w-full sm:w-[400px] md:w-[500px] lg:w-[500px] p-6 bg-white rounded-lg shadow-lg border border-blue-300"
      >
        <h1 className="text-3xl font-semibold text-center text-[#00629B] mb-8">
          Login
        </h1>

        <div className="flex flex-col gap-4 mb-4">
          {/* Email Field */}
          <div>
            <Label>Email</Label>
            <Input
              ref={emailInputRef}
              className="bg-[#197eb818] p-3 rounded-md focus:ring-2 focus:ring-blue-500"
              type="text"
              value={input.email}
              name="email"
              id="email"
              placeholder="johndoe@gmail.com"
              onChange={onChangeEventHandler}
            />
          </div>

          {/* Password Field */}
          <div>
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              id="password"
              className="bg-blue-50 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="John_Doe"
              onChange={onChangeEventHandler}
            />
          </div>

          {/* Role Selection (Chair/Advisor) */}
          <div className="text-[#00629B]">
            <Select
              onValueChange={(value) => setInput({ ...input, role: value })}
              className="text-[#00629B] backdrop:blur-xl"
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent className="max-h-32 backdrop:blur-xl bg-white text-[#00629B] overflow-y-auto">
                <SelectItem value="chair">Chair</SelectItem>
                <SelectItem value="advisor">Advisor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-6">
          {loading ? (
            <Button
              className="w-full py-3 bg-blue-500 text-white rounded-lg flex justify-center items-center"
              disabled
            >
              <Loader2 className="mr-2 animate-spin h-4 w-4 text-white" />
              Please wait...
            </Button>
          ) : (
            <Button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
              Login
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export { Login };
