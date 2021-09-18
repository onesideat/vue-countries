import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App);

app.config.globalProperties.$filters = {
    number_format(number: number | string, decimals: number, dec_point: string, thousands_sep: string) {
        // Strip all characters but numerical ones.
       number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
       const n = !isFinite(+number) ? 0 : +number,
           prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
           sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
           dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
           toFixedFix = function (n: any, prec: any) {
               const k = Math.pow(10, prec);
               return '' + Math.round(n * k) / k;
           };

       const s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
       if (s[0].length > 3) {
           s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
       }
       if ((s[1] || '').length < prec) {
           s[1] = s[1] || '';
           s[1] += new Array(prec - s[1].length + 1).join('0');
       }
       return s.join(dec);
    }
};

app.use(router);
app.mount('#app');