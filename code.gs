function getCryptoPrice() {
  var sh1=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var sh2=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
  
  //Make sure that you got the API key from Coinmarketcap API dashboard and paste it in sheet_1 on cell B1
  var apiKey=sh1.getRange(1, 2).getValue();

  // list of tokens
  // ---- add your tokens here -----
  var listToken = ["BTC", "ETH", "BNB", "XRP", "CELO", "BAT", "CEL", "FLOW"];
  
  var url="https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=";
  for (var i = 0; i< listToken.length; i++){
    if(i>0) url = url + ',';
    url = url + listToken[i];
  }
  Logger.log(url);
  // var url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map";
  var requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    start: 1,
    limit: 5000,
    convert: 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': apiKey
  },
  json: true,
  gzip: true
};
  
  var httpRequest= UrlFetchApp.fetch(url, requestOptions);
  var getContext= httpRequest.getContentText();
  
  var parseData=JSON.parse(getContext);
  
  for (var i =1; i<=listToken.length; i++){
    var curToken = listToken[i-1];
    sh2.getRange(i, 1).setValue(curToken);
    sh2.getRange(i, 2).setValue(parseData.data[curToken].quote.USD.price);
  }
}
