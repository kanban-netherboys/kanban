import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

constructor(private http: HttpClient) { }

    addUser(userData: User) {
        return this.http.post(environment.apiUrl + 'User', userData, { responseType: 'text' });
    }

    deleteUser(id: number) {
        return this.http.delete(environment.apiUrl + 'User?userId=' + id, { responseType: 'text' });
    }

    getAllUsers() {
        return this.http.get(environment.apiUrl + 'User/GetAll');
    }

    getSingleTask(id: number) {
        return this.http.get(environment.apiUrl + 'User/GetSingleUser?userId=' + id);
    }

    getUsersPerTask() {
        return this.http.get(environment.apiUrl + 'User/AllUsersPerTask');
    }
}
