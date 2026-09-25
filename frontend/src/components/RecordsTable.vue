<template>
  <v-container>
    <v-card class="mb-4 pa-4">
      <div class="d-flex justify-space-between align-center">
        <h1 class="text-h4">Transacciones</h1>
        <div>
          <v-btn color="success" prepend-icon="mdi-plus" class="mr-2" @click="openDialog()">
            Nuevo
          </v-btn>

          <v-btn color="primary" prepend-icon="mdi-file-pdf-box" @click="loadFromPdf" :loading="loading" class="mr-2">
            Cargar PDF
          </v-btn>
          
          <v-btn variant="outlined" icon="mdi-refresh" @click="fetchRecords" :loading="loading"></v-btn>
        </div>
      </div>
    </v-card>

    <v-card>
      <v-data-table :headers="headers" :items="records" :loading="loading" hover>
        <template v-slot:item.amount="{ item }">
          <span class="font-weight-bold">$ {{ item.amount?.toLocaleString() }}</span>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" size="small" class="text-uppercase font-weight-bold">
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon size="small" class="me-2" @click="openDialog(item)">mdi-pencil</v-icon>
          <v-icon size="small" color="error" @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editedIndex === -1 ? 'Nuevo Registro' : 'Editar Registro' }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.sourceId" label="ID (Ej: MAN-001)"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.date" label="Fecha (YYYY-MM-DD)" type="date"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="editedItem.category" :items="['Ingreso','Gasto','Inventario']" label="Categoría"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="editedItem.amount" label="Monto" type="number"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                 <v-select v-model="editedItem.status" :items="['activo','pendiente','completado','cancelado']" label="Estado"></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="editedItem.description" label="Descripción"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeDialog">Cancelar</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useAuthStore } from '../stores/auth';
import { getDemoRecords, saveDemoRecords, type TransactionRecord } from '../services/mockData';

const authStore = useAuthStore();
const records = ref<any[]>([]);
const loading = ref(false);
const dialog = ref(false);
const editedIndex = ref(-1);

const defaultItem = {
  sourceId: '',
  date: new Date().toISOString().substring(0, 10),
  category: 'Gasto',
  amount: 0,
  status: 'pendiente',
  description: ''
};
const editedItem = ref({ ...defaultItem });

const headers = [
  { title: 'ID', key: 'sourceId', align: 'start' },
  { title: 'Fecha', key: 'date' },
  { title: 'Categoría', key: 'category' },
  { title: 'Monto', key: 'amount', align: 'end' },
  { title: 'Estado', key: 'status', align: 'center' },
  { title: 'Descripción', key: 'description' },
  { title: 'Acciones', key: 'actions', sortable: false },
];

const getStatusColor = (status: any) => {
  if (!status) return 'grey';
  switch (String(status).toLowerCase()) {
    case 'activo': case 'ingreso': return 'success';
    case 'pendiente': return 'warning';
    case 'cancelado': case 'gasto': return 'error';
    case 'completado': return 'info';
    default: return 'grey';
  }
};

const fetchRecords = async () => {
  loading.value = true;
  if (authStore.isDemo) {
    records.value = getDemoRecords();
    loading.value = false;
    return;
  }

  try {
    const response = await api.get('/records');
    records.value = response.data;
  } catch (error) {
    console.warn('Backend API no disponible. Cargando datos simulados para demo.');
    records.value = getDemoRecords();
  } finally {
    loading.value = false;
  }
};

const loadFromPdf = async () => {
  loading.value = true;
  if (authStore.isDemo) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newItems: TransactionRecord[] = [
      {
        id: Date.now() + 1,
        sourceId: `PDF-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toISOString().substring(0, 10),
        category: 'Ingreso',
        amount: '4250.00',
        status: 'completado',
        description: 'Ingesta automática desde data.pdf (Regex Parser)'
      },
      {
        id: Date.now() + 2,
        sourceId: `PDF-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toISOString().substring(0, 10),
        category: 'Servicios',
        amount: '1180.00',
        status: 'activo',
        description: 'Conciliación contable procesada'
      }
    ];
    records.value = [...newItems, ...records.value];
    saveDemoRecords(records.value);
    loading.value = false;
    alert('✓ Ingesta completada: Se extrajeron nuevos registros desde data.pdf.');
    return;
  }

  try {
    await api.post('/records/ingest');
    await fetchRecords();
    alert('PDF Cargado exitosamente.');
  } catch (error) {
    console.warn('Fallo en API real, aplicando simulación demo.');
    const newItems: TransactionRecord[] = [
      {
        id: Date.now() + 1,
        sourceId: `PDF-${Math.floor(100 + Math.random() * 900)}`,
        date: new Date().toISOString().substring(0, 10),
        category: 'Ingreso',
        amount: '3500.00',
        status: 'completado',
        description: 'Extracción simulada desde data.pdf'
      }
    ];
    records.value = [...newItems, ...records.value];
    saveDemoRecords(records.value);
    alert('✓ Simulación de carga PDF completada (Modo Portfolio).');
  } finally {
    loading.value = false;
  }
};

const openDialog = (item: any = null) => {
  if (item) {
    editedIndex.value = item.id;
    editedItem.value = { ...item };
  } else {
    editedIndex.value = -1;
    editedItem.value = { ...defaultItem };
  }
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  editedItem.value = { ...defaultItem };
  editedIndex.value = -1;
};

const save = async () => {
  if (authStore.isDemo) {
    if (editedIndex.value > -1) {
      const idx = records.value.findIndex((r) => r.id === editedIndex.value);
      if (idx !== -1) {
        records.value[idx] = { ...editedItem.value };
      }
    } else {
      const newRec = {
        ...editedItem.value,
        id: Date.now(),
        sourceId: editedItem.value.sourceId || `MAN-${Math.floor(100 + Math.random() * 900)}`
      };
      records.value = [newRec, ...records.value];
    }
    saveDemoRecords(records.value);
    closeDialog();
    return;
  }

  try {
    if (editedIndex.value > -1) {
      await api.patch(`/records/${editedItem.value.id}`, editedItem.value);
    } else {
      await api.post('/records', editedItem.value);
    }
    await fetchRecords();
    closeDialog();
  } catch (error) {
    // Si falla el backend, aplicamos en memoria para no frustrar la demo
    if (editedIndex.value > -1) {
      const idx = records.value.findIndex((r) => r.id === editedIndex.value);
      if (idx !== -1) records.value[idx] = { ...editedItem.value };
    } else {
      records.value = [{ ...editedItem.value, id: Date.now() }, ...records.value];
    }
    saveDemoRecords(records.value);
    closeDialog();
  }
};

const deleteItem = async (item: any) => {
  if (confirm('¿Estás seguro de que quieres borrar este registro?')) {
    if (authStore.isDemo) {
      records.value = records.value.filter((r) => r.id !== item.id);
      saveDemoRecords(records.value);
      return;
    }

    try {
      await api.delete(`/records/${item.id}`);
      await fetchRecords();
    } catch (error) {
      records.value = records.value.filter((r) => r.id !== item.id);
      saveDemoRecords(records.value);
    }
  }
};

onMounted(() => fetchRecords());
</script>