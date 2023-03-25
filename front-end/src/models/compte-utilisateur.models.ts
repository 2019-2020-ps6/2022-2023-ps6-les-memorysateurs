export class CompteUtilisateur {
  static nextId: number;
  id: number;
  identifiant: string;
  private motDePasse: string;

  constructor(identifiant: string, motDePasse: string) {
    this.id = CompteUtilisateur.nextId++;
    this.identifiant = identifiant;
    this.motDePasse =motDePasse;
  }

  isCorrect(str:string): boolean {
    return str == this.motDePasse;
  }
}
