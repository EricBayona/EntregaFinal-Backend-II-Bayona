/* eslint-disable react/prop-types */
import { useState } from "react";

export const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/sessions/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      handleLogin(true);
    }
    //else {
    //   console.log("Error:", data.msg);
    //   handleLogin(false);
    //   setErrorMessage(data.msg);
    // }
    else {
      // Si hay errores de validación de Zod
      if (data.errors && Array.isArray(data.errors)) {
        const mensajes = data.errors.map((err) => err.message).join(" | ");
        setErrorMessage(mensajes);
        console.log("Errores de validación:", mensajes);
      } else {
        // Otro tipo de errores (por ejemplo, los que vienen de passport)
        setErrorMessage(data.msg || "Ocurrió un error inesperado");
        console.log("Error:", data.msg);
      }
      handleLogin(false);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="p-4  w-50">
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary">Login</button>
        <p>{errorMessage && <p>{errorMessage}</p>}</p>
      </form>
    </>
  );
};
