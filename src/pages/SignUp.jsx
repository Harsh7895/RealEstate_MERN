import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";

export default function SignUp() {
  const data = { username: "", email: "", password: "" };
  const [formData, setFormData] = useState(data);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        "https://harsh-estate-mern-api.vercel.app/api/auth/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const Data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(Data.message);
        setFormData(data);
        setTimeout(() => {
          setError(null);
        }, 5000);
        return;
      }

      setLoading(false);
      setFormData(data);
      navigate("/sign-in");
      console.log(Data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      setFormData(data);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg  outline-none"
          id="username"
          name="username"
          onChange={handleChange}
          value={formData.username}
          required
        />
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
          {loading ? "Loading ..." : "Sign Up"}
        </button>

        <Oauth />
      </form>

      <div className="flex gap-2 mt-5 ">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>

      {error && <p className="text-rose-700">{error}</p>}
    </div>
  );
}
