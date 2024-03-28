import React, { useEffect, useState } from 'react'
import axios from "axios";

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:3000/employees");
        setEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAllEmployees();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-md">
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Lastname</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>

            {employees.map(employee => (
              <tr key={employee.id}>
                <th>{ employee.id}</th>
                <td>{ employee.firstname}</td>
                <td>{ employee.lastname}</td>
                <td>{ employee.phone}</td>
                <td>{ employee.email}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Lastname</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default AllEmployees