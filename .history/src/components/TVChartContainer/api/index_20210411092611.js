import historyProvider from "./historyProvider";
import stream from "./stream";
// import { data } from "./pairs";

const supportedResolutions = ["D", "W"];

const config = {
  supported_resolutions: supportedResolutions,
};


export default {
  onReady: (cb) => {
    console.log("=====onReady running");
    // setTimeout(function () {
    //   alert("21342536478");
    // }, 0);
    setTimeout(() => cb(config), 0);
  },
  searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
    const data = [];
    const data2 = [];
    data.push(JSON.parse(localStorage.getItem("companylist")));
    for (var i = 0; i < data[0].length; ++i) {
      // alert(data[0][i]);
      if (!data[0][i]) {
        data[0][i] = [];
      }else{
        // var n = data[0][i].search(userInput);
        // if(n >= 0)
        data2.push(data[0][i]);
      }
    }
    if (typeof data2.s == "undefined" || data2.s != "error") {
      onResultReadyCallback(data2);
    } else {
      onResultReadyCallback([]);
    }
    // console.log('====Search Symbols running')
  },
  resolveSymbol: (
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) => {
    // alert('124');
    // expects a symbolInfo object in response
    console.log("======resolveSymbol running");
    console.log("resolveSymbol:", { symbolName });
    var split_data = symbolName.split(/[:/]/);

    var symbol_stub = {
      name: symbolName,
      description: "",
      type: "crypto",
      session: "24x7",
      timezone: "Etc/UTC",
      ticker: symbolName,
      minmov: 1,
      pricescale: 100000000,
      has_intraday: true,
      intraday_multipliers: ["1", "60"],
      supported_resolution: supportedResolutions,
      volume_precision: 8,
      data_status: "streaming",
    };

    if (split_data[0][1].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
      symbol_stub.pricescale = 100000000;
    }

    setTimeout(function () {
      // console.warn(symbol_stub);

      onSymbolResolvedCallback(symbol_stub);
      // return false;
      // console.log('Resolving that symbol....', symbol_stub)
    }, 0);

    // onResolveErrorCallback('Not feeling it today')
  },
  getBars: function (
    symbolInfo,
    resolution,
    from,
    to,
    onHistoryCallback,
    onErrorCallback,
    firstDataRequest
  ) {
    console.log("=====getBars running");
    console.log("function args", arguments);
    console.log(
      `Requesting bars between ${new Date(
        from * 1000
      ).toISOString()} and ${new Date(to * 1000).toISOString()}`
    );
    //  alert('12324567');
    historyProvider
      .getBars(symbolInfo, resolution, from, to, firstDataRequest)
      .then((bars) => {
        // alert(symbolInfo.name);
        if (bars.length) {
          onHistoryCallback(bars, { noData: false });
        } else {
          onHistoryCallback(bars, { noData: false });
        }
      })
      .catch((err) => {
        // console.log({err})
        onErrorCallback(err);
      });
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscribeUID,
    onResetCacheNeededCallback
  ) => {
    // console.log('=====subscribeBars runnning')
    stream.subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscribeUID,
      onResetCacheNeededCallback
    );
  },
  unsubscribeBars: (subscriberUID) => {
    // console.log('=====unsubscribeBars running')

    stream.unsubscribeBars(subscriberUID);
  },
  calculateHistoryDepth: (resolution, resolutionBack, intervalBack) => {
    //optional
    // console.log('=====calculateHistoryDepth running')
    // while optional, this makes sure we request 24 hours of minute data at a time
    // CryptoCompare's minute data endpoint will throw an error if we request data beyond 7 days in the past, and return no data
    return resolution < 60
      ? { resolutionBack: "D", intervalBack: "5000" }
      : undefined;
  },
  getMarks: (symbolInfo, startDate, endDate, onDataCallback, resolution) => {
    //optional
    // console.log('=====getMarks running')
  },
  getTimeScaleMarks: (
    symbolInfo,
    startDate,
    endDate,
    onDataCallback,
    resolution
  ) => {
    //optional
    // console.log('=====getTimeScaleMarks running')
  },
  getServerTime: (cb) => {
    // console.log('=====getServerTime running')
  },
};
