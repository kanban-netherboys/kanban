import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-pop-up',
  templateUrl: './add-task-pop-up.component.html',
  styleUrls: ['./add-task-pop-up.component.scss']
})
export class AddTaskPopUpComponent implements OnInit {

  signupForm: FormGroup;

  editMode = false;
  editedTaskStatus: any;

  constructor(private taskService: TaskService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null)
    });

    if (this.data.id !== undefined) {
      this.editMode = true;
      this.taskService.getSingleTask(this.data.id).subscribe((res: any) => {
        this.editedTaskStatus = res.singleTask.status;
        this.signupForm.patchValue({title: res.singleTask.title});
        this.signupForm.patchValue({description: res.singleTask.description});
      });
    }
  }

  addTask(taskData: Task) {
    this.taskService.addTask(taskData).subscribe();
  }

  editTask(taskData: Task) {
    taskData.status = this.editedTaskStatus;
    this.taskService.patchTask(taskData, this.data.id).subscribe();
  }
}
