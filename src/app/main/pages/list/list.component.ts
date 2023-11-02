import { Component, OnInit } from '@angular/core';
import { PersonaResourceService } from '../../api/resource/persona-resource.service';
import { IPersona } from 'src/app/core/models/i-persona';

// Agregado
// import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  personas: IPersona[] = [];

  constructor( private _service: PersonaResourceService){}

  ngOnInit(): void {
    this.listarPersonas()
  }

  listarPersonas(): void { 
    this._service.get().subscribe({
      next: ( personas:IPersona[] ) => {
        this.personas = personas
      },
      error: ( err ) => {
        throw err;
      }
    })
  }

  // redigir(){
  //   this.router.navigate(['agregar']);
  // }

}
