export interface INode {
  DepartmentName: string;
  DepartmentID:number;
  children?: INode[];
}

export interface IFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
