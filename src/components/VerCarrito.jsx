import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";

const VerCarrito = () => {
    const { cart, agregar, restar, eliminar, vaciar, comprar } = useContext(CarritoContext);
    const [loading, setLoading] = useState(false);
    const [compraExitosa, setCompraExitosa] = useState(false);

    // Calcular totales
    const subtotal = cart.reduce((total, item) => {
        return total + ((item.price || 0) * (item.cantidad || 1));
    }, 0);

    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    // Función para manejar la compra - SIMPLIFICADA
    const handleComprar = async () => {
        if (cart.length === 0) {
            alert("El carrito está vacío");
            return;
        }

        if (window.confirm("¿Confirmar compra?")) {
            setLoading(true);
            try {
                await comprar();
                setCompraExitosa(true);

                // Ocultar mensaje después de 3 segundos
                setTimeout(() => {
                    setCompraExitosa(false);
                    setLoading(false);
                }, 3000);

            } catch (error) {
                console.error("Error en compra:", error);
                alert("Error al procesar la compra: " + (error.message || "Error desconocido"));
                setLoading(false);
            }
        }
    };

    // Función para vaciar carrito
    const handleVaciarCarrito = () => {
        if (window.confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
            vaciar();
        }
    };

    // Función para actualizar cantidad
    const handleActualizarCantidad = (item, nuevaCantidad) => {
        if (nuevaCantidad < 0 || nuevaCantidad > (item.stock || 100)) {
            alert("Cantidad no válida");
            return;
        }
        agregar(item, nuevaCantidad);
    };

    if (compraExitosa) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-success border-0 shadow-lg">
                    <i className="fas fa-check-circle fa-3x mb-3 text-success"></i>
                    <h4 className="mb-3">¡Compra realizada con éxito!</h4>
                    <p className="mb-4">
                        Gracias por tu compra. Recibirás un correo de confirmación.
                    </p>
                    <div className="mt-4">
                        <i className="fas fa-champagne-glasses text-warning fa-2x me-3"></i>
                        <i className="fas fa-gift text-primary fa-2x me-3"></i>
                        <i className="fas fa-star text-success fa-2x"></i>
                    </div>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                <h4 className="mb-3">Tu carrito está vacío</h4>
                <p className="text-muted mb-4">
                    Agrega productos para verlos aquí
                </p>
            </div>
        );
    }

    return (
        <div className="ver-carrito">
            {/* Header del carrito */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">
                    <i className="fas fa-shopping-cart me-2"></i>
                    Carrito <span className="badge bg-primary">{cart.length}</span> productos
                </h5>
                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleVaciarCarrito}
                    disabled={loading}
                >
                    <i className="fas fa-trash me-1"></i>Vaciar Carrito
                </button>
            </div>

            {/* Lista de productos */}
            <div className="table-responsive mb-4">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col" className="text-center">Cantidad</th>
                            <th scope="col" className="text-center">Precio Unit.</th>
                            <th scope="col" className="text-center">Total</th>
                            <th scope="col" className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={item.id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={item.thumbnail || item.image || item.strDrinkThumb}
                                            alt={(item.title || item.name || item.strDrink || "Producto").toString()}
                                            className="img-thumbnail me-3"
                                            style={{
                                                width: '60px',
                                                height: '60px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div>
                                            <h6 className="mb-1">
                                                {item.title || item.name || item.strDrink}
                                            </h6>
                                            <small className="text-muted">
                                                <i className="fas fa-tag me-1"></i>
                                                {item.category || item.strCategory || 'General'}
                                            </small>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => restar(item)}
                                            disabled={loading}
                                        >
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <span className="mx-2 fw-bold fs-5">
                                            {item.cantidad || 1}
                                        </span>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => agregar(item, (item.cantidad || 1) + 1)}
                                            disabled={loading || (item.cantidad >= (item.stock || 100))}
                                        >
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <select
                                            className="form-select form-select-sm"
                                            value={item.cantidad || 1}
                                            onChange={(e) => handleActualizarCantidad(item, parseInt(e.target.value))}
                                            disabled={loading}
                                            style={{ width: '80px', margin: '0 auto' }}
                                        >
                                            {Array.from({ length: Math.min((item.stock || 100), 20) + 1 }, (_, i) => i).map((num) => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                                <td className="text-center align-middle">
                                    <span className="fw-bold">
                                        ${(item.price || 0).toFixed(2)}
                                    </span>
                                </td>
                                <td className="text-center align-middle fw-bold">
                                    <span className="text-success">
                                        ${((item.price || 0) * (item.cantidad || 1)).toFixed(2)}
                                    </span>
                                </td>
                                <td className="text-center align-middle">
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => eliminar(item)}
                                        disabled={loading}
                                        title="Eliminar producto"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Resumen de compra */}
            <div className="card border-0 shadow-lg mb-4">
                <div className="card-body">
                    <h6 className="card-title mb-3">
                        <i className="fas fa-receipt me-2"></i>
                        Resumen de la compra
                    </h6>
                    <div className="d-flex justify-content-between mb-2">
                        <span>Subtotal:</span>
                        <span className="fw-bold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span>IVA (19%):</span>
                        <span className="fw-bold">${iva.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Envío:</span>
                        <span className="text-success fw-bold">
                            <i className="fas fa-truck-fast me-1"></i>Gratis
                        </span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5">
                        <span>Total a pagar:</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="d-flex justify-content-between mt-4">
                <button
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                    disabled={loading}
                >
                    <i className="fas fa-arrow-left me-2"></i>Seguir comprando
                </button>

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-danger"
                        onClick={handleVaciarCarrito}
                        disabled={loading}
                    >
                        <i className="fas fa-trash me-2"></i>Vaciar Todo
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={handleComprar}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="d-flex align-items-center">
                                <span className="spinner-border spinner-border-sm me-2"
                                    role="status" aria-hidden="true"></span>
                                <span>Procesando...</span>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <i className="fas fa-credit-card me-2"></i>
                                <span>Finalizar Compra </span>
                                <span className="ms-2 badge bg-light text-dark">${total.toFixed(2)}</span>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerCarrito;