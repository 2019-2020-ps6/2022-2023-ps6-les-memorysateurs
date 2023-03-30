import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GameService {
  public nombreCartes$: BehaviorSubject<number> = new BehaviorSubject<number>(6);
  public nombreCartesIndice$: BehaviorSubject<number> = new BehaviorSubject<number>(4);
  public dureeIndice$: BehaviorSubject<number> = new BehaviorSubject<number>(5);

}
