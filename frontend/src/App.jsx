import React from "react";
import EmployeeList from "./component/EmployeeList";


import './index.css'; 

export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Employee Management</h1>
      
      <EmployeeList /> {/* Component ko yahan use kar rahe hain */}
      <h1 className="text-3xl">Hello Tailwind CSS</h1>
    </div>
    
  );
}


