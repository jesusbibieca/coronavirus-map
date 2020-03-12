const FILES = [
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv',
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv',
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv'
];

function handleComplete({ data: entries }) {
  const parsedResults = [];
  for (const entry of entries) {
    parsedResults.push(transform(entry));
  }
  parsedResults.unshift(calculateTotalOcurrence(parsedResults));
  return parsedResults.filter(Boolean);
}

function calculateTotalOcurrence(entries) {
  let count = 0;
  for  (const entry of entries) {
    if (entry && entry.reportedCount) {
      count = count + parseInt(entry.reportedCount, 10);
    }
  }
  return count;
}

function transform(entry) {
  if (entry.Lat && entry.Long) {
    return {
      state: entry['Province/State'],
      country: entry['Country/Region'],
      latitude: entry.Lat,
      longitude: entry.Long,
      reportedCount: getLastReportedNumber(entry),
      lastReportDate: getLastReportedDate(entry)
    };
  }
}

function getLastReportedDate(entry) {
  return Object.keys(entry).pop();
}

function getLastReportedNumber(entry) {
  const keys = Object.keys(entry);
  let number = 0;
  for (let i = 1; i < keys.length; i++) {
    number = entry[keys[keys.length - i]];
    if(number) break;
  }
  return number;
}

module.exports = {
  handleComplete,
  FILES
};
