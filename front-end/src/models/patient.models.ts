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
  //themes : Theme[] = [];
  //stats : Statistiques[] = [];


  constructor(nom: string, prenom: string, photo: any, stade: 3 | 4 | 5,/*listeT:Theme[]|undefined,stats : Statistiques[]|undefined,*/ ergoId : number, id : number) {
    this.id = Patient.nextId++;
    this.nom = nom;
    this.prenom = prenom;
    this.photo = photo;
    this.stade = stade;
    this.ergoId = ergoId;
    // if(stats != undefined)
    //   this.stats = stats;

    // if(listeT !=undefined)
    // listeT.forEach(t =>{
    //   this.themes.push(t);
    // })
    // else
    //   LISTE_DEFAUT.forEach(t =>{
    //     this.themes.push(t);
    //   })

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

  isEditable(): boolean {
    return false;
  }

  getThemes() : Theme[]{
    // return this.themes;
    return [];
  }
  setThemes(themes2:Theme[]|undefined) {
    // this.themes = themes2;
  }
  ajouterTheme(t : Theme){
    // this.themes.push(t);
  }

  getStats() : Statistiques[]{
    // return this.stats;
    return [];
  }
  getStat(i : number) : Statistiques | undefined{
    // return this.stats.at(i);
    return undefined;
  }
  setStats(stats : Statistiques[]) {
    // this.stats = stats;
  }
  addStats(stats : Statistiques){
    // this.stats.push(stats);
  }
}