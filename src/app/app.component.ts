import { Component, OnInit } from '@angular/core';
import { IDepartment } from './model/department.model';
import { IEmployee } from './model/employee.model';
import { ITask } from './model/task.model';
import { EmployeeTasksService } from './service/employee-tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private employeeTasksService:EmployeeTasksService){}


  employee: IEmployee[] = [];
  department: IDepartment[] = [];
  task: ITask[] = [];



  ngOnInit(): void {
    this.employeeTasksService.getEmployee().subscribe(s=>{
      this.employee = s;
    });
    this.employeeTasksService.getDepartment().subscribe(s=>{
      this.department = s;
    });
    this.employeeTasksService.getTask().subscribe(s=>{
      this.task = s;
    });
  }



}
