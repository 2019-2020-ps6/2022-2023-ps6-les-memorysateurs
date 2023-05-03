export class CompteUtilisateur {
  static nextId: number;
  id: number;
  identifiant: string;
  email: string;
  private motDePasse: string;

  constructor(identifiant: string, email: string, motDePasse: string) {
    this.id = CompteUtilisateur.nextId++;
    this.identifiant = identifiant;
    this.email = email;
    this.motDePasse =motDePasse;
  }

  isCorrect(str:string): boolean {
    return str == this.motDePasse;
  }
}
