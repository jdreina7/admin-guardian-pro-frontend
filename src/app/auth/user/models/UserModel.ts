import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { User } from 'src/app/auth/user';

/**
 * Creates a new user object with the specified data.
 */
function UserModel(data: PartialDeep<User>): User {
    data = data || {};

    return _.defaults(data, {
        id: '',
        email: '',
        role: null, // guest
        token: '',
        data: {
            displayName: 'Juanito Pérez',
            photoURL: '',
            email: 'mio@mio.mio',
            shortcuts: [],
            settings: {}
        }
    });
}

export default UserModel;
