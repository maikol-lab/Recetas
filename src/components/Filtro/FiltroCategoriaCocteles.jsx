import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

const FiltroCategoriaCocteles = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            if (data.drinks) {
                // Ordenar alfabéticamente
                const datosOrdenados = data.drinks.sort((a, b) =>
                    a.strCategory.localeCompare(b.strCategory)
                );
                setDatos(datosOrdenados);
            }
        } catch (error) {
            console.error("Error al cargar categorías:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    // Función para codificar categorías problemáticas de forma segura
    const codificarCategoriaURL = (categoria) => {
        // Codificar para URL (mantiene las barras como %2F)
        const categoriaCodificada = encodeURIComponent(categoria);

        // Tu estructura original de ruta
        return `/coctelesreactetapa1y2/licor/${categoriaCodificada}/3`;
    };

    // Función para manejar errores en categorías
    const manejarErrorCategoria = (categoriaNombre, e) => {
        e.preventDefault();
        navigate('/error404', {
            state: {
                message: `Error al cargar la categoría: ${categoriaNombre}`,
                tipo: 'categoria_error',
                categoria: categoriaNombre
            }
        });
    };

    if (loading) {
        return (
            <div className="dropdown-item text-center py-2">
                <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <small className="text-muted">Cargando categorías...</small>
            </div>
        );
    }

    return (
        <>
            {datos.map((item, index) => {
                const categoriaNombre = item.strCategory;

                // Para TODAS las categorías, incluyendo problemáticas
                return (
                    <Link
                        to={codificarCategoriaURL(categoriaNombre)}
                        key={index}
                        className="dropdown-item"
                        onClick={(e) => {
                            // Solo interceptar si hay un problema real
                            if (!categoriaNombre || categoriaNombre.trim() === "") {
                                e.preventDefault();
                                manejarErrorCategoria(categoriaNombre, e);
                            }
                        }}
                    >
                        {/* Mostrar ícono para categorías con caracteres especiales */}

                        {categoriaNombre}
                    </Link>
                );
            })}

        </>
    );
};

export default FiltroCategoriaCocteles;