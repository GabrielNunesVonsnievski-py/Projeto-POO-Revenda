from controllers.modeloController import modelo_controller

def modelo(app):
    app.route('/modelos', methods=['POST','GET','PUT','DELETE'])(modelo_controller)