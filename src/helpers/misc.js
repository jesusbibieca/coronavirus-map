export function groupByCountry(data) {
  if (!data) {
    return [];
  }

  return data.reduce((acc, obj) => {
   let key = obj['country'];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export function sumReportedCountByCountry(data) {
  let arr = [];
  Object.keys(data).map(country => {
   const totalReportedCount = data[country].map(field => field.reportedCount).reduce((prev, curr) => Number(prev) + Number(curr), 0);
   arr.push({
     [country]: {
      totalReportedCount,
       cities: [...data[country]]
     }
   });

   return arr;
 });
 return arr;
}
