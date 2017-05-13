import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFire } from 'angularfire2';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as app from '../../actions/app-state';

@Injectable()
export class FirebaseAuthService extends AuthService {

  constructor(private af: AngularFire, store: Store<State>) {
    super(store);
  }

  public login(email: string, password: string): void {
    const user = this.af.auth.login({email, password});
    user.then(userData => {
      const userId = userData.uid;
      this.store.dispatch(new app.SetUserAction(userId));
    });
  }

  public logout(): void {
    this.af.auth.logout()
      .then(() => {
        this.store.dispatch(new app.SetUserAction(null));
      });
  }
}
