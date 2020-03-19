import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CoreZeroComponent } from './layout/core-zero/core-zero.component';
import { CoreOneComponent } from './layout/core-one/core-one.component';


const routes: Routes = [
  { path: '', component: CoreZeroComponent },
  // {path: '', component: LayoutComponent, children: [
  //   { path: 'core-zero', component: CoreZeroComponent },
  //   { path: 'core-one', component: CoreOneComponent }
  // ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
