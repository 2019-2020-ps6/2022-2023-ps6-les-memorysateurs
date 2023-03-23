import {Cardable} from "./cardable.models";

export class Patient implements Cardable{
  static nextId: number = 0;
  id: number;
  nom : string;
  prenom : string;
  photo : any;
  stade : 3 | 4  | 5 ;

  constructor(nom: string, prenom: string, photo: any, stade: 3 | 4 | 5) {
    this.id = Patient.nextId++;
    this.nom = nom;
    this.prenom = prenom;
    this.photo = photo;
    this.stade = stade;
  }

  getID(): number {
    return this.id;
  }

  getImage(): any {
    this.photo;
  }

  getTitre(): string {
    return this.prenom + this.nom;
  }

  getType(): "patient" | "theme" {
    return "patient";
  }
}
