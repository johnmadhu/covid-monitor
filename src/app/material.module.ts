import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
// import { MatTableDataSource } from '@angular/material';

const modules = [
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
  // MatTableDataSource
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
