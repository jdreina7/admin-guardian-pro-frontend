/* eslint-disable no-console */
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * The UsersHeader page.
 */

type UsersHeaderProps = {
    usersQuantity: number;
    handleOpen: () => void;
};

function UsersHeader(props: UsersHeaderProps) {
    const { usersQuantity, handleOpen } = props;
    const users = useMemo(() => usersQuantity, [usersQuantity]);

    return (
        <div className="flex justify-between p-24 sm:p-32 w-full border-b-1">
            <div className="flex flex-col">
                <motion.span initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.2 } }}>
                    <Typography className="text-24 md:text-32 font-extrabold tracking-tight leading-none">Users</Typography>
                </motion.span>
                <motion.span initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
                    <Typography component={motion.span} className="text-14 font-medium ml-2" color="text.secondary">
                        {`${users} users`}
                    </Typography>
                </motion.span>
            </div>
            <Button color="primary" variant="contained" onClick={handleOpen}>
                <FuseSvgIcon mr={2} size={22}>
                    material-solid:person_add_alt_1
                </FuseSvgIcon>
                Add new user
            </Button>
        </div>
    );
}

export default UsersHeader;
