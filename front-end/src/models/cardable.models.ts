export interface Cardable {
  getID(): number;
  getTitre(): string;
  getImage(): any;
  getType(): "patient" | "theme";
}
