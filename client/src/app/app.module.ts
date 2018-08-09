import { BrowserModule } from '@angular/platform-browser';
import { Injector } from '@angular/core';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserXhr, HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ToastrModule } from 'ngx-toastr';
import { NgxPermissionsModule } from 'ngx-permissions';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
  MatRadioModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatTooltipModule,
  MatExpansionModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatSnackBarModule
} from '@angular/material';

import { ApiGuard } from './shared/guards/api.guard';
import { FormControlErrors } from './shared/errors';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
  { path: 'login', component: AuthComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'tasks/create', component: CreateTaskComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'tasks/update/:id', component: UpdateTaskComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'projects/create', component: CreateProjectComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'projects/update/:id', component: UpdateProjectComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'projects/view/:id', component: ViewProjectComponent, canActivate: [ApiGuard], pathMatch: 'full' },

  //admin routes
  { path: 'audiences', component: AudienceComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'audiences/create', component: CreateAudienceComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'audiences/update/:id', component: UpdateAudienceComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'types', component: ProjectTypeComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'types/create', component: CreateProjectTypeComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'types/update/:id', component: UpdateProjectTypeComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'locations', component: LocationComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'locations/create', component: CreateLocationComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'locations/update/:id', component: UpdateLocationComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'platforms', component: PlatformComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'platforms/create', component: CreatePlatformComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  { path: 'platforms/update/:id', component: UpdatePlatformComponent, canActivate: [ApiGuard], pathMatch: 'full' },
  
  { path: '**', component: PageNotFoundComponent }
], { useHash: true });

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HeaderComponent } from './shared/layouts/header.component';
import { PageNotFoundComponent } from './shared/layouts/page-not-found.component';
import { DialogRemoveComponent } from './shared/dialogs/dialog-remove/dialog-remove.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { CreateTaskComponent } from './components/tasks/create-task/create-task.component';
import { UpdateTaskComponent } from './components/tasks/update-task/update-task.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateProjectComponent } from './components/projects/create-project/create-project.component';
import { UpdateProjectComponent } from './components/projects/update-project/update-project.component';
import { ViewProjectComponent } from './components/projects/view-project/view-project.component';
import { AudienceComponent } from './components/admin/audience/audience.component';
import { CreateAudienceComponent } from './components/admin/audience/create-audience/create-audience.component';
import { UpdateAudienceComponent } from './components/admin/audience/update-audience/update-audience.component';
import { LocationComponent } from './components/admin/location/location.component';
import { CreateLocationComponent } from './components/admin/location/create-location/create-location.component';
import { PlatformComponent } from './components/admin/platform/platform.component';
import { UpdateLocationComponent } from './components/admin/location/update-location/update-location.component';
import { CreatePlatformComponent } from './components/admin/platform/create-platform/create-platform.component';
import { UpdatePlatformComponent } from './components/admin/platform/update-platform/update-platform.component';
import { ProjectTypeComponent } from './components/admin/project-type/project-type.component';
import { CreateProjectTypeComponent } from './components/admin/project-type/create-project-type/create-project-type.component';
import { UpdateProjectTypeComponent } from './components/admin/project-type/update-project-type/update-project-type.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AuthComponent,
    HomeComponent,
    RegisterComponent,
    DialogRemoveComponent,
    TasksComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    ProjectsComponent,
    CreateProjectComponent,
    UpdateProjectComponent,
    ViewProjectComponent,
    AudienceComponent,
    CreateAudienceComponent,
    UpdateAudienceComponent,
    LocationComponent,
    CreateLocationComponent,
    PlatformComponent,
    UpdateLocationComponent,
    CreatePlatformComponent,
    UpdatePlatformComponent,
    ProjectTypeComponent,
    CreateProjectTypeComponent,
    UpdateProjectTypeComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    rootRouting,
    SlimLoadingBarModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),

    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatRadioModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  entryComponents: [DialogRemoveComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector = injector;
  }
}
export let AppInjector: Injector;
