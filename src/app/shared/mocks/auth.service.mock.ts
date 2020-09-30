import { AuthService } from 'src/app/core/services/auth/auth.service';
import { User } from '../models/user/user';
import { Observable, of } from 'rxjs';
import { UserAuth } from '../models/auth/auth';

export class MockAuthService extends AuthService {
    public static user: User = {
        id: 1,
        email: 'test@email.com',
        username: 'azerty123',
        firstname: 'John',
        lastname: 'Doe',
    }

    getUserAuth(): Observable<UserAuth> {
        return of({ user: MockAuthService.user, token: '' });
    }
}