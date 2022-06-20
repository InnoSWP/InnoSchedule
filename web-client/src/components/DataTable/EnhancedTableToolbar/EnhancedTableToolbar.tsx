import React from "react";
import Toolbar from "@mui/material/Toolbar";
import {alpha} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';

interface EnhancedTableToolbarProps {
    label: string;
    selected: readonly string[];

    createNew: () => void;
    handleResetSelected: () => void;
    removeItems: (
        selected: readonly string[],
        resetSelect: (selected: readonly string[]) => void
    ) => void;
}

export const EnhancedTableToolbar:React.FunctionComponent<EnhancedTableToolbarProps> = (
    props
) => {
    const { label, selected, createNew, handleResetSelected, removeItems } = props;
    const numSelected = selected.length;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {label}
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                     <IconButton onClick={() => {removeItems(selected, handleResetSelected)}}>
                         <DeleteIcon />
                     </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Create new">
                    <IconButton onClick={() => {createNew()}}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};
