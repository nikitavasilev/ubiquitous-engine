import { useState, useEffect } from 'react';
import { Button, CardContent, CardMedia, Grid, Stack, CardActionArea, Card, Typography, Tooltip } from '@mui/material';
import MainCard from './mainCard';
import MintNftDialog from './mintNftDialog';
import RejectNftDialog from './rejectNftDialog';
import EditNftDialog from './editNftDialog';
import { Divider } from 'semantic-ui-react';
import { useTheme } from '@mui/material/styles';
import DetailsDialog from 'views/pages/brandAdmin/nftManagement/component/details';
import RejectEditNftDialog from './rejectEditRequest';
import ApproveEditNftDialog from './ApproveEditRequest';
const NftCard = ({ nftData, search, page, limit, type }) => {
  // console.log(nftData?.transferAddress, 'nftData=======>');
  const [loader, setLoader] = useState(false);
  const [openMint, setOpenMint] = useState(false);
  const [rejectMintOpen, setRejectMintOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [DetailsNftOpen, setDetailsNftOpen] = useState(false);
  const [editNftOpen, setEditNftOpen] = useState(false);
  const [image, setImage] = useState([]);
  const theme = useTheme();

  const [nftInfo, setNftInfo] = useState({
    id: null,
    brandId: null,
    nftName: '',
    nftDescription: '',
    nftPrice: 0,
    mintType: 'directMint',
    currencyType: 'USDT',
    fieldDataArray: [],
    fileDataArray: [],
    images: []
  });
  useEffect(() => {
    const length = nftData.asset.split('/').length;
    setImage([
      {
        image: { name: nftData.asset.split('/')[length - 1] },
        quantity: nftData.NFTTokens.length
      }
    ]);
  }, [nftData]);
  return (
    <>
      <EditNftDialog
        nftInfo={nftInfo}
        categoryId={nftData.Category.id}
        type={type}
        search={search}
        page={page}
        limit={limit}
        loader={loader}
        setLoader={setLoader}
        open={editNftOpen}
        setOpen={setEditNftOpen}
      />
      <RejectNftDialog
        nftData={nftData}
        type={type}
        search={search}
        page={page}
        limit={limit}
        loader={loader}
        setLoader={setLoader}
        open={rejectMintOpen}
        setOpen={setRejectMintOpen}
      />
      <RejectEditNftDialog
        nftData={nftData}
        type={type}
        search={search}
        page={page}
        limit={limit}
        loader={loader}
        setLoader={setLoader}
        open={rejectOpen}
        setOpen={setRejectOpen}
      />
      <ApproveEditNftDialog
        nftData={nftData}
        type={type}
        search={search}
        page={page}
        limit={limit}
        loader={loader}
        setLoader={setLoader}
        open={approveOpen}
        setOpen={setApproveOpen}
      />
      <MintNftDialog
        nftData={nftData}
        type={type}
        search={search}
        page={page}
        limit={limit}
        loader={loader}
        setLoader={setLoader}
        open={openMint}
        setOpen={setOpenMint}
      />
      <DetailsDialog nftData={nftData} open={DetailsNftOpen} setOpen={setDetailsNftOpen} />

      <MainCard
        className="tableShadow"
        content={false}
        boxShadow
        sx={{
          position: 'relative',
          '&:hover': {
            transform: 'scale3d(1.02, 1.02, 1)',
            transition: 'all .4s ease-in-out'
          }
        }}
      >
        <Card
          sx={{
            color: theme.palette.mode === 'dark' ? 'white' : '#404040',
            background: theme.palette.mode === 'dark' ? '#181C1F' : 'white',
            // maxWidth: nfts && nfts?.length > 3? 0 : 365,
            width: '100%',
            maxHeight: '410px',
            // boxShadow: '1px 2px 6px #d3d3d3',
            borderRadius: '3px',
            marginBottom: '10px',
            maxWidth: { xl: '100%' }
          }}
        >
          <CardActionArea>
            <CardMedia component="img" height="220" sx={{ objectFit: 'scale-down' }} image={nftData.asset} />

            <CardContent sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Tooltip placement="left" title={nftData.name}>
                    <Typography variant="subtitle1" className="fontstyling encap-nft" sx={{ textDecoration: 'none' }}>
                      {nftData?.name}
                    </Typography>
                  </Tooltip>
                </Grid>

                <Grid item xs={12} mt={-1.5}>
                  <Tooltip placement="left" title={nftData?.description}>
                    <Typography
                      className="fontstyling encap-nft"
                      variant="body1"
                      sx={{
                        overflow: 'hidden',
                        height: 16
                      }}
                    >
                      {nftData.description}
                    </Typography>
                  </Tooltip>
                </Grid>

                <Grid item xs={12} sm={4} md={6} lg={6}>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      {nftData.price} {nftData.currencyType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6">{nftData.NFTTokens.length} Items</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4} md={6}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      marginRight: '10px',
                      float: 'right',
                      ':hover': {
                        boxShadow: 'none'
                      },
                      color: '#2F5AFF',
                      background: '#B9DDFF'
                    }}
                    onClick={() => {
                      setDetailsNftOpen(true);
                    }}
                  >
                    Details
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Stack direction="row" justifyContent="start" alignItems="center">
                    {/*  {nftData.status == 'MINTED' && (
                                    <>
                                        <Button
                                            className="fontstyling"
                                            variant="contained"
                                            color="primary"
                                            sx={{ marginRight: '5px' }}
                                            onClick={() => {
                                                setEditNftOpen(true);
                                                setNftInfo({
                                                    id: nftData.id,
                                                    brandId: nftData.Brand.id,
                                                    nftName: nftData.name,
                                                    nftDescription: nftData.description,
                                                    nftPrice: nftData.price,
                                                    mintType: nftData.mintType,
                                                    currencyType: nftData.currencyType,
                                                    fieldDataArray: nftData.NFTMetaData,
                                                    fileDataArray: nftData.NFTMetaFiles,
                                                    images: image
                                                });
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </>
                                )} */}
                    {nftData.status == 'REQUESTED' && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: '5px' }}
                        onClick={() => {
                          setRejectMintOpen(true);
                        }}
                      >
                        Reject
                      </Button>
                    )}

                    {nftData.status == 'REQUESTED' && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: '5px' }}
                        onClick={() => {
                          setOpenMint(true);
                        }}
                      >
                        Mint
                      </Button>
                    )}
                    {nftData.editStatus == 'temp' && nftData?.isEditable == true && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: '5px' }}
                        onClick={() => {
                          setRejectOpen(true);
                        }}
                      >
                        Reject
                      </Button>
                    )}
                    {nftData.editStatus == 'temp' && nftData?.isEditable == true && (
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: '5px' }}
                        onClick={() => {
                          setApproveOpen(true);
                        }}
                      >
                        Approve
                      </Button>
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </MainCard>
    </>
  );
};

export default NftCard;
