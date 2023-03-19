import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormThemeService {
  private nomSubject: Subject<string> = new Subject<string>();
  private imageSubject : Subject<any[]> = new Subject<any[]>();

  setNom(nom: string) {
    this.nomSubject.next(nom);
  }

  getNom(): Observable<string> {
    return this.nomSubject.asObservable();
  }

  setImages(images: any[]) {
    this.imageSubject.next(images);
  }

  getImages(): Observable<any[]> {
    return this.imageSubject.asObservable();
  }
}
