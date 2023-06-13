export class CompteUtilisateur {
  id?: number;
  email: string;
  name : string;
  private password?: string;

  constructor(name: string, email: string, motDePasse?: string, id?: number) {
    if(id != undefined) this.id = id;
    this.email = email;
    this.name = name;
    this.password =motDePasse;
  }

  isCorrect(str:string): boolean {
    return str == this.password;
  }
}
