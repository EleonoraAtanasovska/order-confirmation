
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NarudjbenicaService } from '../narudjbenica.service';
import { Subscription } from 'rxjs';
import { Narudjbenica } from 'src/app/narudjbenice.model';
import * as moment from 'moment';

@Component({
  selector: 'app-izbor-naridjbenice',
  templateUrl: './izbor-naridjbenice.component.html',
  styleUrls: ['./izbor-naridjbenice.component.css']
})
export class IzborNarudjbeniceComponent implements OnInit {
  idNar: Number;
  datumKreiranja: string;
  narudjbenice: Narudjbenica[] = [];
  private narudjbeniceSub: Subscription;
  izabranaNarudjbenica: any;
  izabranIndex:any;
  id:number;

  constructor( public narudjbenicaService: NarudjbenicaService) { }

  ngOnInit(): void {
    this.narudjbenicaService.getNarudjbenice();
    this.narudjbeniceSub = this.narudjbenicaService.getNarudjbeniceUpdateListener()
    .subscribe((narudjbenice: any) => {
      this.narudjbenice = narudjbenice;

    });
  }

  onPronadji(formaPronadji: NgForm){
    this.idNar = formaPronadji.value.idNar
    if(!formaPronadji.value.datumKreiranja){
      this.datumKreiranja = formaPronadji.value.datumKreiranja
    }
    else{this.datumKreiranja = moment( formaPronadji.value.datumKreiranja, "YYYY-MM-DD[T00:00:00.000Z]").format("DD/MM/YYYY")}
  }

  onRowSelected(narudjbenica: any, i:any ,idNarudjbenice){
    this.izabranaNarudjbenica = narudjbenica;
    this.izabranIndex = i;
    this.id = idNarudjbenice;
  }

  ngOnDestroy(){
    this.narudjbeniceSub.unsubscribe();
  }

}
