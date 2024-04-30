from database.db import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class usuario(db.Model):
    def to_dict(self):
        return {
            'nome':self.nome,
            'login':self.login,
            'senha': self.senha
        }
    codigo = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50))
    login = db.Column(db.String(50))
    senha = db.Column(db.String(50))

    cargo = relationship('Cargos', backref='usuario')

    def __init__(self,nome,email, cargo_id):
        self.nome = nome
        self.email = email
        self.cargo_id = cargo_id
        