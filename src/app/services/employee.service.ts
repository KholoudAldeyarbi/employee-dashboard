import { Injectable } from '@angular/core';
import { EMPLOYEES } from '../data/employees.data'; 
import { IEmployee } from '../models/employee.model';


@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  employees: IEmployee[] = EMPLOYEES;


   getEmployees() {
    return this.employees;
  }

  addEmployee(employee: IEmployee) {
    this.employees = [...this.employees, employee];
  }

  getEmployeeById(id: number) {
    return this.employees.find(emp => emp.id === id);
  }

  deleteEmployee(id: number) {
    this.employees = this.employees.filter(emp => emp.id !== id);
  }
  
  updateEmployee(updatedEmployee: IEmployee) {
    this.employees = this.employees.map(emp =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
  }
}
