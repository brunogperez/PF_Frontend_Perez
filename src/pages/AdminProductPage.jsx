import { useState } from 'react'
import { Box, Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useProductStore } from '../hooks/useProductStore'
import { LoadingComponent } from '../components/LoadingComponent'


export const AdminProductPage = () => {
  const navigate = useNavigate()
  const { products, pagination, startGetProducts, startDeleteProduct, startProductActivo } = useProductStore()
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    startGetProducts().then(() => setLoading(false))
  }, [])

  useEffect(() => {
    startGetProducts(currentPage).then(() => setLoading(false))
  }, [currentPage])

  const addProduct = () => navigate('/admin-product/add')

  const deleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      startDeleteProduct(productId)
    }
  }

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  const editProduct = (product) => {

    startProductActivo({ ...product })
    navigate(`/admin-product/edit/${product._id}`)
  }

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Box>
          <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: 10, right: 25 }}>
            <Fab color="primary" aria-label="add" onClick={addProduct}>
              <AddIcon />
            </Fab>
          </Box>
          <TableContainer component={Paper}>
            <Table>
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
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.code}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteProduct(product._id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => editProduct(product)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {pagination && (
              <Box>
                {Array.from({ length: pagination.totalPages }).map((_, index) => (
                  <Button key={index + 1} onClick={() => goToPage(index + 1)}>
                    {index + 1}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  )
}
