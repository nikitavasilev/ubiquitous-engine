import { forwardRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { addSubAdmin, updateSubAdmin } from 'redux/subAdmin/actions';
import NFTAbi from '../../../../../contractAbi/NFT.json';
import { ethers } from 'ethers';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
    Button,
    InputLabel,
    Dialog,
    DialogActions,
    DialogContent,
    OutlinedInput,
    DialogTitle,
    Slide,
    Typography,
    TextField,
    Divider,
    Grid,
    Input,
    MenuItem,
    InputAdornment,
    IconButton,
    CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function AddUpdateSubAdminDialog({ open, setOpen, subAdminData, page, limit, search, setSubAdminData }) {
    const dispatch = useDispatch();
    console.log(subAdminData.walletAddress, 'subAdminData>');
    const [isUpdate, setIsUpdate] = useState(false);
    const [contractAddress, setContractAddress] = useState('');
    const [brandCategoryId, setBrandCategoryId] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [loader, setLoader] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const blockChainRole = '0xd2e4c2619ea6e0faebc405d89445161c041e30fe03373ea0473da142d57d4514';

    useEffect(() => {
        if (subAdminData.id == null) {
            setIsUpdate(false);
        } else {
            setIsUpdate(true);
        }
    }, [subAdminData]);

    const handleBrandCategoryChange = (e) => {
        setContractAddress(e.target.value.contractAddress);
        setBrandCategoryId(e.target.value.id);
    };

    const validationSchema = Yup.object({
        isUpdate: Yup.boolean().default(isUpdate),
        firstName: Yup.string().required('First Name is required!').max(42, 'First Name can not exceed 42 characters'),
        // .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid First name'),
        lastName: Yup.string().required('Last Name is required!').max(42, 'Last Name can not exceed 42 characters'),
        // .matches(/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/, 'Invalid Last name'),
        adminEmail: Yup.string().email('Enter valid email').max(255).required('Email is required!'),
        walletAddress: Yup.string().required('Wallet Address is required!'),
        adminPassword: Yup.mixed().when(['isUpdate'], {
            is: false,
            then: Yup.string()
                .required('Password is required!')
                .matches(
                    /^(?=(?:.*[A-Z].*){1})(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    'Must Contain 8 Characters,  One Uppercase, One Lowercase, One Number and one special case Character'
                )
            // otherwise: Yup.string().matches(
            //     /^(?=(?:.*[A-Z].*){1})(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            //     'Must Contain 8 Characters,  One Uppercase, One Lowercase, One Number and one special case Character'
            // )
        })
    });

    const grantRole = async () => {};
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: subAdminData,
        validationSchema,
        onSubmit: async (values) => {
            console.log('contractAddress', contractAddress);

            if (subAdminData.id == null) {
                if (brandCategoryId == 0) {
                    toast.error('Please choose a category');
                } else {
                    setLoader(true);
                    //    toast.success("Please wait for confirmation Transaction !");
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();

                    const nfts = new ethers.Contract(contractAddress, NFTAbi.abi, signer);
                    // const admin="0x6f3B51bd5B67F3e5bca2fb32796215A796B79651";

                    let mintedNFT = await (
                        await nfts.grantRole(blockChainRole, values.walletAddress).catch((error) => {
                            toast.error(`${error.reason}`);
                            setLoader(false);
                            setOpen(false);
                        })
                    ).wait();
                    console.log('hello');
                    dispatch(
                        addSubAdmin({
                            firstName: values.firstName,
                            lastName: values.lastName,
                            email: values.adminEmail,
                            password: values.adminPassword,
                            walletAddress: values.walletAddress,
                            brandCategory: brandCategoryId,
                            hasMintingAccess: true,
                            page: page,
                            limit: limit,
                            search: search,
                            handleClose: handleClose
                        })
                    );
                }
            } else {
                dispatch(
                    updateSubAdmin({
                        id: subAdminData.id,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.adminEmail,
                        password: values.adminPassword,
                        walletAddress: subAdminData.walletAddress,
                        page: page,
                        limit: limit,
                        search: search,
                        handleClose: handleClose
                    })
                );
            }
        }
    });

    const handleClose = () => {
        setOpen(false);
        setLoader(false);
        setSubAdminData({
            id: null,
            firstName: '',
            lastName: '',
            adminEmail: '',
            adminPassword: '',
            walletAddress: '',
            role: '',
            isActive: '',
            walletAddress: ''
        });
        formik.resetForm();
    };
    const { brandCategories } = useSelector((state) => state.brandCategoryReducer.brandCategoriesAdminList);

    return (
        <>
            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="form-dialog-title"
                className="adminDialog dialog"
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="form-dialog-title" className="adminname">
                    {subAdminData.id == null ? 'Create Admin' : ' Update Admin'}
                </DialogTitle>

                <DialogContent>
                    <form noValidate onSubmit={formik.handleSubmit} id="validation-forms">
                        <Grid container>
                            <>
                                <Grid item xs={12} md={12} lg={12}>
                                    <InputLabel className="textfieldStyle" htmlFor="outlined-adornment-password-login">
                                        First Name
                                    </InputLabel>

                                    <TextField
                                        className="field"
                                        id="firstName"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                        fullWidth
                                        variant="standard"
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} pt={2}>
                                    <InputLabel className="textfieldStyle" htmlFor="outlined-adornment-password-login">
                                        Last Name
                                    </InputLabel>
                                    <TextField
                                        className="field"
                                        id="lastName"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} pt={2}>
                                    <InputLabel className="textfieldStyle" htmlFor="outlined-adornment-password-login">
                                        Email
                                    </InputLabel>
                                    <TextField
                                        className="field"
                                        variant="standard"
                                        id="adminEmail"
                                        name="adminEmail"
                                        value={formik.values.adminEmail}
                                        onChange={formik.handleChange}
                                        error={formik.touched.adminEmail && Boolean(formik.errors.adminEmail)}
                                        helperText={formik.touched.adminEmail && formik.errors.adminEmail}
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12} md={12} lg={12} pt={2}>
                                    <InputLabel className="textfieldStyle" htmlFor="standard-adornment-password">
                                        Password
                                    </InputLabel>
                                    <Input
                                        className="field"
                                        id="standard-adornment-password adminPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        name="adminPassword"
                                        value={formik.values.adminPassword}
                                        onChange={formik.handleChange}
                                        error={formik.touched.adminPassword && Boolean(formik.errors.adminPassword)}
                                        helperText={formik.touched.adminPassword && formik.errors.adminPassword}
                                        fullWidth
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </Grid>

                                {subAdminData?.id == null && (
                                    <>
                                        <Grid item xs={12} md={12} lg={12} pt={2}>
                                            <InputLabel className="textfieldStyle" htmlFor="">
                                                Wallet Address
                                            </InputLabel>
                                            <TextField
                                                className="field"
                                                variant="standard"
                                                id="walletAddress"
                                                name="walletAddress"
                                                value={formik.values.walletAddress}
                                                onChange={formik.handleChange}
                                                error={formik.touched.walletAddress && Boolean(formik.errors.walletAddress)}
                                                helperText={formik.touched.walletAddress && formik.errors.walletAddress}
                                                fullWidth
                                                autoComplete=""
                                            />
                                        </Grid>
                                        <Grid item xs={6} md={12} lg={12} pt={2}>
                                            <InputLabel className="textfieldStyle" htmlFor="">
                                                Select Category
                                            </InputLabel>
                                            <TextField
                                                variant="standard"
                                                className="responsiveSelectfield textfieldStyle field"
                                                id="outlined-select-budget"
                                                select
                                                fullWidth
                                                // label="Select Category"
                                                // value={category}
                                                onChange={handleBrandCategoryChange}
                                            >
                                                {brandCategories?.map((data, index) => (
                                                    <MenuItem key={index} value={data}>
                                                        {data.Category.name} ({data.Brand.name})
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </>
                                )}
                            </>
                        </Grid>
                    </form>
                </DialogContent>
                <Divider />
                {loader ? (
                    <DialogActions sx={{ display: 'block', margin: '10px 5px 0px 5px' }}>
                        <Grid container justifyContent="center" sx={{ width: '50%', m: '15px auto ' }}>
                            <Grid item>
                                <CircularProgress disableShrink size={'4rem'} />
                            </Grid>
                        </Grid>

                        <Button
                            className="buttons"
                            variant="Text"
                            sx={{ width: '100%', margin: '0px 0px 10px 0px', color: '#2196f3' }}
                            size="large"
                        >
                            Admin is being Created...
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions sx={{ display: 'block', margin: '10px 10px 0px 20px' }}>
                        <AnimateButton>
                            <Button
                                className="buttons"
                                variant="contained"
                                sx={{
                                    width: '92%',
                                    margin: '0px 0px 10px 8px',
                                    background: 'linear-gradient(97.63deg, #2F57FF 0%, #2FA3FF 108.45%)'
                                }}
                                type="submit"
                                size="large"
                                disableElevation
                                onClick={() => {
                                    formik.handleSubmit();
                                }}
                            >
                                {subAdminData.id == null ? 'Create ' : 'Update '}
                            </Button>
                        </AnimateButton>
                        <AnimateButton>
                            <Button
                                className="buttons"
                                variant="outlined"
                                sx={{ width: '95%', margin: '0px 0px 10px 0px', color: '#4044ED' }}
                                onClick={handleClose}
                                color="secondary"
                                size="large"
                            >
                                Cancel
                            </Button>
                        </AnimateButton>
                    </DialogActions>
                )}
            </Dialog>
        </>
    );
}
