
import { Component, OnInit } from '@angular/core';
import { NgForm , ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { NarudjbenicaService } from '../narudjbenica.service';
import { Narudjbenica } from '../narudjbenice.model';


@Component({
  selector: 'app-potvrdjivanje-narudzbenice',
  templateUrl: './potvrdjivanje-narudzbenice.component.html',
  styleUrls: ['./potvrdjivanje-narudzbenice.component.css']
})
export class PotvrdjivanjeNarudzbeniceComponent implements OnInit {
  private mode = 'izaberi';
  private idNarudjbenice: number;
  narudjbenica: Narudjbenica;
  transformedDatumKreiranja: any;
  transformedDatumPotvrde: any;

  constructor(public route: ActivatedRoute, public narudjbenicaService: NarudjbenicaService) { }

  ngOnInit(): void {
        this.narudjbenica = this.narudjbenicaService.getNarudjbenica(this.idNarudjbenice)

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
         if (paramMap.has('idNarudjbenice')){
        this.mode = 'potvrdi';
        this.idNarudjbenice = +paramMap.get('idNarudjbenice');
        this.narudjbenica = this.narudjbenicaService.getNarudjbenica(this.idNarudjbenice);
        (document.getElementById("btnPotvrdi") as HTMLButtonElement).disabled = false;
      }else{
        this.mode = 'izaberi';
        (document.getElementById("btnPotvrdi") as HTMLButtonElement).disabled = true;
      }
    });

  }
  onPotvrdi(formaPotvrdi: NgForm) {
    if (formaPotvrdi.invalid){
      return;
    }if(this.mode ==='potvrdi'){
    this.narudjbenicaService.updateNarudjbenica(
      this.idNarudjbenice,
      formaPotvrdi.value.datumKreiranja,
      formaPotvrdi.value.statusDropdown,
      formaPotvrdi.value.updatedDatumPotvrde);
    }else {
      console.log('Izaberi narudjbenicu');
    }
      formaPotvrdi.resetForm();
  }

  onOdustani(formaPotvrdi: NgForm){
    formaPotvrdi.resetForm();
  }

}
