import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { KanbanComponent } from './layout/kanban/kanban.component';


const routes: Routes = [
  {path: '', component: LayoutComponent, children: [
    {path: 'kanban', component: KanbanComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
