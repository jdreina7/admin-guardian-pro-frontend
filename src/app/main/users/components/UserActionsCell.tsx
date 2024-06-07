import { CustomCellRendererProps } from 'ag-grid-react';
import { Box, Button, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

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

    return (
        <Box className="flex items-center justify-around w-full h-full">
            <Button className="w-full h-full" onClick={alertUser}>
                {currentUserStatus && (
                    <Tooltip title="Inactive">
                        <FuseSvgIcon className="cursor-pointer" size={22} color="error">
                            material-solid:person_off
                        </FuseSvgIcon>
                    </Tooltip>
                )}
                {!currentUserStatus && (
                    <Tooltip title="Active">
                        <FuseSvgIcon className="cursor-pointer" size={22} color="success">
                            material-solid:person
                        </FuseSvgIcon>
                    </Tooltip>
                )}
            </Button>

            <Button className="w-full h-full" onClick={alertUser}>
                <Tooltip title="Delete">
                    <FuseSvgIcon className="cursor-pointer" size={22} color="error">
                        feather:trash-2
                    </FuseSvgIcon>
                </Tooltip>
            </Button>
        </Box>
    );
}

export default UserActionsCell;
