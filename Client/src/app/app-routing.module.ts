import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./core/containers/not-found/not-found.component";
import { AuthGuard } from "./auth/services/auth-guard.service";

export const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
