import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { EntityDataModule } from "@ngrx/data";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import {
  MatCardModule,
  MatCheckboxModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
} from "@angular/material/";

import { AppComponent } from "./app.component";
import { todoReducer } from "./store/reducers/todo.reducer";
import { authReducer } from "./store/reducers/auth.reducer";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TodoService } from "./services/todo.service";
import { TodoEffects } from "./store/effects/todo.effects";
import { AuthEffects } from "./store/effects/auth.effects";
import { AdminComponent } from "./pages/admin/admin.component";
import { TodosComponent } from "./components/todos/todos.component";
import { TodoItemComponent } from "./components/todo-item/todo-item.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { LandingComponent } from "./pages/landing/landing.component";
import { ModalComponent } from "./components/modal/modal.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./shared/guards/auth.guard";
import { TokenInterceptor } from "./services/token.service";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdminComponent,
    TodosComponent,
    TodoItemComponent,
    SidebarComponent,
    HeaderComponent,
    LandingComponent,
    ModalComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    EntityDataModule,
    StoreModule.forRoot({
      todos: todoReducer,
      auth: authReducer,
    }),
    EffectsModule.forRoot([TodoEffects, AuthEffects]),

    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    TodoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent],
})
export class AppModule {}
