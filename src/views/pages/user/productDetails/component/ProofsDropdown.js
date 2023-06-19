import React, { useState } from 'react';
import { Stack } from '@mui/system';
import linkIcon from 'assets/images/link.png';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ProofsDropdown = ({ proofs }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Accordion expanded={open} onChange={() => setOpen(!open)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: '#2F53FF', height: '30px', width: '30px' }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderBottom: open ? '1px solid' : 'none', minHeight: '50px !important' }}
        >
          <Typography>PROOF OF AUTHENTICITY</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            maxHeight: '140px',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.1)',
              outline: '1px solid slategrey',
            },
          }}
        >
          {proofs && proofs.length
            ? proofs.map((item) => {
                return (
                  <Stack sx={{ marginTop: '0.5em', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography>{item?.fieldName}</Typography>
                    <Typography
                      sx={{ color: '#2F53FF', cursor: 'pointer' }}
                      onClick={() => {
                        window.open(item.fieldValue, '_blank', 'noopener,noreferrer');
                      }}
                    >
                      View Certificates
                      <img src={linkIcon} alt="open link" style={{ paddingLeft: '5px' }} />
                    </Typography>
                  </Stack>
                );
              })
            : ''}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
