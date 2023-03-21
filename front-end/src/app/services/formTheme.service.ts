import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormThemeService {
  public nomSubject$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public imageSubject$ : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  setNom(nom: string) {
    this.nomSubject$.next(nom);
  }

  getNom(): Observable<string> {
    return this.nomSubject$.asObservable();
  }

  setImages(images: any[]) {
    this.imageSubject$.next(images);

  }

  getImages(): Observable<any[]> {
    return this.imageSubject$.asObservable();
  }
}
