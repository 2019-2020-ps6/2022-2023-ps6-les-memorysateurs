import {Injectable} from "@angular/core";
import {BehaviorSubject, map, take} from "rxjs";
import {ListCombinaison} from "../../models/listcombinaison.models";
import { Combinaison } from "../../models/combinaison.models";
import { Card } from "../game/card.component";

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
  public nombreErreurAvantIndice$: BehaviorSubject<number> = new BehaviorSubject<number>(3);
  public nombreCombinaison$: BehaviorSubject<number> = new BehaviorSubject<number>(3);

  private combinations: ListCombinaison = new ListCombinaison();
  public combinations$ : BehaviorSubject<ListCombinaison> = new BehaviorSubject<ListCombinaison>(this.combinations);

  public isRecurentCombinaison$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    this.combinations = new ListCombinaison();
    this.combinations$.next(this.combinations);
  }

  addCombinaison(card1: Card, card2: Card) {
    this.combinations.addCombinaison(card1, card2);
    this.combinations$.next(this.combinations);

    if(this.combinations.recurenceOfLastCombinaison() > this.nombreCombinaison$.getValue()-1) { //TODO: a definir
      this.isRecurentCombinaison$.next(true);
    }
  }
}
