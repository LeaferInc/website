import { UserService } from 'src/app/core/services/user/user.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/user/user';

export class MockUserService extends UserService {
    public static user = {
        email: 'test@email.com',
        username: 'azerty123',
        firstname: 'John',
        lastname: 'Doe',
    }

    getProfile(): Observable<User> {
        return of(MockUserService.user);
    }
}