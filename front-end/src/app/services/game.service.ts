import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GameService {
  nombreCartes$: BehaviorSubject<number> = new BehaviorSubject<number>(8);
  nombreCartesIndice$: BehaviorSubject<number> = new BehaviorSubject<number>(4);
  dureeIndice$: BehaviorSubject<number> = new BehaviorSubject<number>(2);

}
