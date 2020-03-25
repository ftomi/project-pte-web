import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { LoginPageActions, AuthApiActions, AuthActions } from "../actions";
import { Credentials } from "../../models/user";
// import { LogoutConfirmationDialogComponent } from "../../components/logout-confirmation-dialog.component";
import { AuthService } from "../../services/auth.service";
import * as fromLayout from "../../../core/store/reducers/layout.reducer";
import { select } from "@ngrx/store";

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(LoginPageActions.login.type),
    map(action => action.credentials),
    exhaustMap((auth: Credentials) =>
      this.authService.login(auth).pipe(
        map(user => AuthApiActions.loginSuccess({ user })),
        catchError(error => of(AuthApiActions.loginFailure({ error })))
      )
    )
  );

  @Effect()
  tryAuth$ = this.actions$.pipe(
    ofType(LoginPageActions.tryAuth.type),
    map(action => action.token),
    exhaustMap((authToken: string) => {
      this.authService.showLoader(true);
      return this.authService.getUser(authToken).pipe(
        map(user => {
          this.authService.showLoader(false);
          return AuthApiActions.loginSuccess({ user });
        }),
        catchError(error => {
          this.authService.showLoader(false);
          localStorage.removeItem("PTEAPP_TOKEN");
          return of(AuthApiActions.loginFailure({ error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthApiActions.loginSuccess.type),
    tap(() => this.router.navigate(["/"]))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthApiActions.loginRedirect.type, AuthActions.logout.type),
    tap(authed => {
      this.router.navigate(["/login"]);
    })
  );

  // @Effect()
  // logoutConfirmation$ = this.actions$.pipe(
  //   ofType(AuthActions.logoutConfirmation.type),
  //   exhaustMap(() => {
  //     const dialogRef = this.dialog.open<
  //       LogoutConfirmationDialogComponent,
  //       undefined,
  //       boolean
  //     >(LogoutConfirmationDialogComponent);

  //     return dialogRef.afterClosed();
  //   }),
  //   map(result =>
  //     result ? AuthActions.logout() : AuthActions.logoutConfirmationDismiss()
  //   )
  // );

  constructor(
    private actions$: Actions<LoginPageActions.LoginPageActionsUnion>,
    private authService: AuthService,
    private router: Router
  ) {}
}
