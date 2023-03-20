import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormThemeService} from "../services/formTheme.service";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-creer-theme',
  templateUrl: './creer-theme.component.html',
  styleUrls: ['./creer-theme.component.scss']
})
export class CreerThemeComponent {

  imageData : string | undefined;
  // @ts-ignore
  nom: string;
  images : any[] = [];
  constructor(private http:HttpClient,private formThemeService: FormThemeService) {

  }
  ngOnInit(): void {
  this.banqueImage();
  }
  envoyerNom() {
    this.formThemeService.setNom(this.nom);
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
    imageElement.style.height = "26%";
    imageElement.style.width = "26%";
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
        console.log(this.images);
      }
      else{
        stockImage2.removeChild(imageElement);
        stockImage.appendChild(imageElement);
        const index = this.images.findIndex(image => image ===imageElement.src);
        if(index !== -1){
          this.images.splice(index,1);

        }
        console.log(this.images);
      }
      this.envoyerImages();
    })

  }

  private async  banqueImage(){
    const stockImage = document.getElementById("imageEnAttente") as HTMLDivElement;
    const stockImage2 = document.getElementById("imageChoisi") as HTMLDivElement;
    for(let i = 0; i < 2; i++){
      if(i==0){
        const imageElement = document.createElement('img');
        imageElement.style.height = "26%";
        imageElement.style.width = "26%";
        imageElement.src = 'assets/images/image014.png';
        stockImage.appendChild(imageElement);
        imageElement.addEventListener("click",() =>{
          if(stockImage.contains(imageElement)) {
            stockImage.removeChild(imageElement);
            stockImage2.appendChild(imageElement);
            this.images.push(imageElement.src);
            console.log(this.images);
          }
          else{
            stockImage2.removeChild(imageElement);
            stockImage.appendChild(imageElement);
            const index = this.images.findIndex(image => image ===imageElement.src);
            if(index !== -1){
              this.images.splice(index,1);

            }
            console.log(this.images);
          }
          this.envoyerImages();
        })
      }
      else{
        const imageElement = document.createElement('img');
        imageElement.style.height = "26%";
        imageElement.style.width = "26%";
        imageElement.src = 'assets/images/image034.png';
        stockImage.appendChild(imageElement);
        imageElement.addEventListener("click",() =>{
          if(stockImage.contains(imageElement)) {
            stockImage.removeChild(imageElement);
            stockImage2.appendChild(imageElement);
            this.images.push(imageElement.src);
            console.log(this.images);
          }
          else{
            stockImage2.removeChild(imageElement);
            stockImage.appendChild(imageElement);
            const index = this.images.findIndex(image => image ===imageElement.src);
            if(index !== -1){
              this.images.splice(index,1);

            }
            console.log(this.images);
          }
          this.envoyerImages();
        })
      }
    }

  }
  afficherErreur(value : boolean){
   if(value){
     const inputTitre = document.getElementById("div-nom-theme") as HTMLInputElement ;
     const imageChoisi = document.getElementById("imageChoisi") as HTMLDivElement;
     if(imageChoisi.childElementCount == 0){
       imageChoisi.style.background = "#F00000";
       imageChoisi.style.opacity = "0.8";
       if(this.nom !=""){
         if(this.nom != undefined) {
           inputTitre.style.background = "#FFFFFF";
           inputTitre.style.opacity = "0.5";
         }
       }
     }else {
       inputTitre.style.background = "#F00000";
       inputTitre.style.opacity = "0.8";
       if(imageChoisi.childElementCount != 0){
         imageChoisi.style.background = "#FFFFFF";
         imageChoisi.style.opacity = "1";
       }
     }
   }
  }
}
