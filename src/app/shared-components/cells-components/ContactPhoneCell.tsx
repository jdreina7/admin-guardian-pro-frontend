import { useMemo } from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';

interface ContactPhoneCellProps extends CustomCellRendererProps {
    phone: number;
}

const formatPhoneNumber = (number: number): string => {
    const cleaned = number?.toString();

    // Check if the number is a valid cell phone (10 digits)
    if (/^\d{10}$/.test(cleaned)) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    }

    // Check if the number is a valid fixed phone (7 digits)
    if (/^\d{7}$/.test(cleaned)) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    }

    // Return the original input if it doesn't match any format
    return cleaned;
};

/**
 * Format the user contact phone
 */
function ContactPhoneCell(params: ContactPhoneCellProps) {
    const userPhone: number = params?.value as number;
    const usrPhoneNumber: string = useMemo(() => formatPhoneNumber(userPhone), [userPhone]);

    return usrPhoneNumber !== '0' ? <span>{usrPhoneNumber}</span> : <span />;
}

export default ContactPhoneCell;
