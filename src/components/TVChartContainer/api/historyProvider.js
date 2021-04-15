import pairs from "./pairs";
var rp = require("request-promise").defaults({ json: true });
// const api_root = "https://min-api.cryptocompare.com";
const api_root = 'https://stock.logo-design360.com/trade-api/public/api/';
// const api_root = "http://localhost:9080/trade-api/public/api/";

const history = {};

export default {
  history: history,

  getBars: function (symbolInfo, resolution, from, to, first, limit) {
    var split_symbol = symbolInfo.name.split(/[:/]/);

    if (history["status"] == null) {
      history["status"] = true;
    }

    if (symbolInfo.name != history["company"]) {
      // history = {};
      history["status"] = true;
    }
    // console.warn("+111"+split_symbol);
    // return false;
    // alert(resolution);
    // const url =
    //   resolution === "D"
    //     ? "/data/histoday"
    //     : resolution >= 60
    //     ? "/data/histohour"
    //     : "/data/histominute";

    // alert(`${api_root}${url}`);
    // alert(1);
    // console.warn(url+"11111111111111111111");
    if (history["status"] == true) {
      const url = "trading_view_daily?symbol="+symbolInfo.name.replace('/','-');
      const qs = {
        e: pairs[split_symbol[0] + "/" + split_symbol[1]],
        fsym: split_symbol[0],
        tsym: split_symbol[1],
        toTs: to ? to : "",
        limit: limit ? limit : 2000,
        // aggregate: 1//resolution
      };
      // console.info(qs);
      // return false;
      return rp({
        url: `${api_root}${url}`,
        qs,
      }).then((data) => {
        if (history[symbolInfo.name] != null) {
          if (
            history[symbolInfo.name].lastBar.time_origin ==
            data.Data[data.Data.length - 1].time
          ) {
            history["status"] = false;
            return false;
          }
        }
        // console.warn(data.Data);
        if (data.Response && data.Response === "Error") {
          // console.log('CryptoCompare API error:',data.Message)
          return [];
        }
        if (data.Data.length) {
          // alert('adfsf');
          // console.warn(data.Data);
          // console.log(`Actually returned: ${new Date(data.TimeFrom * 1000).toISOString()} - ${new Date(data.TimeTo * 1000).toISOString()}`)
          // var bars = data.Data.map(el => {})
          var bars = data.Data.map((el) => {
            return {
              time_origin: el.time,
              time: el.time * 1000, //TradingView requires bar time in ms
              low: el.low,
              high: el.high,
              open: el.open,
              close: el.close,
              volume: el.volumefrom,
            };
          });
          // console.log("1234567"+first);
          if (first) {
            var lastBar = bars[bars.length - 1];
            // alert(lastBar);
            history[symbolInfo.name] = { lastBar: lastBar };
            history["company"] = symbolInfo.name;
            // console.info("11"+lastBar);
            // return false;
            // alert(lastBar);
          }
          return bars;
        } else {
          return [];
        }
      });
    }
  },
};
