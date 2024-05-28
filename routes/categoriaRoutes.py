from controllers.categoriaController import categoria_controller

def categoria(app):
    app.route('/categoria', methods=['POST','GET','PUT','DELETE'])(categoria_controller)