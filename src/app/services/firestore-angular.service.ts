import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import "rxjs/add/operator/map";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class FirestoreAngularService {
  public userRef;
  public currentEmail;
  public userCollection: AngularFirestoreDocument<any>;
  public user: Observable<any>;
  public email = new Subject<any>();
  public email$ = this.email.asObservable();

  constructor(public afs: AngularFirestore) {}

  addExerToDB(who, value) {
    this.userRef = this.afs.collection("users").doc(who);

    this.userRef.set(Object.assign({}, value)).then(() => {
      console.log("succesfully added");
    });
  }

  getAllExer(who) {
    this.userCollection = this.afs.collection("users").doc(who);
    this.user = this.userCollection.valueChanges();
    return this.user;
  }
  setEmail(value) {
    this.email.next(value);
  }
}
