package com.example.resources;

import com.example.models.Employee;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import jakarta.transaction.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Path("/employees")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EmployeeResource {

    @PersistenceContext
    EntityManager entityManager;

    @GET
    public List<Employee> getEmployees() {
        return entityManager.createQuery("FROM Employee", Employee.class).getResultList();
    }

    @POST
    @Transactional
    public Employee addEmployee(Employee employee) {
        entityManager.persist(employee);
        return employee;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Employee updateEmployee(@PathParam("id") Long id, Employee updatedEmployee) {
        Employee employee = entityManager.find(Employee.class, id);
        if (employee != null) {
            employee.setName(updatedEmployee.getName());
            employee.setEmail(updatedEmployee.getEmail());
            employee.setPosition(updatedEmployee.getPosition());
        }
        return employee;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void deleteEmployee(@PathParam("id") Long id) {
        Employee employee = entityManager.find(Employee.class, id);
        if (employee != null) {
            entityManager.remove(employee);
        }
    }
}
