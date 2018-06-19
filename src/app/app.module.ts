import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AdminComponent } from "./admin/admin.component";
import { HeaderComponent } from "./header/header.component";
import { BoardComponent } from "./board/board.component";
import { EjercicioComponent } from "./ejercicio/ejercicio.component";
import { LoginComponent } from "./login/login.component";
import { FooterComponent } from "./footer/footer.component";

/*firebase*/
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AuthProviderService } from "./services/auth-provider.service";
import { FirestoreAngularService } from "./services/firestore-angular.service";

import "rxjs/add/operator/map";
import { RainbowDirective } from './rainbow.directive';

export const firebaseConfig = {
  apiKey: "AIzaSyDNfyY1fVilWi5_HmE6G2NVXJARv07nVGo",
  authDomain: "exercisesboard.firebaseapp.com",
  databaseURL: "https://exercisesboard.firebaseio.com",
  projectId: "exercisesboard",
  storageBucket: "exercisesboard.appspot.com",
  messagingSenderId: "171228711686"
};

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    BoardComponent,
    EjercicioComponent,
    LoginComponent,
    FooterComponent,
    RainbowDirective
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [AuthProviderService, FirestoreAngularService],
  bootstrap: [AppComponent]
})
export class AppModule {}
