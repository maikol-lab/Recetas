import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const API = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const Detalle = () => {
    const [datos, setDatos] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const id = params.id;
    
    const getDatos = async () => {
        let URI = API + id;
        try {
            const response = await fetch(URI);
            const data = await response.json();
            setDatos(data.drinks[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    // Función para determinar si hay historial de navegación
    const tieneHistorialAnterior = location.key !== "default";

    // Función para manejar el volver
    const handleVolver = () => {
        if (tieneHistorialAnterior) {
            navigate(-1); // Regresa a la página anterior
        } else {
            navigate("/"); // Si no hay historial, va al inicio
        }
    };

    return (
        <main>
            <div className="container-fluid bg-gradient-custom py-5 min-vh-100 animate__animated animate__fadeIn">
                <div className="container">
                    <h3 className="text-center py-4 fw-bold text-primary animate__animated animate__fadeInDown">Detalle del Cóctel</h3>
                    
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card border-0 shadow-lg overflow-hidden animate__animated animate__fadeInUp">
                                <div className="row g-0">
                                    {/* Columna de la imagen */}
                                    <div className="col-md-5">
                                        <div className="position-relative">
                                            <img 
                                                src={datos.strDrinkThumb} 
                                                alt={datos.strDrink} 
                                                className="img-fluid h-100 w-100 animate__animated animate__fadeInLeft"
                                                style={{
                                                    objectFit: 'cover',
                                                    minHeight: '500px'
                                                }}
                                            />
                                            <div className="position-absolute top-0 end-0 m-3 animate__animated animate__fadeInDown">
                                                <span className={`badge ${datos.strAlcoholic === 'Alcoholic' ? 'bg-danger' : 'bg-success'} p-2 animate__animated animate__pulse animate__infinite`}>
                                                    {datos.strAlcoholic}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Columna de la información */}
                                    <div className="col-md-7">
                                        <div className="card-body p-4 p-md-5 animate__animated animate__fadeInRight">
                                            <h2 className="fw-bold text-primary mb-3 animate__animated animate__fadeIn animate__delay-1s">{datos.strDrink}</h2>
                                            
                                            <div className="row mb-4">
                                                <div className="col-md-6 mb-3 animate__animated animate__fadeIn animate__delay-1s">
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-secondary me-2">ID</span>
                                                        <span className="fw-semibold">{id}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3 animate__animated animate__fadeIn animate__delay-1s">
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-info me-2">Categoría</span>
                                                        <span>{datos.strCategory}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3 animate__animated animate__fadeIn animate__delay-1s">
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-warning me-2">Vaso</span>
                                                        <span>{datos.strGlass}</span>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3 animate__animated animate__fadeIn animate__delay-1s">
                                                    <div className="d-flex align-items-center">
                                                        <span className="badge bg-dark me-2">Tipo</span>
                                                        <span>{datos.strAlcoholic}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Ingredientes */}
                                            <div className="mb-4">
                                                <h5 className="fw-bold text-secondary mb-3 animate__animated animate__fadeIn animate__delay-2s">
                                                    <i className="fas fa-list-check me-2"></i>
                                                    Ingredientes
                                                </h5>
                                                <div className="row">
                                                    {Array.from({ length: 15 }, (_, i) => i + 1).map((index) => (
                                                        datos[`strIngredient${index}`] && (
                                                            <div className="col-md-6 mb-2 animate__animated animate__fadeIn animate__delay-2s" key={index}>
                                                                <div className="d-flex justify-content-between align-items-center p-2 bg-light rounded">
                                                                    <span className="fw-medium">
                                                                        {datos[`strIngredient${index}`]}
                                                                    </span>
                                                                    <span className="badge bg-primary animate__animated animate__bounceIn">
                                                                        {datos[`strMeasure${index}`] || 'al gusto'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {/* Instrucciones */}
                                            <div className="mt-4 pt-3 border-top animate__animated animate__fadeIn animate__delay-3s">
                                                <h5 className="fw-bold text-secondary mb-3">
                                                    <i className="fas fa-book-open me-2"></i>
                                                    Instrucciones
                                                </h5>
                                                <div className="p-3 bg-light rounded animate__animated animate__fadeIn">
                                                    <p className="mb-0 lead">
                                                        {datos.strInstructions}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Botón de volver inteligente */}
                                            <div className="mt-4 pt-3 border-top animate__animated animate__fadeIn animate__delay-3s">
                                                <button 
                                                    onClick={handleVolver}
                                                    className="btn btn-primary px-4 animate__animated animate__pulse animate__delay-4s"
                                                >
                                                    <i className="fas fa-arrow-left me-2"></i>
                                                    {tieneHistorialAnterior ? "Volver atrás" : "Volver al inicio"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Detalle;