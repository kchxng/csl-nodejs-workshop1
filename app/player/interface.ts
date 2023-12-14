import { Player } from "../../models/player";
import { IWallet } from "../../models/wallets";

export interface PlayerRepository {
  findAll(): Promise<Player[]>;
  findById(id: string): Promise<Player | null>;
  findByName(name: string): Promise<Player | null>;
  register(playerData: any): Promise<Player>;
  deposit(id: string, depositAmount: any): Promise<Player | null>;
  withdraw(id: string, withdrawAmount: any): Promise<Player | null>;
}

export interface PlayerService {
  getAllPlayers(): Promise<Player[]>;
  getPlayerById(id: string): Promise<Player | null>;
  findByName(name: string): Promise<Player | null>;
  reigsterPlayer(playerData: any): Promise<Player>;
  deposit(id: string, withdrawData: IWallet): Promise<Player | null>;
  withdraw(id: string, withdrawData: IWallet): Promise<Player | null>;
}
