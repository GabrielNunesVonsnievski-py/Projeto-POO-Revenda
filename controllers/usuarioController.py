from flask import request, render_template
from database.db import db
from models.cliente import cliente

def cliente_controller():
        if request.method == 'POST':
            try:
                 data = request.get_json()
                 print(data)
                 user = cliente(data['nome'], data['email'], data['cargo_id'])
                 db.session.add(user)
                 db.session.commit()
                 return 'Usuario criado com sucesso', 200
            except Exception as e:
                 return 'O usuario nao foi criado', 405
            
        elif request.method == 'GET':
            try:
                data = cliente.query.all()
                return render_template('cliente.html',data={'cliente':[cliente.to_dict() for cliente in data]})
            
            except Exception  as e:
                 return 'Não foi possivel buscar usuários', 405
            
        elif request.method == 'PUT':
             try:
                  data = request.get_json()
                  put_cliente_id = data['id']
                  put_cliente = cliente.query.get(put_cliente_id)
                  if put_cliente is None:
                       return {'error': 'Cliente não encontrado'}, 404
                  put_cliente.nome = data.get('nome', put_cliente.nome)
                  put_cliente.email = data.get('email', put_cliente.email)
                  print(put_cliente.nome, put_cliente.email)
                  db.session.commit()
                  return 'Cliente atualizado com sucesso',200
             except Exception as e:
                  return {'error': 'erro ao atualizar cliente. Erro{}' .format(e)}, 400
             
        elif request.method == 'DELETE':
             try:
                  data = request.get_json()
                  delete_cliente_id = data['id']
                  delete_cliente = cliente.query.get(delete_cliente_id)
                  if delete_cliente is None:
                       return {'error': 'Cliente não encontrado'}, 404
                  db.session.delete(delete_cliente)
                  db.session.commit()
                  return 'Cliente atualizado com sucesso',200
             except Exception as e:
                  return {'error': 'erro ao atualizar cliente. Erro{}' .format(e)}, 400
     