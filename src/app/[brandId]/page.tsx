import BrandPage from './BrandPageClient';

export function generateStaticParams() {
  return [
    { brandId: 'move' },
    { brandId: 'explore' },
    { brandId: 'feel' },
    { brandId: 'stay' },
  ];
}

export default function BrandPageRoute() {
  return <BrandPage />;
}
