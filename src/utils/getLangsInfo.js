const getLangsInfo = (languages) => {
   if (!languages) return;

   const vals = Object.values(languages);
   let sum = 0;

   for (let val of vals) {
      sum += val;
   }

   const percents = vals.map((val) => ((val / sum) * 100).toFixed(1)).filter((val) => val != '0.0');
   const keys = Object.keys(languages).slice(0, percents.length);

   return { names: keys, counts: percents }
}

export default getLangsInfo;