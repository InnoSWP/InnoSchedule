import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import {BaseRow, Order, TableColumn} from "..";

interface EnhancedTableProps<D extends BaseRow> {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof D) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: keyof D;
    rowCount: number;
    headCells: readonly TableColumn<D>[];
}

export const EnhancedTableHead: React.FunctionComponent<any> = <D extends BaseRow>(props: EnhancedTableProps<D>) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
        props;
    const createSortHandler =
        (property: keyof D) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {
                    headCells.map((headCell) =>
                    {
                        if (headCell.hidden) return null;

                        return (
                            <TableCell key={headCell.id}
                                          align={headCell.numeric ? 'right' : 'left'}
                                          padding={headCell.disablePadding ? 'none' : 'normal'}
                                          sortDirection={orderBy === headCell.id ? order : false}
                            >
                                    <TableSortLabel active={orderBy === headCell.id}
                                        direction={orderBy === headCell.id ? order : 'asc'}
                                        onClick={createSortHandler(headCell.id)}
                                    >
                                        {headCell.label}
                                        {orderBy === headCell.id ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                            </TableCell>
                        )
                    })
                }
            </TableRow>
        </TableHead>
    );
}