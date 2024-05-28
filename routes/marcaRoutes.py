from controllers.marcaController import marca_controller

def marca(app):
    app.route('/marca', methods=['POST','GET','PUT','DELETE'])(marca_controller)