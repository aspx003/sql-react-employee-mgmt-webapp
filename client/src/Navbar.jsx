import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Employee Sheet</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">All Employees</Link></li>
                    <li><Link to="/add-employee">Add Employee</Link></li>
                    <li><Link to="/update-employee">Update Employee</Link></li>
                    <li><Link to="/remove-employee">Delete Employee</Link></li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Navbar