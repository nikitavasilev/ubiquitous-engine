import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, CardContent, CardMedia, Grid, Stack, Typography, CardActionArea, Card, Tooltip } from '@mui/material';
import MainCard from './mainCard';
import EditNftDialog from './editNftDialog';
import RequestForMintDialog from './requestForMintDialog';
import DeleteNFTDialog from './deleteNftDialog';
import DetailsDialog from './details';
import { useTheme } from '@mui/material/styles';
import EditRequestDialog from './editRequestNftDialog';
import { useEffect } from 'react';
import { cloneDeep } from 'lodash';
const NftCard = ({ nftData, categoryId, search, page, limit, type }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const theme = useTheme();
  // console.log(nftData?.isEditable, 'nftData=====================================>>>>>>');

  const [openRequestMint, setOpenRequestMint] = useState(false);
  const [editNftOpen, setEditNftOpen] = useState(false);
  const [editNftRequestOpen, setEditRequestNftOpen] = useState(false);
  const [editable, seteditable] = useState(false);
  const [deleteNftOpen, setDeleteNftOpen] = useState(false);
  const [DetailsNftOpen, setDetailsNftOpen] = useState(false);
  const [image, setImage] = useState([]);
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
  const [nftReqInfo, setNftReqInfo] = useState({
    id: null,
    brandId: null,
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
      <DeleteNFTDialog
        nftInfo={nftInfo}
        categoryId={categoryId}
        type={type}
        search={search}
        page={page}
        limit={limit}
        loader={loader}
        setLoader={setLoader}
        open={deleteNftOpen}
        setOpen={setDeleteNftOpen}
      />
      <EditNftDialog
        nftInfo={cloneDeep(nftInfo)}
        categoryId={categoryId}
        type={type}
        search={search}
        page={page}
        limit={limit}
        loader={loader}
        setLoader={setLoader}
        open={editNftOpen}
        setOpen={setEditNftOpen}
      />
      <EditRequestDialog
        nftInfo={cloneDeep(nftInfo)}
        categoryId={categoryId}
        type={type}
        search={search}
        page={page}
        limit={limit}
        loader={loader}
        setLoader={setLoader}
        open={editNftRequestOpen}
        setOpen={setEditRequestNftOpen}
      />
      <RequestForMintDialog
        nftData={nftData}
        categoryId={categoryId}
        type={type}
        search={search}
        page={page}
        limit={limit}
        loader={loader}
        setLoader={setLoader}
        open={openRequestMint}
        setOpen={setOpenRequestMint}
      />
      <DetailsDialog open={DetailsNftOpen} setOpen={setDetailsNftOpen} nftData={nftData} />
      <MainCard
        content={false}
        className="tableShadow"
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
            maxWidth: 345,
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
                <Grid item xs={9}>
                  <Tooltip placement="left" title={nftData.name}>
                    <Typography
                      variant="subtitle1"
                      className="fontstyling encap-nft"
                      sx={{ textDecoration: 'none', textTransform: 'capitalize' }}
                    >
                      {nftData.name}
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
                        height: 16,
                        textTransform: 'capitalize'
                      }}
                    >
                      {nftData.description}
                    </Typography>
                  </Tooltip>
                </Grid>

                <Grid item xs={6}>
                  <Grid item xs={12}>
                    <Typography variant="h6" className="fontstyling">
                      {nftData?.price} {nftData?.currencyType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" className="fontstyling">
                      {nftData.NFTTokens.length} Items
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="end" alignItems="center">
                    {nftData.status !== 'MINTED' && nftData.status !== 'REQUESTED' && (
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
                        <Button
                          className="fontstyling"
                          variant="contained"
                          color="primary"
                          sx={{ marginRight: '5px' }}
                          onClick={() => {
                            setDeleteNftOpen(true);
                            setNftInfo({
                              id: nftData.id,
                              nftName: nftData.name,
                              nftDescription: nftData.description,
                              nftPrice: nftData.price,
                              mintType: nftData.mintType,
                              currencyType: nftData.currencyType,
                              fieldDataArray: nftData.NFTMetaData,
                              images: image
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                    {nftData?.status == 'MINTED' && nftData?.isEditable == true && (
                      <>
                        <Button
                          className="fontstyling"
                          variant="contained"
                          color="primary"
                          sx={{ marginRight: '5px' }}
                          onClick={() => {
                            setEditRequestNftOpen(true);
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
                          Edit Request
                        </Button>
                      </>
                    )}

                    {(nftData.status == 'DRAFT' || nftData.status == 'REJECTED') && (
                      <Button
                        className="fontstyling"
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: '5px' }}
                        onClick={() => {
                          setOpenRequestMint(true);
                        }}
                      >
                        Request
                      </Button>
                    )}
                    {/*     {(nftData.status == 'MINTED') && (
                                    <Button
                                    className='fontstyling'
                                        variant="contained"
                                        color="primary"
                                        sx={{ marginRight: '5px' }}
                                     
                                    >
                                       Edit Request
                                    </Button>
                                )} */}
                  </Stack>
                  <Stack direction="row" justifyContent="end" alignItems="center"></Stack>
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
