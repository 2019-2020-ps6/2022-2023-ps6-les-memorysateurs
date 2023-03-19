import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-creer-theme',
  templateUrl: './creer-theme.component.html',
  styleUrls: ['./creer-theme.component.scss']
})
export class CreerThemeComponent {
  imageData : string | undefined;
  @ViewChild('stock-image', { static: true })
  stockImage!: ElementRef<HTMLDivElement>
  constructor(private http:HttpClient) {}
  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e)
        this.imageData = e.target.result;
        const imageElement = document.createElement('img');
        if (typeof this.imageData === "string") {
          imageElement.src = this.imageData;
        }
        this.stockImage.nativeElement.appendChild(imageElement);
        const formData = new FormData();
        formData.append('image', file);
        this.http.post('/upload', formData).subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
      };
      reader.readAsDataURL(file);
    }
  }

  afficherFichier(){
    const input = document.getElementById("recup-fichier") as HTMLInputElement;
    const file = input.files?.[0];
    console.log(file);
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
      }
      else{
        stockImage2.removeChild(imageElement);
        stockImage.appendChild(imageElement);
      }
    })

  }
}
