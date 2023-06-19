import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { Grid, Typography, IconButton, Tooltip } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

// Props needed for component formik ,correctOption, setCorrectOption , optionValue , formikFieldName , PlaceHOLDER
const FileInput = ({ formik, fieldName, placeHolder, accept, imageUrl }) => {
  const dispatch = useDispatch();
  const fileRef1 = useRef();

  return (
    <>
      <Grid item className="displayFlex">
        <Fragment>
          <Tooltip placement="top" title={accept == 'image/*' ? 'Add Image' : 'Add File'}>
            <IconButton color="primary" aria-label="delete" size="large" onClick={() => fileRef1.current.click()}>
              <AddCircleOutlinedIcon sx={{ fontSize: '3.0rem' }} />
            </IconButton>
          </Tooltip>

          <input
            hidden
            ref={fileRef1}
            fullWidth
            type="file"
            className="chooseFileInput"
            accept={accept}
            onChange={(event) => {
              formik.setFieldValue(fieldName, event.currentTarget.files[0]);
            }}
            error={formik.touched[`${fieldName}`] && Boolean(formik.errors[`${fieldName}`])}
            helperText={formik.touched[`${fieldName}`] && formik.errors[`${fieldName}`]}
          />

          <Grid className="displayFlex">
            {formik?.values[`${fieldName}`]?.name ? (
              <Fragment>
                <Typography mt={3.5} variant="h5">
                  {formik.values[`${fieldName}`]?.name?.substring(0, 40)}
                </Typography>
                <Typography mt={3.5} variant="h5" ml={2}>
                  {'(' + (formik.values[`${fieldName}`]?.size / 1000000).toFixed(2) + '  mb)'}
                </Typography>
              </Fragment>
            ) : imageUrl ? (
              <Fragment>
                <Typography mt={3.5} variant="h5">
                  {imageUrl.substring(imageUrl.lastIndexOf('/') + 1)}
                </Typography>
                <Typography mt={3.5} variant="h5" ml={2}>
                  {'(Already uploaded)'}
                </Typography>
              </Fragment>
            ) : (
              <Typography mt={3.5} variant="h5">
                {placeHolder}
              </Typography>
            )}

            {formik.values[`${fieldName}`] ? (
              <Tooltip placement="top" title={accept == 'image/*' ? 'Clear Image' : 'Clear Audio'}>
                <IconButton
                  style={{ marginTop: '2px' }}
                  color="primary"
                  aria-label="delete"
                  size="large"
                  onClick={() => {
                    formik.setFieldValue(fieldName, null);
                    fileRef1.current.value = null;
                  }}
                >
                  <CloseOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                </IconButton>
              </Tooltip>
            ) : null}
          </Grid>
        </Fragment>
      </Grid>

      <Grid item>
        <p className={'fileError'}>
          {formik.touched[`${fieldName}`] && Boolean(formik.errors[`${fieldName}`]) ? formik.errors[`${fieldName}`] : ''}
        </p>
      </Grid>
    </>
  );
};

export default FileInput;
