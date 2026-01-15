import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list"

const FiltroTipoCocteles = () => {
    const [datos, setDatos] = useState([])
    const getDatos = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            //console.log(data)
            setDatos(data.drinks);

        } catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        getDatos();
    }, []);
    return (
        <>
            {datos.map((item, index) => (

                <Link to={`coctelesreactetapa1y2/licor/${item.strAlcoholic}/2`} key={index} className="dropdown-item" href="#">{item.strAlcoholic}</Link>

            ))}
        </>
    )
}

export default FiltroTipoCocteles;