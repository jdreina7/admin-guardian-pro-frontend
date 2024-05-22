import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import _ from 'lodash';
import { IMaskInput } from 'react-imask';
import { useListIdentificationsTypes, useListOcupations, useListMaritalStatus } from '../../../../api/hooks';
import { TUserCreateForm } from '../../../../utils/types';

/**
 * Form Validation Schema
 */

// ***********************************************
export const IdSchema = z.object({
    name: z.string(),
    id: z.string()
});

export type Id = z.infer<typeof IdSchema>;

export const IdentificationTypeIdSchema = z.object({
    type: z.string(),
    id: z.string()
});

export type IdentificationTypeId = z.infer<typeof IdentificationTypeIdSchema>;

export const DataSchema = z.object({
    uid: z.number().min(7, 'You must enter an user identification number'),
    identificationTypeId: z.string(),
    email: z.string().email('You must enter a valid email').min(1, 'You must enter an email'),
    firstName: z.string().min(3, 'FirstName is too short - must be at least 3 chars.'),
    middleName: z.string(),
    lastName: z.string().min(3, 'LastName is too short - must be at least 3 chars.'),
    genderId: z.string(),
    contactPhone: z.number(),
    address: z.string(),
    city: z.string(),
    birthday: z.string(),
    userImg: z.string(),
    username: z.string(),
    // password: z.string(),
    maritalStatusId: z.string(),
    ocupationId: z.string(),
    roleId: z.string(),
    status: z.boolean()
    // lastLogin: z.string(),
    // shortcuts: z.array(z.string())
    // id: z.string()
});

export type Data = z.infer<typeof DataSchema>;

// ***********************************************

interface CustomProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    value: string;
}

const TextMaskCustom = forwardRef<HTMLInputElement, CustomProps>(function TextMaskCustom(props, ref) {
    const { onChange, onFocus, onBlur, value, ...other } = props;
    // const inputRef = useRef(null);

    return (
        <IMaskInput
            {...other}
            mask={Number}
            radix="."
            value={value}
            mapToRadix={['.']}
            scale={2}
            thousandsSeparator="." // any single char
            padFractionalZeros={false} // if true, then pads zeros at end to the length of scale
            normalizeZeros
            min={1}
            max={9999999999}
            autofix
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
        />
    );
});

