function getCryptoPrice() {
  var sh1=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  var sh2=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
  
  //Make sure that you got the API key from Coinmarketcap API dashboard and paste it in sheet_1 on cell B1
  var apiKey=sh1.getRange(1, 2).getValue();
  
  var url="https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH"
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
  sh2.getRange(1, 2).setValue(parseData.data.BTC.quote.USD.price)
  sh2.getRange(2, 2).setValue(parseData.data.ETH.quote.USD.price)

}
