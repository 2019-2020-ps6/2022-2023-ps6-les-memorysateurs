import {Cardable} from "./cardable.models";

export class Theme implements Cardable{
  static nextId = 0;
  id: number;
  titre: string;
  images: any[];
  patientId?: number;

  constructor(titre: string, images: any[], id?: number, patientId?: number){
    this.id = id||0;
    this.titre = titre;
    this.images = images;
    console.log("update theme", patientId);
    this.patientId = patientId||undefined;
  }


  getID(): number {
    return this.id;
  }

  getImage(): any {
    return this.images[0];
  }

  getTitre(): string {
    return this.titre;
  }

  getType(): "patient" | "theme" {
    return "theme";
  }

  isEditable(): boolean {
      return this.patientId != undefined;
  }

}
