import React from "react";
import EmployeeList from "./EmployeeList"; // Import direct from src
import './index.css'; // Ya jahan bhi aapne tailwind CSS file rakha hai


export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Employee Management</h1>
      <EmployeeList /> {/* Component ko yahan use kar rahe hain */}
    </div>
  );
}

