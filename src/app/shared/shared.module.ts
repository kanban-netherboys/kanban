import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddTaskPopUpComponent } from './components/add-task-pop-up/add-task-pop-up.component';
import { TaskService } from './services/task.service';
import { DialogService } from './services/dialog.service';

@NgModule({
    declarations: [
        AddTaskPopUpComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ],
    providers: [
        TaskService,
        DialogService
    ]
})
export class SharedModule {}