import { Component, OnInit } from "@angular/core";
import { AuthProviderService } from "../services/auth-provider.service";
import { FirestoreAngularService } from "../services/firestore-angular.service";
import { AngularFirestore } from "angularfire2/firestore";
@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent implements OnInit {
  public isLogged: boolean;
  public ejercicios: Array<object> = [];
  public currentEmail;
  public showZeroExer: boolean = false;

  constructor(
    public _AuthProviderService: AuthProviderService,
    public _FirestoreAngularService: FirestoreAngularService,
    public afs: AngularFirestore
  ) {}

  ngOnInit() {
    this._AuthProviderService.isLogged$.subscribe(data => {
      this.isLogged = data;
      if (!this.isLogged) {
        this.ejercicios = [];
        this.showZeroExer = false;
      }
    });

    this._FirestoreAngularService.email$.subscribe(data => {
      this.currentEmail = data;
      this._FirestoreAngularService.getAllExer(this.currentEmail);
      this._FirestoreAngularService.user.subscribe(data => {
        if (data.Ejercicios.length) {
          this.ejercicios = data.Ejercicios;
          this.showZeroExer = false;
        } else {
          this.showZeroExer = true;
        }
      });
    });
  }
}
