import { Grid , Typography} from '@mui/material';
import { gridSpacing } from 'store/constant';
import NftCard from '../../commonComponent/nftCard';
const NFTS = ({ marketplaceNfts }) => {
    return (
        <Grid container-fluid spacing={gridSpacing} sx={{ paddingRight: '0%' }}>
            <Grid item xs={12}>
                {marketplaceNfts?.nfts?.rows.length > 0 ? (
                    <Grid container justifyContent="left" spacing={gridSpacing} sx={{ mt: 2, textAlign: 'center', 
                    paddingRight: '1%' }}>
                        {marketplaceNfts?.nfts?.rows.map((item) => (
                            <NftCard data={item} />
                        ))}
                    </Grid>
                ) : (
                    <>
                    <Grid item xs={12}>
                    <Typography
                    className='fontfamily'
                        variant="h3"
                       
                        component="div"
                        sx={{  mt:{md:8 , lg:8} , textAlign: { xs: 'center', md: 'center', sm: 'center', color: ' #9498AA' },
                          }}
                    >
                    There are currently no products in this category.
                    </Typography>
                </Grid>
                    </>
                )}
            </Grid>
        </Grid>
    );
};

export default NFTS;
