<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { AgGridVue } from 'ag-grid-vue3';
import ExecuteCellRenderer from "@/components/drMockTraining/ExecuteCellRenderer.vue";
import Modal from "@/components/drMockTraining/Modal.vue";


// 현재 선택된 탭 이름
const currentTagName = ref("TAPI");

// 탭 목록
const tabList = ref([
  { name: "TAPI테스트", tag: "TAPI" },
  { name: "AAPI테스트", tag: "AAPI" },
  { name: "GAPI테스트", tag: "GAPI" },
  { name: "LEGACY 테스트", tag: "LEGACY" }
]);

const isModalVisible = ref(false);
const modalContent = ref({
  tcID: '',
  section: '',
  apiName: ''
});

const ApiNameCellRenderer = (params: any) => {
  return `<span class="api-link" style="text-decoration: underline; color: blue; cursor: pointer;">${params.value}</span>`;

};

// APIName 클릭 핸들러
const handleApiNameClick = (event: any) => {
  const rowData = event.data;
  modalContent.value = {
    tcID: rowData.tcID,
    section: rowData.section,
    apiName: rowData.APIName
  };
  isModalVisible.value = true;
};

// 컬럼 정의
const columnDefs = ref([
  { headerName: "TC_ID", field: "tcID", autoHeight: true},
  { headerName: "구분", field: "section", autoHeight: true},
  { headerName: "API명", field: "APIName", cellRenderer: ApiNameCellRenderer, autoHeight: true},
  { headerName: "기대결과", field: "expectedResult", autoHeight: true},
  { headerName: "실행", field: "execute", cellRenderer: ExecuteCellRenderer, autoHeight: true},
  { headerName: "결과", field: "result", autoHeight: true},
  {
    headerName: "상세요청결과",
    children: [
      {headerName: '요청데이터', field: "requestData", minWidth: 150},
      {headerName: '응답데이터', field: "responseData", minWidth: 150},
    ],
    autoHeight: true
  }
]);

// 기본 컬럼 설정
const defaultColDef = ref({
  sortable: false,
});

// gridData의 타입 정의
type GridData = {
  [key: string]: { tcID: string; section: string, APIName: string, expectedResult: string, execute: null, result: string, requestData: string, responseData: string }[];
};

