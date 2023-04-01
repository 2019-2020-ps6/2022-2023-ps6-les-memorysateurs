import {Injectable} from "@angular/core";
import {BehaviorSubject, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GameService {
  public nombreCartes$: BehaviorSubject<number> = new BehaviorSubject<number>(6);
  public nombreCartesIndice$: BehaviorSubject<number> = new BehaviorSubject<number>(4);
  public dureeIndice$: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  public timerEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public imagesCartesTrouvees$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  addCarteTrouvee(imageCarte: string) {
    this.imagesCartesTrouvees$.pipe(
      map((array) => [...array, imageCarte])
    ).subscribe((newArray) => {
      this.imagesCartesTrouvees$.next(newArray);
    });
  }

}
