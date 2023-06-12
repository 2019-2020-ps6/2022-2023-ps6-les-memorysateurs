import { Component, Input, Output, OnInit, EventEmitter, AfterViewInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import {StatistiquesService} from "../services/statistiques.service";
import {Statistiques} from "../../models/statistiques.models";

@Component({
    selector: 'app-statcontainer',
    templateUrl: './statcontainer.component.html',
    styleUrls: ['./statcontainer.component.scss']
  })
  export class StatContainerComponent implements AfterViewInit, OnInit {
    public listeStatistiques: Statistiques[] | undefined = []
    public patient = this.patientService.patientSelectionne$;
    @Input() public progres: boolean = false;
    @Input() public title: string = "Title";
    @Input() public data: string = "Data";
    public idTab: string = "tab"+this.data;
    public isActive: boolean = false;
    @Output() activeEmitter = new EventEmitter<string>();
    public moyenne: number = 0;

    constructor(private patientService: PatientService, public statsService: StatistiquesService) {
      statsService.listeStatistiques$.subscribe((statistiques) => {
        this.listeStatistiques = statistiques;
        this.setUp();
      })
    }
    ngOnInit(): void {
        this.idTab = "tab"+this.data;
    }

    ngAfterViewInit(): void {
    }

    setUp(){
        let grid = document.getElementById(this.idTab) as HTMLDivElement;
        let total = 0;




        // @ts-ignore
        for(let i = this.listeStatistiques?.length - 1; i>=Math.max(0, this.listeStatistiques?.length -4); i--){



            if(this.listeStatistiques != undefined) {
              //stade
              let stade = document.createElement('p');
              stade.innerHTML = "" + this.listeStatistiques[i].getStade();
              console.log("tab filling" + this.data + " " + this.idTab);
              grid.append(stade);
              let date = document.createElement('p');
              //date
              let tmp: String | undefined = this.listeStatistiques[i].getDate();
              date.innerHTML = "" + tmp;
              grid.append(date);
              //nb carte
              let cartes = document.createElement('p');
              cartes.innerHTML = "" + this.listeStatistiques[i].getNbCartes();
              grid.append(cartes);
              //data
              let datap = document.createElement('p');
              let datas = this.listeStatistiques[i].getByDataTypeToString(this.data);
              datap.innerHTML = "" + datas;
              let datai = this.listeStatistiques[i].getByDataType(this.data);
              if (datai != undefined)
                total += datai;
              grid.append(datap);
            }

        }

      let moyennep = document.getElementById("moyenne"+this.idTab) as HTMLParagraphElement;


      // @ts-ignore
      total = total/this.listeStatistiques?.length;
      moyennep.innerHTML = this.moyenneToString(total,this.data);
        // @ts-ignore
        if(total >= this.listeStatistiques[this.listeStatistiques?.length - 1].getByDataType(this.data)){
          this.progres = true;
        }else{
          this.progres = false;
        }
      }

    moyenneToString(n : number, type : string) : string {
        type = type.toLowerCase();
        switch (type) {
            case "temps":
                return "" + Math.floor(n/60) +"min" + Math.floor(n%60) +"s" ;
            case "essais":

                return ""+ Math.floor(n);
            case "erreurs":
                return ""+ Math.floor(n);
            case "indices":

                return ""+ Math.floor(n);
            default:
                return "";
        }
    }

    toggle() {
        this.isActive = !this.isActive;
        this.activeEmitter.emit(this.data);
    }

}
