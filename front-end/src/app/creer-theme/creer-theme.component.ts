import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormThemeService} from "../services/formTheme.service";

import {FormGroup, FormBuilder, Validators, NgModel} from '@angular/forms';
import {Theme} from "../../models/theme.models";
import {ThemeService} from "../services/theme.service";
import {Router} from "@angular/router";
import {Patient} from "../../models/patient.models";
import {PatientService} from "../services/patient.service";
@Component({
  selector: 'app-creer-theme',
  templateUrl: './creer-theme.component.html',
  styleUrls: ['./creer-theme.component.scss']
})
export class CreerThemeComponent {
  public themeForm: FormGroup;
  imageData : string | undefined;
  // @ts-ignore
  nom: string;
  images : any[] = [];
  URL : string="";
  @Input()
  theme : Theme |undefined;
  @Input()
  erreurImage = false;
  @Input()
  erreurTitre = false;

  popup=false;


  constructor(private router: Router,private http:HttpClient,public formThemeService: FormThemeService,
              private themeService : ThemeService,private formBuilder : FormBuilder,private patientService : PatientService) {
    this.themeForm = this.formBuilder.group({
      name: ['']
    });


  }
  remplirData() : void{
    this.theme = this.themeService.themeEdite$.value;
    const stockImage = document.getElementById("imageEnAttente") as HTMLDivElement;
    const stockImage2 = document.getElementById("imageChoisi") as HTMLDivElement;
    if(this.theme != undefined){
      this.themeForm = this.formBuilder.group({
        name: [this.theme.titre]
      });
      for(let i=0;i< this.theme.images.length;i++){

        const stockImage = document.getElementById("imageEnAttente") as HTMLDivElement;
        const stockImage2 = document.getElementById("imageChoisi") as HTMLDivElement;
        const imageElement = document.createElement('img');
        imageElement.style.height = "160px";
        imageElement.style.width = "160px";
        imageElement.src = this.theme.images[i];
        stockImage2.appendChild(imageElement);
        this.images.push(imageElement.src);
        imageElement.addEventListener("click",() =>{
          if(stockImage.contains(imageElement)) {
            stockImage.removeChild(imageElement);
            stockImage2.appendChild(imageElement);
            this.images.push(imageElement.src);

          }
          else{
            stockImage2.removeChild(imageElement);
            stockImage.appendChild(imageElement);
            const index = this.images.findIndex(image => image ===imageElement.src);
            if(index !== -1){
              this.images.splice(index,1);
            }
          }
          this.envoyerImages();
        })
      }
    }
    this.envoyerNom();
    this.envoyerImages();
  }
  ngOnInit(): void {
    this.banqueImage();
    this.remplirData();
    this.envoyerImages();
    this.envoyerNom();
    if(this.theme != undefined){
      const titre = document.getElementById("Titre-Nouveau-theme") as HTMLParagraphElement;
      titre.innerHTML = "MODIFIER LE THEME";
    }
  }

  envoyerNom() {
    this.formThemeService.setNom(this.themeForm.value.name);

  }
  envoyerImages(){

    this.formThemeService.setImages(this.images);

  }

  afficherFichier(){
    const input = document.getElementById("recup-fichier") as HTMLInputElement;
    const file = input.files?.[0];
    const stockImage = document.getElementById("imageEnAttente") as HTMLDivElement;
    const stockImage2 = document.getElementById("imageChoisi") as HTMLDivElement;
    const imageElement = document.createElement('img');
    imageElement.style.height = "160px";
    imageElement.style.width = "160px";
    const reader = new FileReader();
    reader.onload = () => {
      imageElement.src = reader.result as string;
    }
    reader.readAsDataURL(file as Blob);
    stockImage.appendChild(imageElement);
    imageElement.addEventListener("click",() =>{
      if(stockImage.contains(imageElement)) {
        stockImage.removeChild(imageElement);
        stockImage2.appendChild(imageElement);
        this.images.push(imageElement.src);
      }
      else{
        stockImage2.removeChild(imageElement);
        stockImage.appendChild(imageElement);
        const index = this.images.findIndex(image => image ===imageElement.src);
        if(index !== -1){
          this.images.splice(index,1);

        }
      }
      this.envoyerImages();
    })

  }

  private async  banqueImage(){
    const stockImage = document.getElementById("imageEnAttente") as HTMLDivElement;
    const stockImage2 = document.getElementById("imageChoisi") as HTMLDivElement;
    for(let i = 0; i < 4; i++){
        const imageElement = document.createElement('img');
        imageElement.style.height = "160px";
        imageElement.style.width = "160px";
        imageElement.src = 'assets/images/image'+i+".png";
        stockImage.appendChild(imageElement);
        imageElement.addEventListener("click",() =>{
          if(stockImage.contains(imageElement)) {
            stockImage.removeChild(imageElement);
            stockImage2.appendChild(imageElement);
            this.images.push(imageElement.src);

          }
          else{
            stockImage2.removeChild(imageElement);
            stockImage.appendChild(imageElement);
            const index = this.images.findIndex(image => image ===imageElement.src);
            if(index !== -1){
              this.images.splice(index,1);

            }

          }
          this.envoyerImages();
        })
      }

    }
  afficherErreur(value : boolean){
    this.popup = value;
   if(value){
     const inputTitre = document.getElementById("div-nom-theme") as HTMLInputElement;
     const imageChoisi = document.getElementById("imageChoisi") as HTMLDivElement;
     if(imageChoisi.childElementCount <4){
       this.erreurImage = true;

       console.log(this.erreurImage);
       imageChoisi.style.background = "#F00000";
       imageChoisi.style.opacity = "0.8";
       if(this.themeForm.value.name !=""){
         if(this.themeForm.value.name != undefined) {
           this.erreurTitre = false;
           inputTitre.style.background = "#FFFFFF";
           inputTitre.style.opacity = "0.5";
         }
       }
     } if(this.themeForm.value.name ==""){
       this.erreurTitre = true;

       inputTitre.style.background = "#F00000";
       inputTitre.style.opacity = "0.8";
       if(imageChoisi.childElementCount != 0){
         this.erreurImage = false;
         imageChoisi.style.background = "#FFFFFF";
         imageChoisi.style.opacity = "1";
       }
     }
   }
  }


  importerImageURL(){
    if(this.URL==""){
      return;
    }
    const stockImage = document.getElementById("imageEnAttente") as HTMLDivElement;
    const stockImage2 = document.getElementById("imageChoisi") as HTMLDivElement;
    const imageElement = document.createElement('img');
    imageElement.style.height = "160px";
    imageElement.style.width = "160px";
    const reader = new FileReader();
    imageElement.src = this.URL;
    stockImage.appendChild(imageElement);
    imageElement.addEventListener("click",() =>{
      if(stockImage.contains(imageElement)) {
        stockImage.removeChild(imageElement);
        stockImage2.appendChild(imageElement);
        this.images.push(imageElement.src);
      }
      else{
        stockImage2.removeChild(imageElement);
        stockImage.appendChild(imageElement);
        const index = this.images.findIndex(image => image ===imageElement.src);
        if(index !== -1){
          this.images.splice(index,1);

        }
      }
      this.envoyerImages();
    })
    this.URL ="";
  }

  popupChange(value : boolean){
    this.popup = value;
  }

}
