export interface Cardable {
  getID(): number;
  getTitre(): string;
  getImage(): string;
  getType(): "patient" | "theme";
}
