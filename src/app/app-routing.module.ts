import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IzborNarudjbeniceComponent } from "./izbor-narudjbenice/izbor-naridjbenice.component";
import { PotvrdjivanjeNarudzbeniceComponent } from "./potvrdjivanje-narudzbenice/potvrdjivanje-narudzbenice.component";

const routes: Routes = [
  { path: '', redirectTo: '/izaberi', pathMatch: 'full'  },
  { path: 'izaberi', component: PotvrdjivanjeNarudzbeniceComponent},
  { path: 'izbor', component: IzborNarudjbeniceComponent},
  { path: 'potvrdi/:idNarudjbenice', component: PotvrdjivanjeNarudzbeniceComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
