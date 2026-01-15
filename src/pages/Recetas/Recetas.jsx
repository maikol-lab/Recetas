import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardRecetas from "../../components/Card/CardRecetas";
import Paginador from "../../components/Paginador";

const API = 'https://dummyjson.com/recipes?limit=54&skip=';

const Recetas = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState(location.state?.search || "");

    const getDatos = async () => {
        try {
            setLoading(true);
            const response = await fetch(API);
            const data = await response.json();
            setDatos(data.recipes);
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener datos:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    const filteredRecipes = datos.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const paginatedRecipes = filteredRecipes.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    useEffect(() => {
        setPage(1);
        setTotalPages(Math.ceil(filteredRecipes.length / itemsPerPage));
    }, [searchTerm, filteredRecipes.length]);




    return (
        <div className="container">
            <h4 className="text-center py-4">RECETAS</h4>

            {/* Mostrar término de búsqueda actual */}
            {searchTerm && (
                <div className="alert alert-info text-center">
                    Mostrando resultados para: <strong>"{searchTerm}"</strong>
                </div>
            )}

            {/* Mostrar mensaje si no hay resultados */}
            {!loading && filteredRecipes.length === 0 && (
                <div className="alert alert-warning text-center">
                    No se encontraron recetas que coincidan con tu búsqueda.
                </div>
            )}

            {filteredRecipes.length > 0 && (
                <Paginador page={page} setPage={setPage} totalPages={totalPages} />
            )}

            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="row">
                    {paginatedRecipes.map((item) => (
                        <CardRecetas key={item.id} item={item} />
                    ))}
                </div>
            )}

            {filteredRecipes.length > 0 && (
                <Paginador page={page} setPage={setPage} totalPages={totalPages} />
            )}
        </div>
    );
};

export default Recetas;
