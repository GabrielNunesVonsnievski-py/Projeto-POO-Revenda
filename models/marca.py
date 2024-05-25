from database.db import db
from sqlalchemy.orm import relationship

class marca(db.Model):
    def to_dict(self):
        return {
            'codigo'   :self.codigo,
            'nome'     :self.nome,
        }
    codigo = db.Column(db.Integer, primary_key=True)
    nome   = db.Column(db.String(50))

    def __init__(self,codigo, nome):
        self.codigo   = codigo
        self.nome     = nome

        