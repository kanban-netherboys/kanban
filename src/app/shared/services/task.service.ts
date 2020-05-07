import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {

constructor(private http: HttpClient) { }

  addTask(taskData: Task) {
    return this.http.post(environment.apiUrl + 'KanbanTask', taskData, { responseType: 'text' });
  }

  addTaskWithUser(taskData) {
    return this.http.post(environment.apiUrl + 'User/AddTaskWithUser', taskData, { responseType: 'text' });
  }

  deleteTask(id: number) {
    return this.http.delete(environment.apiUrl + 'KanbanTask?kanbanTaskId=' + id, { responseType: 'text' });
  }

  getAllTasks() {
    return this.http.get(environment.apiUrl + 'KanbanTask/AllTasks');
  }

  allTasksPerUser() {
    return this.http.get(environment.apiUrl + 'User/AllTasksPerUser');
  }

  getSingleTask(id: number) {
    return this.http.get(environment.apiUrl + 'KanbanTask/BySingleTask?kanbanTaskId=' + id);
  }

  patchTask(taskData: Task, id: number) {
    return this.http.patch(environment.apiUrl + 'KanbanTask/PatchTask?kanbanTaskId=' + id, taskData, { responseType: 'text' });
  }

  patchTaskStatus(status, id: number) {
    return this.http.patch(environment.apiUrl + 'KanbanTask/PatchStatus?kanbanTaskId=' + id, status, { responseType: 'text' });
  }

  patchProgressStatus(status, id: number) {
    return this.http.patch(environment.apiUrl + 'KanbanTask/PatchProgressStatus?kanbanTaskId=' + id, status, {responseType: 'text'});
  }

  addTaskWithRow(task) {
    return this.http.post(environment.apiUrl + 'KanbanTask/AddKanbanTaskWithPriority', task, { responseType: 'text' });
  }

  getAllTasksWithRows() {
    return this.http.get(environment.apiUrl + 'KanbanTask/AllTasksWithSamePriority');
  }

  patchTaskWithUser(task) {
    return this.http.patch(environment.apiUrl + 'User/PatchTaskWithUser', task, {responseType: 'text'});
  }

}

