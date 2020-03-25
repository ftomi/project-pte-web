import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./core/containers/app/app.component";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { AuthModule } from "./auth/auth.module";
import { CoreModule } from "./core/core.module";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "./reducers";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";
import { JwtInterceptor } from "./jwt-interceptor.interceptor";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
    CoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: "PTE client store"
    }),

    EffectsModule.forRoot([])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
