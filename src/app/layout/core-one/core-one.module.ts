import { NgModule } from '@angular/core';
import { CoreOneComponent } from './core-one.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransitionComponent } from './transition/transition.component';
import { UserRowComponent } from './transition/user-row/user-row.component';

@NgModule({
  declarations: [CoreOneComponent, TransitionComponent, UserRowComponent],
  imports: [SharedModule],
  exports: [SharedModule]
})
export class CoreOneModule { }
