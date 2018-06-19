import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Subject } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";

@Injectable()
export class AuthProviderService {
  constructor(private afAuth: AngularFireAuth, public afs: AngularFirestore) {}

  private isLoggedSource = new Subject<any>();
  public isLogged$ = this.isLoggedSource.asObservable();

  private usernameSource = new Subject<any>();
  public username$ = this.usernameSource.asObservable();

  private arrayExerSource = new Subject<any>();
  public arrayExer$ = this.arrayExerSource.asObservable();

  setLogged(value) {
    this.isLoggedSource.next(value);
  }

  setUsername(value) {
    this.usernameSource.next(value);
  }

  setArrayExer(value) {
    this.arrayExerSource.next(value);
  }
  //Registro de usuario
  registerUser(email: string, password: string, name: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user
          .updateProfile({
            displayName: name
          })
          .then(function() {
            // Update successful.
          })
          .catch(function(error) {
            // An error happened.
          });
        this.afs.doc(`users/${email}`).set({ Ejercicios: [] }, { merge: true });
      })
      .catch(err => Promise.reject(err));
  }

  //Login de usuario
  loginUser(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => Promise.resolve(user))
      .catch(err => Promise.reject(err));
  }
  info() {
    let info = this.afAuth.auth.currentUser;
    return info;
  }
  //Devuelve la sesión
  get Session() {
    return this.afAuth.authState;
  }

  //Cierre de sesión del usuario
  logout() {
    this.afAuth.auth.signOut().then(() => {
      //hemos salido
    });
  }
}
