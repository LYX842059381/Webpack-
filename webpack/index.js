import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';

import Root from '@/page/Root';

ReactDom.render(<Root />, document.querySelector('#root'));

if (module.hot) {
    module.hot.accept();
}