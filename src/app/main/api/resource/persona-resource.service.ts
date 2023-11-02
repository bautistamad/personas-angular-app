import { Injectable } from '@angular/core';
import { IResourceMethodObservable, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod } from '@ngx-resource/core';
import { IPersona } from 'src/app/core/models/i-persona';
import { IPersonadata } from 'src/app/core/models/i-personadata';
import { environment } from 'src/environments/environment';

@Injectable()
@ResourceParams({
  pathPrefix: `${environment.apiUrl}/personas`
})
export class PersonaResourceService extends Resource{

  constructor(handler?: ResourceHandler) {
    super(handler);
   }

   @ResourceAction({
    path: '/listado',
    method: ResourceRequestMethod.Get
   })
   get!: IResourceMethodObservable<{},IPersona[]>;

   @ResourceAction({
    path: '/persona',
    method: ResourceRequestMethod.Post,
   })
   post!: IResourceMethodObservable<{persona: IPersonadata},{}>;

   @ResourceAction({
    path: '/{!nro_persona}',
    method: ResourceRequestMethod.Delete,
   })
   delete!: IResourceMethodObservable<{nro_persona?: number},IPersona[]>;

   @ResourceAction({
    path: '/{nro_persona}',
    method: ResourceRequestMethod.Get,
   })
   getPersona!: IResourceMethodObservable<{nro_persona?: number},IPersonadata[]>;
}

// {
//   providedIn: 'root'
// }