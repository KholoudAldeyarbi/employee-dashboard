import { CommonModule } from '@angular/common';
import { Component , EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EMPLOYEES } from '../../data/employees.data';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetails implements OnInit {
 
  id!: number;
 employees = EMPLOYEES;
 employee: any;
  
  constructor(private route: ActivatedRoute,
     private employeeService: EmployeeService,
      private router: Router) {}

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );
 
 //   this.employee = EMPLOYEES.find(e => e.id === this.id);
    const emp = this.employeeService.getEmployeeById(this.id);

    //--- Below destructuring assignment is used to extract the properties of the employee object into individual variables.
    if (emp) {
      const {
        name:EmployeeFullName,
        department,
        jobTitle,
        salary,
        email,
        phone,
        address,
        joiningDate,
        Pic
      } = emp;
      this.employee = emp; //--- Assign the entire employee object to this.employee for use in the template.

      //--- Log the extracted properties to the console for debugging purposes.
      console.log('Employee Details:');
      console.log('Name of Full Employee NAme:', EmployeeFullName);
      console.log('Department:', department);
      console.log('Job Title:', jobTitle);
      console.log('Salary:', salary);
      console.log('Email:', email);
      console.log('Phone:', phone);
      console.log('Address:', address);
      console.log('Joining Date:', joiningDate);
      console.log('Picture URL:', Pic); 
    }
  }
      onDelete(id: number): void {
    if (!this.employee) return;

    const confirmDelete = confirm(
      `Are you sure you want to delete ${this.employee.name}?`
    );

    if (!confirmDelete) return;

   // this.employees = this.employees.filter(emp => emp.id !== id);
  this.employeeService.deleteEmployee(id);
  this.employees = this.employeeService.getEmployees();
   this.router.navigate(['/employees']);
  }
}
