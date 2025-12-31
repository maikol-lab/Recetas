import { useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

const CardCocteles = ({ item }) => {
    const { cart, agregar2 } = useContext(CarritoContext);

    // Obtener cantidad actual en el carrito
    const getCantidad = () => {
        const itemInCart = cart.find(cartItem => cartItem.id === item.idDrink);
        return itemInCart ? itemInCart.cantidad : 0;
    };

    const cantidadEnCarrito = getCantidad();

    // Función para añadir al carrito
    const handleAddToCart = () => {
        // Crear objeto producto para el carrito
        const producto = {
            id: item.idDrink,
            title: item.strDrink,
            price: 15.99, // Precio por defecto para cócteles
            thumbnail: item.strDrinkThumb,
            stock: 100 // Stock por defecto
        };

        agregar2(producto); // Usar agregar2 que suma de 1 en 1
    };

    return (
        <>
            <div className="col-md-4 col-lg-3 mb-4 animate__animated animate__bounceInRight">
                <div className="card h-100">
                    <div className="card-body p-0 position-relative">
                        {/* Badge de cantidad en carrito */}
                        {cantidadEnCarrito > 0 && (
                            <span className="badge rounded-pill bg-warning text-dark fs-3 m-1"
                                style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1' }}>
                                {cantidadEnCarrito}
                            </span>
                        )}
                        <img
                            src={item.strDrinkThumb}
                            alt={item.strDrink ? item.strDrink.toString() : "Cóctel"}
                            className="img-fluid"
                        />
                    </div>
                    <div className="card-header text-center">
                        <h5 className="lead">{item.strDrink}</h5>
                    </div>
                    <div className="card-footer">
                        <div className="row g-2">
                            <div className="col-6">
                                <Link to={`/coctelesreactetapa1y2/detalle/${item.idDrink}`}
                                    className="btn btn-outline-dark btn-sm w-100">
                                    Ver
                                </Link>
                            </div>
                            <div className="col-6">
                                <button className="btn btn-outline-success btn-sm w-100"
                                    onClick={handleAddToCart}>
                                    {cantidadEnCarrito > 0 ? (
                                        <span>
                                            <i className="fas fa-check me-1"></i> OK
                                        </span>
                                    ) : (
                                        <span>
                                            <i className="fas fa-cart-plus me-1"></i> Add
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardCocteles;