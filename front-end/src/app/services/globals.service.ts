import {Injectable} from "@angular/core";
import {BehaviorSubject, take} from "rxjs";


@Injectable({
    providedIn: 'root'
  })

export class GlobalsService {
    static url : String = "http://localhost:9428/";

    public getURL() : String {
        return GlobalsService.url;
    }
}