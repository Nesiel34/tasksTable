import { Component, Input, OnInit } from '@angular/core';
import { IDepartment } from 'src/app/model/department.model';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { IFlatNode, INode } from './model/tree.model';
import { EmployeeTasksService } from 'src/app/service/employee-tasks.service';
// import countries from '../../../assets/department.json';



@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {

  constructor(private employeeTasksService:EmployeeTasksService){}


  @Input()
  department!: IDepartment[];

  private _transformer = (node: INode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.DepartmentName,
      level: level,
    };
  };

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  treeControl = new FlatTreeControl<IFlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  hasChild = (_: number, node: IFlatNode) => node.expandable;

  TREE_DATA: INode[] = [];
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit(): void {
    // this.department = countries;
		const nest:any = (items: IDepartment[], id = 0) =>
    items
    .filter(item => item.ParentID === id)
    .map(item => ({ ...item, children: nest(items, item.DepartmentID) }));

    this.TREE_DATA =  nest(this.department);

    console.log(this.TREE_DATA);
    this.dataSource.data = this.TREE_DATA;

  }

  selectDepartment(node:string){
    this.employeeTasksService.setFilterTask(this.department.find(f=>f.DepartmentName==node)?.DepartmentID,"Department");
  }

  }


