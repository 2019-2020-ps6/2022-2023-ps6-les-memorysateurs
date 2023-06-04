import {Cardable} from "./cardable.models";

export class Theme implements Cardable{
  static nextId = 0;
  id: number;
  titre: string;
  images: any[];

  constructor(titre: string, images: any[], id?: number){
    this.id = id||0;
    this.titre = titre;
    this.images = images;
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

}
