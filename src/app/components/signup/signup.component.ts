import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { AuthActionTypes } from "../../store/actions/auth.actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(5)]],
      isAdmin: [false],
    });
  }

  get email() {
    return this.signupForm.get("email");
  }

  get password() {
    return this.signupForm.get("email");
  }

  onRegister() {
    const data = this.signupForm.value;
    this.store.dispatch({
      type: AuthActionTypes.SIGNUP,
      formData: data,
    });
  }
}
