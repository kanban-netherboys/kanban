import { NgModule } from '@angular/core';
import { CoreTwoComponent } from './core-two.component';
import { TwoTransitionComponent } from './two-transition/two-transition.component';
import { TwoUserRowComponent } from './two-transition/two-user-row/two-user-row.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CoreTwoComponent, TwoTransitionComponent, TwoUserRowComponent],
  imports: [SharedModule],
  exports: [SharedModule]
})
export class CoreTwoModule { }
