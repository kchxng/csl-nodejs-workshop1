import { Sequelize } from "sequelize-typescript";
import { Player } from "../../models/player";
import { PlayerRepository } from "./interface";

const playerRepository: PlayerRepository = {
  findAll: async () => {
    return await Player.findAll();
  },

  findById: async (id: string) => {
    return await Player.findByPk(id);
  },

  findByName: async (name: string) => {
    return await Player.findOne({ where: { name } });
  },

  register: async (playerData: any) => {
    return await Player.create(playerData);
  },

  deposit: async (id: string, depositAmount: any) => {
    await Player.update(
      { balance: Sequelize.literal(`balance + ${depositAmount}`) },
      { where: { id } }
    );
    return Player.findByPk(id);
  },

  withdraw: async (id: string, withdrawAmount: any) => {
    await Player.update(
      { balance: Sequelize.literal(`balance - ${withdrawAmount}`) },
      { where: { id } }
    );
    return Player.findByPk(id);
  },
};

export { playerRepository };
