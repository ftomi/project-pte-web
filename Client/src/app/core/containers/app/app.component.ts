import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as fromLayout from "../../../reducers";

import * as fromAuth from "../../../auth/store/reducers";
import { LoginPageActions } from "../../../auth/store/actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  isLoggingIn$ = this.store.pipe(select(fromLayout.getShowLoader));
  constructor(
    private store: Store<fromLayout.State>,
    private authStore: Store<fromAuth.State>
  ) {
    if (localStorage.getItem("PTEAPP_TOKEN")) {
      this.authStore.dispatch(
        LoginPageActions.tryAuth({
          token: localStorage.getItem("PTEAPP_TOKEN")
        })
      );
    }
  }
  ngOnInit(): void {}
}
