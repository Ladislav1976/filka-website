import { Outlet } from 'react-router-dom';
import style from '../assets/styles/Layouts/FoodsLayout.module.css';
import image from '../image/banner.png';

const FoodsLayout = () => {
    return (
        <div className={style.layout}>
            <div className={style.banner}>
                <div className={style.container}>
                    <span>Rodinné recepty</span>
                    <img
                        className={style.image}
                        loading="lazy"
                        src={image}
                        alt=""
                    />
                </div>
            </div>

            <Outlet />
        </div>
    );
};

export default FoodsLayout;
