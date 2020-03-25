import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromAuth from "../../store/reducers";
import { LoginPageActions } from "../../store/actions";
import { Credentials } from "../../models/user";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-login-container",
  templateUrl: "./login-container.component.html",
  styleUrls: ["./login-container.component.scss"]
})
export class LoginContainerComponent implements OnInit {
  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit(): void {}

  onSubmit(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }
}
