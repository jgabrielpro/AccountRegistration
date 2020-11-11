import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../shared/user.service";
import { User } from "../user";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  @ViewChild("vc", { static: true, read: ViewContainerRef })
  vc: ViewContainerRef;

  @ViewChild("tmp", { static: true }) tmp: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,

    private route: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [, { validators: [Validators.required, Validators.email] }],
      password: [, { validators: [Validators.required] }],
    });
  }

  onSubmit() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      const user: User = {
        id: null,
        email: this.email.value,
        password: this.password.value,
        username: null,
      };

      this.userService.login(user).subscribe((x) => {
        console.log(x);
        if (!(x === undefined || x.length === 0)) {
          this.vc.clear();
          localStorage.setItem("user", x);
          this.route.navigate(["/home"]);
        } else {
          this.vc.createEmbeddedView(this.tmp);
        }
      });
    }
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }
}
