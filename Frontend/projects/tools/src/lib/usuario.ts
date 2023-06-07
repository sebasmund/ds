
export class Usuario{

   usuario:string;
   nombre:string;
   tipo:number;
   mail:string;
   photo:string;
   token: string;
   
}

export class respuesta{
   status: number;
   data: data;
   mensaje: string
}

export class data{
   
   usuario:string;
   nombre:string;
   mail:string;
   photo:string;
   token: string;
   
}

export class UsuarioRes{
   
   usuario:string;
   nombre:string;
   mail:string;
   photo:string;
   token: string;
   
}