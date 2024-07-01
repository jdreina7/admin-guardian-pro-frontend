import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * The RolesHeader page.
 */

type RolesHeaderProps = {
    rolesQuantity: number;
    handleOpen: () => void;
};

function RolesHeader(props: RolesHeaderProps) {
    const { t } = useTranslation();
    const { rolesQuantity, handleOpen } = props;
    const roles = useMemo(() => rolesQuantity, [rolesQuantity]);

    return (
        <div className="flex justify-between p-24 sm:p-32 w-full border-b-1">
            <div className="flex flex-col">
                <motion.span initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.2 } }}>
                    <Typography className="text-24 md:text-32 font-extrabold tracking-tight leading-none">{t('roles_title')}</Typography>
                </motion.span>
                <motion.span initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}>
                    <Typography component={motion.span} className="text-14 font-medium ml-2" color="text.secondary">
                        {`${roles} ${t('roles_title')}`}
                    </Typography>
                </motion.span>
            </div>
            <Button color="primary" variant="contained" onClick={handleOpen}>
                <FuseSvgIcon mr={2} size={22}>
                    material-solid:add_moderator
                </FuseSvgIcon>
                {t('add_new_role_btn')}
            </Button>
        </div>
    );
}

export default RolesHeader;
