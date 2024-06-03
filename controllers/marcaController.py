from flask import request, render_template
from database import db
from sqlalchemy import ForeignKey
from models.marca import marca

def marca_controller():
        if request.method == 'POST':
            try:
                 data = request.get_json()
                 print(data)
                 user = marca(data['codigo'], data['nome'])
                 db.session.add(user)
                 db.session.commit()
                 return 'marca criado com sucesso', 200
            except Exception as e:
                 return 'O marca nao foi criado', 405
            
        elif request.method == 'GET':
            try:
                data = marca.query.all()
                return render_template('marca.html',data={'marca':[marca.to_dict() for marca in data]})
            
            except Exception  as e:
                 return 'Não foi possivel buscar marcas', 405
            
        elif request.method == 'PUT':
             try:
                  data = request.get_json()
                  put_marca_id = data['id']
                  put_marca = marca.query.get(put_marca_id)
                  if put_marca is None:
                       return {'error': 'marca não encontrado'}, 404
                  put_marca.codigo = data.get('codigo', put_marca.codigo)
                  put_marca.nome = data.get('nome', put_marca.nome)
                  print(put_marca.codigo, put_marca.nome, put_marca.codmarca)
                  db.session.commit()
                  return 'marca atualizado com sucesso',200
             except Exception as e:
                  return {'error': 'erro ao atualizar marca. Erro{}' .format(e)}, 400
             
        elif request.method == 'DELETE':
             try:
                  data = request.get_json()
                  delete_marca_id = data['id']
                  delete_marca = marca.query.get(delete_marca_id)
                  if delete_marca is None:
                       return {'error': 'marca não encontrado'}, 404
                  db.session.delete(delete_marca)
                  db.session.commit()
                  return 'marca atualizado com sucesso',200
             except Exception as e:
                  return {'error': 'erro ao atualizar marca. Erro{}' .format(e)}, 400
     