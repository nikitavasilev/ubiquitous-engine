import { forwardRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Select from 'react-select';

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
  Tooltip,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  MenuItem
} from '@mui/material';
import { Switch } from '@mui/material';

import { Icon } from '@iconify/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { editRequestNft } from 'redux/nftManagement/actions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import closeFill from '@iconify-icons/eva/close-fill';

import AnimateButton from 'ui-component/extended/AnimateButton';

import { Country } from 'country-state-city';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function EditReuqestNftDialog({ nftInfo, categoryId, type, search, page, limit, loader, setLoader, open, setOpen }) {
  const dispatch = useDispatch();

  const [fieldDataArray, setFieldDataArray] = useState([]);
  const [fileDataArray, setFileDataArray] = useState([]);

  console.log(fieldDataArray, 'fieldDataArray*********');

  const handleError = (fieldDataArray, fileDataArray) => {
    let isValid = true;
    if (fieldDataArray.length == 0) {
      isValid = false;
      toast.error('Metadata is required');
    }

    // else  (fieldDataArray.length > 0) {

    fieldDataArray.map((array) => {
      if (array.trait_type == '') {
        isValid = false;
        toast.error(`Metadata name cannot be empty`);
      } else if (array.value == '') {
        isValid = false;
        toast.error(`Metadata value cannot be empty`);
      }
    });
    // }
    if (fileDataArray.length == 0) {
      isValid = false;
      toast.error('Proof of Authenticity is required');
    }

    //    else (fileDataArray.length > 0) {
    fileDataArray.map((array) => {
      if (array.fieldName == '') {
        isValid = false;
        toast.error(`File name field is mandatory`);
      } else if (array.fieldValue == null) {
        isValid = false;
        toast.error(`Attach proof of authenticity`);
      } else if (array.value?.size / 1000000 > 5) {
        isValid = false;
        toast.error(`Please attach a less than 5 mb proof of authenticity`);
      }
    });
    // }

    return isValid;
  };

  const validationSchema = Yup.object({});
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: nftInfo,
    validationSchema,
    onSubmit: (values) => {
      let previousUploadedItems = fileDataArray.filter((data) => {
        if (typeof data.fieldValue === 'string') return data;
      });

      let newUploadedItems = fileDataArray.filter((data) => {
        if (typeof data.fieldValue !== 'string') return data;
      });

      let fileArray = newUploadedItems.map((data) => {
        return data.fieldValue;
      });
      let fileNameArray = newUploadedItems.map((data) => {
        return data.fieldName;
      });

      let isValid = handleError(fieldDataArray, fileDataArray, values);

      if (isValid) {
        dispatch(
          editRequestNft({
            id: nftInfo.id,

            metaDataArray: fieldDataArray,
            fileNameArray: fileNameArray,
            fileArray: fileArray,
            previousUploadedItems: previousUploadedItems,
            type: type,
            page: page,
            limit: limit,
            search: search,
            categoryId: categoryId,
            brandId: nftInfo.brandId,
            handleClose: handleClose
            // brandId: user.BrandId
          })
        );
      }
    }
  });

  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };

  const handletrait_typeChange = (value, index) => {
    let array = structuredClone(fieldDataArray);
    array[index].trait_type = value;
    setFieldDataArray(array);
  };
  const handleFieldValueChange = (value, index) => {
    let array = structuredClone(fieldDataArray);
    array[index].value = value;
    setFieldDataArray(array);
  };
  //used in edit nft===>
  const handlecountryCodeChange = (countryCode, index) => {
    let array = structuredClone(fieldDataArray);
    array[index].countryCode = countryCode;
    setFieldDataArray(array);
  };

  const handleChange = (event, index) => {
    let array = structuredClone(fieldDataArray);
    array[index].isEditable = event.target?.checked;
    setFieldDataArray(array);
  };

  const handleproof = (event, index) => {
    let array = structuredClone(fieldDataArray);
    array[index].proofRequired = event.target?.checked;
    setFieldDataArray(array);
  };

  const handleRemoveField = (index) => {
    let array = structuredClone([...fieldDataArray]);
    array.splice(index, 1);
    setFieldDataArray(array);
  };

  const handleFileFieldNameChange = (value, index) => {
    let array = structuredClone(fileDataArray);
    array[index].fieldName = value;
    setFileDataArray(array);
  };
  const handleFileFieldValChange = (value, index) => {
    let array = structuredClone(fileDataArray);
    array[index].fieldValue = value;
    setFileDataArray(array);
  };

  const handleFileRemoveField = (index) => {
    let array = structuredClone(fileDataArray);
    array.splice(index, 1);
    setFileDataArray(array);
  };

  useEffect(() => {
    setFieldDataArray(nftInfo.fieldDataArray);
    setFileDataArray(nftInfo.fileDataArray);
  }, [nftInfo]);

  useEffect(() => {}, [fileDataArray]);
  useEffect(() => {}, [fieldDataArray]);

  // <<<New edit metadata********************************************************************************                                     ***********>
  const handleSelect = (event, index) => {
    let array = [...fieldDataArray];
    array[index].display_type = event.target?.value;
    setFieldDataArray(array);
  };
  const dropdown = [
    {
      value: 'Text',
      label: 'Text'
    },
    {
      value: 'Number',
      label: 'Number'
    },
    {
      value: 'Date',
      label: 'Date'
    },
    {
      value: 'Location',
      label: 'Location'
    }
  ];
  const handleCheckboxChange = (index) => {
    const updatedCheckboxes = fieldDataArray.map((item, i) => {
      if (i === index) {
        return { ...item, primaryLocation: true };
      }
      return { ...item, primaryLocation: false };
    });
    setFieldDataArray([...updatedCheckboxes]);
  };
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        // onClose={handleClose}
        aria-labelledby="form-dialog-title"
        // className="brandDialog Nftdialog"
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description1"
      >
        <DialogTitle id="alert-dialog-slide-title1" className="adminname">
          Edit NFT
        </DialogTitle>
        <Divider />

        <DialogContent>
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <Grid container mt={1}>
              <Grid xs={12} mt={2}>
                <Button
                  className="fieldbutton"
                  variant="contained"
                  sx={{ float: 'left', padding: { md: ' 6px 38px', lg: '6px 38px' } }}
                  onClick={() => {
                    setFieldDataArray([
                      ...fieldDataArray,
                      {
                        display_type: 'Text',
                        trait_type: '',
                        value: '',
                        countryCode: '',
                        isEditable: false,
                        proofRequired: false,
                        primaryLocation: false
                      }
                    ]);
                  }}
                >
                  Add more fields
                </Button>
              </Grid>
            </Grid>

            {fieldDataArray.length != 0 && (
              <>
                <Grid container spacing={4} mt={1}>
                  {fieldDataArray.map(
                    (data, index) =>
                      data.trait_type != 'Serial ID' &&
                      data.trait_type != 'Redeemed' && (
                        <>
                          <Grid xs={3} md={3}>
                            <TextField
                              sx={{ m: 6, width: '80%', borderRadius: '2%' }}
                              className="w-100"
                              // className="textfieldStyle"
                              variant="standard"
                              id="outlined-select-budget"
                              select
                              fullWidth
                              value={data.display_type}
                              onChange={(e) => {
                                handleSelect(e, index);
                                if (e.target.value === 'Date') {
                                  let data = fieldDataArray[index];
                                  data.value = new Date();
                                  fieldDataArray[index] = data;
                                  setFieldDataArray([...fieldDataArray]);
                                } else {
                                  let data = fieldDataArray[index];
                                  data.value = '';
                                  fieldDataArray[index] = data;
                                  setFieldDataArray([...fieldDataArray]);
                                }
                              }}
                              // value={drop}
                              // onChange={metadataDropDown}
                            >
                              {dropdown.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs={2} md={2}>
                            <TextField
                              id="field_name"
                              className="textfieldStyle"
                              name="field_name"
                              label="Metadata Name"
                              value={data.trait_type}
                              onChange={(e) => {
                                handletrait_typeChange(e.target.value, index);
                              }}
                              variant="standard"
                              fullWidth
                            />
                          </Grid>
                          {data.display_type == 'Text' && (
                            <Grid item xs={2} md={2}>
                              <TextField
                                className="textfieldStyle"
                                id="field_value"
                                name="field_value"
                                label="Text"
                                value={data.value}
                                onChange={(e) => {
                                  handleFieldValueChange(e.target.value, index);
                                }}
                                variant="standard"
                                fullWidth
                              />
                            </Grid>
                          )}
                          {data.display_type == 'Number' && (
                            <Grid item xs={2} md={2}>
                              <TextField
                                className="textfieldStyle"
                                id="Number"
                                name="Number"
                                label="Number"
                                type="number"
                                value={data.value}
                                onChange={(e) => {
                                  handleFieldValueChange(e.target.value, index);
                                }}
                                variant="standard"
                                fullWidth
                              />
                            </Grid>
                          )}
                          {data.display_type == 'Date' && (
                            <>
                              <Grid item xs={2} md={2} className="my-2 w-100" sx={{ margin: 3 }}>
                                {/* <TextField
                              className="textfieldStyle"
                              id="field_value"
                              name="field_value"
                              label="Date"
                              value={data.value}
                              onChange={(e) => {
                                handleFieldValueChange(e.target.value, index);
                              }}
                              variant="standard"
                              fullWidth
                            /> */}
                                <DatePicker
                                  showIcon
                                  label="Select date"
                                  value={new Date(data.value)}
                                  selected={new Date(data.value)}
                                  onChange={(e) => {
                                    handleFieldValueChange(e, index);
                                  }}
                                />
                              </Grid>
                            </>
                          )}
                          {data.display_type == 'Location' && (
                            <Grid item xs={2} md={1}>
                              <TextField
                                className="textfieldStyle"
                                id="Postal Code"
                                name="Postal Code"
                                label="Postal Code"
                                value={data.value}
                                onChange={(e) => {
                                  handleFieldValueChange(e.target.value, index);
                                }}
                                variant="standard"
                                // fullWidth
                              />
                              <input
                                type="checkbox"
                                checked={fieldDataArray[index].primaryLocation}
                                onChange={() => handleCheckboxChange(index)}
                              />
                            </Grid>
                          )}

                          {data.display_type == 'Location' && (
                            <Grid
                              item
                              xs={2}
                              md={1.5}
                              //  sx={{ m: 2, width: '45%', borderRadius: '2%' }}
                            >
                              {/* <TextField
                            className="textfieldStyle"
                            id="Number"
                            name="Number"
                            label="country Code"
                            value={data?.countryCode}
                            onChange={(e) => {
                              handlecountryCodeChange(e.target.value, index);
                            }}
                            variant="standard"
                            fullWidth
                          /> */}
                              <Select
                                // styles={style}
                                // className="selectFieldDesign"
                                // label={selectedCode}
                                placeholder="select  Country"
                                options={Country?.getAllCountries()}
                                getOptionLabel={(options) => {
                                  return options['name'] ? options['name'] : options['label'];
                                }}
                                getOptionValue={(options) => {
                                  return options['name'] ? options['name'] : options['value'];
                                }}
                                value={
                                  fieldDataArray[index]?.countryCode
                                    ? {
                                        value: fieldDataArray[index]?.countryCode,
                                        label: fieldDataArray[index]?.countryCode
                                      }
                                    : ''
                                }
                                onChange={(item) => {
                                  // formik.setFieldValue("country", item?.phonecode);
                                  let data = structuredClone(fieldDataArray[index]);
                                  data.countryCode = item.isoCode;
                                  fieldDataArray[index] = data;
                                  setFieldDataArray([...fieldDataArray]);
                                }}
                              />
                            </Grid>
                          )}
                          <Grid item xs={2} mt={2} md={2}>
                            <Tooltip className="fontsize" title="Allow update by NFT owner" placement="top" arrow>
                              <Switch
                                value={data?.isEditable}
                                checked={data?.isEditable}
                                onChange={(e) => handleChange(e, index)}
                                // inputProps={{ 'aria-label': 'controlled' }}
                              />
                            </Tooltip>
                            {data?.isEditable == true && (
                              <Tooltip className="fontsize" title="Accept proof on update of metadata" placement="top" arrow>
                                <Switch
                                  value={data.proofRequired}
                                  checked={data.proofRequired}
                                  onChange={(e) => handleproof(e, index)}
                                  // inputProps={{ 'aria-label': 'controlled' }}
                                />
                              </Tooltip>
                            )}
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
                          <Grid item xs={2} mt={2} md={2}></Grid>
                        </>
                      )
                  )}
                </Grid>
              </>
            )}
            <Grid container>
              <Grid xs={12} mt={2} pr={3}>
                <Button
                  className="fieldbutton"
                  variant="contained"
                  sx={{ float: 'left' }}
                  onClick={() => {
                    setFileDataArray([
                      ...fileDataArray,
                      {
                        fieldName: '',
                        fieldValue: null
                      }
                    ]);
                  }}
                >
                  Add Authenticity Files
                </Button>
              </Grid>
              {fileDataArray?.length != 0 && (
                <>
                  <Grid container spacing={2} mt={1}>
                    {fileDataArray?.map((data, index) => (
                      <>
                        <Grid item xs={3}>
                          <TextField
                            id="field_name"
                            name="field_name"
                            label="File Name"
                            value={data?.fieldName}
                            onChange={(e) => {
                              handleFileFieldNameChange(e.target.value, index);
                            }}
                            variant="standard"
                            fullWidth
                          />
                        </Grid>

                        {data?.fieldValue?.length > 1 ? (
                          <Grid item xs={3} mt={3.5} className="encap" sx={{}}>
                            <a target="_blank" href={data?.fieldValue} style={{ color: '#4198e3' }}>
                              {data?.fieldValue}
                            </a>
                          </Grid>
                        ) : (
                          <Grid item xs={3} mt={3}>
                            <input
                              style={{ display: 'inlineBlock' }}
                              type="file"
                              id="avatar"
                              name="avatar"
                              accept="image/*,.pdf"
                              // value={data?.fieldValue}
                              onChange={(event) => {
                                handleFileFieldValChange(event.currentTarget.files[0], index);
                              }}
                            />
                          </Grid>
                        )}
                        {/* {/ <div style={{marginTop:"3%", marginLeft:"2%"}}><b>Previous file: </b > <a target="_blank" href={data.fieldValue}>{data.fieldValue}</a>
                        </div > /} */}
                        <Grid item xs={2} mt={2}>
                          <IconButton
                            color="error"
                            edge="end"
                            size="small"
                            onClick={() => {
                              handleFileRemoveField(index);
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
            </Grid>
          </form>
        </DialogContent>
        <Divider />
        <Grid container>
          <DialogActions>
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
                Edit
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
          </DialogActions>
        </Grid>
      </Dialog>
    </>
  );
}
