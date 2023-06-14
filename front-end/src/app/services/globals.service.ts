import {Injectable} from "@angular/core";
import {BehaviorSubject, take} from "rxjs";


@Injectable({
    providedIn: 'root'
  })

export class GlobalsService {
    static url : String = "http://localhost:8000/";

    public getURL() : String {
        return GlobalsService.url;
    }
}
