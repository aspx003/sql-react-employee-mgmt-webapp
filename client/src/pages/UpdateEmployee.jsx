import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"

const UpdateEmployee = () => {

  const [id, setId] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const search = async () => {
    try {
      const res = await axios.get("http://localhost:3000/employees/" + id);

      if (res.data.length === 0) {
        setIsValid(false);
      }

      let employee = res.data[0];
      if (employee) {
        setIsValid(true);
      }
      setFirstname(employee.firstname);
      setLastname(employee.lastname);
      setPhone(employee.phone);
      setEmail(employee.email);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const employee = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      email: email
    }
    try {
      await axios.put("http://localhost:3000/employees/" + id, employee);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className="flex flex-col w-full lg:flex-row">
      <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
        <input type="text"
          placeholder="Enter the id of the employee"
          className="input input-bordered input-info w-full max-w-xs"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className='btn btn-outline btn-primary mt-4 w-96' onClick={search}>Search for Employee</button>
      </div>
      <div className="divider divider-horizontal"></div>
      <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
        {
          !isValid &&
          <p>Sorry data not found! Please try again!</p>
        }
        {
          isValid &&

          <form className='mx-auto gap-4 align-middle'>
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="First Name" className="input input-bordered w-96" /><br />
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" className="input input-bordered w-96 mt-4" /><br />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="input input-bordered w-96 mt-4" /><br />
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input input-bordered w-96 mt-4" /><br />
            <button className="btn btn-outline btn-primary mt-4 w-96" onClick={handleUpdate}>Update Employee</button>
          </form>
        }
      </div>


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

export default UpdateEmployee