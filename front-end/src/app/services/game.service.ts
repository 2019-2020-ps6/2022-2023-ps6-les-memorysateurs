import {Injectable} from "@angular/core";
import {BehaviorSubject, map, take} from "rxjs";
import {ListCombinaison} from "../../models/listcombinaison.models";
import { Combinaison } from "../../models/combinaison.models";
import { Card } from "../game/card.component";
import {Patient} from "../../models/patient.models";

@Injectable({
  providedIn: 'root'
})

export class GameService {
  public nombreCartes$: BehaviorSubject<number> = new BehaviorSubject<number>(6);
  public nombreCartesIndice$: BehaviorSubject<number> = new BehaviorSubject<number>(4);

  public nombreErreurAvantIndice$: BehaviorSubject<number> = new BehaviorSubject<number>(3);
  public nombreCombinaison$: BehaviorSubject<number> = new BehaviorSubject<number>(3);
  public dureeIndice$: BehaviorSubject<number> = new BehaviorSubject<number>(5);
  public timerEnabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public imagesCartesTrouvees$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public nombreErreurs$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public nombreEssais$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public nombreIndices$ : BehaviorSubject<number> = new BehaviorSubject<number>(0);


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

  setReglages( patient : Patient | undefined){
    switch(patient?.stade){
      case 3:
        this.nombreCartes$.next(8);
        this.nombreCartesIndice$.next(3);
        this.nombreErreurAvantIndice$.next(3);
        this.nombreCombinaison$.next(4);
        this.dureeIndice$.next(20);
        break;
      case 4:
        this.nombreCartes$.next(6);
        this.nombreCartesIndice$.next(2);
        this.nombreErreurAvantIndice$.next(3);
        this.nombreCombinaison$.next(3);
        this.dureeIndice$.next(30);
        break;
      case 5:
        this.nombreCartes$.next(4);
        this.nombreCartesIndice$.next(1);
        this.nombreErreurAvantIndice$.next(1);
        this.nombreCombinaison$.next(3);
        this.dureeIndice$.next(40);
        break;
    }
}
}
