import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-add-task-pop-up',
  templateUrl: './add-task-pop-up.component.html',
  styleUrls: ['./add-task-pop-up.component.scss']
})
export class AddTaskPopUpComponent implements OnInit {

  signupForm: FormGroup;

  editMode = false;
  editedTaskStatus: any;

  users: User[];

  selected;
  splitted;

  constructor(private taskService: TaskService,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      person: new FormControl(null)
    });

    if (this.data.id !== undefined) {
      this.editMode = true;
      this.taskService.getSingleTask(this.data.id).subscribe((res: any) => {
        this.editedTaskStatus = res.singleTask.status;
        this.signupForm.patchValue({title: res.singleTask.title});
        this.signupForm.patchValue({description: res.singleTask.description});
        console.log(res);
      });
    }

    this.getAllUsers();
  }

  split() {
    this.splitted = this.selected.split(' ', 2);
  }

  addTaskToUser() {
    const tit = this.signupForm.value.title;
    const desc = this.signupForm.value.description;
    const stat = this.data.status;
    if (this.selected !== undefined) {
      this.split();
      const nam = this.splitted[0];
      const sur = this.splitted[1];
      this.taskService.addTaskToUser({name: nam, surname: sur, title: tit, description: desc, status: stat}).subscribe();
    } else {
      this.taskService.addTask({title: tit, description: desc, status: stat}).subscribe();
    }
  }

  editTask(taskData: Task) {
    taskData.status = this.editedTaskStatus;
    this.taskService.patchTask(taskData, this.data.id).subscribe();
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: {userList: User[]}) => {
      this.users = res.userList;
    });
  }
}
