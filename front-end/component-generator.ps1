Param(
    [Parameter(Mandatory=$true)]
    [string]$componentName
)

$componentFolder = "src/app/$componentName"

New-Item -ItemType Directory -Path $componentFolder

$componentTemplate = @"
import { Component, OnInit } from '@angular/core';

@Component({
  selector: '$componentName',
  templateUrl: './$componentName.component.html',
  styleUrls: ['./$componentName.component.scss']
})
export class ${componentName}Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
"@

Set-Content -Path "$componentFolder/$componentName.component.ts" -Value $componentTemplate
New-Item -ItemType File -Path "$componentFolder/$componentName.component.html"
New-Item -ItemType File -Path "$componentFolder/$componentName.component.scss"