import { useState } from "react";
import { supabase } from "../supabase";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1️⃣ Create auth user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // 2️⃣ Create profile row
    const user = data.user;

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
      });

    if (profileError) {
      setError(profileError.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="bg-slate-800 p-6 rounded-lg w-80 space-y-3"
      >
        <h1 className="text-xl font-bold text-center">Sign Up</h1>

        <input
          type="text"
          placeholder="First Name"
          className="w-full p-2 rounded bg-slate-900"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-2 rounded bg-slate-900"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-slate-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-slate-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
