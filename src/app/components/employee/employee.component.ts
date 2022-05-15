import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IEmployee } from 'src/app/model/employee.model';
import { EmployeeTasksService } from 'src/app/service/employee-tasks.service';
// import countries from '../../../assets/employee.json';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(public fb: FormBuilder,private employeeTasksService:EmployeeTasksService) {  }


 @Input() employee!: IEmployee[];

  public form: FormGroup = this.fb.group({
    employeeSelected:null
  });

  ngOnInit(): void {
    console.log(this.employee);
    this.form.get('employeeSelected')?.valueChanges.subscribe(s=>{
      // console.log(s);
      this.employeeTasksService.setFilterTask(s.EmployeeName,"Employee");

    })
  }



  getSelected(){
    return this.form.get('employeeSelected')?.value;
  }

}
