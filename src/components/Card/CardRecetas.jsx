import { useContext, useState } from "react";
import { CarritoContext } from "../../context/CarritoContext";

const CardRecetas = ({ item }) => {
    const { cart, agregar } = useContext(CarritoContext);

    const getCantidad = () => {
        const itemInCart = cart.find(cartItem => cartItem.id === item.id);
        return itemInCart ? itemInCart.cantidad : 0;
    };

    const cantidadEnCarrito = getCantidad();
    const [cant, setCant] = useState(() => getCantidad() || 1);

    const handleChange = (event) => {
        const value = parseInt(event.target.value) || 1;
        setCant(value);
    };

    const handleAddToCart = () => {
        const producto = {
            id: item.id,
            title: item.name,
            price: calcularPrecioReceta(item),
            thumbnail: item.image,
            stock: 50,
            tipo: "receta"
        };
        agregar(producto, cant);
    };

    const calcularPrecioReceta = (receta) => {
        let basePrice = 9.99;
        if (receta.difficulty) {
            switch (receta.difficulty.toLowerCase()) {
                case 'easy': basePrice += 2.00; break;
                case 'medium': basePrice += 4.00; break;
                case 'hard': basePrice += 6.00; break;
                default: basePrice += 3.00;
            }
        }
        if (receta.cookTimeMinutes > 60) basePrice += 5.00;
        else if (receta.cookTimeMinutes > 30) basePrice += 3.00;
        return basePrice;
    };

    return (
        <>
            <div className="col-md-6 col-lg-4 mb-4 animate__animated animate__fadeInUp">
                <div className="card h-100 shadow-sm border-0 overflow-hidden"
                    onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__pulse')}
                    onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__pulse')}>
                    <div className="card-header p-0 overflow-hidden position-relative" style={{ height: '200px' }}>
                        {cantidadEnCarrito > 0 && (
                            <span className="badge rounded-pill bg-warning text-dark fs-6 m-1 p-2"
                                style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1' }}>
                                {cantidadEnCarrito} en carrito
                            </span>
                        )}
                        <img
                            src={item.image}
                            alt={item.name ? item.name.toString() : "Imagen de receta"}
                            className="img-fluid w-100 h-100"
                            style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title text-primary">{item.name}</h5>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-danger fw-bold">
                                <i className="fas fa-clock me-1"></i>{item.cookTimeMinutes} min
                            </span>
                            <span className={`badge ${getDifficultyBadgeClass(item.difficulty)}`}>
                                {item.difficulty}
                            </span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                                <i className="fas fa-users me-1"></i>{item.servings} personas
                            </small>
                            <span className="text-success fw-bold fs-5">
                                ${calcularPrecioReceta(item).toFixed(2)}
                            </span>
                        </div>
                    </div>
                    <div className="card-footer bg-white border-top-0">
                        <div className="row g-2">
                            <div className="col-6">
                                <button
                                    className="btn btn-primary w-100"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#modalReceta-${item.id}`}
                                    onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__headShake')}
                                    onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__headShake')}
                                >
                                    <i className="fas fa-eye me-1"></i>Ver
                                </button>
                            </div>
                            <div className="col-6">
                                <div className="input-group">
                                    <select
                                        value={cant}
                                        onChange={handleChange}
                                        className="form-select form-select-sm"
                                        style={{ width: '60px' }}
                                    >
                                        {Array.from({ length: 11 }, (_, i) => i).map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <button
                                        className={`btn btn-sm ${cantidadEnCarrito > 0 ? 'btn-warning' : 'btn-success'}`}
                                        onClick={handleAddToCart}
                                        onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__rubberBand')}
                                        onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__rubberBand')}
                                    >
                                        {cantidadEnCarrito > 0 ? 'OK' : 'Add'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal - SIN manipulaciones manuales */}
            <div className="modal fade" id={`modalReceta-${item.id}`} tabIndex="-1"
                aria-labelledby={`modalRecetaLabel-${item.id}`}
                aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content border-0 shadow-lg">
                        <div className="modal-header bg-gradient-success text-white py-3">
                            <div className="d-flex align-items-center w-100">
                                <div className="flex-grow-1">
                                    <h5 className="modal-title mb-0 fw-bold" id={`modalRecetaLabel-${item.id}`}>
                                        <i className="fas fa-utensils me-2"></i>{item.name}
                                    </h5>
                                    <small className="text-white-50">
                                        <i className="fas fa-tag me-1"></i>Precio: ${calcularPrecioReceta(item).toFixed(2)}
                                    </small>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white ms-2"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                        </div>

                        <div className="modal-body p-4">
                            <div className="row g-4">
                                <div className="col-lg-5">
                                    <div className="sticky-sidebar">
                                        <div className="image-container position-relative rounded-3 overflow-hidden shadow">
                                            <img
                                                src={item.image}
                                                alt={item.name ? item.name.toString() : "Imagen de receta"}
                                                className="img-fluid w-100"
                                                style={{ height: '280px', objectFit: 'cover' }}
                                            />
                                            <div className="position-absolute bottom-0 start-0 end-0 bg-gradient-overlay p-3">
                                                <div className="d-flex justify-content-center gap-3">
                                                    <span className="badge bg-primary px-3 py-2">
                                                        <i className="fas fa-clock me-1"></i>{item.prepTimeMinutes || 10} min
                                                    </span>
                                                    <span className="badge bg-warning text-dark px-3 py-2">
                                                        <i className="fas fa-fire me-1"></i>{item.cookTimeMinutes} min
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 text-center">
                                            <div className="d-inline-block p-3 bg-light rounded-3 shadow-sm">
                                                <span className="d-block fw-semibold text-muted mb-1">
                                                    <i className="fas fa-chart-line me-1"></i>Dificultad
                                                </span>
                                                <span className={`badge ${getDifficultyBadgeClass(item.difficulty)} px-4 py-2`}>
                                                    {item.difficulty}
                                                </span>
                                            </div>
                                            {item.servings && (
                                                <div className="mt-3">
                                                    <span className="d-block fw-semibold text-muted mb-1">
                                                        <i className="fas fa-users me-1"></i>Porciones
                                                    </span>
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <i className="fas fa-user-friends text-success fs-4 me-2"></i>
                                                        <span className="fs-5 fw-bold">{item.servings}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="content-scroll" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        <div className="card border-0 shadow-sm mb-4">
                                            <div className="card-header bg-light border-0 py-3">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <i className="fas fa-shopping-basket text-success me-2 fs-4"></i>
                                                    <span>Ingredientes</span>
                                                </h5>
                                            </div>
                                            <div className="card-body p-3">
                                                <div className="row g-2">
                                                    {item.ingredients && Array.isArray(item.ingredients) ? (
                                                        item.ingredients.map((ingrediente, index) => (
                                                            <div key={index} className="col-md-6">
                                                                <div className="d-flex align-items-center p-2 bg-white rounded border">
                                                                    <span className="badge bg-success-subtle text-success me-2">
                                                                        {index + 1}
                                                                    </span>
                                                                    <span className="text-truncate">{ingrediente}</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="col-12">
                                                            <p className="text-muted">No hay ingredientes disponibles</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card border-0 shadow-sm">
                                            <div className="card-header bg-light border-0 py-3">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <i className="fas fa-list-ol text-success me-2 fs-4"></i>
                                                    <span>Instrucciones</span>
                                                </h5>
                                            </div>
                                            <div className="card-body p-3">
                                                <div className="step-list">
                                                    {item.instructions ? (
                                                        <p className="mb-0">{item.instructions}</p>
                                                    ) : (
                                                        <p className="text-muted">No hay instrucciones disponibles</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer bg-light py-3">
                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4 py-2"
                                data-bs-dismiss="modal"
                            >
                                <i className="fas fa-times me-2"></i>Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const getDifficultyBadgeClass = (difficulty) => {
    if (!difficulty) return 'bg-secondary';
    switch (difficulty.toLowerCase()) {
        case 'easy': return 'bg-success';
        case 'medium': return 'bg-warning text-dark';
        case 'hard': return 'bg-danger';
        default: return 'bg-info';
    }
}

export default CardRecetas;