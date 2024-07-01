import { AxiosResponse } from 'axios';
import { CustomCellRendererProps } from 'ag-grid-react';
import { Box, Button, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useTranslation } from 'react-i18next';

import { TUserDB, TUserDBDeleteResponse, TUserDBResponse } from '../../../utils/types';
import useSwalWrapper from '../../../utils/vendors/sweetalert2/hooks';
import { useUpdateUser, useDeleteUser } from '../../../api/hooks';

interface UserActionsCellProps extends CustomCellRendererProps {
    data: {
        name: TUserDB;
    };
    handleOpen: () => void;
}

const validateLoggedUser = async (loggedUsrId: string, updateUserId: string) => {
    return loggedUsrId === updateUserId;
};

/**
 * The user actions.
 */
function ActionsCell(params: UserActionsCellProps) {
    const { t } = useTranslation();
    const swal = useSwalWrapper();
    const user = params?.data?.name;
    const currentUser = useMemo(() => user, [user]);
    const currentUserStatus = useMemo(() => user?.status, [user]);

    const token = localStorage.getItem('access_token');
    const loggedUserId = localStorage.getItem('uid');
    const { mutateAsync: updateUser } = useUpdateUser(token, currentUser?.id);
    const { mutateAsync: deleteUser } = useDeleteUser(token, currentUser?.id);

    const selectedUserFullName = useMemo(() => `${currentUser?.firstName} ${currentUser?.middleName} ${currentUser?.lastName}`, [currentUser]);

    /**
     * Update user status
     */
    const handleChangeUserStatus = () => {
        swal.fire({
            title: t('are_you_sure_question'),
            text: currentUserStatus ? t('deactivate_user_status_text') : t('activate_user_status_text'),
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: t('ok_btn_text'),
            cancelButtonText: t('cancel_btn_text')
        }).then(async (result) => {
            if (result.isConfirmed) {
                const isSameUser = await validateLoggedUser(loggedUserId, currentUser?.id);

                if (isSameUser) {
                    swal.fire({
                        title: t('forbidden_title'),
                        text: t('forbidden_update_your_own'),
                        icon: 'error'
                    });

                    return;
                }

                const finalStatus: boolean = !currentUserStatus;
                const resp: AxiosResponse<TUserDBResponse> = await updateUser({ status: finalStatus });

                if (resp?.data?.success) {
                    swal.fire({
                        title: t('done_title'),
                        text: t('user_status_updated'),
                        icon: 'success'
                    });
                } else {
                    swal.fire({
                        title: t('failed_title'),
                        text: `${t('error_text')} - ${resp?.statusText}`,
                        icon: 'error'
                    });
                }
            }
        });
    };

    /**
     * Delete user status
     */
    const handleDeleteUser = () => {
        swal.fire({
            title: t('warning_title'),
            text: t('delete_user_text', { user_to_delete: selectedUserFullName }),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: t('ok_btn_text'),
            cancelButtonText: t('cancel_btn_text')
        }).then(async (result) => {
            if (result.isConfirmed) {
                const isSameUser = await validateLoggedUser(loggedUserId, currentUser?.id);

                if (isSameUser) {
                    swal.fire({
                        title: t('forbidden_title'),
                        text: t('forbidden_update_your_own'),
                        icon: 'error'
                    });

                    return;
                }

                const resp: AxiosResponse<TUserDBDeleteResponse> = await deleteUser();

                if (resp?.data?.success) {
                    swal.fire({
                        title: t('deleted_title'),
                        text: t('user_deleted_text'),
                        icon: 'success'
                    });
                } else {
                    swal.fire({
                        title: t('failed_title'),
                        text: `${t('error_text')} - ${resp?.statusText}`,
                        icon: 'error'
                    });
                }
            }
        });
    };

    return (
        <Box className="flex items-center justify-around w-full h-full">
            <Button className="w-full h-full" onClick={handleChangeUserStatus} disabled={loggedUserId === currentUser?.id}>
                {currentUserStatus && (
                    <Tooltip title={t('deactivate_user')}>
                        <FuseSvgIcon className="cursor-pointer" size={22} color={loggedUserId === currentUser?.id ? 'disabled' : 'error'}>
                            material-solid:person_off
                        </FuseSvgIcon>
                    </Tooltip>
                )}
                {!currentUserStatus && (
                    <Tooltip title={t('activate_user')}>
                        <FuseSvgIcon className="cursor-pointer" size={22} color={loggedUserId === currentUser?.id ? 'disabled' : 'success'}>
                            material-solid:person
                        </FuseSvgIcon>
                    </Tooltip>
                )}
            </Button>

            <Button className="w-full h-full" onClick={handleDeleteUser} disabled={loggedUserId === currentUser?.id}>
                <Tooltip title={t('delete_user')}>
                    <FuseSvgIcon className="cursor-pointer" size={22} color={loggedUserId === currentUser?.id ? 'disabled' : 'error'}>
                        feather:trash-2
                    </FuseSvgIcon>
                </Tooltip>
            </Button>
        </Box>
    );
}

export default ActionsCell;
