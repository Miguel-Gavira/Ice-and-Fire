import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    TableModule,
    DropdownModule,
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    TableModule,
    DropdownModule,
  ],
})
export class SharedModule {}
