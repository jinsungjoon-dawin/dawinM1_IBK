
<script>
    import DashBoard  from "./DashBoard.svelte";
    import LoadDataVerifyResult from "./LoadDataVerifyResult.svelte";
    import LoadDataVerifyResultPage from "./LoadDataVerifyResultPage.svelte";
    import { onMount } from "svelte";

    
    let pageNm = "일괄 삭제";
  
    let cnm = DashBoard ;
  
      export let tcode ;
      let conds = {
        tcode: "",
        rcode: '',
        page: 0,
        psize: 20,
        cond: "",
        uri: "",
        task:""
      };
      /*
      let sv_row;
      let promise = Promise.resolve([]);
      async function getdata() {
          const res = await fetch( "/dashboard/list/"+$authApps);
          promise = await res.json();
    //      console.log(" call dashboard end", promise) ;
      }
    */
    let list = [];

  async function getData() {
    const res = await fetch("/performComposit" );
    if (res.ok)
      return await res.json();
    else
      throw new Error(res.statusText);
  }
  
  
  onMount(async () => {
    list = await getData() ;
    list = list.data;
  });
   
      
</script>   
<style>
    .tcode-status {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    overflow-y: auto;
    border: 1px solid black;
    }
    .table-title {
    background-color: #a9c8ff;
    border-bottom-style: solid;
    }

    html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden; /* 스크롤 제거 */
  }
  .width-29 { width: 29%;}
  .width-49 { width: 49%;}
  .width-35 { width: 35%;}
  .width-69 { width: 69%;}
  .width-85 { width: 85%;}
  .bb1gray{ border-bottom: 1px solid gray;}
  .bl1gray{ border-left: 1px solid gray;}
  .br1gray{ border-right: 1px solid gray;}
  .bt1gray{ border-top: 1px solid gray;}

  
</style>
    <div class="flex-col bg-gray-700 rounded-lg ">
        <div class="flex-col rounded-lg br1gray" style="height: 600px;">
          <div class="flex justify-between w-full  p-3">
            <div class="fle width-39">             
                <label for="date-from" class="text-sm font-medium text-white mt-10 font-bold whitespace-nowrap" style="font-size: 25px;">    
                  1. 성능 Data Upload :
                </label>
                <input type="file" multiple="" class="block w-full disabled:cursor-not-allowed  mb-12 disabled:opacity-50 rtl:text-right focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 rounded-lg text-sm p-2.5 border !p-0 dark:text-gray-400"> 
                <label for="date-from" class="text-sm font-medium text-white  mt-40 font-bold whitespace-nowrap" style="font-size: 25px;">    
                  2. Data 검증 Upload<br>
                  <input type="file" multiple="" class="block w-full disabled:cursor-not-allowed mb-12 disabled:opacity-50 rtl:text-right focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 rounded-lg text-sm p-2.5 border !p-0 dark:text-gray-400"> 
                </label>
                <label for="date-from" class="text-sm font-medium text-white mt-10 font-bold whitespace-nowrap" style="font-size: 25px;">    
                  3. 시나리오 Upload
                  <input type="file" multiple="" class="block w-full disabled:cursor-not-allowed mb-12 disabled:opacity-50 rtl:text-right focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 rounded-lg text-sm p-2.5 border !p-0 dark:text-gray-400"> 
                </label>
                <label for="date-from" class="text-sm font-medium text-white mt-10 font-bold whitespace-nowrap" style="font-size: 25px;">    
                  4. 사용자 가이드 Upload<br>
                  <input type="file" multiple="" class="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600 rounded-lg text-sm p-2.5 border !p-0 dark:text-gray-400"> 
                </label>
            </div>
            <div class="flex items-center justify-center w-full">
            </div>    
          </div> 
        </div> 
      </div>



