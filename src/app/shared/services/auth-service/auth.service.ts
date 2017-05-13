import { Store } from '@ngrx/store';
import { State } from '../../redux/reducers';

export abstract class AuthService {

  constructor(protected store: Store<State>) { }

  public abstract login(email: string, password: string): void;
  public abstract logout(): void;
}
