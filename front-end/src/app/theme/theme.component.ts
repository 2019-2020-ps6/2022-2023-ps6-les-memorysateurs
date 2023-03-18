import {Component, Input} from '@angular/core';
import {Theme} from "../../models/theme.models";

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent {
  @Input() theme!: Theme;
}
