import { Check, Clock, XCircle } from 'lucide-react';
import type { ProductStatus } from '@/types';

const config: Record<
  ProductStatus,
  { label: string; className: string; Icon: React.ElementType }
> = {
  available: {
    label: 'Disponible',
    className: 'pill-available',
    Icon: Check,
  },
  out_of_stock: {
    label: 'Rupture',
    className: 'pill-out',
    Icon: XCircle,
  },
  coming_soon: {
    label: 'Bientôt',
    className: 'pill-soon',
    Icon: Clock,
  },
};

export default function StatusBadge({ status }: { status: ProductStatus }) {
  const c = config[status];
  return (
    <span className={c.className}>
      <c.Icon className="h-3 w-3" />
      {c.label}
    </span>
  );
}