export function UserForm({ data }) {
    console.log('92 data >>> ', data);
    const token = localStorage.getItem('access_token');
    const { data: idTypesData, isLoading: idTypesLoading } = useListIdentificationsTypes(token);
    const { data: ocupationsData, isLoading: ocupationsLoading } = useListOcupations(token);
    const { data: maritalStatusData, isLoading: maritalStatusLoading } = useListMaritalStatus(token);

    let defaultValues = {
        identificationTypeId: '',
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        address: '',
        city: '',
        birthday: '',
        userImg: '',
        username: '',
        status: false
    };

    if (data) {
        defaultValues = {
            identificationTypeId: '',
            email: '',
            firstName: '',
            middleName: '',
            lastName: '',
            address: '',
            city: '',
            birthday: '',
            userImg: '',
            username: '',
            status: false
        };
    }

    const { control, formState, handleSubmit } = useForm<TUserCreateForm>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(DataSchema)
    });
    const [userIdValue, setUserIdValue] = useState('');
    // eslint-disable-next-line no-unneeded-ternary
    // const shrink = useMemo(() => false, [userIdValue]);
    const [shrink, setShrink] = useState(false);

    const { isValid, dirtyFields, errors } = formState;

    function onSubmit(formData: TUserCreateForm) {
        // const dataForSave: IUser = {};

        alert(formData);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserIdValue(event.target.value as never);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event?.type === 'focus') {
            setShrink(true);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event?.type === 'blur') {
            if (userIdValue.length <= 0) {
                setShrink(false);
            }
        }
    };

    return (
        <div className="flex flex-col min-w-0">
            <Typography variant="h4" gutterBottom>
                Edit User
            </Typography>
            <Divider variant="middle" />

            <form name="userForm" noValidate className="flex flex-col w-full h-full p-28" onSubmit={handleSubmit(onSubmit)}>
                <Divider textAlign="left" className="mb-28">
                    Principal Information
                </Divider>
                <Grid container spacing={3} justifyContent="left" className="mb-28">
                    <Grid item xs={4} md={4}>
                        <Controller
                            name="identificationTypeId"
                            control={control}
                            render={({ field }) => (
                                <FormControl error={!!errors.identificationTypeId} required fullWidth>
                                    <InputLabel id="idTypeLabel">Identification Type</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="idTypeLabel"
                                        id="identificationType"
                                        label="Identification Type"
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem value="10">CC</MenuItem>
                                        <MenuItem value="20">CE</MenuItem>
                                        <MenuItem value="30">Passport</MenuItem>
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
                                <TextField
                                    {...field}
                                    label="User ID"
                                    error={!!errors.uid}
                                    helperText={errors?.uid?.message}
                                    variant="outlined"
                                    value={userIdValue}
                                    required
                                    fullWidth
                                    InputProps={{
                                        ...field,
                                        inputComponent: TextMaskCustom as never,
                                        onChange: handleChange,
                                        error: !!errors.uid,
                                        onFocus: handleFocus,
                                        onBlur: handleBlur
                                    }}
                                    InputLabelProps={{ shrink }}
                                />
                                // <FormControl variant="outlined">
                                //     <InputLabel htmlFor="userId">User ID</InputLabel>
                                //     <Input
                                //         {...field}
                                //         value={values.textmask}
                                //         onChange={handleChange}
                                //         name="textmask"
                                //         id="userId"
                                //         inputComponent={TextMaskCustom as never}
                                //         error={!!errors.uid}
                                //     />
                                // </FormControl>
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
                                    label="Email"
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
                                    label="First Name"
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
                                    label="Middle Name"
                                    type="text"
                                    error={!!errors.middleName}
                                    helperText={errors?.middleName?.message}
                                    variant="outlined"
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
                                    label="Last Name"
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
                                <FormControl error={!!errors.genderId} required fullWidth>
                                    <InputLabel id="genderIdLabel">Gender</InputLabel>
                                    <Select {...field} labelId="genderIdLabel" id="genderId" label="Gender" variant="outlined" fullWidth>
                                        <MenuItem value="10">Male</MenuItem>
                                        <MenuItem value="20">Female</MenuItem>
                                        <MenuItem value="30">Prefer not answer</MenuItem>
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
                                <FormControl error={!!errors.maritalStatusId} required fullWidth>
                                    <InputLabel id="maritalStatus">Marital Status</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="maritalStatus"
                                        id="maritalStatusId"
                                        label="Marital Status"
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <MenuItem value="10">Married</MenuItem>
                                        <MenuItem value="20">Single</MenuItem>
                                        <MenuItem value="30">Divorced</MenuItem>
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
                                <FormControl error={!!errors.ocupationId} required fullWidth>
                                    <InputLabel id="ocupationIdLabel">Ocupation</InputLabel>
                                    <Select {...field} labelId="ocupationIdLabel" id="ocupationId" label="Ocupation" variant="outlined" fullWidth>
                                        <MenuItem value="10">Student</MenuItem>
                                        <MenuItem value="20">Employee</MenuItem>
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
                                    <InputLabel id="roleLabel">Role</InputLabel>
                                    <Select {...field} labelId="roleLabel" id="roleId" label="Role" variant="outlined" fullWidth>
                                        <MenuItem value="10">User</MenuItem>
                                        <MenuItem value="20">Admin</MenuItem>
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
                                    <InputLabel id="statusLabel">Status</InputLabel>
                                    <Select {...field} labelId="statusLabel" id="statusId" label="Status" variant="outlined" fullWidth>
                                        <MenuItem value="10">Active</MenuItem>
                                        <MenuItem value="20">Inactive</MenuItem>
                                    </Select>
                                    <FormHelperText>{errors?.status?.message}</FormHelperText>
                                </FormControl>
                            )}
                        />
                    </Grid>
                </Grid>

                <Divider textAlign="left" className="mb-32">
                    Other Information
                </Divider>

                <Grid container spacing={3} justifyContent="left">
                    <Grid item xs={8} md={8}>
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Address"
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
                                    label="City"
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
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Username/Nick"
                                    type="text"
                                    error={!!errors.username}
                                    helperText={errors?.username?.message}
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
                                    label="Contact Phone"
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
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    value={new Date(value)}
                                    onChange={onChange}
                                    slotProps={{
                                        textField: {
                                            id: 'birthday',
                                            label: 'Birthday',
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

                <Box className="flex items-center">
                    <Button className="mx-8" variant="contained" color="secondary" type="submit" disabled={_.isEmpty(dirtyFields) || !isValid}>
                        Submit
                    </Button>

                    <Button
                        className="mx-8"
                        type="button"
                        // onClick={() => {
                        //     reset(defaultValues);
                        // }}
                    >
                        Cancel
                    </Button>
                </Box>
            </form>
        </div>
    );
}
