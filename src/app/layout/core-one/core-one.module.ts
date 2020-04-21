import { NgModule } from '@angular/core';
import { CoreOneComponent } from './core-one.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TransitionComponent } from './transition/transition.component';
import { UserRowComponent } from './transition/user-row/user-row.component';
import { UserRow2Component } from './user-row2/user-row2.component';

@NgModule({
  declarations: [CoreOneComponent, TransitionComponent, UserRowComponent, UserRow2Component],
  imports: [SharedModule],
  exports: [SharedModule]
})
export class CoreOneModule { }
