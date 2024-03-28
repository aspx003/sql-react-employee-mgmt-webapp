import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: ""
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setEmployee((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/employees", employee);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className='flex items-center'>
      <form className='mx-auto gap-4 align-middle'>
        <input type="text" onChange={handleChange} placeholder="First Name" name="firstname" className="input input-bordered w-96" /><br />
        <input type="text" onChange={handleChange} placeholder="Last Name" name="lastname" className="input input-bordered w-96 mt-4" /><br />
        <input type="text" onChange={handleChange} placeholder="Phone" name="phone" className="input input-bordered w-96 mt-4" /><br />
        <input type="text" onChange={handleChange} placeholder="Email" name="email" className="input input-bordered w-96 mt-4" /><br />
        <button className="btn btn-outline btn-primary mt-4 w-96" onClick={handleClick}>Add Employee</button>
      </form>

      {
        error &&
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error! Some weirdity on our part!</span>
        </div>
      }
    </div>

  )
}

export default AddEmployee