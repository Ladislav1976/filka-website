import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className={'pageLayout'}>
            <Outlet />
        </div>
    );
};

export default Layout;
