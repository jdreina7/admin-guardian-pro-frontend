import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { IAfterGuiAttachedParams, IDoesFilterPassParams } from 'ag-grid-community';
import { CustomFilterProps, useGridFilter } from 'ag-grid-react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, Button } from '@mui/material';

export default function ({ model, onModelChange }: CustomFilterProps) {
    console.log('7 model >>> ', model);
    const [closeFilter, setCloseFilter] = useState<(() => void) | undefined>();
    const [unappliedModel, setUnappliedModel] = useState(model);

    const handleChange = (event: SelectChangeEvent) => {
        console.log('11 event.target.value >>> ', event.target.value);
        setUnappliedModel(event.target.value === '' ? null : event.target.value);
        onModelChange(event.target.value);

        if (closeFilter) {
            closeFilter();
        }
    };

    useEffect(() => {
        console.log('21 unappliedModel >>> ', unappliedModel);

        if (unappliedModel) {
            onModelChange(unappliedModel);

            closeFilter();
        }
    }, []);

    const doesFilterPass = useCallback((params: IDoesFilterPassParams) => {
        // doesFilterPass only gets called if the filter is active,
        // which is when the model is not null (e.g. >= 2010 in this case)
        console.log('21 params >>> ', params);
        return params.data.status;
    }, []);

    const afterGuiAttached = useCallback(({ hidePopup }: IAfterGuiAttachedParams) => {
        setCloseFilter(() => hidePopup);
    }, []);

    // register filter handlers with the grid
    useGridFilter({
        doesFilterPass,
        afterGuiAttached
    });

    useEffect(() => {
        setUnappliedModel(model);
    }, [model]);

    const onYearChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setUnappliedModel(value === '' ? null : value);
    };

    const onClick = () => {
        onModelChange(unappliedModel);
        if (closeFilter) {
          closeFilter();
        }
      };

    return (
        <Box>
            <FormControl
                sx={{ m: 1, minWidth: 120 }}
                size="small"
            >
                <InputLabel id="demo-select-small-label">User Status</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={unappliedModel}
                    label="User Status"
                    onChange={onYearChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={onClick}>Apply</Button>
        </Box>
    );
}
