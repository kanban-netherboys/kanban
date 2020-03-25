import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-user-pop-up',
  templateUrl: './add-user-pop-up.component.html',
  styleUrls: ['./add-user-pop-up.component.scss']
})
export class AddUserPopUpComponent implements OnInit {

  signupForm: FormGroup;

  editMode = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl(null),
      surname: new FormControl(null)
    });
  }

  addUser(userData: User) {
    this.userService.addUser(userData).subscribe();
  }

}
