import { useMemo } from 'react';
import { CustomCellRendererProps } from 'ag-grid-react';
import { Box, Chip } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { OverridableStringUnion } from '@mui/types';

interface StatusChipProp extends CustomCellRendererProps {
    status: boolean;
}

type chipObject = {
    isActive: string;
    iconColor: string;
    chipColor: OverridableStringUnion<'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'>;
    icon: string;
};

/**
 * Status chip
 */
function StatusChip(params: StatusChipProp) {
    const status: boolean = params?.value as boolean;
    const { isActive, iconColor, chipColor, icon }: chipObject = useMemo(() => {
        return {
            isActive: status ? 'Active' : 'Inactive',
            iconColor: status ? 'success' : 'error',
            chipColor: status ? 'success' : 'error',
            icon: status ? 'heroicons-outline:check-circle' : 'heroicons-outline:x-circle'
        };
    }, [params]);

    return (
        <Box className="flex items-center h-full">
            <Chip
                variant="outlined"
                icon={
                    <FuseSvgIcon
                        className="text-48"
                        size={24}
                        bgcolor={iconColor}
                    >
                        {icon}
                    </FuseSvgIcon>
                }
                color={chipColor}
                label={isActive}
            />
        </Box>
    );
}

export default StatusChip;
