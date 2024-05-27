
import { notFound } from 'next/navigation';
import ProductsPage from '../../../../components/templates/ProductsPage/ProductsPage';

export default function Category({ params }: { params: { category: string } }) {
  const productCategories = ['1', '2', '3', '4'];
  const categoryMap: { [key: string]: number } = {
    electric_guitars: 1,
    classical_guitars: 2,
    acoustic_guitars: 3,
    bass_guitars: 4,
  };

  if (!productCategories.includes(params.category)) {
    notFound();
  }

  const categoryId = categoryMap[params.category];

  return (
    <div>
      <ProductsPage/>
    </div>
  );
}

