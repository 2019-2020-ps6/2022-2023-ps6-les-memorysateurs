import {Injectable} from "@angular/core";
import {BehaviorSubject, map, take} from "rxjs";

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
    let actualListe = this.imagesCartesTrouvees$.asObservable();
    actualListe.pipe(take(1)).subscribe((listeImages: string[]) => {
      listeImages.push(imageCarte);
      this.imagesCartesTrouvees$.next(listeImages);
    });
  }

}
