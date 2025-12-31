import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FiltroTipoCocteles from './FiltroTipoCocteles';
import FiltroCategoriaCocteles from './FiltroCategoriaCocteles';
import { CarritoContext } from '../context/CarritoContext';
import VerCarrito from './VerCarrito';

const Header = () => {
    const [txtbuscar, setTxtbuscar] = useState('');
    const navigate = useNavigate();

    // Usar el contexto del carrito
    const { cart } = useContext(CarritoContext);

    const menejoTxt = (event) => {
        setTxtbuscar(event.target.value);
    };

    const manejoEnvio = (event) => {
        event.preventDefault();
        navigate('/busquedas', {
            state: txtbuscar,
        });
        setTxtbuscar('');
    };

    // Calcular total de items en el carrito
    const totalItemsCarrito = cart.reduce((total, item) => total + (item.cantidad || 1), 0);

    return (
        <div className="container-fluid bg-dark px-0">
            <div className="row gx-0">
                <div className="col-lg-3 bg-primary d-none d-lg-block">
                    <a href="index.html" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                        <h1 className="m-0 display-4 text-white text-uppercase animate__animated animate__flipInX">Chefer</h1>
                    </a>
                </div>

                <div className="col-lg-9">
                    <div className="row gx-0 d-none d-lg-flex bg-dark animate__animated animate__slideInDown">
                        <form className="d-flex p-3" onSubmit={manejoEnvio}>
                            <input
                                value={txtbuscar}
                                onChange={menejoTxt}
                                className="form-control me-2 animate__animated animate__fadeInLeft"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button 
                                className="btn btn-outline-success animate__animated animate__fadeIn animate__delay-1s" 
                                type="submit"
                            >
                                Search
                            </button>

                            {/* Botón del carrito en la barra superior */}
                            <button
                                type="button"
                                className="btn btn-outline-warning ms-2 position-relative animate__animated animate__fadeIn animate__delay-2s"
                                data-bs-toggle="modal"
                                data-bs-target="#carritoModal"
                                style={{ minWidth: '45px' }}
                            >
                                <i className="fas fa-shopping-cart animate__animated animate__swing animate__slow"></i>
                                {totalItemsCarrito > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate__animated animate__rubberBand animate__infinite">
                                        {totalItemsCarrito}
                                        <span className="visually-hidden">items en el carrito</span>
                                    </span>
                                )}
                            </button>
                        </form>

                        <div className="col-6 px-5 text-start">
                            <div className="h-100 d-inline-flex align-items-center py-2 me-4 animate__animated animate__fadeInLeft">
                                <i className="fa fa-envelope text-primary me-2 animate__animated animate__bounce animate__delay-3s" />
                                <p className="mb-0">info@example.com</p>
                            </div>
                        </div>
                        <div className="col-6 px-5 text-end">
                            <div className="h-100 d-inline-flex align-items-center py-2 animate__animated animate__fadeInRight">
                                <i className="fa fa-phone-alt text-primary me-2 animate__animated animate__bounce animate__delay-3s" />
                                <p className="mb-0">+012 345 6789</p>
                            </div>
                        </div>
                    </div>

                    <nav className="navbar navbar-expand-lg navbar-dark p-3 p-lg-0 px-lg-5" style={{ background: '#111111' }}>
                        <a href="index.html" className="navbar-brand d-block d-lg-none animate__animated animate__flipInX">
                            <h1 className="m-0 display-4 text-primary text-uppercase">Chefer</h1>
                        </a>

                        {/* Carrito para móvil */}
                        <div className="d-block d-lg-none me-3">
                            <button
                                type="button"
                                className="btn btn-outline-warning position-relative animate__animated animate__tada"
                                data-bs-toggle="modal"
                                data-bs-target="#carritoModal"
                            >
                                <i className="fas fa-shopping-cart"></i>
                                {totalItemsCarrito > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate__animated animate__heartBeat animate__infinite">
                                        {totalItemsCarrito}
                                    </span>
                                )}
                            </button>
                        </div>

                        <button 
                            type="button" 
                            className="navbar-toggler animate__animated animate__pulse" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#navbarCollapse"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div className="collapse navbar-collapse animate__animated animate__fadeIn" id="navbarCollapse">
                            <div className="navbar-nav me-auto mb-2 mb-lg-0">
                                <Link 
                                    to={'/inicio'} 
                                    className="nav-link active animate__animated animate__fadeInDown animate__delay-1s"
                                >
                                    INICIO
                                </Link>
                                <Link 
                                    to={"/heroinicio"} 
                                    className="nav-link animate__animated animate__fadeInDown animate__delay-2s"
                                >
                                    Ver
                                </Link>
                                <Link 
                                    to={'/recetas'} 
                                    className="nav-link animate__animated animate__fadeInDown animate__delay-3s"
                                >
                                    Recetas
                                </Link>

                                {/* Licores en dropdown */}
                                <div className="nav-item dropdown animate__animated animate__fadeInDown animate__delay-4s">
                                    <a 
                                        href="#" 
                                        className="nav-link dropdown-toggle animate__animated animate__headShake" 
                                        data-bs-toggle="dropdown"
                                    >
                                        Licores
                                    </a>
                                    <div className="dropdown-menu animate__animated animate__zoomIn">
                                        <Link to={"/coctelesreactetapa1y2/licor/Brandy/1"} className="dropdown-item animate__animated animate__fadeInLeft">Brandy</Link>
                                        <Link to={"/coctelesreactetapa1y2/licor/Gin/1"} className="dropdown-item animate__animated animate__fadeInLeft animate__delay-1s">Gin</Link>
                                        <Link to={"/coctelesreactetapa1y2/licor/Rum/1"} className="dropdown-item animate__animated animate__fadeInLeft animate__delay-2s">Rum</Link>
                                        <Link to={"/coctelesreactetapa1y2/licor/Tequila/1"} className="dropdown-item animate__animated animate__fadeInLeft animate__delay-3s">Tequila</Link>
                                        <Link to={"/coctelesreactetapa1y2/licor/Vodka/1"} className="dropdown-item animate__animated animate__fadeInLeft animate__delay-4s">Vodka</Link>
                                        <Link to={"/coctelesreactetapa1y2/licor/Whiskey/1"} className="dropdown-item animate__animated animate__fadeInLeft animate__delay-5s">Whiskey</Link>
                                    </div>
                                </div>

                                {/* Tipo dropdown */}
                                <div className="nav-item dropdown animate__animated animate__fadeInDown animate__delay-5s">
                                    <a 
                                        href="#" 
                                        className="nav-link dropdown-toggle animate__animated animate__headShake" 
                                        data-bs-toggle="dropdown"
                                    >
                                        Tipo
                                    </a>
                                    <div className="dropdown-menu animate__animated animate__zoomIn">
                                        <FiltroTipoCocteles />
                                    </div>
                                </div>

                                {/* Categorías dropdown */}
                                <div className="nav-item dropdown animate__animated animate__fadeInDown animate__delay-6s">
                                    <a 
                                        href="#" 
                                        className="nav-link dropdown-toggle animate__animated animate__headShake" 
                                        data-bs-toggle="dropdown"
                                    >
                                        Categorías
                                    </a>
                                    <div className="dropdown-menu animate__animated animate__zoomIn">
                                        <FiltroCategoriaCocteles />
                                    </div>
                                </div>

                                <Link 
                                    to={'/contact'} 
                                    className="nav-link animate__animated animate__fadeInDown animate__delay-7s"
                                >
                                    Contacto
                                </Link>
                            </div>

                            {/* Redes sociales y carrito para desktop */}
                            <div className="d-flex align-items-center ms-auto social-icons-container">
                                {/* Carrito para desktop */}
                                <button
                                    type="button"
                                    className="btn btn-outline-warning btn-square rounded-circle mx-1 position-relative animate__animated animate__bounceIn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#carritoModal"
                                    title={`Carrito (${totalItemsCarrito} items)`}
                                >
                                    <i className="fas fa-shopping-cart animate__animated animate__swing animate__slow"></i>
                                    {totalItemsCarrito > 0 && (
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate__animated animate__pulse animate__infinite" style={{ fontSize: '0.6rem' }}>
                                            {totalItemsCarrito}
                                        </span>
                                    )}
                                </button>

                                {/* Redes sociales */}
                                <a 
                                    className="btn btn-outline-secondary btn-square rounded-circle mx-1 animate__animated animate__bounceIn animate__delay-1s hover-effect"
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a 
                                    className="btn btn-outline-secondary btn-square rounded-circle mx-1 animate__animated animate__bounceIn animate__delay-2s hover-effect"
                                    href="https://www.twitter.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-twitter" />
                                </a>
                                <a 
                                    className="btn btn-outline-secondary btn-square rounded-circle mx-1 animate__animated animate__bounceIn animate__delay-3s hover-effect"
                                    href="https://www.linkedin.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Modal del Carrito */}
            <div className="modal fade" id="carritoModal" tabIndex={-1} aria-labelledby="carritoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content animate__animated animate__zoomIn">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title" id="carritoModalLabel">
                                <i className="fas fa-shopping-cart me-2 animate__animated animate__tada animate__infinite"></i>
                                Carrito de Compras
                                <span className="badge bg-warning text-dark ms-2 animate__animated animate__bounce">
                                    {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
                                </span>
                            </h5>
                            <button 
                                type="button" 
                                className="btn-close btn-close-white animate__animated animate__rotateOut" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body p-0">
                            <VerCarrito />
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-secondary animate__animated animate__fadeInLeft" 
                                data-bs-dismiss="modal"
                            >
                                <i className="fas fa-arrow-left me-2"></i>
                                Seguir Comprando
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de búsqueda */}
            <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="searchModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content animate__animated animate__slideInDown">
                        <div className="modal-header">
                            <h5 className="modal-title" id="searchModalLabel">Buscar recetas o cócteles</h5>
                            <button 
                                type="button" 
                                className="btn-close animate__animated animate__flipOutX" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={manejoEnvio}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control animate__animated animate__fadeInLeft"
                                        placeholder="Buscar recetas o cócteles..."
                                        value={txtbuscar}
                                        onChange={menejoTxt}
                                    />
                                    <button 
                                        className="btn btn-primary animate__animated animate__fadeInRight animate__delay-1s" 
                                        type="submit" 
                                        data-bs-dismiss="modal"
                                    >
                                        <i className="fas fa-search animate__animated animate__swing"></i>
                                    </button>
                                </div>
                                <div className="mt-3">
                                    <small className="text-muted">
                                        <i className="fas fa-info-circle me-1"></i>
                                        Busca recetas por nombre o ingredientes, y cócteles por nombre
                                    </small>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Agrega estos estilos CSS para mejoras visuales */}
            <style>{`
                .hover-effect:hover {
                    animation: animate__rubberBand 1s !important;
                    transform: scale(1.1);
                    transition: transform 0.3s ease;
                }
                
                .nav-link:hover {
                    animation: animate__pulse 0.5s !important;
                    transform: translateY(-2px);
                    transition: all 0.3s ease;
                }
                
                .dropdown-item:hover {
                    animation: animate__bounceIn 0.5s !important;
                    background-color: var(--bs-primary);
                    color: white !important;
                    padding-left: 20px !important;
                    transition: all 0.3s ease;
                }
                
                .btn-outline-warning:hover .fa-shopping-cart {
                    animation: animate__tada 1s !important;
                }
            `}</style>
        </div>
    );
};

export default Header;