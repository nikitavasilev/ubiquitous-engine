import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NFTAbi from '../../../../../contractAbi/NFT.json';
import { ethers, utils } from 'ethers';
import FileInput from 'shared/component/FileInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// material-ui
import {
    AppBar,
    DialogActions,
    Dialog,
    Button,
    InputLabel,
    InputAdornment,
    IconButton,
    Input,
    DialogContent,
    DialogTitle,
    TextField,
    Divider,
    Grid,
    List,
    Slide,
    Toolbar,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { updateProperty } from 'redux/brand/actions';
// assets
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/axios';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { create } from 'ipfs-http-client';
const projectId = '2GGvNmnqRYjnz7iJU9Kn6Nnw97C';
const projectSecret = 'a09de1e8b20292cd87460290de554003';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth
    }
});

// slide animation
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

// ===============================|| UI DIALOG - FULL SCREEN ||=============================== //

export default function Edit({ open, setOpen, metadata, value, id, editable, proofRequired, nftList }) {
    console.log('metadata, value, nft, id, editable, proofRequired',metadata, value);
    const [loader, setLoader] = useState(false);
    const theme = useTheme();
    const nftid = nftList?.nft?.id;
    const [file, setFile] = useState('');
    // console.log('nftid==========??', nftid);
    const user = useSelector((state) => state?.auth?.user);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    // console.log(metadata, 'metadata', value, 'value');
    const validationSchema = Yup.object({
        // isUpdate: Yup.boolean().default(isUpdate),
        firstName: Yup.string().required('First Name is required!').max(25, 'First Name can not exceed 20 characters'),
        // .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid First name'),
        lastName: Yup.string().required('Last Name is required!').max(25, 'Last Name can not exceed 20 characters')
        // .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid Last name'),
        // file: Yup.mixed().required('File is required!')
        // .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid Last name'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: { firstName: metadata, lastName: value, file: '' },
        // brandAdminData,
        validationSchema,
        onSubmit: async (values) => {
            let fileUrl = '';
            // console.log(values, 'allll data');
            setLoader(true);

            setTimeout(() => {
                const singleNft = async () => {
                    let data = values.file;

                    // const uploadToIPFS = async (data) => {
                    const fileResult = await client.add(data);
                    //     return `https://galileoprotocol.infura-ipfs.io/ipfs/${result.path}`

                    //     // console.log("fileUrlfrom result", fileUrl)
                    //   }

                    let fileUrl = `https://galileoprotocol.infura-ipfs.io/ipfs/${fileResult.path}`;

                    let image = nftList.nft.ipfsUrl;
                    let price = nftList.nft.price;
                    let name = nftList.nft.name;
                    let description = nftList.nft.description;
                    let projectName = 'Galelio';
                    // let mintedDate = nftList.nft.;
                    let categoryName = nftList.nft.Category.name;
                    let brandName = nftList.nft.Brand.name;
                    let metaData = nftList.nft.NFTMetaData;
                    let poa = nftList.nft.NFTMetaFiles;
                    let external_url = nftList.nft.NFTMetaFiles[0].value;

                    let attributes = [];

                    for (let i = 0; i < nftList.nft.NFTMetaData.length; i++) {
                        attributes.push({
                            trait_type: nftList.nft.NFTMetaData[i].trait_type,
                            value: nftList.nft.NFTMetaData[i].value
                        });
                    }

                    attributes.push({
                        trait_type: values.firstName,
                        value: values.lastName,
                        proof: fileUrl
                    });

                    console.log('attributes', attributes);

                    const result = await client.add(
                        JSON.stringify({
                            projectName,
                            brandName,
                            categoryName,
                            image,
                            name,
                            description,
                            price,
                            // mintedDate,
                            attributes,
                            poa,
                            external_url
                        })
                    );
                    console.log('result ipfs', result);

                    const tokenUri = `https://galileoprotocol.infura-ipfs.io/ipfs/${result.path}`;

                    console.log('tokenUri after result', tokenUri);

                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const address = await signer.getAddress();
                    const nft = new ethers.Contract(nftList?.nft?.contractAddress, NFTAbi.abi, signer);
                    await // await nft.updateUri(nftList.nft?.NFTTokens[0].tokenId, nftList.nft?.tokenUri).catch((error) => {
                    (
                        await nft.updateUri(nftList.nft?.NFTTokens[0].tokenId, tokenUri).catch((error) => {
                            toast.error(error.reason);
                            //  setLoader(false);
                            //  setOpen(false);
                            console.log(error);
                        })
                    )
                        .wait()
                        .then((data) => {
                            // console.log('im in .then');

                            dispatch(
                                updateProperty({
                                    id: id,
                                    walletAddress: user?.walletAddress,
                                    NFTTokenId: nftList.nft?.NFTTokens[0].id,
                                    NftId: nftid,
                                    nftid: nftid,
                                    trait_type: values?.firstName,
                                    value: values?.lastName,
                                    file: values?.file,
                                    // navigate: navigate,
                                    handleClose: handleClose
                                })
                            );

                            // navigate('/creatorProfile');
                        })
                        .catch((error) => {
                            console.log(error);
                            toast.error(error.reason);
                            setLoader(false);
                        });
                };

                singleNft();
            }, 2000);
        }
    });

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setLoader(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <Dialog
                open={open}
                // onClose={handleClose}
                TransitionComponent={Transition}
                sx={{ width: '80%', margin: '0 auto', maxHeight: '500px' }}
            >
                {/*    <IconButton float="left" color="inherit" onClick={handleClose} aria-label="close" size="large">
                    <CloseIcon />
                </IconButton> */}

                <DialogActions sx={{ pr: 2.5 }}>
                    <Button
                        className="buttonSize"
                        size="large"
                        sx={{ color: theme.palette.error.dark }}
                        onClick={handleClose}
                        color="secondary"
                    >
                        <CloseIcon />
                    </Button>
                </DialogActions>
                <Grid container sx={{ pr: 2.5, pl: 2.5 }}>
                    <Grid item xs={12} md={12} lg={12} sx={{ p: 2.5 }}>
                        <form noValidate onSubmit={formik.handleSubmit} id="validation-forms">
                            <Grid container>
                                <Grid item xs={12} md={12} lg={12}>
                                    <InputLabel htmlFor="outlined-adornment-password-login" className="textfieldStyle">
                                        Metadata Name
                                    </InputLabel>
                                    <TextField
                                        className="field"
                                        id="firstName"
                                        name="firstName"
                                        value={metadata}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} pt={2} pb={2} md={12} lg={12}>
                                    <InputLabel htmlFor="outlined-adornment-password-login" className="textfieldStyle">
                                        Metadata Value
                                    </InputLabel>
                                    <TextField
                                        pt={2}
                                        className="field"
                                        id="lastName"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        fullWidth
                                        variant="standard"
                                    />
                                </Grid>
                                {proofRequired == true && (
                                    <Grid item xs={12} pt={1} pb={2} md={12} lg={12}>
                                        <InputLabel htmlFor="outlined-adornment-password-login" className="textfieldStyle">
                                            Add Proof
                                        </InputLabel>
                                        <Grid ml={-2} item xs={12} md={12} lg={12}>
                                            <FileInput
                                                className="textfieldStyle"
                                                formik={formik}
                                                accept=".pdf"
                                                fieldName="file"
                                                placeHolder="Add File"
                                                variant="standard"
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                {loader ? (
                    <DialogActions sx={{ mt: -4, pr: 2.5 }}>
                        <CircularProgress sx={{ color: 'blue', ml: 3 }} />
                    </DialogActions>
                ) : (
                    <>
                        <DialogActions sx={{ mt: -4, pr: 2.5 }}>
                            <Button
                                variant="outlined"
                                className="buttonSize"
                                size="large"
                                type="submit"
                                sx={{ color: theme.palette.success.dark }}
                                onClick={() => {
                                    formik.handleSubmit();
                                }}
                                color="secondary"
                            >
                                Update
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
}
