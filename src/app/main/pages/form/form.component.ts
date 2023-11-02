import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { INacionalidad } from 'src/app/core/models/i-nacionalidad';
import { NacionalidadResourceService } from '../../api/resource/nacionalidad-resource.service';
import { IEquipo } from 'src/app/core/models/i-equipo';
import { IHobby } from 'src/app/core/models/i-hobby';
import { IGenero } from 'src/app/core/models/i-genero';
import { GeneroResourceService } from '../../api/resource/genero-resource.service';
import { HobbyResourceService } from '../../api/resource/hobby-resource.service';
import { EquipoResourceService } from '../../api/resource/equipo-resource.service';
import { PersonaResourceService } from '../../api/resource/persona-resource.service';
import { IPersona } from 'src/app/core/models/i-persona';
import { IPersonadata } from 'src/app/core/models/i-personadata';
import { Router } from '@angular/router';
import { EditService } from 'src/app/core/services/edit.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  form!: FormGroup;
  // Consultar porque sin esto no funciona ( = [] )
  generos: IGenero[] = [];
  equipos: IEquipo[] = [];
  actividades: IHobby[] = [];
  nacionalidades: INacionalidad[] = [];
  submitted: boolean = false;
  showInfo: boolean = false;
  private _suscription!: Subscription;

  nroPersona!: number;
  
  constructor(private _fb: FormBuilder,
    private _nacionalidadService: NacionalidadResourceService,
    private _generoService: GeneroResourceService,
    private _hobbyService: HobbyResourceService,
    private _equipoService: EquipoResourceService,
    private _personaService: PersonaResourceService,
    private router: Router,
    private _service: EditService) {
      
    }

  ngOnInit(): void {
    this.initForm();
    this.loadData();
      this._suscription = this._service.getObservable().subscribe((_nroPersona: number) => {
        this.nroPersona = _nroPersona
        console.log("Me llego esta persona " + this.nroPersona);
        this.loadPersona(this.nroPersona);
      })
    }


  private initForm(): void {
    // if( this.nroPersona != undefined ){
      // this.loadPersona(this.nroPersona);
      // console.log("init form CON persona" + this.nroPersona);
    // }else{
      // console.log("init form SIN persona");
      this.form = this._fb.group({
        apellido: new FormControl('', [Validators.required]),
        nombre: new FormControl('', [Validators.required]),
        correo: new FormControl('', [Validators.required, Validators.email]),
        clave: new FormControl('', [Validators.required]),
        confirmar_clave: new FormControl('', [Validators.required]),
        codGenero: [this.generos.find(g => g.checked)?.codGenero],
        fechaNacimiento: [''],
        codNacionalidad: [this.nacionalidades.find(g => g.selected)?.codNacionalidad],
        equipos: [''],
        actividades: this._fb.array([]),
        otrasActividades: [''],
      });
    // }
  }

  listarNacionalidades(): void {
    this._nacionalidadService.get().subscribe({
      next: (nacionalidades: INacionalidad[]) => {
        this.nacionalidades = nacionalidades
        // console.log(JSON.stringify(this.nacionalidades));
      },
      error: (err) => {
        throw err;
      }
    })
  }

  listarGeneros(): void {
    this._generoService.get().subscribe({
      next: (generos: IGenero[]) => {
        this.generos = generos
        // console.log(JSON.stringify(this.generos));
      },
      error: (err) => {
        throw err;
      }
    })
  }

  listarHobbies(): void {
    this._hobbyService.get().subscribe({
      next: (hobbies: IHobby[]) => {
        this.actividades = hobbies
        // console.log(JSON.stringify(this.hobbies));
      },
      error: (err) => {
        throw err;
      }
    })
  }

  listarEquipos(): void {
    this._equipoService.get().subscribe({
      next: (equipos: IEquipo[]) => {
        this.equipos = equipos
        // console.log(JSON.stringify(this.equipos));
      },
      error: (err) => {
        throw err;
      }
    })
  }

  agregarPersona(): void {
    this.submitted = true;
    console.log("form ",JSON.stringify(this.form.value));
    const { confirmar_clave, ...formData } = this.form.value;
    console.log(" formdata ",JSON.stringify(formData));

    if (this.form.valid) {
      this._personaService.post(formData).subscribe({
        next: (response) => {
          console.log(response);
          console.log("Insercion exitosa");
          this.router.navigate(['/main']);
        },
        error: (error) => {
          console.log(error)
          // console.log(JSON.stringify(this.form.value));
          console.log("Insercion fallida");
        }
      })
    }
  }

  private loadData() {
    this.listarNacionalidades();
    this.listarGeneros();
    this.listarHobbies();
    this.listarEquipos();
  }

  private loadPersona(nroPersona: number): void {
    // Nota que estamos pasando un objeto con la propiedad `nro_persona`
    this._personaService.getPersona({ nro_persona: nroPersona }).subscribe({
      next: (persona: IPersonadata[]) => {
        // Aquí puedes manejar los datos de la persona
        console.log(JSON.stringify(persona));

        this.form.setValue({
          apellido: persona[0].apellido,
          nombre: persona[0].nombre,
          correo: persona[0].correo,
          clave: persona[0].clave, // Asumiendo que quieres mostrar la clave en el formulario
          confirmar_clave: [''],
          codGenero: [this.generos.find(g => g.codGenero == persona[0].codGenero)],
          fechaNacimiento: persona[0].fechaNacimiento,
          codNacionalidad: [this.nacionalidades.find(g => g.codNacionalidad == persona[0].codNacionalidad)],
          equipos: [this.equipos.find(g => g.nroEquipo == persona[0].equipos[0])],
          actividades: [this.actividades.find(g => g.nroActividad == persona[0].actividades[0])],
          otrasActividades: ['']
        });

      },
      error: (err) => {
        // Aquí puedes manejar el error
        console.error('Error al cargar la persona:', err);
      }
    });
  }
  

  showData(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.showInfo = true;
    }
    console.log(this.form.value);
  }

  reset(): void {
    this.submitted = false;
    this.initForm();
  }

  back(): void {
    this.showInfo = false;
    this.reset();
  }

  get actividadesArray(): FormArray {
    return this.form.controls['actividades'] as FormArray;
  }


  setHobby(event: any): void {
    // console.log(event);
    if (event.target.checked) {
      this.actividadesArray.push(new FormControl(Number(event.target.value)));
    } else {
      let index = this.actividadesArray.controls.findIndex(h => h.value == event.target.value);
      if (index >= 0)
        this.actividadesArray.removeAt(index);
    }
  }

}
