import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddTaskPopUpComponent } from './components/add-task-pop-up/add-task-pop-up.component';
import { TaskService } from './services/task.service';
import { DialogService } from './services/dialog.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddUserPopUpComponent } from './components/add-user-pop-up/add-user-pop-up.component';
import { UserService } from './services/user.service';

@NgModule({
    declarations: [
        AddTaskPopUpComponent,
        AddUserPopUpComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        TaskService,
        DialogService,
        UserService
    ]
})
export class SharedModule {}