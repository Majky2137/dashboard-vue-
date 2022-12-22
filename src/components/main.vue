<script>
import axios from "axios";
import Chart from "chart.js/auto";
import '../../public/style.scss'
export default {
  name: 'MainDashboardContainer',
  props: {
    msg: String
  },
  data () {
    return {
      activeTab: 'tab_one',
      cryptos: [],
      logos:[],
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    setActive(tab){
      this.activeTab = tab
    },
    isActive(tab){
      return this.activeTab == tab
    },
    fetch() {
      axios.get('http://localhost:8080/v1/cryptocurrency/listings/latest', {
        headers:{
        "X-CMC_PRO_API_KEY": "key to api here"
      }}).then(response => {
        this.cryptos = response.data.data
        console.log('success');
        console.log(this.cryptos);
        

    }).catch(() => {
        console.log('error');
    });

    },
  },
    mounted() {
    const data = {
    labels: [0,1,2,3,4,5,6,7,8],
    datasets: [{
    data: [0,4.09, 12, 15, 21.5, 17.5, 20,26.5,26.5],
    borderColor: ' #7445FB',
    borderSize:0.1,
    tension: 0.4,
  },
  {
    labels: [0,1,2,3,5,6,7,],
    data: [0, 6, 18, 17, 15, 10, 11,12.5,8.5,6.5],
    borderColor: ' #858585',
    tension: 0.4,
    opacity:0.4,
    active:false,
  }]
};

    // config 
    const config = {
      type: 'line',
      data:data,
      options: {
        responsive: true,
        plugins: {
    legend: false,
},
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            ticks: {
                    display: false //this removing the bottom label
                }
          },
          suggestedMin: 0,
          suggestedMax: 25,
        }
      }
    };
    new Chart(
      document.getElementById('firstChart'),
      config
    );

  }
}
</script>

<template>
  <!-- Bae wrapper  -->
<div class="wrapper">
  <!-- Div to get size and adjust -->
  <div class="main_wrapper">
<!-- Main container of the white space app--> 
    <div class="content_container">
