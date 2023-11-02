import { Injectable } from '@angular/core';
import { IResourceMethodObservable, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod } from '@ngx-resource/core';
import { environment } from 'src/environments/environment';
import { IGenero } from 'src/app/core/models/i-genero';


@Injectable()
@ResourceParams({
  pathPrefix: `${environment.apiUrl}/generos`
})
export class GeneroResourceService extends Resource{

  constructor(handler?: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path:'/listado',
    method: ResourceRequestMethod.Get
  })
  get!: IResourceMethodObservable<{}, IGenero[]>
}
