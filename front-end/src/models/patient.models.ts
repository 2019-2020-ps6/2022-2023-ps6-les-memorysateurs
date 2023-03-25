import {Cardable} from "./cardable.models";
import {ThemeService} from "../app/services/theme.service";
import {Theme} from "./theme.models";
import {LISTE_THEME, LISTE_THEME_1} from "../moks/liste-theme.moks";

export class Patient implements Cardable{
  static nextId: number = 0;
  id: number;
  nom : string;
  prenom : string;
  photo : any;
  stade : 3 | 4  | 5 ;
  themes : Theme[] = [];


  constructor(nom: string, prenom: string, photo: any, stade: 3 | 4 | 5,listeT:Theme[]|undefined) {
    this.id = Patient.nextId++;
    this.nom = nom;
    this.prenom = prenom;
    this.photo = photo;
    this.stade = stade;
    if(listeT !=undefined)
    listeT.forEach(t =>{
      this.themes.push(t);
    })
    else
      LISTE_THEME.forEach(t =>{
        this.themes.push(t);
      })
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

  getThemes() : Theme[]{
    return this.themes;
  }

  ajouterTheme(t : Theme){
    this.themes.push(t);
  }
}
