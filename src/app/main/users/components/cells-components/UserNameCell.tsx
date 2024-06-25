import { useMemo } from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';

import { TUserDB } from '../../../../../utils/types';

interface UserNameCellProps extends CustomCellRendererProps {
    user: TUserDB;
}

/**
 * The user name item.
 */
function UserNameCell(params: UserNameCellProps) {
    const user = params?.value as TUserDB;
    const userFullName: string = useMemo(() => `${user?.firstName} ${user?.middleName} ${user?.lastName}`, [user]);

    return (
        <Box className="flex items-center h-full">
            <ListItemAvatar>
                <Avatar alt={userFullName} src={user?.userImg} />
            </ListItemAvatar>
            <ListItemText
                classes={{ root: 'm-0', primary: 'font-medium leading-5 truncate' }}
                className="flex flex-col"
                primary={userFullName}
                secondary={
                    <Typography className="inline" component="span" variant="body2" color="text.secondary">
                        {user?.email}
                    </Typography>
                }
            />
        </Box>
    );
}

export default UserNameCell;
