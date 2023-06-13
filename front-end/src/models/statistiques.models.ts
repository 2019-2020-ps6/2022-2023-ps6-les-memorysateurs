export class Statistiques{
  temps : number = 0; //en secondes
  essais : number = 0;
  erreurs : number = 0;
  indices : number = 0;
  date : string;
  nbCartes : number = 0;
  stade : number = 0;

constructor(temps : number,essais : number,erreurs : number,indices : number,date : string,nbCartes : number,stade : number, ) {
  this.temps = temps;
  this.essais = essais;
  this.erreurs = erreurs;
  this.indices = indices;
  this.date = date;
  this.nbCartes = nbCartes;
  this.stade = stade;
}

  getByDataTypeToString(dataType : string) : string {
    dataType = dataType.toLowerCase();
    switch (dataType) {
      case "temps":
        return "" + Math.floor(this.temps/60) +"min" + Math.floor(this.temps%60) +"s" ;
      case "essais":
        return ""+ Math.floor(this.essais);
      case "erreurs":
        return ""+ Math.floor(this.erreurs);
      case "indices":
        return ""+ Math.floor(this.indices);
      default:
        return "";
    }
  }


  getByDataType(dataType : string) : number {
    dataType = dataType.toLowerCase();
    switch (dataType) {
      case "temps":
        return this.temps;
      case "essais":
        return this.essais;
      case "erreurs":
        return this.erreurs;
      case "indices":
        return this.indices;
      default:
        return 0;
    }
  }


  getTemps(): number {
    return this.temps;
  }

  setTemps(value: number) {
    this.temps = value;
  }

  getEssais(): number {
    return this.essais;
  }

  setEssais(value: number) {
    this.essais = value;
  }

  getErreurs(): number {
    return this.erreurs;
  }

  setErreurs(value: number) {
    this.erreurs = value;
  }

  getIndices(): number {
    return this.indices;
  }

  setIndices(value: number) {
    this.indices = value;
  }
  getNbCartes(): number {
    return this.nbCartes;
  }

  setNbCartes(value: number) {
    this.nbCartes = value;
  }
  getDate(): string {
    return this.date;
  }

  setDate(value: string) {
    this.date = value;
  }

  getStade(): number {
    return this.stade;
  }

  setStade(value: number) {
    this.stade = value;
  }


  implementErreurs(){
    this.erreurs ++;
  }

  implementEssais(){
    this.essais ++;
  }
  implementIndices(){
    this.indices ++;
  }


}
