from controllers.veiculoController import veiculo_controller

def veiculo(app):
    app.route('/veiculos', methods=['POST','GET','PUT','DELETE'])(veiculo_controller)