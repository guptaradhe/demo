"use client"

import { useState } from 'react';
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignUp = () => {

    router.push("/sign-up");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add validation and form submission logic here
    const body = {
      email: form.email,
      password: form.password,
    };
 
   
    const response = await axios.post(
      "/api/user-login",
      body
    );
 
    if(response.data.status==200){
      swal({
        title: "Success",
        text: response.data.message,
        icon: "success",
        buttons: {
          cancel: false,
        },
        timer: 2000,
      }).then(()=>{
        router.push("/user-details");
      })

      
    } else if(response.data.status==401){
      
      swal({
        title: "Failed",
        text: response.data.message,
        icon: "error",
        buttons: {
          cancel: false,
        },
        timer: 2000,
      });

    } else {
      swal({
        title: "Failed",
        text: response.data.message,
        icon: "error",
        buttons: {
          cancel: false,
        },
        timer: 2000,
      }).then(()=>{
        router.push("/sign-up");
      });

      
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
      
        <div className='login-sec'>
          <button type="submit">Login</button> 
          <button type="submit" onClick={handleSignUp}>Signup</button>
        </div>
      </form>

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 1rem;
        }
        form div {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
        }
        input {
          width: 100%;
          padding: 0.5rem;
          box-sizing: border-box;
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #0070f3;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
          .login-sec{
           display:flex;
           justify-content:space-between;
          }
      `}</style>
    </div>
  );
}
