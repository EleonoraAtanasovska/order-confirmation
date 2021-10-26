import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { PotvrdjivanjeNarudzbeniceComponent } from './potvrdjivanje-narudzbenice/potvrdjivanje-narudzbenice.component';
import { IzborNarudjbeniceComponent } from './izbor-narudjbenice/izbor-naridjbenice.component';
import { SearchfilterPipe } from './searchfilter1.pipe';
import { AppRoutingModule } from './app-routing.module';
import { DropdownDirective } from './dropdown-directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button"
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    PotvrdjivanjeNarudzbeniceComponent,
    IzborNarudjbeniceComponent,
    SearchfilterPipe,
    DropdownDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
    bootstrap: [AppComponent],
    entryComponents: [ErrorComponent]
})
export class AppModule { }
