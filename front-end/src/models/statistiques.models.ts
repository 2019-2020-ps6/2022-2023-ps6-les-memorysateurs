export class Statistiques{
private temps : number = 0; //en secondes
private essais : number = 0;
private erreurs : number = 0;
private indices : number = 0;
private date : Date;
private nbCartes : number = 0;
private stade : number = 0

constructor(temps : number,essais : number,erreurs : number,indices : number,date : Date,nbCartes : number,stade : number) {
  this.temps = temps;
  this.essais = essais;
  this.erreurs = erreurs;
  this.indices = indices;
  this.date = date;
  this.nbCartes = nbCartes;
  this.stade = stade;
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
  getDate(): Date {
    return this.date;
  }

  setDate(value: Date) {
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
