'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';

function createBranchData(companyId: number) {
  // 生成2条dummy分支数据
  return [
    {
      companyId,
      city: 'Dummy City A',
      foundedYear: '2000',
      annualRevenue: Math.floor(Math.random() * 100000 + 10000).toString(),
      employees: Math.floor(Math.random() * 500 + 50),
    },
    {
      companyId,
      city: 'Dummy City B',
      foundedYear: '2010',
      annualRevenue: Math.floor(Math.random() * 100000 + 10000).toString(),
      employees: Math.floor(Math.random() * 500 + 50),
    },
  ];
}

function Row(props: { row: any }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const branches = createBranchData(Number(row.id));

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {row.name}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.level}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.country}</TableCell>
        <TableCell align="right">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 36,
              width: '100%',
              background: `
                radial-gradient(ellipse at 30% 50%, ${
                  Number(row.profitableEffiieny || row.profitableEfficiency) > 200
                    ? 'rgba(76,175,80,0.4)'
                    : 'rgba(244,67,54,0.4)'
                } 60%, transparent 100%),
                radial-gradient(ellipse at 70% 50%, ${
                  Number(row.profitableEffiieny || row.profitableEfficiency) > 200
                    ? 'rgba(139,195,74,0.3)'
                    : 'rgba(229,57,53,0.3)'
                } 60%, transparent 100%)
              `,
              borderRadius: '18px',
              minWidth: 80,
            }}
          >
            <Typography align="center" sx={{ width: '100%', fontWeight: 500 }}>
              {row.profitableEffiieny || row.profitableEfficiency || ''}
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.annualRevenue}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.employees}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.city}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{row.founded_year}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Branch
              </Typography>
              <Table size="small" aria-label="branches">
                <TableHead>
                  <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell>Founded Year</TableCell>
                    <TableCell align="right">Annual Revenue ($)</TableCell>
                    <TableCell align="right">Employees</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {branches.map((branch, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{branch.city}</TableCell>
                      <TableCell>{branch.foundedYear}</TableCell>
                      <TableCell align="right">{branch.annualRevenue}</TableCell>
                      <TableCell align="right">{branch.employees}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CompaniesTable() {
  const [rows, setRows] = React.useState<any[]>([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    fetch('/api/companies')
      .then(res => res.json())
      .then(data => {
        setRows(data);
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={{ textAlign: 'center' }}>Name</TableCell>
              <TableCell align="center">Level</TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Profitable Efficiency</TableCell>
              <TableCell align="center">Annual Revenue</TableCell>
              <TableCell align="center">Employees</TableCell>
              <TableCell align="center">City</TableCell>
              <TableCell align="center">Founded Year</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => (
                <Row key={idx + page * rowsPerPage} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}