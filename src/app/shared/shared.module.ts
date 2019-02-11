import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdCheckboxComponent } from './components/md-checkbox/md-checkbox.component';

@NgModule({
  declarations: [MdCheckboxComponent],
  imports: [
    CommonModule
  ],
  exports: [MdCheckboxComponent]
})
export class SharedModule { }
