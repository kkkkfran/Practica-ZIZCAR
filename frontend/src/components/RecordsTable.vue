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

const records = ref([]);
const loading = ref(false);
const dialog = ref(false);
const editedIndex = ref(-1); // -1 significa "Creando nuevo", >= 0 significa "Editando"

// Objeto vacío para el formulario
const defaultItem = {
  sourceId: '',
  date: new Date().toISOString().substr(0, 10),
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
  { title: 'Acciones', key: 'actions', sortable: false }, // Nueva columna
];

const getStatusColor = (status) => {
  if(!status) return 'grey';
  switch (status.toLowerCase()) {
    case 'activo': case 'ingreso': return 'success';
    case 'pendiente': return 'warning';
    case 'cancelado': case 'gasto': return 'error';
    case 'completado': return 'info';
    default: return 'grey';
  }
};

const fetchRecords = async () => {
  try {
    loading.value = true;
    const response = await api.get('/records');
    records.value = response.data;
  } catch (error) { console.error(error); } 
  finally { loading.value = false; }
};

const loadFromPdf = async () => {
  try {
    loading.value = true;
    await api.post('/records/ingest');
    await fetchRecords();
    alert('PDF Cargado');
  } catch (error) { alert('Error al cargar PDF'); } 
  finally { loading.value = false; }
};

// --- FUNCIONES CRUD ---

const openDialog = (item = null) => {
  if (item) {
    // Modo Editar
    editedIndex.value = item.id; // Asumiendo que el backend devuelve el ID numérico
    editedItem.value = { ...item }; // Copia para no editar la tabla directo
  } else {
    // Modo Crear
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
  try {
    if (editedIndex.value > -1) {
      // EDITAR (PATCH)
      await api.patch(`/records/${editedItem.value.id}`, editedItem.value);
    } else {
      // CREAR (POST)
      await api.post('/records', editedItem.value);
    }
    await fetchRecords(); // Recargar tabla
    closeDialog();
  } catch (error) {
    console.error(error);
    alert('Error al guardar');
  }
};

const deleteItem = async (item) => {
  if (confirm('¿Estás seguro de que quieres borrar este registro?')) {
    try {
      await api.delete(`/records/${item.id}`);
      await fetchRecords();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  }
};

onMounted(() => fetchRecords());
</script>