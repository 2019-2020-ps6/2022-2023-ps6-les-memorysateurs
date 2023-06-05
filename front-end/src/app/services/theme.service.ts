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
  private listeThemes: Theme[] | undefined = undefined;
  public listeThemes$: BehaviorSubject<Theme[] | undefined> = new BehaviorSubject<Theme[] | undefined>(this.listeThemes);
  public themeEdite$: BehaviorSubject<Theme | undefined> = new BehaviorSubject<Theme | undefined>(undefined);
  private themeSelectionne: Theme | undefined = undefined;
  public themeSelectionne$: BehaviorSubject<Theme|undefined> = new BehaviorSubject<Theme|undefined>(this.themeSelectionne);

  public themes: Theme[] = [];



  constructor(private http: HttpClient, private globals: GlobalsService, public patientService: PatientService) {
    patientService.patientSelectionne$.subscribe(patient => {
      if (patient != undefined) {
        this.retrieveThemes(globals.getURL() + "api/theme?patientId=" + patient.id);
      }
    });

    this.listeThemes$.subscribe(liste => {
      if (liste != undefined) {
        this.listeThemes = liste;
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
    this.http.get<Theme[]>(url).subscribe((themeList) => {
      themeList.forEach(t => {
        this.themes.push(new Theme(t.titre, t.images, t.id));
      });
      this.listeThemes$.next(this.themes);
      console.log(this.themes);
      if(this.themes.length > 0)
        this.themeSelectionne$.next(this.themes[0]);
    });
  }

public addTheme(theme : Theme){
  let actualList = this.listeThemes$.asObservable();
  actualList.pipe(
    take(1)
  ).subscribe(liste =>{
  //liste.push(theme);
  this.listeThemes$.next(liste);});

}
  get(i : number) {
    // if(this.listeThemes$ != undefined){
    //   return this.listeThemes$.getValue()[i];
    // }
  }

  setEditTheme(theme : Theme | undefined){
    this.themeEdite$.next(theme);
  }

  removeTheme(theme : Theme | undefined){
  //   let actualList = this.listeThemes$.asObservable();

  //   let listeA : Theme[] = [];
  //   actualList.pipe(
  //     take(1)
  //   ).subscribe(liste =>{
  //     liste.forEach(chaine =>{

  //       if(chaine.id != theme?.id){
  //         listeA.push(chaine);
  //       }
  //      })
  // });
  //   this.listeThemes$.next(listeA);

  }

  public getThemeById(id : number): Theme{
    // let themeById: Theme = this.listeThemes$.getValue()[0];
    // this.listeThemes$.getValue().forEach(theme => {
    //   if(theme.id === id) themeById = theme;
    // })
    // return themeById;
    return new Theme("", []);
  }

  public setThemes(themes : Theme[]|undefined){
    if(themes!=undefined) {
      this.listeThemes$.next(themes);
      this.themeSelectionne$.next(themes[0]);
    }
  }
}

