import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IDepartment } from '../model/department.model';
import { IEmployee } from '../model/employee.model';
import { ITask } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTasksService {

  constructor(private httpClient: HttpClient){}

  private filterTask:BehaviorSubject<{type:string,value:string}> = new BehaviorSubject<{type:string,value:string}>({type:"",value:""});

  get filterTask$(){
    return this.filterTask.asObservable();
  }

  setFilterTask(value:any,type:string){
    let data = {
      value:value,
      type:type
    }
    this.filterTask.next(data);
  }


  getEmployee() {
    return this.httpClient.get<IEmployee[]>("assets/employee.json");
  }

  getDepartment() {
    return this.httpClient.get<IDepartment[]>("assets/department.json");
  }

  getTask() {
    return this.httpClient.get<ITask[]>("assets/task.json");
  }


}
