import { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductStore } from '../hooks/useProductStore';
import { LoadingComponent } from '../components/LoadingComponent';
import { ButtonCustom } from '../components/ButtonCustom';

export const AdminProductPage = () => {
  const navigate = useNavigate();
  const { products, pagination, startGetProducts, startDeleteProduct, startProductActivo } =
    useProductStore();
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    startGetProducts().then(() => setLoading(false));
  }, []);

  useEffect(() => {
    startGetProducts(currentPage).then(() => setLoading(false));
  }, [currentPage]);

  const addProduct = () => navigate('/admin-product/add');

  const deleteProduct = productId => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      startDeleteProduct(productId);
    }
  };

  const goToPage = page => {
    setCurrentPage(page);
  };

  const editProduct = product => {
    startProductActivo({ ...product });
    navigate(`/admin-product/edit/${product._id}`);
  };

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Box className="container items-center justify-center mx-auto mt-3">
          <ButtonCustom text={'Agregar producto'} onclick={addProduct}></ButtonCustom>
          <TableContainer component={Paper}>
            <Table className="">
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Código</TableCell>
                  <TableCell>Precio</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(product => (
                  <TableRow key={product._id}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.code}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => editProduct(product)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteProduct(product._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box className="flex justify-center mt-3">
            {pagination && (
              <Box>
                {Array.from({ length: pagination.totalPages }).map((_, index) => (
                  <ButtonCustom
                    key={index + 1}
                    onclick={() => goToPage(index + 1)}
                    text={index + 1}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
