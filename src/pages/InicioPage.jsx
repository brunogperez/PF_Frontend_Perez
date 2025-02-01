import { useEffect } from 'react'
import { CardProducts } from '../components/CardProducts'
import { useProductStore } from '../hooks/useProductStore'


export const InicioPage = () => {

  const {startGetProducts} = useProductStore()

  useEffect(() => {
    startGetProducts()
  },[])
  
  return <CardProducts/>
    
}
