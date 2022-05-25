import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user.model";
import { Subject, Observable } from "rxjs";
import { map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:5000";

  token: string;
  isAdmin: string;

  navUpdate$: Observable<object>;
  private navUpdate: Subject<object>;

  constructor(private http: HttpClient) {
    this.navUpdate = new Subject<object>();
    this.navUpdate$ = this.navUpdate.asObservable();
  }

  get getUserData() {
    return {
      token: sessionStorage.getItem("token"),
      isAdmin: sessionStorage.getItem("isAdmin"),
    };
  }

  public updateNavList(logout?: "logout") {
    if (logout) {
      this.navUpdate.next({
        token: null,
        isAdmin: null,
      });
    } else {
      this.navUpdate.next({
        token: this.token,
        isAdmin: this.isAdmin,
      });
    }
  }

  getToken(): string {
    return sessionStorage.getItem("token");
  }

  userSignup(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user, httpOptions).pipe(
      map((payload: any) => {
        this.token = payload.accessToken;
        this.isAdmin = payload.user.isAdmin;

        sessionStorage.setItem("token", this.token);
        sessionStorage.setItem("isAdmin", this.isAdmin);

        return payload;
      })
    );
  }

  userLogin(user: User) {
    return this.http.post(`${this.apiUrl}/login`, user, httpOptions).pipe(
      map((payload: any) => {
        this.token = payload.accessToken;
        this.isAdmin = payload.user.isAdmin;

        sessionStorage.setItem("token", payload.accessToken);
        sessionStorage.setItem("isAdmin", payload.user.isAdmin);

        return payload;
      })
    );
  }
}
