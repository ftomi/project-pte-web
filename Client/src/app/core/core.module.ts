import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./containers/app/app.component";
import { NotFoundComponent } from "./containers/not-found/not-found.component";

export const COMPONENTS = [
  AppComponent,
  NotFoundComponent
  //   LayoutComponent,
  //   NavItemComponent,
  //   SidenavComponent,
  //   ToolbarComponent
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {}
