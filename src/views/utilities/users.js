import React, { useEffect } from 'react'
import { Grid } from "@mui/material";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
// import LeftSideBar from './leftsidebar.js'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from 'axios';
// import { getRevenue } from '../../constants/helper.js'

const handleDownload = () => {
    const header = ['Full Name', 'User Name', 'User Gmail', 'Referal Code', 'Subscription'];

    const csvData = [header.join(',')].concat(
        rows.map(row => {
            const subscriptionValue = row.subscription !== null && typeof row.subscription !== 'undefined' ? row.subscription : '';
            return `${row.name},${row.calories},${row.fat},${row.carbs},${row.protein},${subscriptionValue}`;
        })
    ).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'user_data.csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};







function createData(id, name, calories, fat, carbs, protein, subscription) {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein,
        subscription
    };
}

const rows = [];


// const rows = [
//     createData(1, 'Haris', 305, 3.7, 67, 4.3),
//     createData(2, 'Haris', 452, 25.0, 51, 4.9),
//     createData(3, 'Haris', 262, 16.0, 24, 6.0),
//     createData(4, 'Haris', 159, 6.0, 24, 4.0),
//     createData(5, 'Haris', 356, 16.0, 49, 3.9),
//     createData(6, 'Haris', 408, 3.2, 87, 6.5),
//     createData(7, 'Haris', 237, 9.0, 37, 4.3),
//     createData(8, ' Haris ', 375, 0.0, 94, 0.0),
//     createData(9, 'Haris', 518, 26.0, 65, 7.0),
//     createData(10, 'Haris Lollipop', 392, 0.2, 98, 0.0),
//     createData(11, 'Hari', 318, 0, 81, 2.0),
//     createData(12, 'Harisi', 360, 19.0, 9, 37.0),
//     createData(13, 'Haris', 437, 18.0, 63, 4.0),
// ];




function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Full Name',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'User Name',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'User Gmail',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'Referal Code',
    },
    {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Subscription',
    },
];


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
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
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
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
                ))}
            </TableRow>
        </TableHead>
    );
}


EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

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
                    {/* User Data */}
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Block">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Download Spreadsheet" onClick={handleDownload}>
                    <IconButton>
                        <CloudDownloadIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
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
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
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
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                        <TableCell align="right">
                                            {row.subscription}
                                        </TableCell>
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

function Users() {


    useEffect(() => {

        axios.get('http://localhost:3005/api/usersubscription')
            .then(response => {
                const users = response.data;
                console.log(response.data)
                rows.length = 0;
                users.forEach((item) => {
                    // Assuming 'subscription' is a field in your user data
                    if (item.subscriptionData[0]) {
                        rows.push(createData(item._id, item.fullName, item.username, item.email, item.referalCode, item.subscriptionData[0].type))
                    }
                    else rows.push(createData(item._id, item.fullName, item.username, item.email, item.referalCode, "null"))
                })
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

    }, [])

    const rightContent = () => {
        return (
            <div>
                {/* <h1>User Data</h1> */}
                {/* <p>Musetool User Data Page</p> */}
                <div >
                    <EnhancedTable />
                </div>
            </div>
        );
    };

    return (
        <Grid container >
            {/* <Grid item xs={12} md={4} lg={2}>
                {leftSidebar()}
            </Grid> */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
                {rightContent()}
            </Grid>
        </Grid>
    );
}

export default Users;
