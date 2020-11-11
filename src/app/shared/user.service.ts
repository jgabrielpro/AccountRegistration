import { Injectable } from "@angular/core";
import { BaseService } from "../core/http/base.service";
import { AppConstants } from "../core/services/constants.service";
import { User } from "../user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private baseService: BaseService,
    private appConstantService: AppConstants
  ) {}
  users: User[];

  addUser(user) {
    console.log(user);
    return this.baseService.postData(
      this.appConstantService.CONSTANTS.users,
      user
    );
  }

  updateUser(User) {}

  deleteUser(userId: number) {}

  login(user: User) {
    return this.baseService.getData(
      `${this.appConstantService.CONSTANTS.users}?email=${user.email}&&password=${user.password}`,
      user
    );
  }
}
