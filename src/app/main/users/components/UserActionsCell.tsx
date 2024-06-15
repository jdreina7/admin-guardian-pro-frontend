import { CustomCellRendererProps } from 'ag-grid-react';
import { Box, Button, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useTranslation } from 'react-i18next';

import { TUserDB } from '../../../../utils/types';
import useSwalWrapper from '../../../../utils/vendors/sweetalert2/hooks';

interface UserActionsCellProps extends CustomCellRendererProps {
    data: {
        name: TUserDB;
    };
    handleOpen: () => void;
}

/**
 * The user actions.
 */
function UserActionsCell(params: UserActionsCellProps) {
    const { t } = useTranslation();
    const swal = useSwalWrapper();
    const user = params?.data?.name;
    const currentUser = useMemo(() => user, [user]);
    const currentUserStatus = useMemo(() => user?.status, [user]);

    const alertUser = () => {
        swal.fire({
            titleText: 'Hola Juan',
            text: `Esto es una prueba - ${currentUser?.id}`,
            confirmButtonText: 'Listo'
        });
    };

    const handleChangeUserStatus = () => {
        swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                });
            }
        });
    };

    return (
        <Box className="flex items-center justify-around w-full h-full">
            <Button className="w-full h-full" onClick={handleChangeUserStatus}>
                {currentUserStatus && (
                    <Tooltip title={t('deactivate_user')}>
                        <FuseSvgIcon className="cursor-pointer" size={22} color="error">
                            material-solid:person_off
                        </FuseSvgIcon>
                    </Tooltip>
                )}
                {!currentUserStatus && (
                    <Tooltip title={t('activate_user')}>
                        <FuseSvgIcon className="cursor-pointer" size={22} color="success">
                            material-solid:person
                        </FuseSvgIcon>
                    </Tooltip>
                )}
            </Button>

            <Button className="w-full h-full" onClick={alertUser}>
                <Tooltip title={t('delete_user')}>
                    <FuseSvgIcon className="cursor-pointer" size={22} color="error">
                        feather:trash-2
                    </FuseSvgIcon>
                </Tooltip>
            </Button>
        </Box>
    );
}

export default UserActionsCell;
