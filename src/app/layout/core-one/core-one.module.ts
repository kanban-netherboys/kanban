import { NgModule } from '@angular/core';
import { CoreOneComponent } from './core-one.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CoreOneComponent],
  imports: [SharedModule],
  exports: [SharedModule]
})
export class CoreOneModule { }
