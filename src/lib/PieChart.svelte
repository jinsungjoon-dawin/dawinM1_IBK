<script lang='ts'>

    import Chart, { Legend } from 'chart.js/auto';
    import { onMount, onDestroy } from 'svelte';
    import ChartDataLabels from 'chartjs-plugin-datalabels';
    import {rooturl} from '../aqtstore';

    const chartColors = [
    "#00d1d1", "#aaff00", "#ffaa33", "#ff4c4c", 
    "#ffee00", "#aa88ff", "#ff99cc", "#33ccff", 
    "#66ffcc", "#cccccc"
  ];
  
  export let page;
  export let date;

    Chart.register(ChartDataLabels);
     let ctx, chartx;
     let chartCanvas;
    //  let datas = [2478,5267,734,784,433] ;
     const config = {
      
        type: 'pie',
        dispatchEvent,
        alert: "items-center",
        data: {
          labels: [],
          datasets: [
            {
              // label: "Population (millions)",
              backgroundColor: ["#ff6384", "#3cba9f","#ffee00","#e8c3b9","#c45850"],
              // backgroundColor: ["#00d1d1", "#aaff00","#ffaa33","#ff4c4c","#ffee00"],
              // circumference: 180, // 도넛 반 자르기
              //rotation: 270,
               data: [],
              // count: datas,
            }
          ]
        },
         
        options: {
          // responsive: true,
          // maintainAspectRatio: true,
          // aspectRatio: 1, 
          plugins:{
            legend:{
              display: false,
              position: 'left',
              labels: {color: 'white'}
            },
            title: {
              display: true,
              text: '수정 해야함'  ,  
              font:{size:20, weight: "normal"},
              color:'#fef9c3',
            },
            datalabels: {
            color: 'white', // 텍스트 색상
            font:{size:18},
            formatter: function(v, ctx) {
              if(v === 0)return "";
                return v.toLocaleString(); 
              }
            }
          }  
        }
    };
  async function getData() {
    let service = '';
    if(page === "S") service = "/dashboard/perftest_checkres";
    if(page === "P") service = "/performcomposit/perfcomp_checkres?tobeDt="+date;
    const res = await fetch($rooturl + service);
    if (res.ok)
      return await res.json();
    else
      throw new Error(res.statusText);
  }   
  
  function chartDraw(rdata){
    if(page === "S" || page === "P") {
      let labels = ["향상", "미수행", "지연"]
      let datas = [rdata[0].scnt, rdata[0].nocnt, rdata[0].delay];
      let totCnt = rdata[0].tcnt;
      config.data.labels = labels;
      config.data.datasets[0].data = datas ;
      config.options.plugins.title.text = "총 테스트 대상: " + totCnt + "개";
      chartx.update();
    }
    
  }

  onMount( async () => {
    ctx = chartCanvas.getContext("2d");
    chartx = new Chart(ctx, config);
    const rdata = await getData() ;
    chartDraw(rdata);
  });

  const interval = setInterval(async() => {
    const rdata = await getData() ;
    chartDraw(rdata);
  }, 5000);

  onDestroy(()=> clearInterval(interval));
  

    </script>
    
  
   
    <canvas bind:this={chartCanvas} id="myChart"></canvas>
    