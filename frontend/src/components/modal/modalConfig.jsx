import { ProductForm } from '../../pages/account/components/productsPanel/components';

export const getModalConfig = (modal) => {
  switch (modal?.type) {
    case 'addProduct':
      return {
        title: 'Add product',
        subtitle: 'A new item will appear in the warehouse list.',
        icon: 'PackagePlus',
        content: <ProductForm onSuccess={modal.data?.onSuccess} />,
      };

    case 'editProduct':
      return {
        title: 'Edit product',
        subtitle: 'Update product information.',
        icon: 'PackageCheck',
        content: <ProductForm product={modal.data?.product} onSuccess={modal.data?.onSuccess} />,
      };

    default:
      return null;
  }
};
