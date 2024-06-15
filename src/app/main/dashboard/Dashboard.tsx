import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import FuseLoading from '@fuse/core/FuseLoading';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectUser } from '../../auth/user/store/userSlice';
import DashboardHeader from './DashboardHeader';

const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`
    }
}));

/**
 * The Dashboard page.
 */
function Dashboard() {
    const user = useSelector(selectUser);
    const { t } = useTranslation();

    setTimeout(() => {
        return <FuseLoading />;
    }, 2000);

    return (
        <Root
            header={<DashboardHeader />}
            content={
                <div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
                    <p>{t('compose', { rol: user?.role })}</p>
                </div>
            }
        />
    );
}

export default Dashboard;
