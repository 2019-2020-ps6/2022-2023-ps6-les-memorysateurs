import {Injectable} from "@angular/core";
import {BehaviorSubject, take} from "rxjs";
import {Theme} from "../../models/theme.models";
import {LISTE_THEME} from "../../moks/liste-theme.moks";
import { HttpClient } from "@angular/common/http";
import { GlobalsService } from "./globals.service";
import { PatientService } from "./patient.service";

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  public themes: Theme[] = [];
  public listeThemes$: BehaviorSubject<Theme[] | undefined> = new BehaviorSubject<Theme[] | undefined>(this.themes);
  public themeEdite$: BehaviorSubject<Theme | undefined> = new BehaviorSubject<Theme | undefined>(undefined);
  private themeSelectionne: Theme | undefined = undefined;
  public themeSelectionne$: BehaviorSubject<Theme|undefined> = new BehaviorSubject<Theme|undefined>(this.themeSelectionne);


  constructor(private http: HttpClient, private globals: GlobalsService, public patientService: PatientService) {
    patientService.patientSelectionne$.subscribe(patient => {
      if (patient != undefined) {
        this.retrieveThemes(globals.getURL() + "api/theme?patientId=" + patient.id);
      }
    });

    this.listeThemes$.subscribe(liste => {
      if (liste != undefined) {
        this.themes = liste;
      }
    }
    );

    this.themeSelectionne$.subscribe(theme => {
      if (theme != undefined) {
        this.themeSelectionne = theme;
      }
    }
    );

    this.themeEdite$.subscribe(theme => {
      if (theme != undefined) {
        this.themeSelectionne = theme;
      }
    }
    );
  }

  
  retrieveThemes(url: string): void {
    this.themes = [];
    this.listeThemes$.next(this.themes);
    this.http.get<Theme[]>(url).subscribe((themeList) => {
      themeList.forEach(t => {
        this.themes.push(new Theme(t.titre, t.images, t.id));
      });
      this.listeThemes$.next(this.themes);
      if(this.themes.length > 0)
        this.themeSelectionne$.next(this.themes[0]);
    });
  }

  get(i : number) {
    return this.themes[i];
  }

  setEditTheme(theme : Theme | undefined){
    this.themeEdite$.next(theme);
  }

  public getThemeById(id : number): Theme{
    let themeById: Theme = this.themes[0];
    this.themes.forEach(theme => {
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

  public addTheme(theme : Theme){
    let patientId = this.patientService.patientSelectionne$.getValue()?.id;
    this.http.post<Theme>(this.globals.getURL() + "api/theme?patientId=" + patientId, theme).subscribe((t) => {
      this.themes.push(new Theme(t.titre, t.images, t.id));
      this.listeThemes$.next(this.themes);
      this.themeSelectionne$.next(t);
    });
  }

  public updateTheme(theme : Theme){
    this.http.put<Theme>(this.globals.getURL() + "api/theme/" + theme.getID(), theme).subscribe((theme) => {
      this.themes.forEach((t, i) => {
        if(t.id === theme.id) {
          this.themes[i] = new Theme(t.titre, t.images, t.id);
          this.listeThemes$.next(this.themes);
          this.themeSelectionne$.next(theme);
        }
      });
    });
  }

  public removeTheme(theme : Theme | undefined){
    if(theme == undefined) return;
    this.http.delete<Theme[]>(this.globals.getURL() + "api/theme/" + theme.id).subscribe((themeList) => {
      this.themes = [];
      themeList.forEach(t => {
        this.themes.push(new Theme(t.titre, t.images, t.id));
      });
      this.listeThemes$.next(this.themes);
      this.themeSelectionne$.next(undefined);
    });
  }
}

