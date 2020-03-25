import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { SidebarModule } from "primeng/sidebar";
import { TooltipModule } from "primeng/tooltip";
import { CardModule } from "primeng/card";
import { ToolbarModule } from "primeng/toolbar";
import { SplitButtonModule } from "primeng/splitbutton";
import { PasswordModule } from "primeng/password";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputSwitchModule } from "primeng/inputswitch";
import { CalendarModule } from "primeng/calendar";
import { ToastModule } from "primeng/toast";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { ChartModule } from "primeng/chart";

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    SidebarModule,
    TooltipModule,
    ToolbarModule,
    SplitButtonModule,
    PasswordModule,
    InputTextareaModule,
    InputSwitchModule,
    CalendarModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ChartModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    SidebarModule,
    TooltipModule,
    ToolbarModule,
    SplitButtonModule,
    PasswordModule,
    InputTextareaModule,
    InputSwitchModule,
    CalendarModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ChartModule
  ]
})
export class PrimeModule {}
