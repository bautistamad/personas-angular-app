import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
export class EditService {

  private _nroPersona!:number;
  private _subject = new Subject<number>();


  constructor() { }

  getObservable(): Observable<number> {
    return this._subject.asObservable();
  }

  addNumber(nroPersona: number): void {
    this._nroPersona = nroPersona;
    this._subject.next(nroPersona);
  }

  getNumber(): number {
    return this._nroPersona;
  }
}
