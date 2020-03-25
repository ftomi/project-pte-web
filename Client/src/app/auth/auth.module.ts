import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AuthRoutingModule, COMPONENTS } from "./auth-routing.module";
import { AuthEffects } from "./store/effects/auth.effects";
import { reducers } from "./store/reducers";
import { PrimeModule } from "../ui/prime.module";
import { MaterialModule } from "../ui/material.module";

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AuthRoutingModule,
    PrimeModule,
    MaterialModule,
    StoreModule.forFeature("auth", reducers),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule {}
