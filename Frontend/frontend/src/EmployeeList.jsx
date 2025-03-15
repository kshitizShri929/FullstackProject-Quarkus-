
import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css';


export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", position: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/employees");
      setEmployees(response.data);
    } catch (err) {
      setError("Failed to load employees.");
    }
    setLoading(false);
  };

  const addEmployee = async () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.position) {
      setError("All fields are required.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await axios.post("http://localhost:8080/employees", newEmployee);
      setNewEmployee({ name: "", email: "", position: "" });
      setMessage("Employee added successfully!");
      fetchEmployees();
    } catch (err) {
      setError("Error adding employee.");
    }
    setIsSubmitting(false);
  };

  const deleteEmployee = async (id) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:8080/employees/${id}`);
      setMessage("Employee deleted successfully!");
      fetchEmployees();
    } catch (err) {
      setError("Error deleting employee.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Employee Management</h2>

    


      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="mb-6 flex gap-2">
        <input type="text" placeholder="Name" className="border p-2 rounded w-1/3"
          value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} />
        <input type="email" placeholder="Email" className="border p-2 rounded w-1/3"
          value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} />
        <input type="text" placeholder="Position" className="border p-2 rounded w-1/3"
          value={newEmployee.position} onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })} />
        <button onClick={addEmployee} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add"}</button>
      </div>

      {loading ? (<p className="text-lg text-blue-500">Loading employees...</p>) : (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Position</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <tr key={emp.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b hover:bg-gray-200`}>
                  <td className="p-3 text-gray-700">{emp.name}</td>
                  <td className="p-3 text-gray-700">{emp.email}</td>
                  <td className="p-3 text-gray-700">{emp.position}</td>
                  <td className="p-3">
                    <button onClick={() => deleteEmployee(emp.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      disabled={isSubmitting}>{isSubmitting ? "Deleting..." : "Delete"}</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
