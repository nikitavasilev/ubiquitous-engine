import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid, TextField, Button, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileInput from '../../../../shared/component/FileInput';
import { useDispatch } from 'react-redux';
import { editProfileRequest } from '../../../../redux/auth/actions';

const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const updatedUser = useSelector((state) => state.auth.updatedUser);

  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }, [user]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validationSchema = Yup.object({
    isUpdate: Yup.boolean().default(isUpdate),
    firstName: Yup.string().required('First Name is required!'),
    lastName: Yup.string().required('Last Name is required!'),
    address: Yup.string().required('Address is required!'),
    profileImg: Yup.mixed()
      .when(['isUpdate'], {
        is: true,
        then: Yup.mixed(),
        otherwise: Yup.mixed(),
      })
      .test('image size', 'Choose image less than 5 mb', (value) => {
        if (typeof value === 'string') {
          // if value is a string (URL), it's an already uploaded image, so bypass the size check
          return true;
        } else if (value instanceof File) {
          // if value is a File object, check its size
          return value.size <= 5_000_000;
        } else {
          // if value is neither a string nor a File object, it's likely null/undefined (no file chosen), so pass validation
          return true;
        }
      }),

    bannerImg: Yup.mixed()
      .when(['isUpdate'], {
        is: true,
        then: Yup.mixed(),
        otherwise: Yup.mixed(),
      })
      .test('image size', 'Choose image less than 5 mb', (value) => {
        if (typeof value === 'string') {
          // if value is a string (URL), it's an already uploaded image, so bypass the size check
          return true;
        } else if (value instanceof File) {
          // if value is a File object, check its size
          return value.size <= 5_000_000;
        } else {
          // if value is neither a string nor a File object, it's likely null/undefined (no file chosen), so pass validation
          return true;
        }
      }),
    description: Yup.string().required('Description is required!'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      address: user ? user.address : '',
      profileImg: user?.UserProfile?.profileImg || '',
      bannerImg: user?.UserProfile?.bannerImg || '',
      description: user?.UserProfile?.description || '',
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitted(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log('Dispatching editProfile action');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      // convert FormData to plain JS object
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });

      dispatch(editProfileRequest(object)); // dispatch the action with plain JS object
      console.log('editProfile action dispatched');
    },
  });

  useEffect(() => {
    if (isSubmitted && updatedUser) {
      console.log('Updating formik form with new values');
      formik.setValues({
        firstName: updatedUser.firstName || '',
        lastName: updatedUser.lastName || '',
        address: updatedUser.address || '',
        profileImg: updatedUser?.UserProfile?.profileImg || '',
        bannerImg: updatedUser?.UserProfile?.bannerImg || '',
        description: updatedUser?.UserProfile?.description || '',
      });
      setIsSubmitted(false); // reset isSubmitted state to false
    }
  }, [updatedUser, isSubmitted]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" margin={'20px'}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <FileInput
              formik={formik}
              fieldName="profileImg"
              placeHolder="Add Profile Image"
              accept="image/*"
              imageUrl={formik.values.profileImg} // pass imageUrl prop
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <FileInput
              className="textfieldStyle"
              variant="standard"
              formik={formik}
              accept="image/*"
              fieldName="bannerImg"
              placeHolder="Banner Image"
              imageUrl={formik.values.bannerImg} // pass imageUrl prop
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              inputProps={{ style: { padding: '10px' } }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              inputProps={{ style: { padding: '10px' } }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              inputProps={{ style: { padding: '10px' } }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
              inputProps={{ style: { padding: '10px' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" color="primary" type="submit">
              Update profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditProfile;
