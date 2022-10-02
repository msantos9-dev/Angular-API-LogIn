import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { CommandBarComponent } from './component/command-bar/command-bar.component';
import { SpinnerComponent } from './component/spinner/spinner.component';



@NgModule({
  declarations: [
    CommandBarComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CommandBarComponent, SpinnerComponent],
})
export class SharedModule { }
