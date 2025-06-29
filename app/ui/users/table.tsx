'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';



export default function UsersTable() {
    const [rows, setRows] = React.useState([
    { id: 1, name: 'John Snow', title: 'Manager', status: 'working' },
    { id: 2, name: 'Arya Stark', title: 'Developer', status: 'working' },
    { id: 3, name: 'Sansa Stark', title: 'Designer', status: 'on leave' },
    { id: 4, name: 'Tyrion Lannister', title: 'Analyst', status: 'working' },
    { id: 5, name: 'Cersei Lannister', title: 'CEO', status: 'working' },
    { id: 6, name: 'Jaime Lannister', title: 'CTO', status: 'on leave' },
  ]);
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any>(null);
  const [formValues, setFormValues] = React.useState({ name: '', title: '', status: '' });


  const handleClickOpen = (row: any) => {
    setSelectedRow(row);
    setFormValues({ name: row.name, title: row.title, status: row.status });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedRow) {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === selectedRow.id ? { ...row, ...formValues } : row
        )
      );
    }
    handleClose();
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'title', headerName: 'Title', width: 150, editable: true },
    { field: 'status', headerName: 'Status', width: 110, editable: true },
    {
      field: 'actions',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClickOpen(params.row)}
          sx={{ minWidth: 0, padding: '4px' }}
        >
          <EditRoundedIcon fontSize="small" />
        </Button>
      ),
    },
    {
      field: 'moreActions',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={(e) => handleMoreActionClick(e, params.row)}
          sx={{ minWidth: 0, padding: '4px' }}
        >
          <MoreHorizRoundedIcon fontSize="small" />
        </Button>
      ),
    },
  ];

  // Popover部分
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [moreActionRow, setMoreActionRow] = React.useState<any>(null);

  const handleMoreActionClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: any
  ) => {
    setAnchorEl(event.currentTarget);
    setMoreActionRow(row);
  };

  const handleMoreActionPopClose = () => {
    setAnchorEl(null);
    setMoreActionRow(null);
  };

  const handleDeleteRow = () => {
    if (moreActionRow) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== moreActionRow.id));
    }
    handleMoreActionPopClose();
  };

  const handleEditFromPopover = () => {
    if (moreActionRow) {
      handleClickOpen(moreActionRow);
    }
    handleMoreActionPopClose();
  };

  const openMoreActionPop = Boolean(anchorEl);
  const id = openMoreActionPop ? 'simple-popover' : undefined;



  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      {/* Edit的Popover */}
      <Popover
        id={id}
        open={openMoreActionPop}
        anchorEl={anchorEl}
        onClose={handleMoreActionPopClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', minWidth: 120}}>
          <Button
            onClick={handleEditFromPopover}
            sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
          >
            Edit
          </Button>
          <Button
            color="error"
            onClick={handleDeleteRow}
            sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
          >
            Delete
          </Button>
        </Box>
      </Popover>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleFormSubmit,
          },
        }}
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit user information
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={formValues.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="status"
            name="status"
            label="Status"
            type="text"
            fullWidth
            variant="standard"
            value={formValues.status}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

