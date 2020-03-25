import { Injectable } from "@angular/core";
import { Observable, of, throwError, BehaviorSubject } from "rxjs";
import { User, Credentials } from "../models/user";
import { tap, switchMap } from "rxjs/operators";
import { logout } from "../store/actions/auth.actions";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Store } from "@ngrx/store";
import * as fromLayout from "../../core/store/reducers/layout.reducer";
import { LayoutActions } from "../../core/store/actions/index";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl = environment.apiEndpoint;

  public userData = new BehaviorSubject<User>(null);
  constructor(
    private http: HttpClient,
    private store: Store<fromLayout.State>
  ) {}

  login({ email, password }: Credentials): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}api/users/login`, {
        email,
        password
      })
      .pipe(
        tap(response => {
          localStorage.setItem("PTEAPP_TOKEN", response.token);
        }),
        switchMap(x => {
          const headers = new HttpHeaders({
            "Content-Type": "application/json",
            Authorization: "Bearer " + x.token
          });
          return this.http.get(`${this.baseUrl}api/users/current`, {
            headers: headers
          });
        }),
        tap(rsp => {
          if (rsp) this.userData.next(rsp);
        })
      );
  }

  getUser(token: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    });
    return this.http.get<User>(`${this.baseUrl}api/users/current`, {
      headers: headers
    });
  }

  logout() {
    this.userData.next(null);
  }

  showLoader(show: boolean) {
    // this.store.dispatch(LoginPageActions.login({ credentials }));
    if (show) {
      this.store.dispatch(LayoutActions.showLoader());
    } else {
      this.store.dispatch(LayoutActions.hideLoader());
    }
  }

  setLoginMessage(message: string) {
    // TODO: show toast message with error... - LayoutAction.setToastMessage(message)
    console.log(message);
  }
}
