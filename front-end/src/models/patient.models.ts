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
  themes : Theme[] = [];
  stats : Statistiques[] = [];

  idUtilisateur : number;


  constructor(nom: string, prenom: string, photo: any, stade: 3 | 4 | 5,listeT:Theme[]|undefined,stats : Statistiques[]|undefined, idUtilisateur : number) {
    this.id = Patient.nextId++;
    this.nom = nom;
    this.prenom = prenom;
    this.photo = photo;
    this.stade = stade;
    if(stats != undefined)
      this.stats = stats;

    if(listeT !=undefined)
    listeT.forEach(t =>{
      this.themes.push(t);
    })
    else
      LISTE_DEFAUT.forEach(t =>{
        this.themes.push(t);
      })

    this.idUtilisateur = idUtilisateur;
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
  setThemes(themes2 : Theme[]) {
    this.themes = themes2;
  }
  ajouterTheme(t : Theme){
    this.themes.push(t);
  }

  getStats() : Statistiques[]{
    return this.stats;
  }
  getStat(i : number) : Statistiques | undefined{
    return this.stats.at(i);
  }
  setStats(stats : Statistiques[]) {
    this.stats = stats;
  }
  addStats(stats : Statistiques){
    this.stats.push(stats);
  }
}