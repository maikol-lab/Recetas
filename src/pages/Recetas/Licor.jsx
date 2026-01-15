import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardCocteles from "../../components/Card/CardCocteles";

const API1 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
const API2 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=";
const API3 = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="

const Licor = () => {
  const params = useParams()
  let id = params.id;
  let tipo = params.tipo;
  const [datos, setDatos] = useState([])
  const [titulo, setTitulo] = useState("")
  let URI = API1 + id;
  if (tipo == 2) {
    URI = API2 + id;
  }
  if (tipo == 3) {
    URI = API3 + id;
  }

  const getDatos = async () => {

    try {
      const response = await fetch(URI);
      const data = await response.json();
      //console.log(data) 
      setTitulo("Cócteles a base de " + id)
      setDatos(data.drinks);

    } catch (error) {
      console.error(error)
    }
  };
  useEffect(() => {
    getDatos();
  }, [params.id]);




  return (
    <main className="fondoLicor">
      <h1 className="text-center py-5 ">({datos.length}) {titulo}</h1>
      <div className="container animate_animated animate__bounceOut">

        <div className="row">
          {datos && datos.map((item, index) => (
            <CardCocteles key={index} item={item} />
          ))}


        </div>

      </div>
    </main>


  )
}

export default Licor;