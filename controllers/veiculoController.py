from flask import request, render_template
from database.db import db
from models.veiculo import veiculo

def veiculo_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            user = veiculo(data['codigo'], data['descricao'], data['codcategoria'], 
                          data['codmodelo'], data['ano'], data['cor'], data['placa'], 
                          data['opcional'], data['valor'], data['foto1'])
            db.session.add(user)
            db.session.commit()
            return 'veiculo criado com sucesso', 200
        except Exception as e:
            return f'O veiculo nao foi criado. Erro: {e}', 405
        
    elif request.method == 'GET':
        try:
            data = veiculo.query.all()
            return {'veiculo':[veiculo.to_dict() for veiculo in data]}        
        except Exception as e:
            return f'Não foi possivel buscar veiculos. Erro: {e}', 405
        
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            put_veiculo_codigo = data['codigo']  # Correção: usar 'codigo' para obter o ID
            put_veiculo = veiculo.query.get(put_veiculo_codigo)
            if put_veiculo is None:
                return {'error': 'veiculo não encontrado'}, 404
            put_veiculo.descricao = data.get('descricao', put_veiculo.descricao)
            put_veiculo.codcategoria = data.get('codcategoria', put_veiculo.codcategoria)
            put_veiculo.codmodelo = data.get('codmodelo', put_veiculo.codmodelo)
            put_veiculo.ano = data.get('ano', put_veiculo.ano)
            put_veiculo.cor = data.get('cor', put_veiculo.cor)
            put_veiculo.placa = data.get('placa', put_veiculo.placa)
            put_veiculo.opcional = data.get('opcional', put_veiculo.opcional)
            put_veiculo.valor = data.get('valor', put_veiculo.valor)
            put_veiculo.foto1 = data.get('foto1', put_veiculo.foto1)
            db.session.commit()
            return 'veiculo atualizado com sucesso',200
        except Exception as e:
            return {'error': f'erro ao atualizar veiculo. Erro: {e}'}, 400
        
    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            delete_veiculo_codigo = data['codigo']  # Correção: usar 'codigo' para obter o ID
            delete_veiculo = veiculo.query.get(delete_veiculo_codigo)
            if delete_veiculo is None:
                return {'error': 'veiculo não encontrado'}, 404
            db.session.delete(delete_veiculo)
            db.session.commit()
            return 'veiculo deletado com sucesso', 200
        except Exception as e:
            return {'error': f'erro ao deletar veiculo. Erro: {e}'}, 400