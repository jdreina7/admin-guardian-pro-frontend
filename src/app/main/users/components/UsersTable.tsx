import { useEffect, useMemo, useState } from 'react';
// AG Grid Component
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ColDef } from 'ag-grid-community';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';

import es from '../../../../i18n/es/es';
import en from '../../../../i18n/en/en';

import StatusChip from '../../../shared-components/status-chips/StatusChip';
import UserNameCell from './UserNameCell';

import { TUserDB } from '../../../../utils/types';
import UserActionsCell from './UserActionsCell';
import { selectCurrentLanguageId } from '../../../store/i18nSlice';

const rowHeight = 60;

type UsersTableProps = {
    users: TUserDB[];
    handleOpen: () => void;
    setSelectedUser: (user: TUserDB) => void;
};

type UsersDataTable = {
    name: TUserDB;
    identification: number;
    role: string;
    email: string;
    contact: string;
    status: boolean;
};

const mapUserData = (users: TUserDB[]) => {
    const data: Array<UsersDataTable> = [];

    users.forEach((user) => {
        const ob: UsersDataTable = {
            name: user,
            identification: user?.uid as number,
            role: user?.roleId?.name,
            email: user?.email,
            contact: String(user?.contactPhone),
            status: user?.status
        };

        data.push(ob);
    });

    return data;
};

const customFilterUserColumn = (userData: TUserDB) => {
    const { firstName, middleName, lastName, email } = userData;

    const composedFilter = `${firstName} ${middleName} ${lastName} ${email}`;

    return composedFilter;
};

function UsersTable(props: UsersTableProps) {
    const { t } = useTranslation();
    const currentLanguage = useSelector(selectCurrentLanguageId);
    const { users, handleOpen, setSelectedUser } = props;
    const gridStyle = useMemo(() => ({ height: '95.6%', width: '100%' }), []);
    const [rowData, setRowData] = useState([]);
    const [isDestroyed, setIsDestroyed] = useState(false);

    useEffect(() => {
        if (users) {
            const data = mapUserData(users);
            setRowData(data);
        }
    }, [users]);

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

    const columnDefs: ColDef[] = useMemo(() => {
        return [
            {
                field: 'name',
                headerValueGetter: () => t('fullname'),
                cellRenderer: UserNameCell,
                filter: 'name',
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                filterValueGetter: (p) => customFilterUserColumn(p.data?.name as TUserDB),
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedUser(p.data?.name as TUserDB);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'identification',
                headerValueGetter: () => t('identification'),
                filter: 'identification',
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedUser(p.data?.name as TUserDB);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'role',
                headerValueGetter: () => t('role'),
                filter: 'role',
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedUser(p.data?.name as TUserDB);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'email',
                headerValueGetter: () => t('email'),
                filter: 'email',
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedUser(p.data?.name as TUserDB);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'contact',
                headerValueGetter: () => t('contact'),
                filter: 'contact',
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedUser(p.data?.name as TUserDB);
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
                    setSelectedUser(p.data?.name as TUserDB);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'actions',
                headerValueGetter: () => t('actions'),
                cellRenderer: UserActionsCell
            }
        ];
    }, [users, t]);

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

export default UsersTable;
