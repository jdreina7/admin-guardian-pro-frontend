import { useMemo, useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import { AxiosError } from 'axios';

import { Backdrop, Box, Fade, Modal } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RolesHeader from './components/RolesHeader';
import UsersTable from './components/UsersTable';
import { useListRoles } from '../../../api/hooks';
import { TModalConstants, TRolesDB } from '../../../utils/types';
import useSwalWrapper from '../../../utils/vendors/sweetalert2/hooks';
import { ERROR_PAGE_403, ERROR_PAGE_404, ERROR_PAGE_500 } from '../../../utils/contants';

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
    const sweetAlert = useSwalWrapper();
    const token = localStorage.getItem('access_token');
    const { data, isLoading: rolesLoading, error } = useListRoles(token);
    const rolesList: TRolesDB[] = useMemo(() => data?.data?.data, [data]);
    const [selectedUser, setSelectedUser] = useState<TRolesDB>();
    const [open, setOpen] = useState(false);

    const errorUrl: string = useMemo(() => {
        const respError = error as AxiosError;

        if (respError?.response?.status === 403) {
            return ERROR_PAGE_403;
        }

        if (respError?.response?.status === 404) {
            return ERROR_PAGE_404;
        }

        return ERROR_PAGE_500;
    }, [error]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedUser(undefined);
    };

    // Function for show an success message when user is created/updated
    const onSuccess = (data: TModalConstants) => {
        sweetAlert.fire({
            icon: data?.msgIcon,
            text: data?.msgText
        });

        setOpen(false);
        setSelectedUser(undefined);
    };

    // Function for show an error message when user is created/updated
    const onError = (data: TModalConstants) => {
        sweetAlert.fire({
            icon: data?.msgIcon,
            title: data?.msgTitle,
            text: data?.msgText
        });

        setOpen(false);
        setSelectedUser(undefined);
    };

    if (rolesLoading) {
        return <FuseLoading />;
    }

    return (
        <Root
            header={<RolesHeader rolesQuantity={rolesList?.length} handleOpen={handleOpen} />}
            content={
                <>
                    {!error && <UsersTable users={rolesList} handleOpen={handleOpen} setSelectedUser={setSelectedUser} />}
                    {error && navigate(errorUrl, { replace: true })}

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
                                <UserForm currentUser={selectedUser} handleClose={handleClose} onError={onError} onSuccess={onSuccess} />
                            </Box>
                        </Fade>
                    </Modal>
                </>
            }
        />
    );
}

export default Users;
