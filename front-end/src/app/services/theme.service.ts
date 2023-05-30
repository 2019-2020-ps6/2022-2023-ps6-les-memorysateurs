import {Injectable} from "@angular/core";
import {BehaviorSubject, take} from "rxjs";
import {Theme} from "../../models/theme.models";
import {LISTE_THEME} from "../../moks/liste-theme.moks";
import { HttpClient } from "@angular/common/http";
import { GlobalsService } from "./globals.service";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  public listeThemes$: BehaviorSubject<Theme[]> = new BehaviorSubject<Theme[]>(LISTE_THEME);
  public themeSelectionne$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(LISTE_THEME[0]);
  public themeEdite$: BehaviorSubject<Theme | undefined> = new BehaviorSubject<Theme | undefined>(undefined);

  public themes: Theme[] = [];



  private userUrl: string;

  constructor(private http: HttpClient, private globals: GlobalsService) {
    this.userUrl = globals.getURL() + "api/theme";
    this.retrieveThemes();
  }

  
  retrieveThemes(): void {
    this.http.get<Theme[]>(this.userUrl).subscribe((themeList) => {
      this.themes = themeList;
      this.listeThemes$.next(this.themes);
    });
  }

public addTheme(theme : Theme){
  let actualList = this.listeThemes$.asObservable();
  actualList.pipe(
    take(1)
  ).subscribe(liste =>{
  liste.push(theme);
  this.listeThemes$.next(liste);});

}
  get(i : number) {
    return this.listeThemes$.getValue()[i];
  }

  setEditTheme(theme : Theme | undefined){
    this.themeEdite$.next(theme);
  }

  removeTheme(theme : Theme | undefined){
    let actualList = this.listeThemes$.asObservable();

    let listeA : Theme[] = [];
    actualList.pipe(
      take(1)
    ).subscribe(liste =>{
      liste.forEach(chaine =>{

        if(chaine.id != theme?.id){
          listeA.push(chaine);
        }
       })
  });
    this.listeThemes$.next(listeA);

  }

  public getThemeById(id : number): Theme{
    let themeById: Theme = this.listeThemes$.getValue()[0];
    this.listeThemes$.getValue().forEach(theme => {
      if(theme.id === id) themeById = theme;
    })
    return themeById;
  }

  public setThemes(themes : Theme[]|undefined){
    if(themes!=undefined) {
      this.listeThemes$.next(themes);
      this.themeSelectionne$.next(themes[0]);
    }
  }
}

