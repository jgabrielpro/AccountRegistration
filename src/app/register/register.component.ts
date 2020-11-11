import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseService } from "../core/http/base.service";
import { AppConstants } from "../core/services/constants.service";
import { User } from "../user";
import { UserService } from "../shared/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private userService: UserService,
    private appConstantService: AppConstants
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: [
        ,
        {
          validators: [Validators.required, Validators.email],
          updateOn: "change",
        },
      ],

      userName: [
        ,
        {
          validators: [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10),
          ],
          updateOn: "change",
        },
      ],
      passwords: this.fb.group(
        {
          password: [
            "",
            {
              validators: [Validators.required, Validators.minLength(6)],
              updateOn: "change",
            },
          ],
          confirmedPassword: [
            "",
            { validators: [Validators.required], updateOn: "change" },
          ],
        },
        { validator: this.passwordConfirming }
      ),
    });
  }

  onSubmit() {
    if (this.registerForm.valid || this.registerForm.valid) {
      console.log(this.registerForm);

      const user: User = {
        id: Math.random().toString(),
        email: this.email.value,
        password: this.password.value,
        username: this.userName.value,
      };

      this.userService.addUser(user).subscribe((x) => console.log(x));

      this.route.navigate(["login"]);
    }
  }

  passwordConfirming(c: AbstractControl): { [key: string]: boolean } {
    let password = c.get("password");
    let confirmedpassword = c.get("confirmedPassword");

    if (password.value === confirmedpassword.value) {
      return null;
    }

    return { passwordMisMatch: true };
  }

  get password() {
    return this.registerForm.get("passwords.password");
  }

  get confirmedPassword() {
    return this.registerForm.get("passwords.confirmedPassword");
  }

  get email() {
    return this.registerForm.get("email");
  }

  get userName() {
    return this.registerForm.get("userName");
  }
}
