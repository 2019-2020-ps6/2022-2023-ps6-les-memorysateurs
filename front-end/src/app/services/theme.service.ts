import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Theme} from "../../models/theme.models";
import {LISTE_THEME} from "../../moks/liste-theme.moks";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  public listeThemes$: BehaviorSubject<Theme[]> = new BehaviorSubject<Theme[]>(LISTE_THEME);


}
