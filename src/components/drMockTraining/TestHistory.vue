<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import StatusCellRenderer from "./StatusCellRenderer.vue";
import TestNameCellRenderer from "@/components/drMockTraining/TestNameCellRenderer.vue";
import TestNameCellEditor from "@/components/drMockTraining/TestNameCellEditor.vue";

const rowData = ref<any[]>([]);
const pinnedTopRowData = ref<any[]>([]);
const columnDefs = ref([
  {
    headerName: "실행일시",
    field: "startDate",
    autoHeight: true,
    valueGetter: (params: any) => {
      return params.data.startDate === null ? "-" : params.data.startDate;
    }
  },
  {
    headerName: "테스트명",
    field: "testName",
    autoHeight: true,
    cellRenderer: TestNameCellRenderer,
  },
  {
    headerName: "전체 트래픽(성공/실패/전체)",
    field: "wholeTraffic",
    autoHeight: true,
    valueGetter: (params: any) => {
      return params.data.startDate === null ? "-" : params.data.wholeTraffic;
    }
  },
  {
    headerName: "TRBS 연동",
    field: "TRBSLink",
    autoHeight: true,
  },
  {
    headerName: "상태",
    field: "status",
    cellRenderer: StatusCellRenderer,
    autoHeight: true,
  },
  {
    etc: "비고",
    field: "etc",
    autoHeight: true,
  }
]);

const defaultColDef = ref({
  sortable: false
});

const init = () => {
  rowData.value = [
    {
      startDate: 1,
      testName: "John Doe",
      wholeTraffic: "34 / 10 / 44",
      TRBSLink: "0 / 2 / 2",
      status: "완료",
      etc: "",
      autoHeight: true,
    },
    {
      startDate: 2,
      testName: "Jane Smith",
      wholeTraffic: "34 / 10 / 44",
      TRBSLink: "0 / 2 / 2",
      status: "완료",
      etc: "",
      autoHeight: true,
    },
  ];
  pinnedTopRowData.value = [
    {
      startDate: null,
      testName: "고정 테스트명",
      wholeTraffic: "고정 데이터",
      TRBSLink: "-",
      status: "고정 상태",
      etc: "고정 비고",
      autoHeight: true,
    }
  ];
};

onMounted(() => {
  init();
});
</script>

<template>
  <ag-grid-vue
      style="width: 1205px; height: 70vh; min-height: 300px"
      class="ag-theme-balham"
      :rowData="rowData"
      :pinnedTopRowData="pinnedTopRowData"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      domLayout="autoHeight"
  />
</template>
<style>
.ag-row .ag-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ag-header-cell-label {
  justify-content: center;
}
</style>
