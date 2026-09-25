export interface TransactionRecord {
  id: number;
  sourceId: string;
  date: string;
  category: string;
  amount: number | string;
  status: string;
  description: string;
}

export const INITIAL_DEMO_RECORDS: TransactionRecord[] = [
  {
    id: 1,
    sourceId: "INV-2025-001",
    date: "2025-10-11",
    category: "Servicios",
    amount: "1666.00",
    status: "cancelado",
    description: "Prestación de servicio de consultoría"
  },
  {
    id: 2,
    sourceId: "INV-2025-002",
    date: "2025-01-03",
    category: "Inventario",
    amount: "680.00",
    status: "activo",
    description: "Compra de stock repuestos"
  },
  {
    id: 3,
    sourceId: "INV-2025-003",
    date: "2025-07-24",
    category: "Gastos",
    amount: "1974.00",
    status: "activo",
    description: "Pago de gasto operativo TI"
  },
  {
    id: 4,
    sourceId: "INV-2025-004",
    date: "2025-09-09",
    category: "Servicios",
    amount: "339.00",
    status: "pendiente",
    description: "Servicio de soporte y logística"
  },
  {
    id: 5,
    sourceId: "INV-2025-005",
    date: "2025-03-21",
    category: "Gastos",
    amount: "4542.00",
    status: "cancelado",
    description: "Mantenimiento preventivo flota"
  },
  {
    id: 6,
    sourceId: "INV-2025-006",
    date: "2025-04-13",
    category: "Inventario",
    amount: "4287.00",
    status: "completado",
    description: "Adquisición de insumos comerciales"
  },
  {
    id: 7,
    sourceId: "INV-2025-007",
    date: "2025-10-19",
    category: "Inventario",
    amount: "422.00",
    status: "activo",
    description: "Reposición de inventario rápido"
  },
  {
    id: 8,
    sourceId: "INV-2025-008",
    date: "2025-11-24",
    category: "Ventas",
    amount: "1928.00",
    status: "activo",
    description: "Venta de paquete comercial corporativo"
  },
  {
    id: 9,
    sourceId: "INV-2025-009",
    date: "2025-08-10",
    category: "Servicios",
    amount: "3033.00",
    status: "pendiente",
    description: "Desarrollo de integraciones API"
  },
  {
    id: 10,
    sourceId: "INV-2025-010",
    date: "2025-01-21",
    category: "Ventas",
    amount: "4533.00",
    status: "activo",
    description: "Facturación contrato trimestral"
  },
  {
    id: 11,
    sourceId: "INV-2025-011",
    date: "2025-07-30",
    category: "Ventas",
    amount: "489.00",
    status: "completado",
    description: "Venta de servicios complementarios"
  },
  {
    id: 12,
    sourceId: "INV-2025-012",
    date: "2025-07-24",
    category: "Servicios",
    amount: "693.00",
    status: "activo",
    description: "Asesoría contable y financiera"
  },
  {
    id: 13,
    sourceId: "INV-2025-013",
    date: "2025-04-03",
    category: "Servicios",
    amount: "2196.00",
    status: "pendiente",
    description: "Auditoría de datos normalizados"
  },
  {
    id: 14,
    sourceId: "INV-2025-014",
    date: "2025-09-15",
    category: "Ingreso",
    amount: "5300.00",
    status: "completado",
    description: "Ingreso extraordinario por liquidación"
  },
  {
    id: 15,
    sourceId: "INV-2025-015",
    date: "2025-11-02",
    category: "Gasto",
    amount: "850.00",
    status: "activo",
    description: "Servidores Cloud y CDN"
  }
];

const STORAGE_KEY = 'zizcar_demo_records';

export const getDemoRecords = (): TransactionRecord[] => {
  const cached = localStorage.getItem(STORAGE_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // fallback
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RECORDS));
  return [...INITIAL_DEMO_RECORDS];
};

export const saveDemoRecords = (records: TransactionRecord[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

export const resetDemoRecords = (): TransactionRecord[] => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RECORDS));
  return [...INITIAL_DEMO_RECORDS];
};
