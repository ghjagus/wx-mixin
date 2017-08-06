import addPolyfills from  './addPolyfills';
import PagesStack from './pagesStack';

export default function enhanceApp(config) {
  addPolyfills();
  
  // 是否要增加一些其它的增强
  return Object.assign({
    $pagesStack: new PagesStack(),
  }, config);
}