// 각 탭에 맞는 데이터
const gridData = ref<GridData>({
  TAPI: [
    {
      tcID: "TAPI Data 1",
      section: "Details 1",
      APIName: "TAPI 1",
      expectedResult: "어쩌구저쩌구1",
      execute: null,
      result: "SUCCESS",
      requestData: "{ \n ㅇㄹㄴㄹㅇㅁㅁㅇㄻㄴㄻㄴㅇㄻ날엄ㄴ아ㅓ란 ㅓㅏ러낭럼ㄴㄹㅇㅁㄴㅇㄹ너ㅗ렁노러노머로}",
      responseData: "{aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa}",
    },
    {
      tcID: "TAPI Data 2",
      section: "Details 2",
      APIName: "TAPI 2",
      expectedResult: "어쩌구저쩌구2",
      execute: null,
      result: "FAIL",
      requestData: "{ \n ㅇㄹㄴㄹㅇㅁ}",
      responseData: "{aaaaaaa}",
    },
    {
      tcID: "TAPI Data 2",
      section: "Details 2",
      APIName: "TAPI 2",
      expectedResult: "어쩌구저쩌구2",
      execute: null,
      result: "FAIL",
      requestData: "{ \n ㅇㄹㄴㄹㅇㅁ}",
      responseData: "{aaaaaaa}",
    }
  ],
  AAPI: [
    {
      tcID: "AAPI Data 1",
      section: "Details 1",
      APIName: "AAPI 1",
      expectedResult: "어쩌구저쩌구1",
      execute: null,
      result: "",
      requestData: "{ \n ㅇㄹㄴㄹㅇㅁ}",
      responseData: "{aaaaaaa}",
    },
    {
      tcID: "AAPI Data 2",
      section: "Details 2",
      APIName: "AAPI 2",
      expectedResult: "어쩌구저쩌구2",
      execute: null,
      result: "",
      requestData: "{ \n ㅇㄹㄴㄹㅇㅁ}",
      responseData: "{aaaaaaa}",
    }
  ],
  GAPI: [
    {
      tcID: "GAPI Data 1",
      section: "Details 1",
      APIName: "GAPI 1",
      expectedResult: "어쩌구저쩌구1",
      execute: null,
      result: "",
      requestData: "{ \n ㅇㄹㄴㄹㅇㅁ}",
      responseData: "{aaaaaaa}",
    },
    {
      tcID: "GAPI Data 2",
      section: "Details 2",
      APIName: "TAPI 1",
      expectedResult: "어쩌구저쩌구2",
      execute: null,
      result: "",
      requestData: "{ \n ㅇㄹㄴㄹㅇㅁ}",
      responseData: "{aaaaaaa}",
    }
  ],
  LEGACY: [
    {
      tcID: "LEGACY Data 1",
      section: "Details 1",
      APIName: "LEGACY 1",
      expectedResult: "어쩌구저쩌구1",
      execute: null,
      result: "",
      requestData: "{ \n ㅇㄹㄴㄹㅇㅁ}",
      responseData: "{aaaaaaa}",
    },
    {
      tcID: "LEGACY Data 2",
      section: "Details 2",
      APIName: "LEGACY 2",
      expectedResult: "어쩌구저쩌구2",
      execute: null,
      result: "",
      requestData: "{ \n ㅇㄹㄴㄹㅇㅁ}",
      responseData: "{aaaaaaa}",
    }
  ]
});

// 현재 선택된 탭에 맞는 데이터를 반환하는 computed 속성
const currentGridData = computed(() => {
  return gridData.value[currentTagName.value] || [];
});

// ag-Grid에 사용될 컴포넌트
const frameworkComponents = {
  AgGridVue
};

// onMounted 훅은 현재 사용되지 않지만, 필요한 초기화 작업이 있으면 여기서 처리합니다.
onMounted(() => {

});

// ag-Grid cellClicked 이벤트 핸들링
const handleCellClick = (event: any) => {
  if (event.column.colDef.field === 'APIName') {
    console.log(">>>> test");
    handleApiNameClick(event);
  }
};
</script>
<template>
  <div class="tab-container">
    <div class="tab">
      <button
          v-for="(tab, index) in tabList"
          :key="index"
          @click.prevent="currentTagName = tab.tag"
          :class="{ active: currentTagName === tab.tag }"
      >
        {{ tab.name }}
      </button>
    </div>
    <div class="tab-content">
      <ag-grid-vue
          v-if="currentTagName"
          style="width: 1600px; height: 400px; margin-left: 170px; margin-top: 20px;"
          class="ag-theme-balham"
          :rowData="currentGridData"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :frameworkComponents="frameworkComponents"
          domLayout="autoHeight"
          @cellClicked="handleCellClick"
      >
      </ag-grid-vue>
      <button class="execute-all-button">전체 실행</button>
    </div>
    <Modal
        :isVisible="isModalVisible"
        @update:isVisible="isModalVisible = $event"
        :tcID="modalContent.tcID"
        :section="modalContent.section"
        :apiName="modalContent.apiName"
    />
  </div>
</template>
<style>
.tab-container {
  display: flex;
  flex-direction: column;
}

.tab {
  display: flex;
  justify-content: space-around;
}

.tab-content {
  padding-left: 50px;
}

.tab button {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
}

.tab button.active {
  background-color: #007bff;
  color: white;
}

.tab-content {
  margin-top: 10px;
}

.execute-all-button {
  width: 110px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin-left: 300px;
}

.ag-header-cell-comp-wrapper {
  justify-content: center;
}
</style>