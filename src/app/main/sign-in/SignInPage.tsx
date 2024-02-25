import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Checkbox, FormControl, FormControlLabel, Paper, TextField, Typography } from '@mui/material';
import sample from 'public/assets/images/videos/login-video.mp4';

/**
 * Form Validation Schema
 */
const schema = z.object({
    email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
    password: z
        .string()
        .min(6, 'Password is too short - must be at least 6 chars.')
        .nonempty('Please enter your password.')
});

type FormType = {
    email: string;
    password: string;
    remember?: boolean;
};

const defaultValues = {
    email: '',
    password: '',
    remember: true
};

/**
 * The sign in page.
 */
function SignInPage() {
    const { control, formState, handleSubmit, reset } = useForm<FormType>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(schema)
    });

    const { isValid, dirtyFields, errors } = formState;

    function onSubmit() {
        reset(defaultValues);
    }

    return (
        <div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center md:p-32">
            <video
                className="fixed w-full z-[-1]"
                style={{ filter: 'blur(3px)' }}
                autoPlay
                loop
                muted
            >
                <source
                    src={sample}
                    type="video/mp4"
                />
            </video>
            <Paper className="flex min-h-full w-full overflow-hidden rounded-0 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:shadow md:max-w-6xl">
                <Box
                    className="relative hidden h-full flex-auto items-center justify-center overflow-hidden md:flex"
                    // sx={{ backgroundColor: 'primary.main' }}
                >
                    <img
                        className="w-3/5"
                        src="assets/images/logo/logo512.svg"
                        alt="logo"
                    />
                </Box>

                <div className="w-full px-16 py-32 ltr:border-l-1 rtl:border-r-1 sm:w-auto sm:p-48 md:p-64">
                    <div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
                        <img
                            className="m-auto md:hidden sm:block xs:block"
                            src="assets/images/logo/logo192.svg"
                            alt="logo"
                        />

                        <Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
                            Sign in
                        </Typography>

                        <form
                            name="loginForm"
                            noValidate
                            className="mt-32 flex w-full flex-col justify-center"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mb-24"
                                        label="Email"
                                        autoFocus
                                        type="email"
                                        error={!!errors.email}
                                        helperText={errors?.email?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        className="mb-24"
                                        label="Password"
                                        type="password"
                                        error={!!errors.password}
                                        helperText={errors?.password?.message}
                                        variant="outlined"
                                        required
                                        fullWidth
                                    />
                                )}
                            />

                            <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
                                <Controller
                                    name="remember"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl>
                                            <FormControlLabel
                                                label="Remember me"
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        {...field}
                                                    />
                                                }
                                            />
                                        </FormControl>
                                    )}
                                />

                                <Link
                                    className="text-md font-medium"
                                    to="/pages/auth/forgot-password"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                variant="contained"
                                color="secondary"
                                className=" mt-16 w-full"
                                aria-label="Sign in"
                                disabled={_.isEmpty(dirtyFields) || !isValid}
                                type="submit"
                                size="large"
                            >
                                Sign in
                            </Button>
                        </form>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default SignInPage;
