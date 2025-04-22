import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Contratos {
 
  idArea: number;
  numDocumento: number;         
  tipoContratoId: number;
  estado: number;
  fechaIngreso: string;
  fechaFinal: string;
  documento: string;
}
@Injectable({
  providedIn: 'root'
})
export class AreaService {
  idArea: null;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  email: string;
  email_confirmation: string;
  direccion: string;
  password:string;
  password_confirmation: string,
  nacionalidadId?: number | null;
  epsCodigo?: string | null;
  generoId?: number | null;
  tipoDocumentoId?: number | null;
  estadoCivilId?: number | null;
  pensionesCodigo?: string | null;
  rol?: number | null;
  usersId: number | null;
  constructor() { }
}
