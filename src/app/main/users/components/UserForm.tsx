import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { IMaskMixin } from 'react-imask';
import FuseLoading from '@fuse/core/FuseLoading';
import moment from 'moment';
import { AxiosError, AxiosResponse } from 'axios';

import { capitalizeFirstLetter } from 'src/utils/utils';
import { useTranslation } from 'react-i18next';
import {
    useCreateUser,
    useUpdateUser,
    useListIdentificationsTypes,
    useListOcupations,
    useListMaritalStatus,
    useListGenders,
    useListRoles
} from '../../../../api/hooks';
import {
    TGendersDB,
    TIdentificationTypeDB,
    TMaritalStatusDB,
    TModalConstants,
    TOcupationsDB,
    TRolesDB,
    TUserCreateForm,
    TUserDB,
    TUserDBForStore,
    TUserDBResponse
} from '../../../../utils/types';
import { IAPIErrorResponse } from '../../../../utils/interfaces';

const TMP_PASSWORD: string = 'TmpPass@1';

const statusData = [
    { name: 'Active', value: 'true', id: 'joiuj98uiojl' },
    { name: 'Inactive', value: 'false', id: '787hhhuhudxdfsz' }
];

type UsersFormProps = {
    currentUser: TUserDB;
    handleClose: (close: boolean) => void;
    onSuccess: (data: TModalConstants) => void;
    onError: (data: TModalConstants) => void;
};

/**
 * Imask use for the User ID field1
 */
const IMaskUIInput = IMaskMixin(({ ...props }) => {
    // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-explicit-any
    return <TextField {...props as any } variant="outlined" />;
});

