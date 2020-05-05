import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  rows = [1, 2, 3, 4];

  selectedUser1;
  selectedUser2;
  selectedUser3;
  selectedRow;
  selectedColor;
  none = 'None';

  constructor(private taskService: TaskService,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AddTaskPopUpComponent>) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      person: new FormControl(null)
    });

    if (this.data.id !== undefined) {
      this.editMode = true;
      this.taskService.getSingleTask(this.data.id).subscribe((res: any) => {
        this.editedTaskStatus = res.kanbanTask.status;
        this.signupForm.patchValue({title: res.kanbanTask.title});
        this.signupForm.patchValue({description: res.kanbanTask.description});
        if (res.userList[0] !== undefined) {
          this.selectedUser1 = res.userList[0].name + ' ' + res.userList[0].surname;
        }
        if (res.userList[1] !== undefined) {
          this.selectedUser2 = res.userList[1].name + ' ' + res.userList[1].surname;
        }
        if (res.userList[2] !== undefined) {
          this.selectedUser3 = res.userList[2].name + ' ' + res.userList[2].surname;
        }
      });
      this.taskService.getAllTasksWithRows().subscribe();
    }

    this.getAllUsers();
  }

  split(selecUser) {
    if (selecUser !== undefined) {
      return selecUser.split(' ', 2);
    }
  }

  addTask() {
    const tit = this.signupForm.value.title;
    const desc = this.signupForm.value.description;
    const stat = this.data.status;
    const selec = this.selectedRow;
    const selectedUsers = [this.selectedUser1, this.selectedUser2, this.selectedUser3];
    const objs = [];
    for (const selectedUser of selectedUsers) {
      const splitted = this.split(selectedUser);
      if (splitted !== undefined && splitted.length > 1) {
        objs.push({name: splitted[0], surname: splitted[1]});
      }
    }
    this.taskService
    .addTaskToUser({userList: objs, title: tit, description: desc, status: stat, priority: selec}).subscribe();
  }

  editTask() {
    const tit = this.signupForm.value.title;
    const desc = this.signupForm.value.description;
    const stat = this.editedTaskStatus;
    const id = this.data.id;
    // const stat = this.data.status;
    const selec = 1;
    const selectedUsers = [this.selectedUser1, this.selectedUser2, this.selectedUser3];
    // this.taskService
    // .patchTask({title: tit, description: desc, status: stat }, id).subscribe();
    const objs = [];
    for (const selectedUser of selectedUsers) {
      const splitted = this.split(selectedUser);
      if (splitted !== undefined && splitted.length > 1) {
        objs.push({name: splitted[0], surname: splitted[1]});
      }
    }
    this.taskService
    .addTaskToUser({userList: objs, title: tit, description: desc, status: stat, priority: selec}).subscribe();
    this.taskService.deleteTask(id).subscribe();
    this.dialogRef.close();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: {userList: User[]}) => {
      this.users = res.userList;
    });
  }
}
