const database = require('../models');
const uuid = require('uuid');

class RoleService {
    async cadastrar(dto) {
        const role = await database.roles.findOne({
            where: { nome: dto.nome }
        });

        if (role) {
            throw new Error('Role já cadastrada');
        }

        try {
            const newRole = await database.roles.create({
                id: uuid.v4(),
                nome: dto.nome,
                descricao: dto.descricao
            });

            return newRole;
        } catch (error) {
            throw new Error('Erro ao cadastrar role');
        }
    }

    async buscarTodosRoles() {
        return await database.roles.findAll();
    }

    async buscarRolePorId(id) {
        const role = await database.roles.findOne({
            where: { id }
        });

        if (!role) {
            throw new Error('Role informado não cadastrado!');
        }

        return role;
    }

    async editarRole(dto) {
        const role = await database.roles.findOne({
            where: {
                id: dto.id
            }
        });

        if (!role) {
            throw new Error('Role informada não cadastrado!')
        }

        try {
            role.nome = dto.nome;
            role.descricao = dto.descricao;

            await role.save();

            return await role.reload();
        } catch (error) {
            console.error('Message error: ', error.message);
            throw error;
        }
    }

    async deletarRole(id) {
        await this.buscarRolePorId(id);

        try {
            await database.roles.destroy({
                where: { id }
            });
        } catch (error) {
            throw new Error('Erro ao deletar role!')
        }
    }
}

module.exports = RoleService;
