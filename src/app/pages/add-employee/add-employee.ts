import { Component } from '@angular/core';
// Update the import to match the actual service export and path
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { form } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-employee',
  imports: [FormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {

  employee = {
    name: '',
    department: '',
    jobTitle: '',
    salary: 0,
    email: '',
    phone: '',
    address: '',
    joiningDate: new Date().toISOString().split('T')[0]
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  onSubmit() {
    const newEmployee = {
      id: Date.now(),
      ...this.employee
    };

    this.employeeService.addEmployee(newEmployee);

    this.router.navigate(['/employees']);
  }

}
