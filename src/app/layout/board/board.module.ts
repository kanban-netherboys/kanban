import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { TwoTransitionComponent } from './two-transition/two-transition.component';
import { TwoUserRowComponent } from './two-transition/two-user-row/two-user-row.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BoardComponent, TwoTransitionComponent, TwoUserRowComponent],
  imports: [SharedModule],
  exports: [SharedModule]
})
export class BoardModule { }
