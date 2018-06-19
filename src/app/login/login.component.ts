import { Component, OnInit } from "@angular/core";
import { AuthProviderService } from "../services/auth-provider.service";
import { FirestoreAngularService } from "../services/firestore-angular.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public name: string;
  public email: string;
  public password: string;
  public isLogged: boolean;
  public nName: string;
  public nEmail: string;
  public nPassword: string;

  constructor(
    public _AuthProvider: AuthProviderService,
    public _FirestoreAngularService: FirestoreAngularService
  ) {}

  ngOnInit() {
    this._AuthProvider.isLogged$.subscribe(data => (this.isLogged = data));
  }

  login() {
    this._AuthProvider.loginUser(this.email, this.password).then(data => {
      this._AuthProvider.setUsername(data.user.displayName);
      console.log(data);
      console.log(data.user.displayName);
      this._AuthProvider.setLogged(true);
      this.email = "";
      this.password = "";
    });
  }

  register() {
    this._AuthProvider
      .registerUser(this.nEmail, this.nPassword, this.nName)
      .then(() => console.log("Usuario registrado"));
    this.nEmail = "";
    this.nName = "";
    this.nPassword = "";
  }
}
