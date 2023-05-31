export class CompteUtilisateur {
  static nextId: number;
  id: number;
  email: string;
  name : string;
  private motDePasse: string;

  constructor(id: number, name: string, email: string, motDePasse: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.motDePasse =motDePasse;
  }

  isCorrect(str:string): boolean {
    return str == this.motDePasse;
  }
}
