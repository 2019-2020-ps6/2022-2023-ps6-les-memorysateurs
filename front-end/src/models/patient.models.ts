import {Cardable} from "./cardable.models";
import {ThemeService} from "../app/services/theme.service";
import {Theme} from "./theme.models";
import {LISTE_DEFAUT, LISTE_THEME, LISTE_THEME_1} from "../moks/liste-theme.moks";
import {Statistiques} from "./statistiques.models";

export class Patient implements Cardable{
  static nextId: number = 0;
  id: number;
  nom : string;
  prenom : string;
  photo : any;
  stade : 3 | 4 | 5 ;
  ergoId : number;


  constructor(nom: string, prenom: string, photo: any, stade: 3 | 4 | 5,/*listeT:Theme[]|undefined,stats : Statistiques[]|undefined,*/ ergoId : number, id : number) {
    this.id = Patient.nextId++;
    this.nom = nom;
    this.prenom = prenom;
    this.photo = photo;
    this.stade = stade;
    this.ergoId = ergoId;

    this.id = id;
  }



  getID(): number {
    return this.id;
  }

  getImage(): any {
    return this.photo;
  }

  getTitre(): string {
    return this.prenom + " " + this.nom;
  }

  getType(): "patient" | "theme" {
    return "patient";
  }
}
