import { CustomCellRendererProps } from 'ag-grid-react';
import { Box, Button, Tooltip } from '@mui/material';

import { useMemo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { TUserDB } from '../../../../utils/types';

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = params?.data?.name;
    const currentUser = useMemo(() => user, [user]);

    const alertUser = () => {
        alert(currentUser?.id);
    };

    return (
        <Box className="flex items-center justify-around w-full h-full">
            <Button className="w-full h-full" onClick={alertUser}>
                <Tooltip title="Edit">
                    <FuseSvgIcon className="cursor-pointer" size={22} color="info">
                        feather:edit
                    </FuseSvgIcon>
                </Tooltip>
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
