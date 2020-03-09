const FILES = [
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv',
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv',
  'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv'
];

function handleComplete({ data: entries, errors }) {
  if (errors.length) return [];
  
  const parsedResults = [];
  for (const entry of entries) {
    parsedResults.push(transform(entry));
  }
  return parsedResults;
}

function transform(entry) {
  return {
    state: entry['Province/State'],
    country: entry['Country/Region'],
    latitude: entry.Lat,
    longitude: entry.Long,
    reportedCount: getLastReportedNumber(entry),
    lastReportDate: getLastReportedDate(entry)
  };
}

function getLastReportedDate(entry) {
  return Object.keys(entry).pop();
}

function getLastReportedNumber(entry) {
  const keys = Object.keys(entry);
  return entry[keys[keys.length - 1]];
}

module.exports = {
  handleComplete,
  FILES
};
