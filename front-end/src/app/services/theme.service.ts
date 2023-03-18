import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Theme} from "../../models/theme.models";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  public listeThemes$: BehaviorSubject<Theme[]> = new BehaviorSubject<Theme[]>([]);


}
