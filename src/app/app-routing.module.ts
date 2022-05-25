import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./pages/admin/admin.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LandingComponent } from "./pages/landing/landing.component";
import {
  UserGuard,
  AuthGuard,
  AdminGuard,
} from "../app/shared/guards/auth.guard";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] },
  { path: "", component: LandingComponent, canActivate: [UserGuard] },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
