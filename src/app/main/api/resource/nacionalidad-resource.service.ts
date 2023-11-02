import { Injectable } from '@angular/core';
import { IResourceMethodObservable, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod } from '@ngx-resource/core';
import { environment } from 'src/environments/environment';
import { INacionalidad } from 'src/app/core/models/i-nacionalidad';

@Injectable()
@ResourceParams({
  pathPrefix: `${environment.apiUrl}/nacionalidades`
})
export class NacionalidadResourceService extends Resource {


  constructor(handler?: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path:'/listado',
    method: ResourceRequestMethod.Get
  })
  get!: IResourceMethodObservable<{}, INacionalidad[]>
}
