import { Component, OnInit, Inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-task-pop-up',
  templateUrl: './add-task-pop-up.component.html',
  styleUrls: ['./add-task-pop-up.component.scss']
})
export class AddTaskPopUpComponent implements OnInit {

  taskForm: FormGroup;

  editMode = false;
  editedTaskStatus: any;

  users: User[];
  rows = [1, 2, 3, 4];

  colors = ['red', 'green', 'blue', 'yellow'];

  selectedUser1;
  selectedUser2;
  selectedUser3;
  selectedRow;
  selectedColor = 'none';
  none = 'None';

  constructor(private taskService: TaskService,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<AddTaskPopUpComponent>) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      person: new FormControl(null),
      block: new FormControl(false)
    });

    if (this.data.id !== undefined) {
      this.editMode = true;
      this.taskService.getSingleTask(this.data.id).subscribe((res: any) => {
        this.editedTaskStatus = res.kanbanTask.status;
        this.taskForm.patchValue({title: res.kanbanTask.title});
        this.taskForm.patchValue({description: res.kanbanTask.description});
        this.taskForm.patchValue({block: res.kanbanTask.blocked});
        if (res.userList[0] !== undefined) {
          this.selectedUser1 = res.userList[0].name + ' ' + res.userList[0].surname;
        }
        if (res.userList[1] !== undefined) {
          this.selectedUser2 = res.userList[1].name + ' ' + res.userList[1].surname;
        }
        if (res.userList[2] !== undefined) {
          this.selectedUser3 = res.userList[2].name + ' ' + res.userList[2].surname;
        }
        this.selectedColor = res.kanbanTask.color;
      });
      this.taskService.getTasksByPriority().subscribe();
    }
    this.getAllUsers();
  }

  split(selecUser) {
    if (selecUser !== undefined) {
      return selecUser.split(' ', 2);
    }
  }

  onSubmit() {
    let taskFormValue = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      status: this.editMode ? this.editedTaskStatus : this.data.status,
      color: this.selectedColor,
      blocked: this.taskForm.value.block,
      userList: []
    };
    const selectedUsers = [this.selectedUser1, this.selectedUser2, this.selectedUser3];
    for (const selectedUser of selectedUsers) {
      const splitted = this.split(selectedUser);
      if (splitted !== undefined && splitted.length > 1) {
        taskFormValue.userList.push({name: splitted[0], surname: splitted[1]});
      }
    }
    if (this.editMode) {
      taskFormValue = {...taskFormValue, ...{id: this.data.id}};
      this.taskService.patchTaskWithUser(taskFormValue).subscribe(() => this.dialogRef.close());
    }
    if (!this.editMode) {
      taskFormValue = {...taskFormValue, ...{priority: this.selectedRow}};
      this.taskService.addTaskWithUser(taskFormValue).subscribe(() => this.dialogRef.close());
    }
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res: {userList: User[]}) => {
      this.users = res.userList;
    });
  }
}
