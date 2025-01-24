
<script>
    import DashBoard  from "./DashBoard.svelte";
    import LoadDataVerifyResult from "./LoadDataVerifyResult.svelte";
    import LoadDataVerifyResultPage from "./LoadDataVerifyResultPage.svelte";
    import { onMount } from "svelte";

    
    let pageNm = "사용자 가이드";
  
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
        <!-- <div class="flex w-full  items-center mt-28">
        </div> -->
        <div class="flex-col rounded-lg br1gray" style="height: 150px;">
          <!-- <div class="flex w-full">
            <h1 class="text-1xl font-bold tracking-tight text-white pt-3 pl-3 pr-3">2차 테스트 결과</h1>
          </div> -->
          <div class="flex justify-between w-full  p-3">
          
            
              <div class="fle width-39">
             
                <label for="date-from" class="text-sm font-medium text-white  font-bold whitespace-nowrap" style="font-size: 25px;">
                    
                    1. 로그인 한다. <br>
                    2. 로그인 한 다음 나오는 페이지는 모니터링 화면<br>
                </label>
              </div>
            
        </div>
      </div>
      <div class="flex-col bg-white rounded-lg ">
       
        <div class="flex-col rounded-lg br1gray" style="height: 30px;">
          <input  type="file">         
        </div>
      </div>  
  </div>

