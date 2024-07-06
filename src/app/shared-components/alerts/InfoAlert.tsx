import { Alert, AlertTitle } from '@mui/material';

type InfoAlertProps = {
    title: string;
    content: string;
};

export function InfoAlert(data: InfoAlertProps) {
    const { title, content } = data;

    return (
        <Alert severity="info">
            <AlertTitle>{title}</AlertTitle>
            {content}
        </Alert>
    );
}
