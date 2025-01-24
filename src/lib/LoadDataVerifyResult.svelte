
<script>
  import DashBoard  from "./DashBoard.svelte";
  import LoadDataVerifyResult from "./LoadDataVerifyResult.svelte";
  import LoadDataVerifyResultPage from "./LoadDataVerifyResultPage.svelte";
  
  
  
  let pageNm = "Data이관 적재 Data ";

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
  
    
  </script>
<div class="container" >
    <input disabled type="text" style="font-size: 23px; text-align: center; background-color: #ffcb01; margin-bottom: 10px; margin-left: 25px; margin-top: 10px; " value="1-0차 Data 이관결과"/>
    <!--<button style="font-size: 23px; text-align: center; background-color: #b3b1ac;  margin-left: 40px; width: auto; height: auto; margin-bottom: 30px; margin-left: 98px;" on:click|preventDefault={ _=> {cnm=LoadDataVerifyResultDetailPage;pageNm = "적재Data검증"}}>상세</button>-->
    <!-- <button style="font-size: 23px; text-align: center; background-color: #b3b1ac;  ; width: auto; height: auto; margin-bottom: 30px; margin-left: 98px; ">상세</button> -->
    <!-- <button type="button" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">엑셀 다운로드</button> -->
    <input disabled type="text" style=" font-size: 23px; text-align: center; background-color: #b3b1ac; margin-bottom: 30px; margin-left: 40px;" value="250302"/>
    <input disabled type="text" style="font-size: 23px; text-align: center; background-color: #b3b1ac; margin-bottom: 30px; margin-left: 40px;" value="이행 중"/>
    <input disabled type="text" style="font-size: 23px; text-align: center; background-color: #b3b1ac; margin-bottom: 30px; margin-left: 40px;" value="18:02:05"/>
    <div class="relative flex flex-col w-full h-full  text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
      <p style="font-size: 30px; text-align: center; background: #9f00ff2e;"  >스키마 검증 결과</p>
    
    <table class="w-full text-left table-auto min-w-max">
      <thead>
        <!-- 타이틀 -->
        <tr>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title"  rowspan="2" align="center">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              구분
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title"rowspan="2" align="center">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              DB계정명
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title" colspan="2" align="center">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Table 수량
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title"colspan="2" align="center">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Idexx 수량
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title"colspan="2" align="center">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Object
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title"colspan="2" align="center">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Invalid Object
            </p>
          </th>
        </tr>
        <tr>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title" >
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              As-Is
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              To-Be
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              As-Is
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              To-Be
            </p>
          </th>
          
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              As-Is
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              To-Be
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              As-Is
            </p>
          </th>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
            <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              To-Be
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
      <!-- 리스트 1 -->
        <tr class="hover:bg-slate-50">
          <td class="p-4 border-b border-blue-gray-50 table-title"  rowspan="5"> 
          ADW       
          </td>
          <td class="p-4 border-b border-blue-gray-50"> 
            ETMSADM1
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              3,126
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              3,126
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              4,266
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              4,266
            </p>
           </td>
          <td class="p-4 border-b border-blue-gray-50" rowspan="6">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              34
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50" rowspan="6">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              34
            </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50" rowspan="6">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                1
              </p>
            </td>
            <td class="p-4 border-b border-blue-gray-50" rowspan="6">
              <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
               0
              </p>
             </td>
        </tr>
      <!-- 리스트 2 -->
        <tr class="hover:bg-slate-50">
          <td class="p-4 border-b border-blue-gray-50"> 
            ETTMADM
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              224
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              224
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              217
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
             217
            </p>
           </td>

        </tr>
      <!-- 리스트 3 -->  
        <tr class="hover:bg-slate-50">
          <td class="p-4 border-b border-blue-gray-50"> 
            ETISADM
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              125
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              125
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              25
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
             25
            </p>
           </td>
        </tr>
      <!-- 리스트 4 -->
        <tr class="hover:bg-slate-50">
          <td class="p-4 border-b border-blue-gray-50"> 
            DB관리 S/W
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              35
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              35
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              31
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
             31
            </p>
           </td>
        </tr>
      <!-- 리스트 5 -->  
        <tr class="hover:bg-slate-50">
          <td class="p-4 border-b border-blue-gray-50"> 
            DBA 영역
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              41
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              41
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              32
            </p>
          </td>
          <td class="p-4 border-b border-blue-gray-50">
            <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
             121
            </p>
           </td>
            <!-- 리스트(기타) 6 -->
              <tr class="hover:bg-slate-50">
                <td class="p-4 border-b border-blue-gray-50 table-title"> 
                  기타
                </td>
                <td class="p-4 border-b border-blue-gray-50"> 
                  EETCADM
                </td>
                <td class="p-4 border-b border-blue-gray-50">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    50
                  </p>
                </td>
                <td class="p-4 border-b border-blue-gray-50">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    50
                  </p>
                </td>
                <td class="p-4 border-b border-blue-gray-50">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    55
                  </p>
                </td>
                <td class="p-4 border-b border-blue-gray-50">
                  <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                    55
                  </p>
                </td>
               <!-- 총 수량 -->  
                    <tr class="hover:bg-slate-50" style="background-color: aquamarine;">
                      <td class="p-4 border-b border-blue-gray-50" style="text-align: center;"  colspan="2"> 
                        총 수량
                      </td>
                      
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          3,637
                        </p>
                      </td>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          3,637
                        </p>
                      </td>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          4,626
                        </p>
                      </td>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          4,715
                        </p>
                       </td>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          34
                        </p>
                      </td>
                      <td class="p-4 border-b border-blue-gray-50">
                        <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                          34
                        </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                            1
                          </p>
                        </td>
                        <td class="p-4 border-b border-blue-gray-50">
                          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                           0
                          </p>
                         </td>
        </tr>
      </tbody>
    </table>
    <p>
      <table class="w-full text-left table-auto min-w-max">
        <thead>
          <tr>
            <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 "  rowspan="2" align="center">
              <p class="block font-sans text-sm antialiased font-bold leading-none  text-blue-gray-900 opacity-70">
                특이사항
              </p>
            </th>
            <td colspan="10">
              1. Table 수량 및 Object 수량은 As-Is와 To-Be 동일함 <br>
              2. Index 수량은 As-Is 대비 To-Be에서 증가(성능 향상 및 사용자 요청)<br>
              3. As-Is의 Invalid Object는 To-Be에서 발견되지 않음
            </td>
          </tr>
        </thead>
      </table>      
     
      
    
  </div>
