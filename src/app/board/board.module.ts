import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { SwimlaneComponent } from './swimlane/swimlane.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoardRoutingModule } from './board-routing.module';

@NgModule({
  declarations: [BoardComponent, SwimlaneComponent],
  imports: [SharedModule, BoardRoutingModule],
  exports: [SharedModule]
})
export class BoardModule { }
