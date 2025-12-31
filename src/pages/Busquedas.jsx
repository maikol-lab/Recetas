import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CardRecetas from '../components/CardRecetas';
import CardCocteles from '../components/CardCocteles';
import Paginador from '../components/Paginador';

const Busquedas = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchType, setSearchType] = useState('all'); // 'all', 'recipes', 'cocktails'
    const location = useLocation();
    const navigate = useNavigate(); // ✅ Añadido para navegación
    const txtBuscar = location.state || '';
    
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    const getDatos = async () => {
        if (!txtBuscar) {
            setDatos([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            // Buscar en AMBAS APIs simultáneamente
            const recipesUrl = `https://dummyjson.com/recipes/search?q=${encodeURIComponent(txtBuscar)}`;
            const cocktailsUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(txtBuscar)}`;
            
            // Hacer ambas peticiones en paralelo
            const [recipesResponse, cocktailsResponse] = await Promise.all([
                fetch(recipesUrl),
                fetch(cocktailsUrl)
            ]);
            
            let allResults = [];
            let hasRecipes = false;
            let hasCocktails = false;
            
            // Procesar recetas
            if (recipesResponse.ok) {
                const recipesData = await recipesResponse.json();
                if (recipesData.recipes && recipesData.recipes.length > 0) {
                    // Añadir tipo para identificar
                    const recipesWithType = recipesData.recipes.map(recipe => ({
                        ...recipe,
                        itemType: 'recipe'
                    }));
                    allResults = [...allResults, ...recipesWithType];
                    hasRecipes = true;
                }
            }
            
            // Procesar cócteles
            if (cocktailsResponse.ok) {
                const cocktailsData = await cocktailsResponse.json();
                if (cocktailsData.drinks && cocktailsData.drinks.length > 0) {
                    // Añadir tipo para identificar
                    const cocktailsWithType = cocktailsData.drinks.map(drink => ({
                        ...drink,
                        itemType: 'cocktail'
                    }));
                    allResults = [...allResults, ...cocktailsWithType];
                    hasCocktails = true;
                }
            }
            
            // ✅ REDIRIGIR A ERROR404 SI NO HAY RESULTADOS
            if (allResults.length === 0) {
                setLoading(false);
                navigate('/error404', {
                    state: {
                        message: `No se encontraron resultados para "${txtBuscar}"`,
                        tipo: 'sin_resultados',
                        busqueda: txtBuscar,
                        sugerencia: 'Prueba con términos más generales o revisa la ortografía'
                    }
                });
                return; // ✅ Importante: salir de la función
            }
            
            // Determinar tipo de búsqueda para mostrar
            if (hasRecipes && hasCocktails) {
                setSearchType('all');
            } else if (hasRecipes) {
                setSearchType('recipes');
            } else if (hasCocktails) {
                setSearchType('cocktails');
            } else {
                setSearchType('none');
            }
            
            setDatos(allResults);
            setTotalPages(Math.ceil(allResults.length / itemsPerPage));
            setLoading(false);
            
        } catch (err) {
            setError(err.message);
            setLoading(false);
            // ✅ Opcional: Redirigir a Error404 también en caso de error grave
            if (err.message.includes('Network') || err.message.includes('Failed to fetch')) {
                navigate('/error404', {
                    state: {
                        message: 'Error de conexión al buscar resultados',
                        tipo: 'error_conexion',
                        busqueda: txtBuscar,
                        sugerencia: 'Verifica tu conexión a internet e intenta nuevamente'
                    }
                });
            }
        }
    };

    useEffect(() => {
        if (txtBuscar) {
            getDatos();
        } else {
            setDatos([]);
            setLoading(false);
            // ✅ REDIRIGIR SI NO HAY TÉRMINO DE BÚSQUEDA
            if (location.pathname === '/busquedas') {
                navigate('/error404', {
                    state: {
                        message: 'No se ingresó término de búsqueda',
                        tipo: 'busqueda_vacia',
                        sugerencia: 'Escribe algo en el buscador para encontrar recetas o cócteles'
                    }
                });
            }
        }
    }, [txtBuscar]);

    // Resetear página cuando cambia la búsqueda
    useEffect(() => {
        setPage(1);
    }, [txtBuscar]);

    // Obtener items para la página actual
    const paginatedItems = datos.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    // Función para renderizar el tipo correcto de tarjeta
    const renderCard = (item, index) => {
        if (item.itemType === 'recipe') {
            return <CardRecetas key={item.id || index} item={item} />;
        } else if (item.itemType === 'cocktail') {
            return <CardCocteles key={item.idDrink || index} item={item} />;
        }
        return null;
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Buscando "{txtBuscar}"...</p>
            </div>
        );
    }

    // ✅ Este bloque ya no se usará cuando no haya resultados (porque redirige a Error404)
    // Pero lo mantenemos por si hay otros tipos de errores
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los resultados</h4>
                <p>{error}</p>
                <button 
                    className="btn btn-primary mt-3"
                    onClick={() => navigate('/error404', {
                        state: {
                            message: `Error técnico: ${error}`,
                            tipo: 'error_tecnico',
                            busqueda: txtBuscar
                        }
                    })}
                >
                    Ver más detalles
                </button>
            </div>
        );
    }

    // ✅ Solo llegamos aquí si HAY resultados
    return (
        <div className="container">
            <h1 className="text-center my-5">
                Resultados de búsqueda: "{txtBuscar}"
                <small className="d-block text-muted mt-2">
                    {searchType === 'all' ? 'Recetas y Cócteles' : 
                     searchType === 'recipes' ? 'Recetas de comida' : 
                     searchType === 'cocktails' ? 'Cócteles' : 
                     `${datos.length} resultados encontrados`}
                </small>
            </h1>

            {/* ✅ Ya no necesitamos el mensaje de "no resultados" aquí */}

            {datos.length > 0 && (
                <>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Mostrando {Math.min(itemsPerPage, datos.length)} de {datos.length} resultados 
                                {searchType === 'all' && ' (mezcla de recetas y cócteles)'}
                            </div>
                        </div>
                    </div>

                    {datos.length > itemsPerPage && (
                        <Paginador page={page} setPage={setPage} totalPages={totalPages} />
                    )}

                    <div className="row">
                        {paginatedItems.map((item, index) => renderCard(item, index))}
                    </div>

                    {datos.length > itemsPerPage && (
                        <Paginador page={page} setPage={setPage} totalPages={totalPages} />
                    )}

                    <div className="text-center mt-5">
                        <button 
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/')}
                        >
                            <i className="fas fa-search me-2"></i>
                            Nueva búsqueda
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Busquedas;