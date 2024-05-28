from routes.usuarioRoutes import usuario
from routes.homeRoutes import home
from routes.modeloRoutes import modelo
from routes.veiculoRoutes import veiculo

def default_routes(app):
    usuario(app)
    home(app)
    modelo(app)
    veiculo(app)