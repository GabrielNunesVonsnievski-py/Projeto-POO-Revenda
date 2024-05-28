from flask import render_template
from models.usuario import usuario

def homeController():
    user = usuario("cleber", "cleber@gmail.com")
    return render_template('index.html', user=user)