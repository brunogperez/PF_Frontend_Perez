import { Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useProductStore } from '../hooks/useProductStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoadingComponent } from '../components/LoadingComponent';
import Swal from 'sweetalert2';

export const AddProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    title: '',
    description: '',
    code: '',
    price: '',
    stock: '',
    category: '',
    file: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('El titulo es obligatorio'),
    description: Yup.string().required('La descripcion es obligatorio'),
    code: Yup.string().required('El codigo es obligatorio'),
    price: Yup.number().required('El precio es obligatorio'),
    stock: Yup.number().required('El precio es obligatorio'),
    category: Yup.string().required('El precio es obligatorio'),
  });

  const { values, handleChange, errors, setValues } = useFormik({
    initialValues,
    validationSchema,
  });
  const { startCreateProduct } = useProductStore();

  const { title, description, code, price, stock, category, file } = values;

  const disabled =
    title != '' &&
    description != '' &&
    code != '' &&
    price != '' &&
    stock != '' &&
    category != '' &&
    file != ''
      ? false
      : true;

  const onSubmitForm = async () => {
    try {
      setLoading(true);
      const isEmpty = Object.keys(errors).length === 0;
      if (!isEmpty) return;

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('code', code);
      formData.append('price', price);
      formData.append('stock', stock);
      formData.append('category', category);
      formData.append('file', file);

      const success = await startCreateProduct(formData);

      if (success) {
        setLoading(false);

        Swal.fire({
          title: 'Producto agregado con exito',
          icon: 'success',
        });
        navigate('/admin-product');
      } else {
        setLoading(false);
        Swal.fire({
          title: 'Error al agregar el producto',
          icon: 'error',
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onFileChange = ({ target }) => {
    if (target.files === 0) return;
    setValues({
      ...values,
      file: target.files[0],
    });
  };

  if (loading) return <LoadingComponent />;

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        sx={{
          height: '90vh',
          backgroundColor: 'white',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid
          item
          sx={{ width: 450, backgroundColor: 'lightgrey', borderRadius: 2, padding: 3, mt: 3 }}
        >
          <Typography variant="h5">Crear Producto</Typography>

          <Grid container>
            <Grid item mt={2} xs={12}>
              <TextField
                name="title"
                value={title}
                label="Titulo"
                variant="filled"
                size="small"
                fullWidth
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
              />
            </Grid>

            <Grid item mt={2} xs={12}>
              <TextField
                name="description"
                value={description}
                label="Descripcion"
                variant="filled"
                size="small"
                fullWidth
                onChange={handleChange}
                error={Boolean(errors.description)}
                helperText={errors.description}
              />
            </Grid>

            <Grid item mt={2} xs={12}>
              <TextField
                name="code"
                value={code}
                label="Codigo"
                variant="filled"
                size="small"
                fullWidth
                onChange={handleChange}
                error={Boolean(errors.code)}
                helperText={errors.code}
              />
            </Grid>

            <Grid item mt={2} xs={12}>
              <TextField
                type="number"
                name="price"
                value={price}
                label="Precio"
                variant="filled"
                size="small"
                fullWidth
                onChange={handleChange}
                error={Boolean(errors.price)}
                helperText={errors.price}
              />
            </Grid>

            <Grid item mt={2} xs={12}>
              <TextField
                type="number"
                name="stock"
                value={stock}
                label="Stock"
                variant="filled"
                size="small"
                fullWidth
                onChange={handleChange}
                error={Boolean(errors.stock)}
                helperText={errors.stock}
              />
            </Grid>

            <Grid item mt={2} xs={12}>
              <TextField
                name="category"
                value={category}
                label="Categoria"
                variant="filled"
                size="small"
                fullWidth
                onChange={handleChange}
                error={Boolean(errors.category)}
                helperText={errors.category}
              />
            </Grid>

            <Grid item mt={2} xs={12}>
              <TextField
                type="file"
                name="file"
                label="Imagen"
                variant="filled"
                size="small"
                fullWidth
                onChange={onFileChange}
              />
            </Grid>

            <Grid item mt={2} xs={12}>
              <Button disabled={disabled} variant="contained" onClick={onSubmitForm} fullWidth>
                Crear Producto
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
