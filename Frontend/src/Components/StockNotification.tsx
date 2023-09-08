import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface StockNotificationProps {
  products: Product[];
}

interface Product {
  id: string;
  name: string;
  quantity: number;
}

const StockNotification: React.FC<StockNotificationProps> = ({ products }) => {
  useEffect(() => {
    // Verificar se há produtos com quantidade abaixo de 5
    const lowStockProducts = products.filter(product => product.quantity < 5);

    if (lowStockProducts.length > 0) {
      // Ativar a notificação
      toast.error('Temos produtos com baixo estoque', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  }, [products]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default StockNotification;
