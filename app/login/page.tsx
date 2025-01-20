"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { login } from "@/lib/testSlice"
// import { apiRequest } from "../../old/app/utils";
// import { useStateContext } from "../../old/app/context/StateContext";


export default function LoginPage() {
  const [usercode, setUsercode] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const { setState } = useStateContext();

  const dispatch = useAppDispatch()

  async function fetchUserData(userId: string) {
    try {
      const response = await fetch('https://www.google.com') //await apiRequest(`/users/${userId}`, "GET")
      if (response.ok) {
        return await response.json();
      } else if (response.status === 404) {
        return null;
      } else {
        throw new Error(`Unexpected server error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  }

  const handleLogin = async () => {

    dispatch(login(usercode))

    if (!usercode.trim()) {
      alert("Please enter a Usercode.");
      return;
    }

    setLoading(true);
    try {
      const userData = await fetchUserData(usercode.trim());
      if (!userData) {
        alert("No matching User found. Please try again.");
        return;
      }

      const state = {
        taskType: userData.task_type,
        taskId: "",
        userId: usercode.trim(),
        name: userData.demographics.name,
        initialScores: { A: 1, B: 1, C: 1, D: 1, confidence: 1, familiarity: 1 },
        options: [],
      };

      if (localStorage.getItem("state"))
        localStorage.removeItem("state");
      // setState(state);


      router.push(`/tasks?`);
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl p-10 flex flex-col items-center w-[60%] space-y-8"
  >
    <h1 className="text-[#6e7174] text-lg">Please enter your passcode below</h1>
    <input
      type="text"
      value={usercode}
      onChange={(e) => setUsercode(e.target.value)}
      className="w-full rounded-lg h-12 bg-[#F3F5F7] text-center"
    />
    <button
      onClick={handleLogin}
      className="bg-[#6558d3] text-white font-bold w-fit rounded-lg p-2"
      disabled={loading}
    >
      {loading ? "Loading..." : "Submit"}
    </button>
  </div>
}