</div>
<div class="container" style="margin-top: 100px;">
  <p style="font-size: 30px; text-align: center; background: #9f00ff2e;">Data 검증 결과</p>
  <table class="w-full text-left table-auto min-w-max">
    <thead>
      <!-- 타이틀 -->
      <tr>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            구분
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
             Table 수량
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            As-Is SUM 값 – To-Be SUM 값
          </p>
        </th>
      </tr>
    </thead>
    <tbody>
    <!-- 리스트 1 -->
      <tr>
        <td class="p-4 border-b border-blue-gray-50 "> 
        수량      
        </td>
        <td class="p-4 border-b border-blue-gray-50"> 
          3,637
        </td>
        <td class="p-4 border-b border-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            0
          </p>
        </td>
        
      </tr>
    </tbody>
  </table>
  <p>
    <table class="w-full text-left table-auto min-w-max">
      <thead>
        <tr>
          <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 "  rowspan="2" align="center">
            <p class="block font-sans text-sm antialiased font-bold leading-none  text-blue-gray-900 opacity-70">
              특이사항
            </p>
          </th>
          <td colspan="10">
            1. As-Is Table의 주요 컬럼(숫자)에 대한 SUM값 대비 To-Be 비교 시 동일함<br>
            2. Xxx Table의 SUM값 비교 시 차이가 있음 
        </tr>
      </thead>
    </table> 
    
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
  
 
  </style>
  
  </div>
  
  
  