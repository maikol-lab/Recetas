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

    const iva = subtotal * 0.19; // 19% IVA
    const total = subtotal + iva;

    // Función para manejar la compra
    const handleComprar = async () => {
        if (cart.length === 0) {
            alert("El carrito está vacío");
            return;
        }

        if (window.confirm("¿Confirmar compra?")) {
            setLoading(true);
            try {
                await comprar(); // Llama a la función comprar del contexto
                setCompraExitosa(true);

                // Ocultar mensaje después de 3 segundos
                setTimeout(() => {
                    setCompraExitosa(false);
                    // Cerrar modal si está abierto
                    const modal = document.getElementById('carritoModal');
                    if (modal) {
                        const modalInstance = window.bootstrap.Modal.getInstance(modal);
                        if (modalInstance) modalInstance.hide();
                    }
                }, 3000);

            } catch (error) {
                alert("Error al procesar la compra: " + error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    // Función para vaciar carrito con confirmación
    const handleVaciarCarrito = () => {
        vaciar();
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
            <div className="text-center py-5 animate__animated animate__bounceIn">
                <div className="alert alert-success border-0 shadow-lg animate__animated animate__pulse animate__infinite">
                    <i className="fas fa-check-circle fa-3x mb-3 animate__animated animate__tada animate__delay-1s"></i>
                    <h4 className="animate__animated animate__fadeInUp">¡Compra realizada con éxito!</h4>
                    <p className="animate__animated animate__fadeIn animate__delay-1s">
                        Gracias por tu compra. Recibirás un correo de confirmación.
                    </p>
                    <div className="mt-4 animate__animated animate__zoomIn animate__delay-2s">
                        <i className="fas fa-champagne-glasses text-warning fa-2x me-3 animate__animated animate__swing animate__infinite"></i>
                        <i className="fas fa-gift text-primary fa-2x me-3 animate__animated animate__bounce animate__infinite animate__delay-1s"></i>
                        <i className="fas fa-star text-success fa-2x animate__animated animate__rotateIn animate__infinite animate__delay-2s"></i>
                    </div>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="text-center py-5 animate__animated animate__fadeIn">
                <i className="fas fa-shopping-cart fa-4x text-muted mb-3 animate__animated animate__pulse animate__slower"></i>
                <h4 className="animate__animated animate__fadeInDown">Tu carrito está vacío</h4>
                <p className="text-muted animate__animated animate__fadeIn animate__delay-1s">
                    Agrega productos para verlos aquí
                </p>
                <button
                    className="btn btn-primary mt-3 animate__animated animate__bounceIn animate__delay-2s"
                    data-bs-dismiss="modal"
                    onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__headShake')}
                    onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__headShake')}
                >
                    <i className="fas fa-store me-2 animate__animated animate__bounce"></i>Ir a comprar
                </button>
                <div className="mt-4 animate__animated animate__fadeInUp animate__delay-3s">
                    <i className="fas fa-cookie-bite text-warning fa-2x mx-2 animate__animated animate__wobble animate__slower"></i>
                    <i className="fas fa-wine-bottle text-primary fa-2x mx-2 animate__animated animate__wobble animate__slower animate__delay-1s"></i>
                    <i className="fas fa-martini-glass-citrus text-success fa-2x mx-2 animate__animated animate__wobble animate__slower animate__delay-2s"></i>
                </div>
            </div>
        );
    }

    return (
        <div className="ver-carrito animate__animated animate__fadeIn">
            {/* Header del carrito */}
            <div className="d-flex justify-content-between align-items-center mb-4 animate__animated animate__fadeInDown">
                <h5 className="mb-0 animate__animated animate__bounceIn">
                    <i className="fas fa-shopping-cart me-2 animate__animated animate__swing"></i>
                    Carrito <span className="badge bg-primary animate__animated animate__bounce">{cart.length}</span> productos
                </h5>
                <button
                    className="btn btn-outline-danger btn-sm animate__animated animate__pulse animate__delay-1s"
                    onClick={handleVaciarCarrito}
                    disabled={loading}
                    onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__tada')}
                    onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__tada')}
                >
                    <i className="fas fa-trash me-1 animate__animated animate__shakeX"></i>Vaciar Carrito
                </button>
            </div>

            {/* Lista de productos */}
            <div className="table-responsive mb-4 animate__animated animate__slideInUp">
                <table className="table table-hover">
                    <thead>
                        <tr className="animate__animated animate__fadeIn">
                            <th scope="col" className="animate__animated animate__fadeInLeft">Producto</th>
                            <th scope="col" className="text-center animate__animated animate__fadeInDown">Cantidad</th>
                            <th scope="col" className="text-center animate__animated animate__fadeInDown">Precio Unit.</th>
                            <th scope="col" className="text-center animate__animated animate__fadeInRight">Total</th>
                            <th scope="col" className="text-center animate__animated animate__fadeInRight">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={item.id} className="animate__animated animate__fadeInUp"
                                style={{ animationDelay: `${index * 0.1}s` }}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={item.thumbnail || item.image || item.strDrinkThumb}
                                            alt={item.title || item.name || item.strDrink}
                                            className="img-thumbnail me-3 animate__animated animate__zoomIn"
                                            style={{ 
                                                width: '60px', 
                                                height: '60px', 
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                        <div>
                                            <h6 className="mb-1 animate__animated animate__fadeIn">
                                                {item.title || item.name || item.strDrink}
                                            </h6>
                                            <small className="text-muted animate__animated animate__fadeIn animate__delay-1s">
                                                <i className="fas fa-tag me-1"></i>
                                                {item.category || item.strCategory || 'General'}
                                            </small>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center align-items-center animate__animated animate__bounceIn">
                                        <button
                                            className="btn btn-sm btn-outline-secondary animate__animated animate__pulse"
                                            onClick={() => restar(item)}
                                            disabled={loading}
                                            onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__headShake')}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__headShake')}
                                        >
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <span className="mx-2 fw-bold fs-5 animate__animated animate__rubberBand">
                                            {item.cantidad || 1}
                                        </span>
                                        <button
                                            className="btn btn-sm btn-outline-secondary animate__animated animate__pulse"
                                            onClick={() => agregar(item, (item.cantidad || 1) + 1)}
                                            disabled={loading || (item.cantidad >= (item.stock || 100))}
                                            onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__headShake')}
                                            onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__headShake')}
                                        >
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <select
                                            className="form-select form-select-sm animate__animated animate__zoomIn"
                                            value={item.cantidad || 1}
                                            onChange={(e) => handleActualizarCantidad(item, parseInt(e.target.value))}
                                            disabled={loading}
                                            style={{ width: '80px', margin: '0 auto' }}
                                            onFocus={(e) => e.target.classList.add('animate__animated', 'animate__rubberBand')}
                                            onBlur={(e) => e.target.classList.remove('animate__animated', 'animate__rubberBand')}
                                        >
                                            {Array.from({ length: Math.min((item.stock || 100), 20) + 1 }, (_, i) => i).map((num) => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                                <td className="text-center align-middle">
                                    <span className="fw-bold animate__animated animate__flipInX">
                                        ${(item.price || 0).toFixed(2)}
                                    </span>
                                </td>
                                <td className="text-center align-middle fw-bold">
                                    <span className="text-success animate__animated animate__bounceIn">
                                        ${((item.price || 0) * (item.cantidad || 1)).toFixed(2)}
                                    </span>
                                </td>
                                <td className="text-center align-middle">
                                    <button
                                        className="btn btn-sm btn-outline-danger animate__animated animate__heartBeat"
                                        onClick={() => eliminar(item)}
                                        disabled={loading}
                                        title="Eliminar producto"
                                        onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__tada')}
                                        onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__tada')}
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
            <div className="card border-0 shadow-lg animate__animated animate__slideInUp animate__delay-2s">
                <div className="card-body">
                    <h6 className="card-title mb-3 animate__animated animate__fadeInDown">
                        <i className="fas fa-receipt me-2 animate__animated animate__rotateIn"></i>
                        Resumen de la compra
                    </h6>
                    <div className="d-flex justify-content-between mb-2 animate__animated animate__fadeInLeft">
                        <span>Subtotal:</span>
                        <span className="fw-bold animate__animated animate__bounceIn">
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between mb-2 animate__animated animate__fadeInLeft animate__delay-1s">
                        <span>IVA (19%):</span>
                        <span className="fw-bold animate__animated animate__bounceIn">
                            ${iva.toFixed(2)}
                        </span>
                    </div>
                    <div className="d-flex justify-content-between mb-3 animate__animated animate__fadeInLeft animate__delay-2s">
                        <span>Envío:</span>
                        <span className="text-success fw-bold animate__animated animate__pulse animate__infinite">
                            <i className="fas fa-truck-fast me-1"></i>Gratis
                        </span>
                    </div>
                    <hr className="animate__animated animate__fadeIn" />
                    <div className="d-flex justify-content-between fw-bold fs-5 animate__animated animate__fadeInUp animate__delay-3s">
                        <span>Total a pagar:</span>
                        <span className="text-primary animate__animated animate__rubberBand">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="d-flex justify-content-between mt-4 animate__animated animate__fadeInUp animate__delay-3s">
                <button
                    className="btn btn-outline-secondary animate__animated animate__fadeInLeft"
                    data-bs-dismiss="modal"
                    disabled={loading}
                    onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__headShake')}
                    onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__headShake')}
                >
                    <i className="fas fa-arrow-left me-2 animate__animated animate__bounce"></i>Seguir comprando
                </button>

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-danger animate__animated animate__fadeInDown"
                        onClick={handleVaciarCarrito}
                        disabled={loading}
                        onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__tada')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__tada')}
                    >
                        <i className="fas fa-trash me-2 animate__animated animate__shakeX"></i>Vaciar Todo
                    </button>

                    <button
                        className="btn btn-success animate__animated animate__fadeInRight"
                        onClick={handleComprar}
                        disabled={loading}
                        onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__pulse')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__pulse')}
                    >
                        {loading ? (
                            <div className="d-flex align-items-center">
                                <span className="spinner-border spinner-border-sm me-2 animate__animated animate__rotateIn animate__infinite" 
                                      role="status" aria-hidden="true"></span>
                                <span className="animate__animated animate__fadeIn">Procesando...</span>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <i className="fas fa-credit-card me-2 animate__animated animate__bounce"></i>
                                <span>Finalizar Compra </span>
                                <span className="ms-2 badge bg-light text-dark animate__animated animate__heartBeat">
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* Información adicional */}
            <div className="alert alert-info mt-4 border-0 shadow-sm animate__animated animate__fadeInUp animate__delay-4s">
                <div className="d-flex">
                    <i className="fas fa-info-circle me-3 mt-1 fa-2x animate__animated animate__tada animate__infinite animate__slower"></i>
                    <div>
                        <h6 className="alert-heading mb-2 animate__animated animate__fadeInDown">
                            <i className="fas fa-star me-1 text-warning animate__animated animate__rotateIn"></i>
                            Información importante
                        </h6>
                        <ul className="mb-0 small animate__animated animate__fadeIn">
                            <li className="mb-2 animate__animated animate__fadeInLeft" style={{animationDelay: '0.1s'}}>
                                <i className="fas fa-clock text-primary me-2 animate__animated animate__rotateIn"></i>
                                El pedido será procesado en un máximo de 24 horas
                            </li>
                            <li className="mb-2 animate__animated animate__fadeInLeft" style={{animationDelay: '0.2s'}}>
                                <i className="fas fa-envelope text-success me-2 animate__animated animate__bounce"></i>
                                Recibirás un correo de confirmación con los detalles
                            </li>
                            <li className="mb-2 animate__animated animate__fadeInLeft" style={{animationDelay: '0.3s'}}>
                                <i className="fas fa-edit text-warning me-2 animate__animated animate__swing"></i>
                                Puedes modificar las cantidades antes de finalizar la compra
                            </li>
                            <li className="mb-0 animate__animated animate__fadeInLeft" style={{animationDelay: '0.4s'}}>
                                <i className="fas fa-truck text-info me-2 animate__animated animate__shakeX"></i>
                                Envío gratuito en todas las compras
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-3 animate__animated animate__fadeIn animate__delay-5s">
                    <i className="fas fa-shield-alt text-success me-2 animate__animated animate__flash animate__infinite"></i>
                    <small className="text-muted">Compra 100% segura - Tus datos están protegidos</small>
                </div>
            </div>
        </div>
    );
};

export default VerCarrito;