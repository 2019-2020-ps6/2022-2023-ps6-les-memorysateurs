export interface Cardable {
  getID(): number;
  getTitre(): string;
  getImage(): string;
  isEditable(): boolean;
  getType(): "patient" | "theme";
}
