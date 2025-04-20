import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Contratos {
 
  idContrato?: number;
  numDocumento: number;         // 👈 aquí como number
  tipoContratoId: number;
  estado: number;
  fechaIngreso: string;
  fechaFinal: string;
  documento: string;
}
  

@Injectable({
  providedIn: 'root'
})
export class ContratosService {
  
  private apiUrl = 'http://localhost:8000/api/contrato';

  constructor(private http: HttpClient) {}
  
  obtenerContratos(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        console.log('Respuesta del backend:', res); // 👈 esto
        return res.contrato;
      })
    );
  }

  agregarContrato(contrato: any) {
    return this.http.post<Contratos>('http://localhost:8000/api/contrato', contrato);
  }
  obtenerTiposContrato(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/tipocontrato').pipe(
      map(res => res.tipocontrato) // 👈 coincide con la respuesta del backend
    );
  }
  
  
  obtenerNacionalidades(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/nacionalidad').pipe(
      map(res => res.Nacionalidad) // 👈 Esto extrae el array
    );
  }
  actualizarContratoParcial(id: number, datos: Partial<Contratos>): Observable<any> {
    return this.http.patch<any>(`http://localhost:8000/api/contrato/${id}`, datos);
  }
  
  obtenerEps(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/epss').pipe(
      map(res => res.Eps) // 👈 Ajusta según la estructura real
    );
  }
  eliminarContrato(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8000/api/contrato/${id}`);
  }
  obtenerUsuarioPorDocumento(documento: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${documento}`);
  }
  
  obtenerContrato(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/contrato/${id}`);
  }
  
  obtenerGeneros(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/genero').pipe(
      map(res => res.Genero) // 👈 Ajusta según la estructura real
    );
  }
  
  obtenerTiposDocumento(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/tipodocumento').pipe(
      map(res => res.TipoDocumento) // 👈 Ajusta según la estructura real
    );
  }
  
  obtenerEstadosCiviles(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/estadocivil').pipe(
      map(res => res.EstadoCivil) // 👈 Ajusta según la estructura real
    );
  }
  
  obtenerPensiones(): Observable<any[]> {
    return this.http.get<any>('http://localhost:8000/api/pensiones').pipe(
      map(res => res.Pensiones) // 👈 Ajusta según la estructura real
    );
  }
}
