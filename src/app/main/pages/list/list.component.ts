import { Component, OnInit } from '@angular/core';
import { PersonaResourceService } from '../../api/resource/persona-resource.service';
import { IPersona } from 'src/app/core/models/i-persona';
import { IPersonadata } from 'src/app/core/models/i-personadata';

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

  editarPersona(nro_persona: number): void { 
    this._service.getPersona({nro_persona}).subscribe({
      next: ( persona :IPersonadata[] ) => {
        console.log( JSON.stringify( persona ))
      },
      error: ( err ) => {
        throw err;
      }
    })
  }

  deletePersona( nro_persona : number) : void {
    this._service.delete({nro_persona}).subscribe({
      next: ( response ) => {
        // this.personas = personas
        console.log( "Borre una persona" + response)
        console.log( JSON.stringify(response) )

        this.personas.splice( this.personas.findIndex(p => p.nroPersona == nro_persona), 1)
        // if ( response ){
        //   console.log( this.personas )
        // }
      },
      error: ( err ) => {
        throw err;
      }
    })
  }

}
