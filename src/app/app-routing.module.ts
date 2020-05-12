import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwoTransitionComponent } from './layout/board/two-transition/two-transition.component';


const routes: Routes = [
  { path: '', component: TwoTransitionComponent },
  // {path: '', component: LayoutComponent, children: [
  //   { path: 'core-zero', component: CoreZeroComponent },
  //   { path: 'core-one', component: CoreOneComponent }
  // ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
