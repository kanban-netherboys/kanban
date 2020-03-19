import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {

constructor(private http: HttpClient) { }

  getAllTasks() {
    return this.http.get(environment.apiUrl + 'KanbanTask/AllTasks');
  }

  getSingleTask(id: number) {
    return this.http.get(environment.apiUrl + 'KanbanTask/BySingleTask/?kanbanTaskId=' + id);
  }

  addTask(taskData: Task) {
    return this.http.post(environment.apiUrl + 'KanbanTask', taskData, { responseType: 'text' });
  }

  patchTask(taskData, id: number) {
    return this.http.patch(environment.apiUrl + 'KanbanTask/' + id, taskData, { responseType: 'text' });
  }

}
