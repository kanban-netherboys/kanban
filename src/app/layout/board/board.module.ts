import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { SwimlaneComponent } from './swimlane/swimlane.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BoardComponent, SwimlaneComponent],
  imports: [SharedModule],
  exports: [SharedModule]
})
export class BoardModule { }
