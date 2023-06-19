import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import map from 'assets/images/map.png';
import Form from './googleMap';
import History2 from './history2';
import History1 from './history1';
import History3 from './History3';
import Attribute from './attribute';
import { Pagination } from '@mui/material';

const trackAtribute = ({ tracking , serialId }) => {
    const theme = useTheme();
    // console.log(tracking, 'marketplaceNfts in track Attribute');

    // console.log("tracking", tracking);

    const basicData = [
        {
            id: 'basic1',
            title: 'Attribute'
        }
    ];
    const history1 = [
        {
            id: 'basic1',
            title: 'History 1'
        }
    ];
    const history2 = [
        {
            id: 'basic1',
            title: 'History 2'
        }
    ];
    const history3 = [
        {
            id: 'basic1',
            title: 'History 3'
        }
    ];
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };
    const cardsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = tracking?.historyArray?.slice(indexOfFirstCard, indexOfLastCard);
    const filterLocation = tracking.nft.NFTMetaData.find((d) => d.display_type === "Location" && d.primaryLocation === true)

    return (
        <Grid container-fluid spacing={gridSpacing} sx={{ margin: '0 15px' }}>
            <Grid container>
                <Grid item xs={12} sm={6} md={6} sx={{ padding: '0 15px 0 02px' }}>
                    <Grid item xs={12} md={12}>
                        <Attribute tracking={tracking} data={basicData} serialId={serialId}/>
                    </Grid>
                    {tracking != undefined &&
                        tracking?.historyArray &&
                        currentCards.map((card) => (
                            <Grid mt={2} mb={2} item xs={12} md={12}>
                                <History1
                                    tracking={card?.historyArray}
                                    updater={card?.updator}
                                    blockTimestamp={card?.blockTimestamp}
                                    Proof={card?.proofOfAuthenticityArray}
                                    data={history1}
                                    history={card?.historyNo}
                                />
                            </Grid>
                        ))}
                   {tracking?.historyArray?.length > 5 && <Pagination sx={{float:'right'}}
                        count={Math.ceil(tracking?.historyArray?.length / cardsPerPage)}
                        onChange={(event, value) => setCurrentPage(value)}
                        page={currentPage}
                    />
                   }
                    {/*   <Grid mt={2} item xs={12} md={12}>
                        <History2   tracking={tracking} data={history2}/>
                    </Grid>
                  <Grid mt={2} item xs={12} md={12}>
                        <History3   tracking={tracking} data={history3}/>
                    </Grid> */}
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                <Form location={filterLocation} />

                </Grid>
            </Grid>
        </Grid>
    );
};
export default trackAtribute;
