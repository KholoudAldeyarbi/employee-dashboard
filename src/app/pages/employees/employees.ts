import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideSearch } from '@lucide/angular';
import { Router, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../models/employee.model';


@Component({
  selector: 'app-employees',
  imports: [CommonModule, FormsModule, LucideSearch,RouterLink],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {
  employees: IEmployee[] = [];
 searchText = '';
  selectedDepartment = 'All';
  sortBy = 'name-asc';
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}
  // ngOnInit(): void {
  //  this.employees= this.employeeService.getEmployees();

  // }
async ngOnInit() {
  this.employees =
    await this.employeeService.getEmployees();
}
  // employees = [
  //   { id: 1, name: 'Ahmed Hassan', department: 'Frontend', jobTitle: 'Junior Frontend Developer', salary: '$18,000', email: 'ahmed@example.com' },
  //   { id: 2, name: 'Sara Ali', department: 'Backend', jobTitle: 'Backend Developer', salary: '$22,000', email: 'sara@example.com' },
  //   { id: 3, name: 'Omar Farouk', department: 'QA', jobTitle: 'QA Engineer', salary: '$16,000', email: 'omar@example.com' },
  //   { id: 4, name: 'Maya Tarek', department: 'UI/UX', jobTitle: 'UI/UX Designer', salary: '$19,000', email: 'maya@example.com' },
  //   { id: 5, name: 'Mohamed Adel', department: 'DevOps', jobTitle: 'DevOps Engineer', salary: '$24,000', email: 'mohamed@example.com' },
  //   { id: 6, name: 'Nourhan Magdy', department: 'Frontend', jobTitle: 'Senior Frontend Developer', salary: '$26,000', email: 'nourhan@example.com' },
  // ];

 

get filteredEmployees() {
  let result = this.employees.filter(emp => {
    const matchesDepartment =
      this.selectedDepartment === 'All' 
      || emp.department === this.selectedDepartment;

    const matchesSearch =
      emp.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      emp.email.toLowerCase().includes(this.searchText.toLowerCase());

    return matchesDepartment && matchesSearch;
  });

  switch (this.sortBy) {
    case 'name-asc':
      result = result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      result = result.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'salary-asc':
      result =  result.sort((a, b) => a.salary - b.salary);
      break;
    case 'salary-desc':
      result = result.sort((a, b) => b.salary - a.salary);
      break;
  }

  return result;
}

getSalaryNumber(salary: string): number {
  return Number(salary.replace('$', '').replace(',', ''));
}

deleteEmployee(id: number , name: string) {
   if (!id) return;

    const confirmDelete = confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmDelete) return;

 // this.employees = this.employees.filter(emp => emp.id !== id);
  this.employeeService.deleteEmployee(id);
  this.employees = this.employeeService.getEmployees();
}



}
