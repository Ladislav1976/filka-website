import style from '../assets/styles/Components/FoodItem.module.css';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import default_image from '../image/default_image1.jpg';

export default function FoodItem(props) {
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);
    const food = props.food;
    const id = props.food.id;
    console.log(food?.images);
    return (
        <>
            {
                <div
                    className={style.foodcontainer}
                    onClick={() => navigate(`/recepty/${id}/`)}
                >
                    <div
                        style={{
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            className={style.image}
                            loading="lazy"
                            src={food?.images || default_image}
                            alt="Nacitany obrazok"
                            onLoad={() => setLoaded(true)}
                            style={{
                                opacity: loaded ? 1 : 0,
                                transition: 'opacity 0.3s ease-in',
                            }}
                            key={food.images}
                        />
                        <div className={style.foodName}>{props.food.name}</div>
                    </div>
                </div>
            }
        </>
    );
}
