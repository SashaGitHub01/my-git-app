const getLangBgc = (lang) => {
   const type = lang.toLowerCase();

   switch (type) {
      case 'javascript':
         return 'rgb(224, 221, 5)';

      case 'typescript':
         return 'rgb(9, 239, 247)';

      case 'html':
         return 'rgb(206, 136, 7)';

      case 'vue':
         return 'rgb(83, 172, 112)';

      case 'shell':
         return 'rgb(85, 85, 85)';

      case 'c':
         return 'rgb(75, 55, 248)';

      case 'c++':
         return 'rgb(75, 109, 184)';

      case 'java':
         return 'rgb(224, 173, 61)';

      case 'python':
         return 'rgb(23, 253, 15)';

      case 'css':
         return 'rgb(196, 41, 41)';

      case 'go':
         return 'rgb(9, 118, 138)';

      case 'rust':
         return 'rgb(46, 46, 46)';

      case 'dockerfile':
         return 'rgb(161, 255, 255)';

      case 'scss':
         return 'rgb(240, 72, 255)';

      case 'sass':
         return 'rgb(240, 72, 255)';

      case 'less':
         return 'rgb(240, 72, 255)';

      default:
         return 'rgb(200, 200, 200)';
   }
}

export default getLangBgc;