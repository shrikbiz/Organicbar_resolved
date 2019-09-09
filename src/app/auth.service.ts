import { ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import { Observable, of } from "rxjs";
// import "rxjs/add/observable/of";
// import { switchMap } from 'rxjs-compat/operator/switchMap';
// import { UserService } from './user.service';
// import { AppUser } from './models/app-user';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute)  {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  // get appUser$(): Observable<AppUser> {
  //   return this.user$.pipe(
  //     switchMap(user => {
  //       if (user) {
  //         return this.userService.get(user.uid).valueChanges();
  //       } else {
  //         return of (null);
  //       }


  //     })
  //   );
  // }
}
