import { NgModule } from '@angular/core';
import { CoreZeroComponent } from './core-zero.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [CoreZeroComponent],
  imports: [SharedModule],
  exports: [SharedModule]
})
export class CoreZeroModule { }
