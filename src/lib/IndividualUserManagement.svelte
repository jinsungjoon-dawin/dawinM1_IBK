
<script>
    import DashBoard  from "./DashBoard.svelte";
    import LoadDataVerifyResult from "./LoadDataVerifyResult.svelte";
    import LoadDataVerifyResultPage from "./LoadDataVerifyResultPage.svelte";
    import { onMount } from "svelte";

    
    let pageNm = "사용자 개별관리";
  
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
   
  // 테이블 데이터 배열  관리id/사용자id/pswd/부서/직급/권한 
  let products = [
    {
      name: '관리ip',
      color: 'Silver',
      category: 'Laptop',
      price: '$2999',
    },
    {
      name: '사용자id',
      color: 'White',
      category: 'Laptop PC',
      price: '$1999',
    },
    {
      name: 'pswd',
      color: 'Black',
      category: 'Accessories',
      price: '$99',
    },
    {
      name: '부서',
      color: 'Black',
      category: 'Accessories',
      price: '$99',
    },
    {
      name: '직급',
      color: 'Black',
      category: 'Accessories',
      price: '$99',
    },  {
      name: '권한',
      color: 'Black',
      category: 'Accessories',
      price: '$99',
    },
  ];     
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
                <label for="date-from" class="text-sm font-medium text-white  font-bold whitespace-nowrap" style="font-size: 25px;">    
                    1. 다윈아이씨티에서 AQT를 제공 해준다. <br>
                    2. 프로젝트 기간에만 제공하고 철수 시 따고 제공 하지는 않는다<br>
                </label>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">Product name</th>
                        <th scope="col" class="px-6 py-3">Color</th>
                        <th scope="col" class="px-6 py-3">Category</th>
                        <th scope="col" class="px-6 py-3">Price</th>
                        <th scope="col" class="px-6 py-3">
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {#each products as product, index}
                        <tr
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {product.name}
                          </th>
                          <td class="px-6 py-4">{product.color}</td>
                          <td class="px-6 py-4">{product.category}</td>
                          <td class="px-6 py-4">{product.price}</td>
                          <td class="px-6 py-4 text-right">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                              on:click={(e) => e.preventDefault()}
                              >Edit</a
                            >
                          </td>
                        </tr>
                      {/each}
                    </tbody>
                  </table>
                </div>
            </div>
            
        </div> 
    </div>
</div>

