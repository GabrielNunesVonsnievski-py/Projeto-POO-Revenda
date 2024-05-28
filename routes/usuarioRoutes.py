from controllers.usuarioController import usuario_controller

def usuario(app):
    app.route('/usuario', method=['POST', 'GET', 'PUT', 'DELETE'])(usuario_controller)