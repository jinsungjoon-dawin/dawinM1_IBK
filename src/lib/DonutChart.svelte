<script lang="ts">
  import Chart from 'chart.js/auto';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
  import { onMount } from "svelte";
  // 플러그인 등록
  Chart.register(ChartDataLabels);
  let ctx, chartx;
  let chartCanvas;
  let config = {
    type: "pie",
    data: {
    labels: ['TASK', '완료', '지연', '진행중'],
    datasets: [
      {
        label: '',
        data: [100, 19, 3, 5],
        backgroundColor:['#34c38f'],
         circumference: 180, // 도넛 반 자르기
            rotation: 270,
        backgroundColor: [
          "#ff6384", "#3cba9f","#ffee00","#e8c3b9"
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        ],
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   // 'rgba(153, 102, 255, 1)',
        //   // 'rgba(255, 159, 64, 1)',
        // ],
        borderWidth: 1,
      },
    ],
  },
  options: {
   
    responsive: true,
    maintainAspectRatio: true,
    // aspectRatio: 1, // 차트를 정사각형으로 유지
    plugins: {
      datalabels: {
        color: 'white', // 텍스트 색상
        anchor: 'end', // 라벨 위치 조정
        align: 'top', // 라벨 정렬
        font: {
          size: 12, // 폰트 크기
        },
        formatter: (value) => value, // 표시할 값 (기본은 데이터 값)
      },
      legend: {
        display: false, // 범례 표시 여부
        labels:{color:'#fff'}
      },
      title: {
        display: true,
        text: '타이틀 임시',  
        font:{size:20},
        color:'white'
      },
    },
  },
  };

  onMount(async () => {
    ctx = chartCanvas.getContext("2d");
    chartx = new Chart(ctx, config);
  });

  // async function getData() {
  //   const res = await fetch("/barChart");
  //   if (res.ok)
  //     return await res.json();
  //   else
  //     throw new Error(res.statusText);
  // }
  
  // setInterval(async() => {
  //   // let lables = ['계좌2', '공통', '대외', '모바일', '빅데이터', '신용','정산','출납'];
  //   // hartx.data.labels = lables;
  //   const rdata = await getData() ;
  //   config.data.datasets[0].data = rdata.data ;
  //   console.log(config.data.datasets[0].data);
  //   chartx.update();
  // }, 5000);
  setInterval(async() => {
    config.data.datasets[0].data = [Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100), 
        Math.floor(Math.random() * 100)
    ];
    chartx.update()
  }, 5000);
</script>
  
  <canvas bind:this={chartCanvas} id="myChart"></canvas>
  

