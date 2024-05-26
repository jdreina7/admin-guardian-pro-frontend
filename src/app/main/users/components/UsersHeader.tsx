/* eslint-disable no-console */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';

/**
 * The UsersHeader page.
 */

type UsersHeaderProps = {
    usersQuantity: number;
};

function UsersHeader(props: UsersHeaderProps) {
    const { t } = useTranslation();

    const { usersQuantity } = props;
    const users = useMemo(() => usersQuantity, [usersQuantity]);

    return (
        <div className="p-24 sm:p-32 w-full border-b-1">
            <div className="flex flex-col">
                <motion.span
                    initial={{ x: -20 }}
                    animate={{ x: 0, transition: { delay: 0.2 } }}
                >
                    <Typography className="text-24 md:text-32 font-extrabold tracking-tight leading-none">
                        {t('USERTITTLE')}
                    </Typography>
                </motion.span>
                <motion.span
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                >
                    <Typography
                        component={motion.span}
                        className="text-14 font-medium ml-2"
                        color="text.secondary"
                    >
                        {`${users} users`}
                    </Typography>
                </motion.span>
            </div>
        </div>
    );
}

export default UsersHeader;
