import { NgModule } from '@angular/core';
import { CoreOneOldComponent } from './core-one-old.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CoreOneOldComponent],
  imports: [SharedModule],
  exports: [SharedModule]
})
export class CoreOneOldModule { }
