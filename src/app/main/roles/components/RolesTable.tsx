import { useEffect, useMemo, useState } from 'react';
// AG Grid Component
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ColDef } from 'ag-grid-community';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';

import ActionsCell from 'app/shared-components/cells-components/ActionsCell';
import { capitalizeFirstLetter } from 'src/utils/utils';
import es from '../../../../i18n/es/es';
import en from '../../../../i18n/en/en';

import StatusChip from '../../../shared-components/status-chips/StatusChip';

import { TRolesDB } from '../../../../utils/types';
import { selectCurrentLanguageId } from '../../../store/i18nSlice';

const rowHeight = 60;

type RolesTableProps = {
    roles: TRolesDB[];
    handleOpen: () => void;
    setSelectedRole: (role: TRolesDB) => void;
};

type UsersDataTable = {
    id: string;
    name: string;
    description: string;
    status: boolean;
};

/**
 * Function for mapping the DB roles with the roles grid format
 * @param roles The role DB collection from the API
 * @returns Returns a mapped roles data
 */
const mapRolesData = (roles: TRolesDB[]) => {
    const data: Array<UsersDataTable> = [];

    roles.forEach((role) => {
        const ob: UsersDataTable = {
            id: role?.id,
            name: capitalizeFirstLetter(role?.name),
            description: role?.description,
            status: role?.status
        };

        data.push(ob);
    });

    return data;
};

function RolesTable(props: RolesTableProps) {
    const { t } = useTranslation();
    const currentLanguage = useSelector(selectCurrentLanguageId);
    const { roles, handleOpen, setSelectedRole } = props;
    const gridStyle = useMemo(() => ({ height: '95.6%', width: '100%' }), []);
    const [rowData, setRowData] = useState([]);
    const [isDestroyed, setIsDestroyed] = useState(false);

    useEffect(() => {
        if (roles) {
            const data = mapRolesData(roles);
            setRowData(data);
        }
    }, [roles]);

    /**
     * Pagination grid translation block
     */
    const recreateGrid = () => {
        setIsDestroyed(false);
    };

    const localeText = useMemo<{
        [key: string]: string;
    }>(() => {
        setIsDestroyed(true);
        const lng = currentLanguage === 'en' ? en : es;

        setTimeout(() => recreateGrid(), 0);

        return lng;
    }, [currentLanguage, t]);
    /**
     * End block
     */

    /**
     * Ag-grid columns definition block
     */
    const columnDefs: ColDef[] = useMemo(() => {
        return [
            {
                field: 'name',
                headerValueGetter: () => t('role_name'), // Translated value for the grid columns
                filter: 'name',
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    // function callback for open the edit user dialog
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedRole(p.data as TRolesDB);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'description',
                headerValueGetter: () => t('role_description'),
                filter: 'description',
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedRole(p.data as TRolesDB);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'status',
                headerValueGetter: () => t('status'),
                cellRenderer: StatusChip,
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedRole(p.data as TRolesDB);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'actions',
                headerValueGetter: () => t('actions'),
                cellRenderer: ActionsCell
            }
        ];
    }, [roles, t]);
    /**
     * End block
     */

    // this is necesary for improve the grid view
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1
        };
    }, []);

    return !isDestroyed ? (
        <div className="w-full h-full bg-white">
            <div className="h-full mx-auto p-8 lg:px-12">
                <div className="h-full mx-auto rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
                    <div style={gridStyle} className="ag-theme-quartz">
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            localeText={localeText}
                            defaultColDef={defaultColDef}
                            pagination
                            paginationPageSize={10}
                            paginationPageSizeSelector={[2, 5, 10]}
                            rowHeight={rowHeight}
                        />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <FuseLoading />
    );
}

export default RolesTable;
