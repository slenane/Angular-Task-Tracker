import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { AuthActionTypes } from "../../store/actions/auth.actions";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  title = "bmetric";

  authenticatedUser: object;

  constructor(private store: Store<AppState>, private auth: AuthService) {
    this.auth.navUpdate$.subscribe((data) => {
      this.authenticatedUser = data;
    });
  }

  ngOnInit() {
    this.authenticatedUser = this.auth.getUserData;
  }

  onLogout() {
    this.store.dispatch({ type: AuthActionTypes.LOGOUT });
  }
}
