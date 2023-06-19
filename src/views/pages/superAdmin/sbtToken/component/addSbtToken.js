import { forwardRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
    Divider,
    Box,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    IconButton,
    MenuItem,
    CircularProgress
} from '@mui/material';

import { useDropzone } from 'react-dropzone';
import { Switch } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { addSBTToken } from 'redux/nftManagement/actions';
import { fData } from 'utils/formatNumber';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fileFill from '@iconify-icons/eva/file-fill';
import closeFill from '@iconify-icons/eva/close-fill';
import UploadImage from 'assets/images/icons/image-upload.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import clsx from 'clsx';
import { DataArraySharp } from '@mui/icons-material';
import { ethers, utils } from 'ethers';
import SBTAddress from "contractAbi/SBT-address.json";
import SBTAbi from "contractAbi/SBT.json";

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);


export default function addSbtToken({ open, setOpen,  limit , page , nftList }) {
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.auth.user);


    const [fieldDataArray, setFieldDataArray] = useState([



    ]);
    const [loader, setLoader] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);


    const handleError = (fieldDataArray, values) => {

        let isValid = true;


        if (fieldDataArray.length == 0) {
            isValid = false;
            toast.error('Metadata is required');
        }

        fieldDataArray.map((array) => {
            if (array.fieldName == '') {
                isValid = false;
                toast.error(`Metadata name cannot be empty`);
            } else if (array.fieldValue == '') {
                isValid = false;
                toast.error(`Metadata value cannot be empty`);
            }
        });

        console.log('im here');


        return isValid;
    };

    const validationSchema = Yup.object({
        SBTName: Yup.string()
            .required('Name is required!')
            .max(1000, 'Invalid address can not exceed 1000 characters'),
        symbol: Yup.string()
            .required('Symbol required')
            .typeError('Invalid Symbol'),
        // image: Yup.mixed(),
        Address: Yup.string()
            .required('Address is required!')
            .max(1000, 'Invalid address can not exceed 1000 characters')
    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            SBTName: '',
            symbol: '',
            Address: '',
            images: []
            // fieldName: '',
            // fieldValue: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log("values", values)
            fieldDataArray.unshift({
                "fieldName": "Validtype",
                "fieldValue": "true"
            },
                {
                    "fieldName": "Date",
                    "fieldValue": Date.now().toString()
                }
            )

            console.log("fieldDataArray", fieldDataArray)


            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();

            const sbt = new ethers.Contract(SBTAddress.address, SBTAbi.abi, signer);


            console.log("svt", sbt);

            var output = fieldDataArray.map(function (obj) {
                return Object.keys(obj).sort().map(function (key) {
                    return obj[key];
                });
            });
            console.log("tuple", values.SBTName, values.symbol, output, values.Address);
            console.log("tuple array", output);
            let safeMint = await (
                await sbt.safeMint(values.SBTName, values.symbol, output, values.Address).catch((error) => {
                    console.log(error);
                })
            ).wait();
            const tokenId = parseInt(safeMint.events[0].args[2])
            console.log("tokenId", tokenId);
            console.log("safeMint", safeMint)
            //  toast.success(``);
            console.log('This is a valid wallet address');
            dispatch(
                addSBTToken({
                    tokenName: values.SBTName,
                    address: values.Address,
                    brandSymbol: values.symbol,
                    metaData: fieldDataArray,
                    page:page,
                    limit: limit,
                    // asset: values.images[0].image,
                    handleClose: handleClose,
                })
            );
            // console.log('Address INVALID');

        }
    });
    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setFieldDataArray([]);
        setLoader(false);
        setUploadedImages([]);

    };

    const handleFieldNameChange = (value, index) => {
        let array = [...fieldDataArray];
        array[index].fieldName = value;
        setFieldDataArray(array);
    };
    const handleFieldValueChange = (value, index) => {
        let array = [...fieldDataArray];
        array[index].fieldValue = value;
        setFieldDataArray(array);
    };
    const handleRemoveField = (index) => {
        let array = [...fieldDataArray];
        array.splice(index, 1);
        setFieldDataArray(array);
    };
    return (
        <>
            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="form-dialog-title"
                // className="brandDialog "
                maxWidth="md"
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description1"
            >
                <DialogTitle id="alert-dialog-slide-title1" className="adminname">
                    Add Token
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                        <Grid container mt={1}>
                            <Grid xs={4} md={4} lg={4}>
                                <TextField
                                    className="textfieldStyle"
                                    id="SBTName"
                                    name="SBTName"
                                    label="SBT Name"
                                    fullWidth
                                    value={formik.values.SBTName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.SBTName && Boolean(formik.errors.SBTName)}
                                    helperText={formik.touched.SBTName && formik.errors.SBTName}
                                    variant="standard"
                                />
                            </Grid>

                            <Grid xs={4} md={4} lg={4} pl={2} pr={2}>
                                <TextField
                                    className="textfieldStyle"
                                    id="symbol"
                                    name="symbol"
                                    label="Symbol"
                                    fullWidth
                                    value={formik.values.symbol}
                                    onChange={formik.handleChange}
                                    error={formik.touched.symbol && Boolean(formik.errors.symbol)}
                                    helperText={formik.touched.symbol && formik.errors.symbol}
                                    autoComplete="given-name"
                                    variant="standard"
                                />
                            </Grid>
                            <Grid xs={12} mt={1}>
                                <TextField
                                    className="textfieldStyle"
                                    id="Address"
                                    name="Address"
                                    label="Address"
                                    // type="number"
                                    // InputProps={{
                                    //     inputProps: { min: 0 }
                                    // }}
                                    fullWidth
                                    value={formik.values.Address}
                                    onChange={formik.handleChange}
                                    error={formik.touched.Address && Boolean(formik.errors.Address)}
                                    helperText={formik.touched.Address && formik.errors.Address}
                                    autoComplete="given-name"
                                    variant="standard"
                                />
                            </Grid>

                            <Grid xs={12} mt={2}>
                                <Button
                                    className="fieldbutton"
                                    variant="contained"
                                    sx={{ float: 'left', padding: { md: ' 6px 38px', lg: '6px 38px' } }}
                                    onClick={() => {
                                        setFieldDataArray([
                                            ...fieldDataArray,
                                            {
                                                fieldName: '',
                                                fieldValue: '',
                                            }
                                        ]);
                                    }}
                                >
                                    Add Metadata
                                </Button>
                            </Grid>
                        </Grid>

                        {fieldDataArray.length != 0 && (
                            <>
                                <Grid container spacing={4} sx={{ mt: 1 }}>
                                    {fieldDataArray.length == 1

                                        &&
                                        <>


                                            {fieldDataArray.slice(2).map((data, index) => (
                                                <>
                                                    <Grid item xs={5} md={3}>
                                                        <TextField
                                                            id="field_name"
                                                            className="textfieldStyle"
                                                            name="field_name"
                                                            label="Metadata Name"
                                                            value={data.fieldName}
                                                            onChange={(e) => {
                                                                handleFieldNameChange(e.target.value, index);
                                                            }}
                                                            variant="standard"
                                                            fullWidth
                                                        />
                                                    </Grid>

                                                    <Grid item xs={5} md={3}>
                                                        <TextField
                                                            className="textfieldStyle"
                                                            id="field_value"
                                                            name="field_value"
                                                            label="Metadata Value"
                                                            value={data.fieldValue}
                                                            onChange={(e) => {
                                                                handleFieldValueChange(e.target.value, index);
                                                            }}
                                                            variant="standard"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={2} mt={2} md={3}>
                                                        <IconButton
                                                            color="error"
                                                            edge="end"
                                                            size="small"
                                                            onClick={() => {
                                                                handleRemoveField(index);
                                                            }}
                                                        >
                                                            <Icon icon={closeFill} width={28} height={28} />
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item xs={2} mt={2} md={3}></Grid>
                                                </>
                                            ))}
                                        </>
                                    }
                                    {fieldDataArray?.map((data, index) => (
                                        <>
                                            <Grid item xs={5} md={3}>
                                                <TextField
                                                    id="field_name"
                                                    className="textfieldStyle"
                                                    name="field_name"
                                                    label="Metadata Name"
                                                    value={data.fieldName}
                                                    onChange={(e) => {
                                                        handleFieldNameChange(e.target.value, index);
                                                    }}
                                                    variant="standard"
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={5} md={3}>
                                                <TextField
                                                    className="textfieldStyle"
                                                    id="field_value"
                                                    name="field_value"
                                                    label="Metadata Value"
                                                    value={data.fieldValue}
                                                    onChange={(e) => {
                                                        handleFieldValueChange(e.target.value, index);
                                                    }}
                                                    variant="standard"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={2} mt={2} md={3}>
                                                <IconButton
                                                    color="error"
                                                    edge="end"
                                                    size="small"
                                                    onClick={() => {
                                                        handleRemoveField(index);
                                                    }}
                                                >
                                                    <Icon icon={closeFill} width={28} height={28} />
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={2} mt={2} md={3}></Grid>
                                        </>
                                    ))}

                                </Grid>
                            </>
                        )}
                    </form>
                    <Grid container>
                        <DialogActions>
                            <>
                                <AnimateButton>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ my: 1, ml: 1, padding: { md: '6px 50px', lg: '6px 50px' } }}
                                        onClick={() => {
                                            formik.handleSubmit();
                                        }}
                                        className="buttons"
                                        size="large"
                                        disableElevation
                                    >
                                        Add
                                    </Button>
                                </AnimateButton>
                                <AnimateButton>
                                    <Button
                                        className="buttons"
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        sx={{ my: 1, ml: 1, padding: { md: '6px 50px', lg: '6px 50px' } }}
                                        onClick={handleClose}
                                        color="error"
                                        disableElevation
                                    >
                                        Cancel
                                    </Button>
                                </AnimateButton>
                            </>
                        </DialogActions>
                    </Grid>
                </DialogContent>

            </Dialog>
        </>
    );
}
