import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { AxiosError, AxiosResponse } from 'axios';

import { useTranslation } from 'react-i18next';
import { useUpdateRole, useCreateRole } from '../../../../api/hooks';
import { TModalConstants, TRolesDB, TRolesCreationDB, TRolesDBResponse } from '../../../../utils/types';
import { IAPIErrorResponse } from '../../../../utils/interfaces';

const statusData = [
    { name: 'Active', value: 'true', id: 'joiuj98uiojl' },
    { name: 'Inactive', value: 'false', id: '787hhhuhudxdfsz' }
];

type RoleFormProps = {
    currentRole: TRolesDB;
    handleClose: (close: boolean) => void;
    onSuccess: (data: TModalConstants) => void;
    onError: (data: TModalConstants) => void;
};

export function RolesForm(data: RoleFormProps) {
    const { t } = useTranslation();
    const { handleClose, currentRole, onSuccess, onError } = data;

    const token = localStorage.getItem('access_token');

    // Store roles data
    const { mutateAsync: updateRole, isPending: isUpdatingRol, error: updateRoleError } = useUpdateRole(token, currentRole?.id);
    const { mutateAsync: createRole, isPending: isCreatingRol, error: createRoleError } = useCreateRole(token);

    const [isLoading, setIsLoading] = useState(false);

    /**
     * Form Validation Schema
     */
    const DataSchema = z.object({
        name: z.string().min(4, t('role_form_validation_schema_name')),
        description: z.string().optional(),
        status: z.string()
    });
    // ***********************************************

    /**
     * Form data and validation Section
     */
    const defaultValues = {
        name: currentRole ? currentRole?.name : '',
        description: currentRole ? currentRole?.description : '',
        status: currentRole ? `${currentRole?.status}` : 'true'
    };

    const { control, formState, handleSubmit } = useForm<TRolesCreationDB>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(DataSchema)
    });

    const { isValid, errors } = formState;

    useEffect(() => {
        if (isUpdatingRol || isCreatingRol) {
            setIsLoading(true);
        }
    }, [isUpdatingRol, isCreatingRol]);

    useEffect(() => {
        if (updateRoleError) {
            const error: Partial<AxiosError> = { ...updateRoleError };
            const errData: IAPIErrorResponse = { ...(error?.response?.data as IAPIErrorResponse) };

            onError({
                msgIcon: 'error',
                msgTitle: `${error?.response?.status} - ${error?.response?.statusText}`,
                msgText: `${errData?.message} - ${errData?.invalidValue?.uid}`
            });
        }
    }, [updateRoleError]);

    useEffect(() => {
        if (createRoleError) {
            const error: Partial<AxiosError> = { ...createRoleError };
            const errData: IAPIErrorResponse = { ...(error?.response?.data as IAPIErrorResponse) };

            onError({
                msgIcon: 'error',
                msgTitle: `${error?.response?.status} - ${error?.response?.statusText}`,
                msgText: `${errData?.message}`
            });
        }
    }, [createRoleError]);

    /**
     * Form functions section
     */
    const onSubmit = async (formData: TRolesCreationDB) => {
        const finalStatus: boolean = formData.status === 'true';

        const dataForSave: TRolesDB = {
            ...formData,
            status: finalStatus
        };

        const resp: AxiosResponse<TRolesDBResponse> = currentRole ? await updateRole(dataForSave) : await createRole(dataForSave);

        if (resp?.data?.success) {
            onSuccess({
                msgIcon: 'success',
                msgText: currentRole ? t('role_updated') : t('role_created')
            });
        } else {
            onError({
                msgIcon: 'error',
                msgText: `${t('error_text')} - ${resp?.statusText}`
            });
        }
    };

    if (isLoading) {
        return <FuseLoading />;
    }

    return (
        <div className="flex flex-col min-w-0">
            <Typography variant="h4" gutterBottom>
                {currentRole ? t('role_form_edit_title') : t('role_form_create_title')}
            </Typography>
            <Divider variant="middle" />

            <form name="RoleForm" noValidate className="flex flex-col w-full h-full" onSubmit={handleSubmit(onSubmit)}>
                <Grid container justifyContent="center" className="mt-10">
                    <Grid item xs={12} md={12}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('role_name')}
                                    type="text"
                                    error={!!errors.name}
                                    helperText={errors?.name?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    className="mt-10"
                                />
                            )}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('role_description')}
                                    type="text"
                                    error={!!errors.description}
                                    helperText={errors?.description?.message}
                                    variant="outlined"
                                    required={false}
                                    fullWidth
                                    className="mt-10"
                                />
                            )}
                        />

                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <FormControl error={!!errors.status} required fullWidth className="mt-10">
                                    <InputLabel id="statusLabel">{t('status')}</InputLabel>
                                    <Select {...field} labelId="statusLabel" id="statusId" label={t('status')} variant="outlined" fullWidth>
                                        {statusData.map((status) => (
                                            <MenuItem key={status?.id} value={status?.value}>
                                                {status?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors?.status?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>
                </Grid>

                <Divider variant="middle" className="mt-28 mb-28" />

                <Box className="flex w-full items-center justify-end">
                    <Button className="mx-10" variant="contained" color="primary" type="submit" disabled={Object.keys(errors).length > 0 || !isValid}>
                        {currentRole ? t('update_btn_text') : t('create_btn_text')}
                    </Button>

                    <Button
                        variant="contained"
                        className="mx-8"
                        type="button"
                        onClick={() => {
                            handleClose(true);
                        }}
                    >
                        {t('cancel_btn_text')}
                    </Button>
                </Box>
            </form>
        </div>
    );
}
