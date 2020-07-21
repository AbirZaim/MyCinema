import { Component, OnInit } from '@angular/core';
import {CinemaService} from '../../Services/cinema.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public cinemaas ;
  public villes;
  public Salles;
  public currentVille;
  public currentCinema;
  public currentProjection;
  SelectedTickets: any[];


  constructor( public cineService: CinemaService) {}
    

  ngOnInit(): void { 
    this.cineService.getVilles()
    .subscribe(
        resp=>{
          this.villes = resp;
        },
        err =>{
          console.log(err);
        }
    );
  }
  onGetCinemas(v){
    this.currentVille =v;
    this.Salles = undefined;
    this.cineService.getAllCinemas(v)
    .subscribe(
      Response => {
        this.cinemaas = Response;
        
      },
      err => {
        alert("ERROOOOOOOOOR");
        console.error(err)
        
      }

    );
  }
  onGetSalle(cine){
    this.currentCinema =cine;
    this.cineService.getSalles(cine)
    .subscribe(
      Response => {
        this.Salles = Response;
        this.Salles._embedded.salles.forEach(salle => {
          this.cineService.getProjections(salle)
            .subscribe(data => salle.films = data);
          
        });
        
      },
      err => {
        alert("ERROOOOOOOOOR");
        console.error(err)
        
      }

    );
  }
  onGetPlaces(p){
    console.log(p.seance);
    console.log(p);
    this.currentProjection =p;
    this.cineService.getPlaces(p)
    .subscribe(
      Response => {
        this.currentProjection.tickets = Response;
        this.SelectedTickets=[];
        console.log(Response);
      },
      err => {
        alert("ERROOOOOOOOOR");
        console.error(err)
        
      }

    );
  }
  onSelect(t, salle){
    if(!t.selected){
      t.selected=true;
      this.SelectedTickets.push(t);
    }
    else{
      t.selected=false;
      this.SelectedTickets.splice(this.SelectedTickets.indexOf(t),1);
    }
  }
  getTicketClass(t){
    let str='';
    if(t.reserve){ str = "myBtn-res"}
    else if(t.selected){str = "myBtn-sel"}
    else{ str = "myBtn"}
    return str;
  }
  onPayTicket(dataForm){
    let tickets=[]
    this.SelectedTickets.forEach(t => {
      tickets.push(t.id)
      
    });
    dataForm.tickets=tickets;
    alert('Tickets réservés avec succès!');
    this.onGetPlaces(this.currentProjection);
    this.cineService.payerTickets(dataForm)
    .subscribe(data=>{
     alert('Tickets réservés avec succès!');
     this.onGetPlaces(this.currentProjection);
    }, err=>{
      console.log(err)
    })
  }

}
