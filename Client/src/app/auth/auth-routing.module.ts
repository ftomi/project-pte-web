import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginContainerComponent } from "./containers/login-container/login-container.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RegisterContainerComponent } from "./containers/register-container/register-container.component";

export const COMPONENTS = [
  LoginFormComponent,
  LoginContainerComponent,
  RegisterFormComponent,
  RegisterContainerComponent
];

const routes: Routes = [
  { path: "login", component: LoginContainerComponent },
  { path: "register", component: RegisterContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
