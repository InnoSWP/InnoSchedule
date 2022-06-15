// import styles from "./SchedulesList.module.scss";
import {
    getComparator,
    useSchedulesListLogic
} from "./SchedulesList.logic";
import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableHead } from "./EnhancedTableHead";
import { useAppSelector } from "../../store";

export interface SchedulesListProps {
   createNew: () => void;
   removeItems: (
       selected: readonly string[],
       resetSelect: (selected: readonly string[]) => void
   ) => void
}

export const SchedulesList:React.FunctionComponent<SchedulesListProps> = (props) => {

    const rows = useAppSelector((state) => state.schedules.schedules);

    const logic = useSchedulesListLogic(props, rows);
    const [
        selected,
        order,
        orderBy,
        page,
        rowsPerPage,
        dense,
        emptyRows,

        isSelected,
        handleSelectAllClick,
        handleClick,
        handleRequestSort,
        handleChangePage,
        handleChangeRowsPerPage,
        handleChangeDense,
        handleRowClick,
        handleResetSelected
    ] = logic.useTable();

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar selected={selected}
                                      createNew={props.createNew}
                                      handleResetSelected={handleResetSelected}
                                      removeItems={props.removeItems}/>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.slice().sort(getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            sx={{cursor: "pointer"}}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleRowClick(event, row.name);
                                            }}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        handleClick(event, row.name);
                                                    }}
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={(row.published === 1)}
                                                    disabled={true}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            {/*<TableCell align="left">{row.lastModified}</TableCell>*/}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
}
