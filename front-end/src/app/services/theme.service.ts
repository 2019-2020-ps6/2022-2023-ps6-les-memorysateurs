import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Theme} from "../../models/theme.models";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  public listeThemes$: BehaviorSubject<Theme[]> = new BehaviorSubject<Theme[]>([
    {titre: 'Theme 1', images: ['assets/images/image034.png','assets/images/image014.png']},
    {titre: 'Theme 2', images: ['assets/images/image034.png']}
  ]);



}
