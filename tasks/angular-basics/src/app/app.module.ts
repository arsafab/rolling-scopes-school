import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreService } from './store.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ProgressbarModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './header/logo/logo.component';
import { SearchComponent } from './header/search/search.component';
import { ProgressComponent } from './header/progress/progress.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InputComponent } from './sidebar/input/input.component';
import { ListComponent } from './sidebar/list/list.component';
import { SubitemsComponent } from './sidebar/list/subitems/subitems.component';
import { MainComponent } from './main/main.component';
import { TaskInputComponent } from './main/task-input/task-input.component';
import { TaskListComponent } from './main/task-list/task-list.component';
import { TaskComponent } from './main/task/task.component';

const appRoutes: Routes = [
  { path: 'category/:id', component: MainComponent },
  { path: 'category/:id/:task', component: TaskComponent },
  { path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    SearchComponent,
    ProgressComponent,
    SidebarComponent,
    InputComponent,
    ListComponent,
    SubitemsComponent,
    MainComponent,
    TaskInputComponent,
    TaskListComponent,
    TaskComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'success'
    })
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
