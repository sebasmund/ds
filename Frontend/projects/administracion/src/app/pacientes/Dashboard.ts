export interface DashBoard{
    OrdenesAbiertas:number;
    PorImputar:number;
    VisitasAbiertas:number;

}
export interface Graf{
    RowId:number;
    Tecnico:string;
    Promedio:number;

}
export interface Graf2{
  
    Tecnico:string;
    Promedio:number;

}

export interface Chart{
  
    name:string;
    series:Series;

}

export interface Series{
    name:string;
    value:number;

}


