import { useMemo, useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import FuseLoading from '@fuse/core/FuseLoading';

import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UsersHeader from './components/UsersHeader';
import UsersTable from './components/UsersTable';
import { useListUsers } from '../../../api/hooks';
import { TUserDB } from '../../../utils/types';
import { UserForm } from './components/UserForm';

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`
    }
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '1px solid #ccc',
    borderRadius: '25px',
    boxShadow: 24,
    p: 4
};

/**
 * Users page.
 */
function Users() {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    const { data, isLoading: usersLoading, error } = useListUsers(token);
    const usersList: TUserDB[] = useMemo(() => data?.data?.data, [data]);
    const [selectedUser, setSelectedUser] = useState<TUserDB>();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedUser(undefined);
    };

    if (usersLoading) {
        return <FuseLoading />;
    }

    return (
        <Root
            header={<UsersHeader usersQuantity={usersList?.length} handleOpen={handleOpen} />}
            content={
                <>
                    {!error && <UsersTable users={usersList} handleOpen={handleOpen} setSelectedUser={setSelectedUser} />}
                    {error && navigate('/500', { replace: true })}

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500
                            }
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={style}>
                                <UserForm currentUser={selectedUser} handleClose={handleClose} />
                            </Box>
                        </Fade>
                    </Modal>
                </>
            }
        />
    );
}

export default Users;
