import React from 'react';
import UseWindowSize from '../../../utils/useWindowSize';
import UpdateLogContainer from './updateLogContainer';
import QuickLogContainer from './quickLogContainer';

const LogMainCintroller = () => {
    const size = UseWindowSize();
    return (
        <div>
            {size.width >= '900' && <UpdateLogContainer />}
            {size.width <= '900' && <QuickLogContainer />}
        </div>
    );
}

export default LogMainCintroller;