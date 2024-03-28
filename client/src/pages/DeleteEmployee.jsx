import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteEmployee = () => {

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

  const cancel = () => {
    setIsValid(false);
    setId("");
    setFirstname("");
    setLastname("");
    setPhone("");
    setEmail("");
  }

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:3000/employees/" + id);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">Delete Employee Data</h1>

      <input type="text"
        placeholder="Enter the id of the employee"
        className="input input-bordered input-info w-full max-w-xs mx-4"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button className="btn btn-outline btn-primary" onClick={search}>Find Emloyee</button>

      {
        isValid &&
        <div className="shadow-md rounded-lg p-4 mt-4">
          <p className="text-lg font-medium">Are you sure you want to delete the following data?</p>
          <p id="data-to-delete">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{id}</th>
                    <td>{firstname}</td>
                    <td>{lastname}</td>
                    <td>{phone}</td>
                    <td>{email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </p>

          <div className="flex justify-end mt-4">
            <button id="cancel-btn" className="btn btn-outline btn-success mx-2" onClick={cancel}>Cancel</button>
            <button id="delete-btn" className="btn btn-error" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      }
      {
        !isValid &&
        <div className="shadow-md rounded-lg p-4 mt-4">
          <p className="text-lg font-medium">Data not found!</p>
        </div>
      }
    </div>
  )
}

export default DeleteEmployee