import { Component, OnInit } from "@angular/core";
import { AuthProviderService } from "../services/auth-provider.service";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import { map } from "rxjs-compat/operator/map";
import { combineLatest } from "rxjs/observable/combineLatest";
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { FirestoreAngularService } from "../services/firestore-angular.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  public informacion;
  public tema: string;
  public worksheet: string;
  public enunciado: string;
  public solucion: string;
  public showNotification: boolean = false;
  public currentEmail;
  public currentUser;
  public exercise = {
    enunciado: this.enunciado,
    solucion: this.solucion,
    tema: this.tema,
    worksheet: this.worksheet
  };
  public userRef;
  public userRef$;
  public lastInfo;
  public finalArray;
  public passInfo;

  constructor(
    public _AuthProviderService: AuthProviderService,
    public afs: AngularFirestore,
    public _FirestoreAngularService: FirestoreAngularService
  ) {
    this.currentEmail = this._AuthProviderService.info().email;
    this.currentUser = this._AuthProviderService.info().displayName;
  }

  ngOnInit() {
    this._FirestoreAngularService.setEmail(this.currentEmail);

    this._FirestoreAngularService.getAllExer(this.currentEmail);

    this._FirestoreAngularService.user.subscribe(data => {
      if (data.Ejercicios) {
        this.lastInfo = data;
      } else {
        this.lastInfo = { Ejercicios: [] };
      }
    });
  }

  addExer() {
    if (this.tema && this.worksheet && this.enunciado && this.solucion) {
      this._FirestoreAngularService.addExerToDB(
        this.currentEmail,
        this.concatArrays()
      );
      this.showNotification = false;
    } else {
      this.showNotification = true;
    }
  }

  getData() {
    return {
      tema: this.tema,
      worksheet: this.worksheet,
      enunciado: this.enunciado,
      solucion: this.solucion
    };
  }

  concatArrays() {
    this.lastInfo.Ejercicios.push(Object.assign({}, this.getData()));
    console.log(this.lastInfo);
    return this.lastInfo;
  }

  clear() {
    this.tema = "";
    this.worksheet = "";
    this.enunciado = "";
    this.solucion = "";
  }
}
