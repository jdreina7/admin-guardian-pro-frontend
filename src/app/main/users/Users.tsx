import { useMemo } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import FuseLoading from '@fuse/core/FuseLoading';

import UsersHeader from './components/UsersHeader';
import UsersTable from './components/UsersTable';
import { useListUsers } from '../../../api/hooks';
import { IUser } from '../../../utils/types';

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`
    }
}));

/**
 * Users page.
 */
function Users() {
    const token = localStorage.getItem('access_token');
    const { data, isLoading: usersLoading, error } = useListUsers(token);
    const usersList: IUser[] = useMemo(() => data?.data?.data, [data]);

    if (usersLoading) {
        return <FuseLoading />;
    }

    return (
        <Root
            header={<UsersHeader usersQuantity={usersList?.length} />}
            content={<UsersTable users={usersList} />}
        />
    );
}

export default Users;
