import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITask } from 'src/app/model/task.model';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeTasksService } from 'src/app/service/employee-tasks.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit,AfterViewInit {

  constructor(private employeeTasksService:EmployeeTasksService){}

  @Input()
  task!: ITask[];
  displayedColumns: string[] = ['taskNumber', 'TaskName', 'StatusId', 'DueDate','EmployeeName','DepartmentID'];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource = new MatTableDataSource<ITask>(this.task);

  ngOnInit(): void {
    console.log(this.task);
    this.employeeTasksService.filterTask$.subscribe(s=>{
        if(s.type=="Employee"){
          this.dataSource.data = this.task.filter(f=>f.EmployeeName==s.value);
        }
        else{
          this.dataSource.data = this.task.filter(f=>f.DepartmentID==+s.value);

        }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  DueDate(e:any){
    let dateParts = e.DueDate.split("/");
    let date = new Date(+dateParts[2],dateParts[1]-1,+dateParts[0]);
    let now = new Date();
    return now>date;
  }
}
