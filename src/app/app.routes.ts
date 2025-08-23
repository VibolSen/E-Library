import { Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { ManageBooksComponent } from './pages/manage-books/manage-books';
import { BookFormComponent } from './pages/book-form/book-form';
import { ManageResourcesComponent } from './pages/manage-resources/manage-resources';
import { ResourceFormComponent } from './pages/resource-form/resource-form';
import { ManageCategoriesComponent } from './pages/manage-categories/manage-categories';
import { CategoryFormComponent } from './pages/category-form/category-form';
import { ReportsComponent } from './pages/reports/reports';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-books', component: ManageBooksComponent },
      { path: 'add-book', component: BookFormComponent },
      { path: 'edit-book/:id', component: BookFormComponent },
      { path: 'manage-resources', component: ManageResourcesComponent },
      { path: 'add-resource', component: ResourceFormComponent },
      { path: 'edit-resource/:id', component: ResourceFormComponent },
      { path: 'manage-categories', component: ManageCategoriesComponent },
      { path: 'add-category', component: CategoryFormComponent },
      { path: 'edit-category/:id', component: CategoryFormComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
