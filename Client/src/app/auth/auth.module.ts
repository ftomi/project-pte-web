import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AuthRoutingModule, COMPONENTS } from "./auth-routing.module";
import { AuthEffects } from "./store/effects/auth.effects";
import { reducers } from "./store/reducers";
import { LoginContainerComponent } from "./containers/login-container/login-container.component";
import { LoginFormComponent } from "./components/login-form/login-form.component";
import { RegisterFormComponent } from "./components/register-form/register-form.component";
import { RegisterContainerComponent } from "./containers/register-container/register-container.component";

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AuthRoutingModule,
    StoreModule.forFeature("auth", reducers),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule {}
