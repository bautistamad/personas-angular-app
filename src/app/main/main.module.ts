import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { PersonaResourceService } from './api/resource/persona-resource.service';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NacionalidadResourceService } from './api/resource/nacionalidad-resource.service';
import { GeneroResourceService } from './api/resource/genero-resource.service';
import { HobbyResourceService } from './api/resource/hobby-resource.service';
import { EquipoResourceService } from './api/resource/equipo-resource.service';

@NgModule({
  declarations: [
    MainComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PersonaResourceService,
    NacionalidadResourceService,
    GeneroResourceService,
    HobbyResourceService,
    EquipoResourceService
  ]
})
export class MainModule { }
