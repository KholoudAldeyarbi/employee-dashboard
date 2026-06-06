import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import {
 LucideUser, 
  LucideBuilding2,
  LucideBriefcase,
  LucideBadgeDollarSign } from '@lucide/angular';
import { IEmployee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,  LucideUser
    , LucideBuilding2,
    LucideBriefcase,
    LucideBadgeDollarSign, BaseChartDirective
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true
})
export class Dashboard implements OnInit {
 

  employees: IEmployee[] = [];
departmentStats: { department: string; count: number }[] = [];
   totalEmployees = 0;
  totalSalary = 0;
  averageSalary = 0;
  totalDepartments = 0;

  barChartData: any = {
    labels: [],
    datasets: [
      {
        label: 'Employees',
        data: []
      }
    ]
  };

  barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    //-- Hide the label title ofthe chart 
     plugins: {
      legend: {
        display: false
      }
     }
  };

constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();

    
    this.calculateDashboardData();
  }

   calculateDashboardData(): void {
    this.totalEmployees = this.employees.length;
    const totalEmployees_Const = this.employees.length;
    
    this.totalSalary = this.employees.reduce(
      (sum, emp) => sum + emp.salary,
      0
    );

    this.averageSalary =
      totalEmployees_Const > 0
        ? this.totalSalary / totalEmployees_Const
        : 0;

    const departments = this.employees.map(emp => emp.department);

    this.totalDepartments = new Set(departments).size;

    const departmentMap = new Map<string, number>();

    this.employees.forEach(emp => {
      const currentCount = departmentMap.get(emp.department) || 0;
      departmentMap.set(emp.department, currentCount + 1);
    });

    this.departmentStats = Array.from(departmentMap, ([department, count]) => ({
      department,
      count
    }));

const colors = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
  '#EF4444',
  '#06B6D4',
  '#EC4899',
  '#84CC16'
];
   this.barChartData = {
      labels: this.departmentStats.map(item => item.department),
      datasets: [
        {
          label: ' ',
          data: this.departmentStats.map(item => item.count),
           backgroundColor: this.departmentStats.map(
            (_, index) => colors[index % colors.length]
           ),

          ///borderRadius: 8


        }
      ]



    };
  }

  }



 

