import { Player } from "../../models/player";
import { PlayerService } from "./interface";
import { playerRepository } from "./repository";

const playerService: PlayerService = {
  getAllPlayers: async () => {
    return playerRepository.findAll();
  },

  getPlayerById: async (id: string) => {
    const data = await playerRepository.findById(id);
    console.log(`data: ${JSON.stringify(data?.balance)}`);
    if (data?.balance! >= 100000) {
      console.log("big");
    } else {
      console.log("small");
    }
    return data;
  },

  findByName: async (name: string) => {
    return await Player.findOne({ where: { name } });
  },

  reigsterPlayer: async (playerData: any) => {
    // Additional business logic or validation can be added here
    return playerRepository.register(playerData);
  },

  deposit: async (id: string, amount: any) => {
    return playerRepository.deposit(id, amount);
  },
  withdraw: async (id: string, withdrawAmount: any) => {
    const data = await playerRepository.findById(id);
    if (data?.balance! >= 100000) {
      console.log("big");
    } else {
      console.log("small");
    }
    return playerRepository.withdraw(id, withdrawAmount);
  },
};

export { playerService };
