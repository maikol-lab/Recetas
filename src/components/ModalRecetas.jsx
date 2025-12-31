const ModalRecetas = ({ item, precio }) => {
    // Función auxiliar para clases de dificultad
    const getDifficultyClass = (difficulty) => {
        if (!difficulty) return 'bg-secondary';
        switch(difficulty.toLowerCase()) {
            case 'fácil':
            case 'easy':
                return 'bg-success';
            case 'media':
            case 'medium':
                return 'bg-warning text-dark';
            case 'difícil':
            case 'hard':
                return 'bg-danger';
            default:
                return 'bg-secondary';
        }
    }

    return (
        <div className="modal fade animate__animated animate__zoomIn" 
             id={`modal-${item.id}`} 
             tabIndex="-1" 
             aria-hidden="true"
             data-bs-backdrop="static">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content border-0 shadow-lg animate__animated animate__slideInUp">
                    <div className="modal-header bg-gradient-success text-white py-3 animate__animated animate__fadeInDown">
                        <div className="d-flex align-items-center w-100">
                            <div className="flex-grow-1">
                                <h5 className="modal-title mb-0 fw-bold animate__animated animate__bounceIn">
                                    <i className="fas fa-utensils me-2"></i>
                                    {item.name}
                                </h5>
                                <small className="text-white-50 animate__animated animate__fadeIn animate__delay-1s">
                                    <i className="fas fa-tag me-1"></i>
                                    Precio: ${precio?.toFixed(2) || "9.99"}
                                </small>
                            </div>
                            <button
                                type="button"
                                className="btn-close btn-close-white ms-2 animate__animated animate__rotateIn"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__tada')}
                                onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__tada')}
                            ></button>
                        </div>
                    </div>

                    <div className="modal-body p-4">
                        <div className="row g-4">
                            {/* Columna izquierda - Imagen */}
                            <div className="col-lg-5">
                                <div className="sticky-sidebar">
                                    <div className="image-container position-relative rounded-3 overflow-hidden shadow animate__animated animate__zoomIn">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="img-fluid w-100"
                                            style={{
                                                height: '280px',
                                                objectFit: 'cover'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                        <div className="position-absolute bottom-0 start-0 end-0 bg-gradient-overlay p-3 animate__animated animate__fadeInUp">
                                            <div className="d-flex justify-content-center gap-3">
                                                <span className="badge bg-primary px-3 py-2 animate__animated animate__bounceIn"
                                                      style={{ animationDelay: '0.2s' }}>
                                                    <i className="fas fa-clock me-1 animate__animated animate__rotateIn"></i>
                                                    {item.prepTimeMinutes || 10} min prep
                                                </span>
                                                <span className="badge bg-warning text-dark px-3 py-2 animate__animated animate__bounceIn"
                                                      style={{ animationDelay: '0.3s' }}>
                                                    <i className="fas fa-fire me-1 animate__animated animate__heartBeat"></i>
                                                    {item.cookTimeMinutes} min cocción
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 text-center">
                                        <div className="d-inline-block p-3 bg-light rounded-3 shadow-sm animate__animated animate__fadeInLeft">
                                            <span className="d-block fw-semibold text-muted mb-1">
                                                <i className="fas fa-chart-line me-1"></i>Dificultad
                                            </span>
                                            <span className={`badge ${getDifficultyClass(item.difficulty)} px-4 py-2 animate__animated animate__pulse animate__infinite animate__slower`}>
                                                {item.difficulty}
                                            </span>
                                        </div>

                                        {item.servings && (
                                            <div className="mt-3 animate__animated animate__fadeInRight">
                                                <span className="d-block fw-semibold text-muted mb-1">
                                                    <i className="fas fa-users me-1"></i>Porciones
                                                </span>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <i className="fas fa-user-friends text-success fs-4 me-2 animate__animated animate__tada"></i>
                                                    <span className="fs-5 fw-bold animate__animated animate__bounce">
                                                        {item.servings}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Información nutricional adicional */}
                                        <div className="mt-4 p-3 bg-gradient-light rounded-3 animate__animated animate__fadeInUp animate__delay-1s">
                                            <h6 className="text-center mb-3">
                                                <i className="fas fa-info-circle text-primary me-2"></i>
                                                Información
                                            </h6>
                                            <div className="row text-center">
                                                <div className="col-6">
                                                    <small className="text-muted d-block">Calorías</small>
                                                    <span className="fw-bold text-danger">~{item.cookTimeMinutes * 15}</span>
                                                </div>
                                                <div className="col-6">
                                                    <small className="text-muted d-block">Nivel</small>
                                                    <span className="fw-bold text-success">
                                                        {item.difficulty === 'Easy' ? '★☆☆' : 
                                                         item.difficulty === 'Medium' ? '★★☆' : '★★★'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Columna derecha - Contenido */}
                            <div className="col-lg-7">
                                <div className="content-scroll" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                    {/* Ingredientes */}
                                    <div className="card border-0 shadow-sm mb-4 animate__animated animate__slideInRight">
                                        <div className="card-header bg-light border-0 py-3 animate__animated animate__fadeInDown">
                                            <h5 className="mb-0 d-flex align-items-center">
                                                <i className="fas fa-shopping-basket text-success me-2 fs-4 animate__animated animate__swing"></i>
                                                <span className="animate__animated animate__fadeIn">Ingredientes</span>
                                                <span className="badge bg-success ms-2 animate__animated animate__bounceIn">
                                                    {item.ingredients?.length || 0}
                                                </span>
                                            </h5>
                                        </div>
                                        <div className="card-body p-3">
                                            <div className="row g-2">
                                                {item.ingredients?.map((ingrediente, index) => (
                                                    <div key={index} className="col-md-6">
                                                        <div className="d-flex align-items-center p-2 bg-white rounded border animate__animated animate__fadeInLeft"
                                                             style={{ animationDelay: `${index * 0.05}s` }}
                                                             onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__headShake')}
                                                             onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__headShake')}>
                                                            <span className="badge bg-success-subtle text-success me-2 animate__animated animate__flipInX">
                                                                {index + 1}
                                                            </span>
                                                            <span className="text-truncate animate__animated animate__fadeIn">
                                                                {ingrediente}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Instrucciones */}
                                    <div className="card border-0 shadow-sm animate__animated animate__slideInRight animate__delay-1s">
                                        <div className="card-header bg-light border-0 py-3 animate__animated animate__fadeInDown">
                                            <h5 className="mb-0 d-flex align-items-center">
                                                <i className="fas fa-list-ol text-success me-2 fs-4 animate__animated animate__rotateIn"></i>
                                                <span className="animate__animated animate__fadeIn">Instrucciones</span>
                                                <span className="badge bg-warning text-dark ms-2 animate__animated animate__bounceIn">
                                                    {item.instructions?.length || 0} pasos
                                                </span>
                                            </h5>
                                        </div>
                                        <div className="card-body p-3">
                                            <div className="step-list">
                                                {item.instructions?.map((paso, index) => (
                                                    <div key={index} 
                                                         className="mb-3 pb-3 border-bottom animate__animated animate__fadeInUp"
                                                         style={{ animationDelay: `${index * 0.1}s` }}>
                                                        <div className="d-flex">
                                                            <div className="step-number me-3">
                                                                <span className="badge bg-success rounded-circle d-flex align-items-center justify-content-center animate__animated animate__bounceIn"
                                                                    style={{ 
                                                                        width: '30px', 
                                                                        height: '30px',
                                                                        animationDelay: `${index * 0.2}s`
                                                                    }}>
                                                                    {index + 1}
                                                                </span>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <p className="mb-0 animate__animated animate__fadeIn">
                                                                    {paso}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Consejos adicionales */}
                                    {item.tips && (
                                        <div className="card border-0 shadow-sm mt-4 animate__animated animate__fadeInUp animate__delay-2s">
                                            <div className="card-header bg-info-subtle border-0 py-3">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <i className="fas fa-lightbulb text-warning me-2 fs-4 animate__animated animate__flash animate__infinite animate__slower"></i>
                                                    <span>Consejos del Chef</span>
                                                </h5>
                                            </div>
                                            <div className="card-body p-3">
                                                <p className="mb-0 text-muted animate__animated animate__fadeIn">
                                                    {item.tips}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer bg-light py-3 animate__animated animate__fadeInUp">
                        <button
                            type="button"
                            className="btn btn-outline-secondary px-4 py-2 animate__animated animate__fadeInLeft"
                            data-bs-dismiss="modal"
                            onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__headShake')}
                            onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__headShake')}
                        >
                            <i className="fas fa-times me-2 animate__animated animate__rotateIn"></i>
                            Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-success px-4 py-2 animate__animated animate__fadeInRight"
                            onClick={() => {
                                // Aquí puedes agregar la funcionalidad de "Añadir al carrito desde el modal"
                                const addEvent = new Event('addToCartFromModal');
                                document.dispatchEvent(addEvent);
                            }}
                            onMouseEnter={(e) => e.currentTarget.classList.add('animate__animated', 'animate__pulse')}
                            onMouseLeave={(e) => e.currentTarget.classList.remove('animate__animated', 'animate__pulse')}
                        >
                            <i className="fas fa-cart-plus me-2 animate__animated animate__bounce"></i>
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalRecetas;