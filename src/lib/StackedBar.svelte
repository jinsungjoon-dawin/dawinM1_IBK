<script lang="ts">
  import Chart from 'chart.js/auto';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import { onMount } from "svelte";
  import {rooturl} from '../aqtstore';
  // 플러그인 등록
  Chart.register(ChartDataLabels);
  
  export let page;
  let ctx, chartx;
  let chartCanvas;
  let config =  {
      type: 'bar',
      data: {
        datasets: [{
          label: 'AS IS',  // 첫 번째 데이터셋
          backgroundColor: ['#5156be'],  // 색상
          borderWidth: 1
        }, {
          label: 'TO BE',  // 두 번째 데이터셋
          // data: [7, 11, 5, 8, 3],
          backgroundColor:['#34c38f'],
          // borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            // stacked: true  // x축에 대해 스택되도록 설정
            ticks: {
                    color: 'white' // X축 레이블 글씨 색상 설정
                },
                grid: {
                display: true, // 그리드 표시 여부
                color: 'gray', // 그리드 색상
              }
          },
          y: {
            // stacked: true  // y축에 대해 스택되도록 설정
            ticks: {
                    color: 'white' // X축 레이블 글씨 색상 설정
                },
                grid: {
                display: true, // 그리드 표시 여부
                color: 'gray', // 그리드 색상
              }
          }
        },
        plugins: {
          datalabels: {
            color: 'white', // 텍스트 색상
          },
          title: {
            display: true,
            text: '',  
            font:{size:20},
            color:'white'  
          },
          legend: {
            display: false, // 범례 표시 여부
            labels:{color:'#fff'}
          },
      }
      },
      
    };

  onMount(async () => {
    ctx = chartCanvas.getContext("2d");
    chartx = new Chart(ctx, config);
  });

  async function getData() {
    let service = "";
    if(page === "S") service = "/dashboard/perftest_list";
    else if(page === "D") service = "/dashboard/datatr_list"; 
    else if(page === "M") service = "/dashboard/datatr_checkres"; 
    const res = await fetch($rooturl + service);
    if (res.ok)
      return await res.json();
    else
      throw new Error(res.statusText);
  }
  
  
  function chartDraw(rdata){
    if(page === "S"){
      let apnms = [];
      let tcnts = [];
      let scnts = [];
      let totCnt = 0;
      rdata.forEach((element) => {
        apnms.push(element.apnm);
        tcnts.push(element.tcnt);
        totCnt += element.tcnt;
        scnts.push(element.scnt);
      });
      config.data.labels = apnms;
      config.data.datasets[0].data = tcnts ;
      config.data.datasets[1].data = scnts;
      config.options.plugins.title.text = "전체 수량: " + totCnt +"개";
    }else if(page === "D"){
      let labels = ["Table", "Index", "Object", "Invalid Object"];
      let asiss = [rdata[0].tblAsis, rdata[0].idxAsis, rdata[0].objAsis, rdata[0].invalidAsis];
      let tobes = [rdata[0].tblTobe, rdata[0].idxTobe, rdata[0].objTobe, rdata[0].invalidTobe];
      let totCnt = rdata[0].tblAsis + rdata[0].idxAsis + rdata[0].objAsis + rdata[0].invalidAsis;
      config.data.labels = labels;
      config.data.datasets[0].data = asiss;
      config.data.datasets[1].data = tobes;
      config.options.plugins.title.text = "전체 수량: " + totCnt +"개";
    }else if(page === "M"){
      // [{"tblTobe":2650,"tblAsisTobeSum":50}]
      config.data.labels = ["Table", "As-is Sum - To-be Sum"];
      config.data.datasets[0].data = [rdata[0].tblTobe,rdata[0].tblAsisTobeSum];
      if(config.data.datasets.length > 1)config.data.datasets.pop();
      config.options.plugins.title.text = "전체 수량: " + rdata[0].tblTobe + " 개";
      config.data.datasets[0].backgroundColor =  ["#5156be", "#34c38f"];
    }
    chartx.update();
  }
  
  setInterval(async() => {
    const rdata = await getData() ;
    chartDraw(rdata);
  }, 5000);

  setTimeout(async() => {
    const rdata = await getData() ;
    chartDraw(rdata);
  }, 50);

</script>
  
  <canvas bind:this={chartCanvas} id="myChart" class="flex"></canvas>
  

