//フレームワークはVue.js(2系), グラフ表示にhighchartsを使用
let nowdate = new Date();
const graphvm = new Vue({
  el: "#graph",
  data: {
    graphdisplay: "block",
    career: [
      {
        name: "金沢大学",
        date: [{ start: Date.UTC(2020, 4), finish: Date.UTC(2024, 4) }],
      },
      {
        name: "トライプラス(塾バイト)",
        date: [{ start: Date.UTC(2020, 4), finish: Date.UTC(2021, 9) }],
      },
      {
        name: "マナベスト(塾バイト)",
        date: [
          {
            start: Date.UTC(2021, 9),
            finish: Date.UTC(nowdate.getFullYear(), nowdate.getMonth() + 1),
          },
        ],
      },
      {
        name: "株式会社能登(インターン)",
        date: [
          { start: Date.UTC(2021, 7), finish: Date.UTC(2021, 9) },
          { start: Date.UTC(2022, 2), finish: Date.UTC(2022, 4) },
        ],
      },
      {
        name: "株式会社Arent(インターン)",
        date: [{ start: Date.UTC(2021, 9), finish: Date.UTC(2022, 5) }],
      },
      {
        name: "株式会社BLAM(インターン)",
        date: [{ start: Date.UTC(2022, 8, 9), finish: Date.UTC(2022, 11, 7) }],
      },
      {
        name: "株式会社ラクスル(インターン)",
        date: [{ start: Date.UTC(2022, 8, 22), finish: Date.UTC(2022, 8, 26) }],
      },
      {
        name: "株式会社メディアドゥ(インターン)",
        date: [{ start: Date.UTC(2022, 9, 8), finish: Date.UTC(2022, 9, 14) }],
      },
    ],
    graphdata: [],
    showgraph: true,
  },
  methods: {
    swichsheet: function (nextstatus) {
      this.graphdisplay = nextstatus;
      this.showgraph = !this.showgraph;
    },
    formatDate: function (datetime) {
      let dt = new Date(datetime);
      if (dt.getDate() != undefined){
        return `${dt.getFullYear()}年${dt.getMonth()}月${dt.getDate()}日`;
      }
      return `${dt.getFullYear()}年${dt.getMonth()}月`;
    },
  },
  watch: {},
  mounted() {
    this.career.forEach((element, index) => {
      element.date.forEach((dateele) => {
        this.graphdata.push({
          x: dateele.start,
          x2: dateele.finish,
          y: index,
        });
      });
    });
    Highcharts.chart("container", {
      chart: {
        type: "xrange",
        scrollablePlotArea: {
          minWidth: 1000,
          scrollPositionX: 1,
        },
      },
      title: {
        text: "職務経歴",
      },
      accessibility: {
        point: {
          descriptionFormatter: function (point) {
            let ix = point.index + 1,
              category = point.yCategory,
              from = new Date(point.x),
              to = new Date(point.x2);
            return (
              ix +
              ". " +
              category +
              ", " +
              from.toDateString() +
              " to " +
              to.toDateString() +
              "."
            );
          },
        },
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          let from = new Date(this.x);
          let to = new Date(this.x2);
          return `${
            this.yCategory
          }<br>${from.getFullYear()}/${from.getMonth()}-${to.getFullYear()}/${to.getMonth()}`;
        },
      },
      xAxis: {
        type: "datetime",
        labels: {
          format: "{value: %Y}",
          align: "right",
          rotation: -30,
        },
        tickInterval: 365 * 24 * 3600 * 1000,
        plotLines: [
          {
            value: Date.UTC(nowdate.getFullYear(), nowdate.getMonth() + 1),
            dashStyle: "dash",
            width: 1,
            color: "#d33",
            label: {
              text: "現在",
              align: "center",
            },
          },
        ],
      },
      yAxis: {
        title: {
          text: "",
        },
        categories: this.career.map((e) => e.name),
        reversed: true,
      },

      series: [
        {
          name: "経歴",
          // pointPadding: 0,
          // groupPadding: 0,
          borderColor: "gray",
          pointWidth: 20,
          data: this.graphdata,
          dataLabels: {
            enabled: true,
          },
        },
      ],
      plotOptions: {
        xrange: {},
      },
    });
  },
});
