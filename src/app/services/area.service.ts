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
  
  nacionalidadId?: number | null;
  epsCodigo?: string | null;
  generoId?: number | null;
  tipoDocumentoId?: number | null;
  estadoCivilId?: number | null;
  pensionesCodigo?: string | null;
  rol?: number | null;
  
  constructor() { }
}
