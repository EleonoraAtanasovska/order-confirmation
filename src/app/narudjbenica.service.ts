import { Injectable } from "@angular/core";
import { Narudjbenica } from "./narudjbenice.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import * as moment from "moment";



@Injectable({providedIn: 'root'})
export class NarudjbenicaService{
  private narudjbenice: Narudjbenica[] = [];
  private narudjbeniceUpdated = new Subject<Narudjbenica[]>();

  constructor( private http: HttpClient){}

  getNarudjbeniceUpdateListener() {
    return this.narudjbeniceUpdated.asObservable();
  }

  getNarudjbenice() {
    this.http.get<{message: string, narudjbenice: any}>('http://localhost:3000/api/narudjbenice')
    .pipe(map((narudjbenicaData)=>{
      return narudjbenicaData.narudjbenice.map(narudjbenica =>
        { return {
          idNarudjbenice: narudjbenica.idNarudjbenice,
          datumKreiranja: moment( narudjbenica.datumKreiranja, "YYYY-MM-DD[T00:00:00.000Z]").format("DD/MM/YYYY"),
          status: narudjbenica.status,
          datumPotvrde: moment(narudjbenica.datumPotvrde, "YYYY-MM-DD[T00:00:00.000Z]").format("DD/MM/YYYY")
        }})
    }))
    .subscribe(transfNarudjbenice => {
     this.narudjbenice = transfNarudjbenice;
     this.narudjbeniceUpdated.next([...this.narudjbenice]);
  });
  }

  getNarudjbenica(id: number){
    return {...this.narudjbenice.find(n => n.idNarudjbenice === id)};
  }

  updateNarudjbenica(idNarudjbenice: number, datumKreiranja: string, status:string, datumPotvrde:Date){
    const narudjbenica: Narudjbenica = {idNarudjbenice: idNarudjbenice, datumKreiranja: datumKreiranja, status:status, datumPotvrde: datumPotvrde };
    this.http.put("http://localhost:3000/api/narudjbenice/" + idNarudjbenice, narudjbenica)
    .subscribe(response => console.log(response));
  }

}
