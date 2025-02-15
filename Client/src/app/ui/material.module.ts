import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  imports: [CommonModule],
  exports: [MatInputModule, MatFormFieldModule]
})
export class MaterialModule {}
