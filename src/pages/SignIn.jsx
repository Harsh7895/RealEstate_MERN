import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import Oauth from "../components/Oauth";

export default function SignIn() {
  const data = { email: "", password: "" };
  const [formData, setFormData] = useState(data);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(
        "https://harsh-estate-mern-api.vercel.app/api/auth/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      console.log(data); // Log the response to check what the API returns

      if (!res.ok) {
        // Handle non-successful response (HTTP status not in 200-299 range)
        throw new Error(data.message || "Failed to sign in");
      }

      if (data.success === false) {
        dispatch(signInFailure(data.message)); // Handle server-side errors
        setFormData(data); // Reset form data or handle error state
        return;
      }

      dispatch(signInSuccess(data)); // Dispatch action for successful sign-in
      setFormData({ email: "", password: "" }); // Reset form fields
      navigate("/"); // Redirect to home or desired page after successful sign-in
    } catch (error) {
      console.error("Sign-in error:", error);
      dispatch(signInFailure(error.message || "Failed to sign in"));
      setFormData({ email: "", password: "" }); // Reset form fields on error
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg  outline-none"
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg outline-none"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          required
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading ..." : "Sign In"}
        </button>
        <Oauth />
      </form>

      <div className="flex gap-2 mt-5 ">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>

      {error && <p className="text-rose-700">{error}</p>}
    </div>
  );
}
