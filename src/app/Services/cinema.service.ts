import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public url:string = "http://localhost:8081/";

  constructor(private http:HttpClient) { }

  public getVilles(){
    return this.http.get(this.url + "villes");
  }

  public getAllCinemas(v){
    return this.http.get(v._links.cinemas.href);
  }
  public getSalles(cine){
    return this.http.get(cine._links.salles.href);
  }
  public getProjections(salle){
    let a =salle._links.films.href.replace("{?projection}", "");

    return this.http.get(a +"?projection=p1");
  }
  
  public getPlaces(p){
    let a =p._links.tickets.href.replace("{?projection}", "");

    return this.http.get(a +"?projection=ticketsProj");
  }
  public payerTickets(dataForm){
    return this.http.post(this.url +"payerTickets", dataForm);
  }
}
