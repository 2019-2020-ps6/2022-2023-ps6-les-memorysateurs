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
  public nombreErreurs$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public nombreEssais$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public nombreIndices$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);

  addCarteTrouvee(imageCarte: string) {
    let actualListe = this.imagesCartesTrouvees$.asObservable();
    actualListe.pipe(take(1)).subscribe((listeImages: string[]) => {
      listeImages.push(imageCarte);
      this.imagesCartesTrouvees$.next(listeImages);
    });
  }

  incrementErreurs(){
    this.nombreErreurs$.next(this.nombreErreurs$.value + 1);
  }

  incrementEssais(){
    this.nombreEssais$.next(this.nombreEssais$.value + 1);
  }
  incrementIndices(){
    this.nombreIndices$.next(this.nombreIndices$.value + 1);
  }

  resetGameStats(){
    this.nombreErreurs$.next(0);
    this.nombreEssais$.next(0);
    this.nombreIndices$.next(0);
  }
}