export function UserForm(data: UsersFormProps) {
    const { t } = useTranslation();
    const { handleClose, currentUser, onSuccess, onError } = data;

    const token = localStorage.getItem('access_token');

    const [userIdValue, setUserIdValue] = useState('');
    // const [usrBirthday, setUsrBirthday] = useState('');

    // Call to APi for the selects data
    const { data: idTypesData, isLoading: idTypesLoading } = useListIdentificationsTypes(token);
    const { data: ocupationsData, isLoading: ocupationsLoading } = useListOcupations(token);
    const { data: maritalStatusData, isLoading: maritalStatusLoading } = useListMaritalStatus(token);
    const { data: gendersData, isLoading: gendersLoading } = useListGenders(token);
    const { data: rolesData, isLoading: rolesLoading } = useListRoles(token);

    const { mutateAsync: updateUser, isPending: isUpdatingUser, error: updateUserError } = useUpdateUser(token, currentUser?.id);
    const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser(token);

    // Using memo for store the info
    const idTypes: TIdentificationTypeDB[] = useMemo(() => idTypesData?.data?.data, [idTypesData]);
    const ocupations: TOcupationsDB[] = useMemo(() => ocupationsData?.data?.data, [ocupationsData]);
    const maritalStatus: TMaritalStatusDB[] = useMemo(() => maritalStatusData?.data?.data, [maritalStatusData]);
    const genders: TGendersDB[] = useMemo(() => gendersData?.data?.data, [gendersData]);
    const roles: TRolesDB[] = useMemo(() => rolesData?.data?.data, [rolesData]);
    const roleDefault: TRolesDB = useMemo(() => roles?.find((rol) => rol?.name === 'user'), [roles]);
    const usrBirthday = useMemo(() => (currentUser?.birthday ? moment(currentUser?.birthday, 'DD/MM/YYYY').toDate() : ''), [currentUser]);
    const [newUsrBirthday, setNewUsrBirthday] = useState<string>('');

    const [isLoading, setIsLoading] = useState(true);

    /**
     * Form Validation Schema
     */
    const DataSchema = z.object({
        uid: z.string().min(7, t('user_form_validation_schema_userid')),
        identificationTypeId: z.string(),
        email: z.string().email(t('user_form_validation_schema_email_1')).min(1, t('user_form_validation_schema_email_2')),
        firstName: z.string().min(3, t('user_form_validation_schema_first_name')),
        middleName: z.string().optional(),
        lastName: z.string().min(3, t('user_form_validation_schema_last_name')),
        genderId: z.string(),
        contactPhone: z.string().optional(),
        address: z.string().optional(),
        city: z.string().optional(),
        birthday: z.string().optional(),
        username: z.string().min(5, t('user_form_validation_schema_username')),
        maritalStatusId: z.string(),
        ocupationId: z.string(),
        roleId: z.string(),
        status: z.string()
    });
    // ***********************************************

    /**
     * Form data and validation Section
     */
    const defaultValues = {
        identificationTypeId: currentUser ? currentUser?.identificationTypeId?.id : '',
        genderId: currentUser ? currentUser?.genderId?.id : '',
        maritalStatusId: currentUser ? currentUser?.maritalStatusId?.id : '',
        ocupationId: currentUser ? currentUser?.ocupationId?.id : '',
        roleId: currentUser ? currentUser?.roleId?.id : roleDefault?.id,
        uid: currentUser ? `${currentUser?.uid}` : '',
        email: currentUser ? currentUser?.email : '',
        firstName: currentUser ? currentUser?.firstName : '',
        middleName: currentUser ? currentUser?.middleName : '',
        lastName: currentUser ? currentUser?.lastName : '',
        address: currentUser ? currentUser?.address : '',
        city: currentUser ? currentUser?.city : '',
        birthday: currentUser ? currentUser?.birthday : '',
        username: currentUser ? currentUser?.username : '',
        status: currentUser ? `${currentUser?.status}` : 'true',
        contactPhone: currentUser ? `${currentUser?.contactPhone}` : ''
    };

    const { control, formState, handleSubmit, clearErrors, setValue } = useForm<TUserCreateForm>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(DataSchema)
    });

    const { isValid, errors } = formState;

    /**
     * UseEffects Section
     */
    useEffect(() => {
        if (idTypesLoading || ocupationsLoading || maritalStatusLoading || gendersLoading || rolesLoading) {
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [idTypesLoading, ocupationsLoading, maritalStatusLoading, gendersLoading, rolesLoading]);

    useEffect(() => {
        if (currentUser && currentUser?.uid) {
            setUserIdValue(`${currentUser?.uid}`);
        }
    }, [data]);

    useEffect(() => {
        if (userIdValue?.length > 6) {
            clearErrors('uid');
            setValue('uid', userIdValue, { shouldDirty: true });
        }
    }, [userIdValue]);

    useEffect(() => {
        if (isUpdatingUser || isCreatingUser) {
            setIsLoading(true);
        }
    }, [isUpdatingUser, isCreatingUser]);

    useEffect(() => {
        if (updateUserError) {
            const error: Partial<AxiosError> = { ...updateUserError };
            const errData: IAPIErrorResponse = { ...(error?.response?.data as IAPIErrorResponse) };

            onError({
                msgIcon: 'error',
                msgTitle: `${error?.response?.status} - ${error?.response?.statusText}`,
                msgText: `${errData?.message} - ${errData?.invalidValue?.uid}`
            });
        }
    }, [updateUserError]);

    /**
     * Form functions section
     */
    const onSubmit = async (formData: TUserCreateForm) => {
        const uIWithoutDots: string = formData?.uid?.split('.').join('');
        const finalUid: number = +uIWithoutDots;
        const finalContactPhone: number = +formData.contactPhone;
        const finalStatus: boolean = formData.status === 'true';

        const dataForSave: TUserDBForStore = {
            ...formData,
            uid: finalUid,
            contactPhone: finalContactPhone,
            status: finalStatus,
            password: TMP_PASSWORD, // TODO: User should change this password at the first time login
            birthday: newUsrBirthday?.length > 0 ? newUsrBirthday : currentUser?.birthday
        };

        const resp: AxiosResponse<TUserDBResponse> = currentUser ? await updateUser(dataForSave) : await createUser(dataForSave);

        if (resp?.data?.success) {
            onSuccess({
                msgIcon: 'success',
                msgText: currentUser ? t('user_updated') : t('user_created')
            });
        } else {
            onError({
                msgIcon: 'error',
                msgText: `${t('error_text')} - ${resp?.statusText}`
            });
        }
    };

    const handleChange = (val: string) => {
        setUserIdValue(val);
    };

    const handleBirthdayChange = (date: Date | null) => {
        setNewUsrBirthday(moment(date).format('DD/MM/YYYY'));
    };

    if (isLoading) {
        return <FuseLoading />;
    }

    return (
        <div className="flex flex-col min-w-0">
            <Typography variant="h4" gutterBottom>
                {currentUser ? t('user_form_edit_title') : t('user_form_create_title')}
            </Typography>
            <Divider variant="middle" />

            <form name="userForm" noValidate className="flex flex-col w-full h-full p-28" onSubmit={handleSubmit(onSubmit)}>
                <Divider textAlign="left" className="mb-28">
                    {t('user_form_subtitle_1')}
                </Divider>
                <Grid container spacing={3} justifyContent="left" className="mb-28">
                    <Grid item xs={4} md={4}>
                        <Controller
                            name="identificationTypeId"
                            control={control}
                            render={({ field }) => (
                                <FormControl error={!!errors.identificationTypeId} required fullWidth>
                                    <InputLabel id="idTypeLabel">{t('user_form_identification_type')}</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="idTypeLabel"
                                        id="identificationType"
                                        label={t('user_form_identification_type')}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        {idTypes.map((idType: TIdentificationTypeDB) => (
                                            <MenuItem key={idType?.id} value={idType?.id}>
                                                {idType?.type.toUpperCase()}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors?.identificationTypeId?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="uid"
                            control={control}
                            render={({ field }) => (
                                <IMaskUIInput
                                    {...field}
                                    mask={Number}
                                    radix="."
                                    value={userIdValue}
                                    mapToRadix={['.']}
                                    thousandsSeparator="."
                                    min={1}
                                    max={9999999999}
                                    color="primary"
                                    label={t('user_form_user_id')}
                                    error={!!errors.uid}
                                    helperText={errors?.uid?.message}
                                    required
                                    fullWidth
                                    onAccept={handleChange}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('user_form_email')}
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors?.email?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('user_form_first_name')}
                                    type="text"
                                    error={!!errors.firstName}
                                    helperText={errors?.firstName?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="middleName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('user_form_middle_name')}
                                    type="text"
                                    error={!!errors.middleName}
                                    helperText={errors?.middleName?.message}
                                    variant="outlined"
                                    required={false}
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('user_form_last_name')}
                                    type="text"
                                    error={!!errors.lastName}
                                    helperText={errors?.lastName?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="genderId"
                            control={control}
                            render={({ field }) => (
                                <FormControl error={!!errors.genderId} fullWidth>
                                    <InputLabel id="genderIdLabel">{t('user_form_gender')}</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="genderIdLabel"
                                        id="genderId"
                                        label={t('user_form_gender')}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        {genders.map((gender: TGendersDB) => (
                                            <MenuItem key={gender?.id} value={gender?.id}>
                                                {gender?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors?.genderId?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="maritalStatusId"
                            control={control}
                            render={({ field }) => (
                                <FormControl error={!!errors.maritalStatusId} fullWidth>
                                    <InputLabel id="maritalStatus">{t('user_form_marital_status')}</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="maritalStatus"
                                        id="maritalStatusId"
                                        label={t('user_form_marital_status')}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        {maritalStatus.map((ms: TMaritalStatusDB) => (
                                            <MenuItem key={ms?.id} value={ms?.id}>
                                                {ms?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors?.maritalStatusId?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="ocupationId"
                            control={control}
                            render={({ field }) => (
                                <FormControl error={!!errors.ocupationId} fullWidth>
                                    <InputLabel id="ocupationIdLabel">{t('user_form_ocupation')}</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="ocupationIdLabel"
                                        id="ocupationId"
                                        label={t('user_form_ocupation')}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        {ocupations.map((ocupation: TOcupationsDB) => (
                                            <MenuItem key={ocupation?.id} value={ocupation?.id}>
                                                {ocupation?.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors?.ocupationId?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="roleId"
                            control={control}
                            render={({ field }) => (
                                <FormControl error={!!errors.roleId} required fullWidth>
                                    <InputLabel id="roleLabel">{t('user_form_role')}</InputLabel>
                                    <Select {...field} labelId="roleLabel" id="roleId" label={t('user_form_role')} variant="outlined" fullWidth>
                                        {roles.map((rol: TRolesDB) => (
                                            <MenuItem key={rol?.id} value={rol?.id}>
                                                {capitalizeFirstLetter(rol?.name)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{errors?.roleId?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <FormControl error={!!errors.status} required fullWidth>
                                    <InputLabel id="statusLabel">{t('user_form_status')}</InputLabel>
                                    <Select {...field} labelId="statusLabel" id="statusId" label={t('user_form_status')} variant="outlined" fullWidth>
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

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('user_form_username')}
                                    type="text"
                                    error={!!errors.username}
                                    helperText={errors?.username?.message}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Divider textAlign="left" className="mb-32">
                    {t('user_form_subtitle_2')}
                </Divider>

                <Grid container spacing={3} justifyContent="left">
                    <Grid item xs={8} md={8}>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('user_form_address')}
                                    type="text"
                                    error={!!errors.address}
                                    helperText={errors?.address?.message}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="city"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('user_form_city')}
                                    type="text"
                                    error={!!errors.city}
                                    helperText={errors?.city?.message}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="contactPhone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label={t('user_form_contact_phone')}
                                    type="text"
                                    error={!!errors.contactPhone}
                                    helperText={errors?.contactPhone?.message}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Controller
                            name="birthday"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    value={usrBirthday}
                                    onChange={handleBirthdayChange}
                                    format="dd/MM/yyyy"
                                    slotProps={{
                                        textField: {
                                            id: 'birthday',
                                            label: t('user_form_birthday'),
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            fullWidth: true,
                                            variant: 'outlined',
                                            error: !!errors.birthday,
                                            helperText: errors?.birthday?.message
                                        },
                                        inputAdornment: {
                                            position: 'start',
                                            children: <FuseSvgIcon size={20}>heroicons-solid:cake</FuseSvgIcon>
                                        }
                                    }}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Divider variant="middle" className="mt-28 mb-28" />

                <Box className="flex w-full items-center justify-end">
                    <Button className="mx-10" variant="contained" color="primary" type="submit" disabled={Object.keys(errors).length > 0 || !isValid}>
                        {currentUser ? t('update_btn_text') : t('create_btn_text')}
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
