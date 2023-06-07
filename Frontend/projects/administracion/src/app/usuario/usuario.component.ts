import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.readProducts();
    console.log('Modulo usuarios');
  }
  readProducts(): void {

    this.usuarioService.getAllUser()
      .subscribe({
        next: (products) => {
          this.usuario = products;
          console.log(products);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

}
