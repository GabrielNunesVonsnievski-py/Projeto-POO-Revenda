from flask import request, render_template
from database.db import db
from sqlalchemy import ForeignKey
from models.categoria import categoria

def categoria_controller():
        if request.method == 'POST':
            try:
                 data = request.get_json()
                 print(data)
                 user = categoria(data['codigo'], data['nome'])
                 db.session.add(user)
                 db.session.commit()
                 return 'categoria criado com sucesso', 200
            except Exception as e:
                 return 'O categoria nao foi criado', 405
            
        elif request.method == 'GET':
            try:
                data = categoria.query.all()
                return render_template('categoria.html',data={'categoria':[categoria.to_dict() for categoria in data]})
            
            except Exception  as e:
                 return 'Não foi possivel buscar categorias', 405
            
        elif request.method == 'PUT':
             try:
                  data = request.get_json()
                  put_categoria_id = data['id']
                  put_categoria = categoria.query.get(put_categoria_id)
                  if put_categoria is None:
                       return {'error': 'categoria não encontrado'}, 404
                  put_categoria.codigo = data.get('codigo', put_categoria.codigo)
                  put_categoria.nome = data.get('nome', put_categoria.nome)
                  print(put_categoria.codigo, put_categoria.nome, put_categoria.codcategoria)
                  db.session.commit()
                  return 'categoria atualizado com sucesso',200
             except Exception as e:
                  return {'error': 'erro ao atualizar categoria. Erro{}' .format(e)}, 400
             
        elif request.method == 'DELETE':
             try:
                  data = request.get_json()
                  delete_categoria_id = data['id']
                  delete_categoria = categoria.query.get(delete_categoria_id)
                  if delete_categoria is None:
                       return {'error': 'categoria não encontrado'}, 404
                  db.session.delete(delete_categoria)
                  db.session.commit()
                  return 'categoria atualizado com sucesso',200
             except Exception as e:
                  return {'error': 'erro ao atualizar categoria. Erro{}' .format(e)}, 400
     