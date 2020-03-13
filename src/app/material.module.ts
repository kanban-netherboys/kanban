import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

const materials = [
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule
];

@NgModule({
    imports: [materials],
    exports: [materials]
  })
  export class MaterialModule { }