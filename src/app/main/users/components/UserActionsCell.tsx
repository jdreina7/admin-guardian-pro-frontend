import { CustomCellRendererProps } from 'ag-grid-react';
import { Box, Tooltip } from '@mui/material';

import { useMemo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { IUser } from '../../../../utils/types';

interface UserActionsCellProps extends CustomCellRendererProps {
    data: {
        name: IUser;
    };
}

/**
 * The user actions.
 */
function UserActionsCell(params: UserActionsCellProps) {
    const user = params?.data?.name;
    const currentUser = useMemo(() => user, [user]);

    const alertUser = () => {
        alert(currentUser?.id);
    };

    return (
        <Box className="flex items-center justify-around w-full h-full">
            <Tooltip title="Edit">
                <FuseSvgIcon
                    className="cursor-pointer"
                    size={22}
                    color="info"
                    onClick={alertUser}
                >
                    feather:edit
                </FuseSvgIcon>
            </Tooltip>

            <Tooltip title="Delete">
                <FuseSvgIcon
                    className="cursor-pointer"
                    size={22}
                    color="error"
                    onClick={alertUser}
                >
                    feather:trash-2
                </FuseSvgIcon>
            </Tooltip>
        </Box>
    );
}

export default UserActionsCell;