<!-- Header container with buttons and search_box div -->
      <div class="header_wrapper">
      <form class="search_box">
        <img src="../assets/icons/searchicon.svg" id="input-img"/>
        <input type="search" placeholder="Search"/>
      </form>
      <div class="buttons_box">
        <button type="button">
          <div class="notification_dot"></div>
          <img src="../assets/icons/bell.svg" alt="bell"/>
        </button>
        <button type="button">
          <img src="../assets/icons/hamburger.svg" alt="hamburger_icon"/>
        </button>
      </div>
    </div>
    <!-- Global container to order div -->
    <div class="lil">
      <!-- Summary and Balance cards wrapper to get grid -->
    <div class="cards_wrapper">
      <!-- First Card (Balance/Waller) -->
      <div class="card">
        <div class="header_info_wrapper">
          <h2>Current balance</h2>
          <button type="button" class="dots">
          <img src="../assets/icons/Icon.svg" alt="dots"/>
        </button>
        </div>
        <div class="card_balance_info_container">
        <h1><span style="color: #9896A1;">$</span>21 432.23</h1>
        <span class="percenteges">12% vs last month</span>
        </div>
        <div class="bottom_buttons_wrapper">
          <button type="button" class="quick_btn"><span>Quick Invest</span></button>
          <button type="button" class="show_btn"><span>Show Report</span></button>
        </div>
      </div>
        <!-- Second Card (Summary/Chart) -->
      <div class="card">
        <div class="header_info_wrapper">
          <h2>Summary</h2>
          <button type="button" class="dots">
          <img src="../assets/icons/Icon.svg" alt="dots"/>
        </button>
        </div>
          <!-- Chart container -->
        <div class="card_data_container">
            <!-- Responsive chart -->
          <canvas id="firstChart"  width="435" height="189"></canvas>
        </div>
          <!-- Legend -->
        <div class="canvas_legend_container">
          <span class="this_month"><img src="../assets/icons/el1.svg"/>This month</span>
          <span class="last_month"><img src="../assets/icons/el2.svg"/>Last month</span>
        </div>
      </div>
    </div>
  <!-- Table of crypto wallet loaded from API CoinMarketCap (listing/latest)  -->
    <div class="table_wrapper">
      <!-- Table container  -->
      <div class="table_container">
      <!-- Tabs of buttons to change content container (wrapper) -->
        <div class="tabs_wrapper">
            <!-- Tabs of buttons (container) -->
        <div class="tabs_container">
        <!-- First tab -->
        <button>
        <p class="tab_inactive" @click="setActive('tab_one')" :class="{'tab_active' : isActive('tab_one')}">Summary</p>
        </button>
        <!-- Second tab -->
        <button>
        <p class="tab_inactive" @click="setActive('tab_two')" :class="{'tab_active' : isActive('tab_two')}">Table</p>
        </button>
        <!-- Third -->
        <button>
        <p class="tab_inactive" @click="setActive('tab_three')" :class="{'tab_active' : isActive('tab_three')}">Charts</p>
        </button>
        <!-- Fourth tab -->
        <button>
        <p class="tab_inactive" @click="setActive('tab_four')" :class="{'tab_active' : isActive('tab_four')}">Reporting</p>
        </button>
        <!-- Fifth tab -->
        <button>
        <p class="tab_inactive" @click="setActive('tab_five')" :class="{'tab_active' : isActive('tab_five')}">Analysis</p>
        </button>
      </div>


      <!-- Content of tab one -->
      <div class="table_content_container" v-show="isActive('tab_one')">
      <div class="crypto_card_wrapper" v-for="data in cryptos" :key="data.id">
        <div class="crypto_card_container">
          <div class="crypto_child">
          <div class="crypto_pic_cont">
          <img :src="data.logo" alt="picture" />
          </div>
          <div class="crypto_name">
            <span>{{data.symbol}}</span>
            <h1>{{data.name}}</h1>
          </div>
        </div>

        <div class="crypto_child">
          <div class="crypto_price">
            <span>Price</span>
            <h1 id="status">${{data.quote.USD.price.toFixed(2)}}</h1>
          </div>
        </div>

        <div class="crypto_child">
          <div class="crypto_change">
            <span>Change</span>
            <h1 v-if="data.quote.USD.percent_change_1h <0"><h1 id="minus_status">{{data.quote.USD.percent_change_1h.toFixed(2)}}% <img src="../assets/icons/downarrow.svg" alt="statistics_of_crypto"/></h1></h1>
            <h1 v-else-if="data.quote.USD.percent_change_1h >=0">{{data.quote.USD.percent_change_1h.toFixed(2)}}%  <img src="../assets/icons/uparrow.svg" alt="statistics_of_crypto"/></h1>
          </div>
        </div>

        <div class="crypto_child">
          <div class="crypto_stat">
            <img v-if="data.quote.USD.percent_change_1h<0" src="../assets/icons/stat2.svg" alt="statistics_of_crypto"/>
            <img v-else-if="data.quote.USD.percent_change_1h>=0" src="../assets/icons/stat1.svg" alt="statistics_of_crypto"/>
          </div>
        </div>

        <div class="crypto_child">
          <div class="crypto_buttons">
            <button type="button" class="sell_btn"><span>Sell</span></button>
            <button type="button" class="buy_btn"><span>Buy</span></button>
          </div>
        </div>
        
        </div>
      </div>
      </div>
     <!-- Content containers of each tab -->
      <div class="table_content_container" v-show="isActive('tab_two')">
      </div>

      <div class="table_content_container" v-show="isActive('tab_three')">
      </div>

      <div class="table_content_container" v-show="isActive('tab_four')">
      </div>

      <div class="table_content_container" v-show="isActive('tab_five')">
      </div>

      </div>
    </div>
     <!-- Overlay for table wrapper like in design -->
    <div class="overlay"></div>
    </div>
   </div>
   
  </div>
  </div>
</div>
</template>


