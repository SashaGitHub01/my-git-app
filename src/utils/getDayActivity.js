const getDayActivity = (val) => {
   if (val > 20) return 'rgb(20, 77, 6)';

   if (val > 15) return 'rgb(53, 107, 39)';

   if (val > 10) return 'rgb(40, 139, 15)';

   if (val > 7) return 'rgb(67, 182, 39)';

   if (val > 4) return 'rgb(87, 240, 70)';

   if (val === 0) return 'rgb(248, 248, 248)';

   if (val === 1) return 'rgb(219, 255, 215)';

   if (val === 2) return 'rgb(192, 253, 185)';

   if (val === 3) return 'rgb(165, 253, 155)';

   if (val === 4) return 'rgb(139, 253, 127)';

}

export default getDayActivity;