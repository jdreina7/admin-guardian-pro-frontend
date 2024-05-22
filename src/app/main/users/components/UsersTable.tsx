import { useEffect, useMemo, useState } from 'react';
// AG Grid Component
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ColDef } from 'ag-grid-community';

import StatusChip from '../../../shared-components/status-chips/StatusChip';
import UserNameCell from './UserNameCell';

import { IUser } from '../../../../utils/types';
import UserActionsCell from './UserActionsCell';

const rowHeight = 60;

type UsersTableProps = {
    users: IUser[];
    handleOpen: () => void;
    setSelectedUser: (user: IUser) => void;
};

type UsersDataTable = {
    name: IUser;
    identification: number;
    role: string;
    email: string;
    contact: string;
    status: boolean;
};

const mapUserData = (users: IUser[]) => {
    const data: Array<UsersDataTable> = [];

    users.forEach((user) => {
        const ob: UsersDataTable = {
            name: user,
            identification: user?.uid,
            role: user?.roleId?.name,
            email: user?.email,
            contact: String(user?.contactPhone),
            status: user?.status
        };

        data.push(ob);
    });

    return data;
};

const customFilterUserColumn = (userData: IUser) => {
    const { firstName, middleName, lastName, email } = userData;

    const composedFilter = `${firstName} ${middleName} ${lastName} ${email}`;

    return composedFilter;
};

function UsersTable(props: UsersTableProps) {
    const { users, handleOpen, setSelectedUser } = props;
    const gridStyle = useMemo(() => ({ height: '90%', width: '100%' }), []);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        if (users) {
            const data = mapUserData(users);
            setRowData(data);
        }
    }, [users]);

    const columnDefs: ColDef[] = useMemo(() => {
        return [
            {
                field: 'name',
                headerName: 'User Name',
                cellRenderer: UserNameCell,
                filter: 'name',
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                filterValueGetter: (p) => customFilterUserColumn(p.data?.name as IUser),
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedUser(p.data?.name as IUser);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'identification',
                filter: 'identification',
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedUser(p.data?.name as IUser);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'role',
                filter: 'role',
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedUser(p.data?.name as IUser);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'email',
                filter: 'email',
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedUser(p.data?.name as IUser);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'contact',
                filter: 'contact',
                filterParams: {
                    filterOptions: ['contains'],
                    maxNumConditions: 1
                },
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedUser(p.data?.name as IUser);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'status',
                cellRenderer: StatusChip,
                onCellClicked: (p) => {
                    handleOpen();
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    setSelectedUser(p.data?.name as IUser);
                },
                cellStyle: { cursor: 'pointer' }
            },
            {
                field: 'actions',
                cellRenderer: UserActionsCell
            }
        ];
    }, [users]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1
        };
    }, []);

    return (
        <div className="w-full h-full bg-white">
            <div className="h-full mx-auto p-8 lg:px-12">
                <div className="h-full mx-auto rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
                    <div style={gridStyle} className="ag-theme-quartz">
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
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
    );
}

export default UsersTable;
