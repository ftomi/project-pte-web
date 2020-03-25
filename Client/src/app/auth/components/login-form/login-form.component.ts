import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromAuth from "../../store/reducers";
import { LoginPageActions } from "../../store/actions";
import { Credentials } from "../../models/user";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit(): void {}

  login() {
    let credentials: Credentials = {
      email: "tomifarkas@yahoo.com",
      password: "Abcd1234"
    };

    console.log("creds: ", credentials);
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
