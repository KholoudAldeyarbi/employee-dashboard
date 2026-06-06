import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css',
})
export class EditEmployee implements OnInit {

  employee: IEmployee = {
    id: 0,
    name: '',
    email: '',
    department: '',
    phone: '',
    jobTitle: '',
    address: '',
    salary: 0,
    joiningDate: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const foundEmployee = this.employeeService.getEmployeeById(id);

    if (foundEmployee) {
      this.employee = { ...foundEmployee };
    }
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employee);
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    if (!this.employee) return;

    this.employeeService.updateEmployee(this.employee);
    this.router.navigate(['/employees', this.employee.id]);
  }
}