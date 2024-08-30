"use client"

import { useState } from 'react';
import axios from "axios";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import './sign-up.css'
export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    dob: '',
    password: '',
    confirmPassword: '',
    mobile: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
 
    if (form.password !== form.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
    
    const body = {
      name: form.name,
      email: form.email,
      address: form.address,
      dob: form.dob,
      password: form.password,
      mobile_no: form.mobile,

    };
   
    const response = await axios.post(
      "/api/user-sign-up",
      body
    );
 
    if(response.data.status==400){
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
        title: "Success",
        text: response.data.message,
        icon: "success",
        buttons: {
          cancel: false,
        },
        timer: 2000,
      }).then(()=>{
        router.push("/user-details");
      });
     
    }
    
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email ID:</label>
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
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={form.dob}
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

        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

     
    </div>
  );
}
