import { Component, OnInit } from "@angular/core";
import { AuthProviderService } from "./services/auth-provider.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public isLogged: boolean = false;
  constructor(public _AuthProviderService: AuthProviderService) {}
  public username: string;

  ngOnInit() {
    this._AuthProviderService.isLogged$.subscribe(data => {
      this.isLogged = data;
    });
    this._AuthProviderService.username$.subscribe(
      data => (this.username = data)
    );
  }
}
