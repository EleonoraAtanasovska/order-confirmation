import { Pipe, PipeTransform } from '@angular/core';
import { Narudjbenica } from './narudjbenice.model';


@Pipe({
  name: 'searchfilter1'
})
export class SearchfilterPipe implements PipeTransform {


  transform(Narudjbenice: Narudjbenica[], searchValue: number, searchDate: String): Narudjbenica[]{
    if(!Narudjbenice || !searchValue && !searchDate){
      return  Narudjbenice;
    }
     else if(searchValue !== null && !searchDate ){
        return Narudjbenice.filter(narudjbenica => narudjbenica.idNarudjbenice === searchValue)
      }
    else if(!searchValue && searchDate !== null){
   return Narudjbenice.filter(narudjbenica => narudjbenica.datumKreiranja === searchDate)
      }
  return Narudjbenice.filter(narudjbenica => narudjbenica.idNarudjbenice === searchValue  && narudjbenica.datumKreiranja === searchDate)

  }


}
