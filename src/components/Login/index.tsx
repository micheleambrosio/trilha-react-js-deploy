import { useState } from "react";
import axios, { AxiosError } from "axios";
import Posts from "../Posts";

const Login: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const controller = new AbortController();

    setTimeout(() => {
      controller.abort();
      console.log("Abort request");
    }, 3000);

    try {
      const res = await axios.post(
        `${API_URL}/user/login`,
        {
          username,
          password,
        },
        {
          signal: controller.signal,
        }
      );

      localStorage.setItem("auth-token", res.data.accessToken);
      setIsAuthenticated(true);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      console.log("Status", err.status, err.code);

      if (err.response) {
        alert(err.response.data?.message);
        return;
      }

      alert("Error to sign in. Please, check your credentials.");
      console.error(error);
    }
  };

  if (isAuthenticated) {
    return <Posts />;
  }

  return (
    <div className="border border-gray-200 p-5 rounded">
      <h1 className="text-2xl mb-2">Sign in</h1>
      <p className="font-light text-sm text-gray-600 mb-5 mt-0">
        Add your credentials and sign in for view your posts
      </p>
      <form onSubmit={login}>
        <input
          className="w-full mb-5 p-2 border rounded border-gray-200"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="w-full mb-5 p-2 border rounded border-gray-200"
          value={password}
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-indigo-500 text-white p-2 rounded pl-5 pr-5 w-full cursor-pointer"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;

