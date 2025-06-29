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

function createData(
  id: number,
  name: string,
  level: number,
  country: string,
  profitableEfficiency: number,
  annulRevenue: number,
  employees: number,
) {
  return {
    id,
    name,
    level,
    country,
    profitableEfficiency,
    annulRevenue,
    employees,
    branch: [
      // {
      //   city: 'Shenzhen',
      //   foundedYear: '2005',
      //   annualRevenue: '1.5B',
      //   empolyees: 5000,
      // },
      // {
      //   city: 'Hong Kong',
      //   foundedYear: '2010',
      //   annualRevenue: '1.2B',
      //   empolyees: 4000,
      // },
    ],
  };
}

function createBranchData(
  companyId: number,
  city: string,
  foundedYear: string,
  annualRevenue: string,
  empolyees: number,
) {
    return { 
      companyId, 
      city, 
      foundedYear, 
      annualRevenue, 
      empolyees, 
    };
  }


const rows = [
  createData(1000001, 'Company A', 1, 'CHINA', 0.88, 10, 6000),
  createData(1000002, 'Company B', 2, 'USA', 0.70, 11, 6000),
  createData(1000003, 'Company C', 3, 'Australia', 12, 10, 5000),
  createData(1000004, 'Company D', 4, 'Canada', 0.8, 13, 4000),
  createData(1000005, 'Company E', 5, 'India', 0.7, 9, 8000),
];

const branches = [
  createBranchData(1000001, 'Shenzhen', '2005', '5B', 5000),
  createBranchData(1000001, 'Hong Kong', '2010', '5B', 4000),
  createBranchData(1000002, 'New York', '2012', '5B', 6000),
  createBranchData(1000002, 'Los Angeles', '2015', '6B', 5500),
  createBranchData(1000003, 'Sydney', '2008', '6B', 4500),
  createBranchData(1000003, 'Melbourne', '2011', '6B', 4000),
  createBranchData(1000004, 'Toronto', '2006', '6B', 5000),
  createBranchData(1000004, 'Vancouver', '2009', '7B', 4800),
  createBranchData(1000005, 'Mumbai', '2013', '6B', 7000),
  createBranchData(1000005, 'Bangalore', '2016', '3B', 6000),
];



function Row(props: { row: ReturnType<typeof createData>, branch: ReturnType<typeof createBranchData>[] }) {
  const { row, branch } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.level}</TableCell>
        <TableCell align="right">{row.country}</TableCell>
        <TableCell align="right">{row.profitableEfficiency}</TableCell>
        <TableCell align="right">{row.annulRevenue}</TableCell>
        <TableCell align="right">{row.employees}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Branch
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell>Founded Year</TableCell>
                    <TableCell align="right">Annual Revenue ($)</TableCell>
                    <TableCell align="right">Empolyees</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {branch.map((branchRow) => (
                    <TableRow key={branchRow.city}>
                      <TableCell component="th" scope="row">
                        {branchRow.city}
                      </TableCell>
                      <TableCell>{branchRow.foundedYear}</TableCell>
                      <TableCell align="right">{branchRow.annualRevenue}</TableCell>
                      <TableCell align="right">{branchRow.empolyees}</TableCell>
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
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Level</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Profitable Efficiency</TableCell>
            <TableCell align="right">Annual Revenue (Billion $)</TableCell>
            <TableCell align="right">Employees</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.id}
              row={row}
              branch={branches.filter(b => b.companyId === row.id)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
