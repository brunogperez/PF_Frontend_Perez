import { Button, Grid, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useProductStore } from '../hooks/useProductStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { LoadingComponent } from '../components/LoadingComponent';

export const EditProductPage = () => {

  const navigate = useNavigate();
  const { startUpdateProduct } = useProductStore();
  const { id } = useParams();
  const { product } = useProductStore();
  const [loading, setLoading] = useState(false);

  const [initialValues] = useState({
    title: product.title,
    description: product.description,
    code: product.code,
    price: product.price,
    stock: product.stock,
    category: product.category,
    thumbnail: product.thumbnail,
    file: '',
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('El titulo es obligatorio'),
    description: Yup.string().required('La descripcion es obligatorio'),
    code: Yup.string().required('El codigo es obligatorio'),
    price: Yup.number().required('El precio es obligatorio'),
    stock: Yup.number().required('El precio es obligatorio'),
    category: Yup.string().required('El precio es obligatorio'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('code', values.code);
        formData.append('price', values.price);
        formData.append('stock', values.stock);
        formData.append('category', values.category);
        formData.append('file', values.file);
        await startUpdateProduct(id, formData);
        navigate('/admin-product');
        setLoading(false);
      } catch (error) {
        console.error('Error updating product:', error);
        setLoading(false);
      }
    },
  });

  const onFileChange = ({ target }) => {
    formik.setFieldValue('file', target.files[0]);
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        sx={{ minHeight: '100vh', backgroundColor: '#e7ebda' }}
      >
        <Grid item sx={{ width: 450, backgroundColor: 'white', borderRadius: 2, padding: 3, mt: 3 }}>
          <Typography variant='h5'>Editar Producto</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item mt={2} xs={12}>
                <TextField
                  name='title'
                  value={formik.values.title}
                  label='Titulo'
                  variant='outlined'
                  size='small'
                  fullWidth
                  onChange={formik.handleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>


              <Grid item mt={2} xs={12}>
                <TextField
                  name='description'
                  value={formik.values.description}
                  label='Descripcion'
                  variant='outlined'
                  size='small'
                  fullWidth
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>

              <Grid item mt={2} xs={12}>
                <TextField
                  name='code'
                  value={formik.values.code}
                  label='Codigo'
                  variant='outlined'
                  size='small'
                  fullWidth
                  onChange={formik.handleChange}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
                />
              </Grid>

              <Grid item mt={2} xs={12}>
                <TextField
                  type='number'
                  name='price'
                  value={formik.values.price}
                  label='Precio'
                  variant='outlined'
                  size='small'
                  fullWidth
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>

              <Grid item mt={2} xs={12}>
                <TextField
                  type='number'
                  name='stock'
                  value={formik.values.stock}
                  label='Stock'
                  variant='outlined'
                  size='small'
                  fullWidth
                  onChange={formik.handleChange}
                  error={formik.touched.stock && Boolean(formik.errors.stock)}
                  helperText={formik.touched.stock && formik.errors.stock}
                />
              </Grid>

              <Grid item mt={2} xs={12}>
                <TextField
                  name='category'
                  value={formik.values.category}
                  label='Categoria'
                  variant='outlined'
                  size='small'
                  fullWidth
                  onChange={formik.handleChange}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                />
              </Grid>

              {formik.values.thumbnail && (
                <Grid item mt={2} xs={12}>
                  <img src={formik.values.thumbnail} alt="Thumbnail" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />
                </Grid>
              )}

              <Grid item mt={2} xs={12}>
                <TextField
                  type='file'
                  name='file'
                  label='Imagen'
                  variant='outlined'
                  size='small'
                  fullWidth
                  onChange={onFileChange}
                />
              </Grid>


              <Grid item mt={2} xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                >
                  Guardar Cambios
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
