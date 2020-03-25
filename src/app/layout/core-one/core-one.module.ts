import { NgModule } from '@angular/core';
import { CoreOneComponent } from './core-one.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransitionComponent } from './transition/transition.component';

@NgModule({
  declarations: [CoreOneComponent, TransitionComponent],
  imports: [SharedModule],
  exports: [SharedModule]
})
export class CoreOneModule { }
