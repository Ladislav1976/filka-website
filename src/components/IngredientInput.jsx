import { useState } from 'react';
import style from '../assets/styles/Components/IngredientInput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faTrash,
    faAngleDown,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';

function Quantity(props) {
    return (
        <>
            <div className={style.quantityIngredient}>{props.quantity}</div>
        </>
    );
}

function Unit(props) {
    return (
        <>
            <div className={style.unitIngredient}>{props.unit}</div>
        </>
    );
}

function Ingredient(props) {
    return <div className={style.ingIngredient}>{props.ing}</div>;
}
function Ing(props) {
    const component = props.component;

    function handleIngredientMove(move, ing) {
        props.ingredientMove(move, ing);
    }

    return (
        <>
            <div className={style.ingredientContent}>
                <div className={style.qtUnit}>
                    <Quantity quantity={props.ing?.quantity} />
                    <Unit unit={props.ing?.unit?.unit} />
                </div>
                <div className={style.ingreUpDown}>
                    <Ingredient ing={props.ing?.ingredient?.ingredient} />
                    {(component === 'editcomponent' ||
                        component === 'newcomponent') && (
                        <>
                            <div className={style.upddownbox}>
                                <div className={style.upddownIcons}>
                                    <div
                                        className={style.up}
                                        onClick={() => {
                                            handleIngredientMove(-1, props.ing);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faAngleDown}
                                            onClick={() => {
                                                handleIngredientMove(
                                                    -1,
                                                    props.ing,
                                                );
                                            }}
                                        ></FontAwesomeIcon>
                                    </div>{' '}
                                    <div
                                        className={style.down}
                                        onClick={() => {
                                            handleIngredientMove(1, props.ing);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faAngleDown}
                                            onClick={() => {
                                                handleIngredientMove(
                                                    1,
                                                    props.ing,
                                                );
                                            }}
                                        ></FontAwesomeIcon>{' '}
                                    </div>
                                </div>{' '}
                                <FontAwesomeIcon
                                    className={style.iconDelete}
                                    icon={faTrash}
                                    onClick={() => {
                                        props.handleIngredientDelete(props.ing);
                                    }}
                                ></FontAwesomeIcon>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default function IngredientInput(props) {
    const unitQf = props.unitsDw || [];
    const [addedQuantity, setAddedQuantity] = useState(1);
    const [addedUnit, setAddedUnit] = useState(unitQf ? unitQf[0] : '');
    const [addedIngredient, setAddedIngredient] = useState('');
    const component = props.component;
    let ingredientsSet = props.ingredientsList;

    function handleAddIngredients() {
        props.addToIngredientList(addedQuantity, addedUnit, addedIngredient);
        setAddedIngredient('');
        setAddedQuantity(1);
        setAddedUnit(unitQf ? unitQf[0] : '');
    }

    function cleanString(text) {
        return text
            .trim() // Odstráni medzery zo začiatku a konca
            .replace(/\s+/g, ' ')
            .toLowerCase(); // Nahradí 2 a viac medzier v strede jednou medzerou
    }
    function handleChangeIngredient(event) {
        let uniqueID = new Date().toISOString();
        const ingreObj = {
            id: uniqueID,
            ingredient: cleanString(event.target.value),
        };
        setAddedIngredient(ingreObj);
    }
    function handleAddQuantity(event) {
        let qt = event.target.value;
        const VerNum = Number(qt) * 1;
        const isFloat = /\d+\.\d+/.test(qt);
        if (Number.isInteger(VerNum) || isFloat) {
            setAddedQuantity(qt);
        } else {
            props.handlerSetModalErrorMissing('Vložene množstvo nie je číslo');
        }
    }

    function handleAddUnit(item) {
        const res = unitQf.find((res) => res.id === item);

        setAddedUnit(res);
    }

    function handleIngredientDelete(ingre) {
        props.removeFromIngredientList(ingre);
    }

    const ingredientListRender = [];

    ingredientsSet.forEach((ingre, index) => {
        if (ingre.statusDelete === false) {
            ingredientListRender.push(
                <Ing
                    unitQf={unitQf}
                    ing={ingre}
                    key={ingre.id}
                    index={index}
                    handleIngredientDelete={() => handleIngredientDelete(ingre)}
                    component={component}
                    ingredientMove={props.ingredientMove}
                />,
            );
        }
    });

    return (
        <>
            <div className={style.ingredientsbox}>
                {component === 'viewcomponent' && (
                    <div className={style.title}>
                        <p>Suroviny:</p>
                    </div>
                )}

                {(component === 'editcomponent' ||
                    component === 'newcomponent') && (
                    <div className={style.ingredientcontainer}>
                        <div className={style.title}>
                            <p>Suroviny:</p>
                        </div>
                        <input
                            type="text"
                            className={style.quantity}
                            ref={props.qtRef}
                            onKeyDown={props.qrKeyDown}
                            id="tm"
                            value={addedQuantity}
                            onChange={handleAddQuantity}
                        />
                        {/* <input
                                type="text"
                                className={style.unit}
                                id="tm"
                                value={addedUnit}
                                onChange={handleChangeUnit}
                            /> */}
                        {/* <select
                            className={style.unit}
                            onChange={handleChangeUnit}
                            value={addedUnit}
                            ref={props.unitRef}
                            onKeyDown={props.unitKeyDown}
                        >
                            <option>-</option>
                            <option>ks</option>
                            <option>kg</option>
                            <option>g</option>
                            <option>dg</option>
                            <option>ml</option>
                            <option>dl</option>
                            <option>liter</option>
                            <option>pl</option>
                            <option>čl</option>
                            <option>kl</option>
                            <option>štipka</option>
                            <option>bal.</option>
                            <option>podľa potreby</option>
                            <option>plátky</option>
                            <option>konzerva</option>
                        </select> */}
                        <select
                            className={style.unit}
                            onChange={(e) =>
                                handleAddUnit(parseInt(e.target.value))
                            }
                            value={addedUnit.id}
                            ref={props.unitRef}
                            onKeyDown={props.unitKeyDown}
                        >
                            <option value={unitQf[0]?.id ? unitQf[0].id : ''}>
                                {unitQf[0]?.unit ? unitQf[0]?.unit : ''}
                            </option>
                            {(unitQf || []).slice(1).map(
                                (unit) =>
                                    unit && (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.unit}
                                        </option>
                                    ),
                            )}
                        </select>

                        <input
                            type="text"
                            className={style.ingredientInput}
                            placeholder="Napiste nazov suroviny"
                            value={addedIngredient.ingredient || ''}
                            ref={props.ingrRef}
                            onKeyDown={props.ingKeyDown}
                            onChange={handleChangeIngredient}
                        />
                        {/* <div
                        className={style.ingredientButton}
                        onClick={addIngredientToTagList}
                    >
                        Pridať
                    </div> */}
                        <div className={style.iconAdd}>
                            <FontAwesomeIcon
                                icon={faPlus}
                                onClick={handleAddIngredients}
                            ></FontAwesomeIcon>
                        </div>
                    </div>
                )}
                <div className={style.ingredientsList}>
                    {ingredientListRender}
                </div>
            </div>
        </>
    );
}
