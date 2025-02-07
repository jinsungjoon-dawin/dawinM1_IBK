<script lang='ts'>

import Chart, { Legend } from 'chart.js/auto';
import { onMount, onDestroy } from 'svelte';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {rooturl, intlMs} from '../aqtstore';
// 플러그인 등록
Chart.register(ChartDataLabels);

let {page, selData, title} = $props();
let ctx, chartx, chartCanvas;
 
   let config = {
    
      type: 'pie',
      dispatchEvent,
      alert: "items-center",
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#ff6384", "#3cba9f","#b604ce","#e8c3b9","#c45850"],
            data: [],
            borderColor :  ["#ff6380", "#3cba8f","#b603ce","#e8c3b0","#c45850"],
            borderWidth: 2
          }
        ]
      },
       
      options: {
        // responsive: true,
        // maintainAspectRatio: true,
        // aspectRatio: 1, 
        plugins:{
          legend:{
            display: true,
            position: 'right',
            labels: {color: 'white',
                     boxWidth: 14,
                     font: {
                      size: 15 // 범례 폰트 크기 조정
                     },
            }
          },
          title: {
            display: true,
            text: ''  ,  
            font:{size:20, weight: "normal"},
            color:'#fef9c3',
          },
          datalabels: {
          color: 'white', // 텍스트 색상
          font:{size:25},
          formatter: function(v, ctx) {
            if(v === 0)return "";
              // return v.toLocaleString(); 
              return v; 
            }
          }
        },
        layout: {
            margin: {
                left: 100  // 차트와 범례 사이의 여백 설정
            }
        }  
      },
      
  };

  export  async function parentCall() {  
      const rdata = await getData() ;
      chartDraw(rdata);
  }  
async function getData() {
  let service = '';
  if(page === "S") service = "/dashboard/perftest_checkres";
  if(page === "P") service = "/performcomposit/perfcomp_checkres?tid="+selData.tid;
  if(page === "T") service = "/testcomposit/testcomp_checkres?tid="+selData.tid;
  const res = await fetch($rooturl + service);
  if (res.ok)
    return await res.json();
  else
    throw new Error(res.statusText);
}   

function chartDraw(rdata){
  let labels = [];
  let datas = [];
  if(page === "S") {//dashboard
    if(rdata[0].gb==="3"){
      // labels = ["향상", "미수행", "지연"];
      labels = ["목표달성", "미수행", "미달성"];
      datas = [rdata[0].scnt, rdata[0].nocnt, rdata[0].delay];
    }
    else{
      labels = ["성공", "미수행", "실패"];
      datas = [rdata[0].scnt, rdata[0].nocnt, rdata[0].fcnt];
    }
  }else if(page === "P" ) {//성능
    // labels = ["향상", "미수행", "지연"];
    labels = ["목표달성", "미수행", "미달성"];
    datas = [rdata[0].scnt, rdata[0].nocnt, rdata[0].delay];
  }
  else{//테스트
    labels = ["성공", "미수행", "실패"];
    datas = [rdata[0].scnt, rdata[0].nocnt, rdata[0].fcnt];
  }
  let totCnt = rdata[0].tcnt;
  config.data.labels = labels;
  config.data.datasets[0].data = datas ;
  config.options.plugins.title.text = (title === undefined ? "" : title) +" 대상: " + totCnt + "개";
  chartx.update();
}


onMount( async () => {
  ctx = chartCanvas.getContext("2d");
  chartx = new Chart(ctx, config);
  await parentCall();
});

const interval = setInterval(parentCall, $intlMs);

onDestroy(()=> clearInterval(interval));
</script>
<canvas bind:this={chartCanvas} id="myChart"></canvas>
  