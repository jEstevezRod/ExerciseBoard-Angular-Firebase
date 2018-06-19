import { Component, OnInit } from "@angular/core";
import { AuthProviderService } from "../services/auth-provider.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(public _AuthProviderService: AuthProviderService) {}

  public isLogged: boolean = false;

  ngOnInit() {
    this._AuthProviderService.isLogged$.subscribe(
      data => (this.isLogged = data)
    );
  }

  logout() {
    this._AuthProviderService.logout();
    this._AuthProviderService.setLogged(false);
    this._AuthProviderService.setUsername("");
    console.log("Acabas de cerrar sesion");
  }
}
