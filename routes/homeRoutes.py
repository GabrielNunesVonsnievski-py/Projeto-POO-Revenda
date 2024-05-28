from controllers.homeController import homeController

def home(app):
    app.route('/')(homeController)