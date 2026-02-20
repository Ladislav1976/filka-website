import { Outlet } from 'react-router-dom';
import RenderHeader from '../components/Header';
import '../index.css';

import { useState } from 'react';

const Layout2 = (props) => {
    const [toggle, setToggle] = useState(false);

    return (
        <div className={'pageLayout'}>
            <header>
                <RenderHeader
                    toggle={[toggle, setToggle]}
                    setErrMsg={props.setErrMsg}
                />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout2;
