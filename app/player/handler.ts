import { Code } from "../../utils/enum/code.enum";
import { Status } from "../../utils/enum/state.enum";
import { playerService } from "./service";
import { Request, Response } from "express";
import bcryt from "bcrypt";

const PlayerHandler = {
  /********************************************************************************
   * Desc: Get all player method
   ********************************************************************************/
  getAllPlayers: async (req: Request, res: Response): Promise<Response> => {
    try {
      const allPlayers = await playerService.getAllPlayers();
      return res.status(Code.OK).json({ status: Status.OK, data: allPlayers });
    } catch (err) {
      console.error("Error:", err);
      return res
        .status(Code.INTERNAL_SERVER_ERROR)
        .json({ error: Status.INTERNAL_SERVER_ERROR, err: err });
    }
  },

  /********************************************************************************
   * Desc: Get player by id method
   ********************************************************************************/
  getPlayerById: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const player = await playerService.getPlayerById(id);
      if (!player) {
        return res.status(Code.NOT_FOUND).json({
          status: Status.NOT_FOUND,
          message: `Player not found by Id: ${id}`,
        });
      }
      return res.status(Code.OK).json({ statuss: Status.OK, data: player });
    } catch (err) {
      console.error("Error:", err);
      return res
        .status(Code.INTERNAL_SERVER_ERROR)
        .json({ error: Status.INTERNAL_SERVER_ERROR, err: err });
    }
  },

  /********************************************************************************
   * Desc: register method
   ********************************************************************************/
  reigsterPlayer: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name } = req.body;
      const pass = req.body.password;
      if (pass.length != 10) {
        return res.status(Code.BAD_REQUEST).json({
          status: Status.BAD_REQUEST,
          message: `password must be equal 10 characters`,
        });
      }
      const hash = bcryt.hashSync(pass, 10);
      const playerBody = {
        name: req.body.name,
        password: hash,
        phoneNumber: req.body.phoneNumber,
        ipAddress: req.ip,
        originUrl: req.originalUrl,
      };
      const existingPlayer = await playerService.findByName(name);
      if (existingPlayer) {
        return res.status(Code.BAD_REQUEST).json({
          status: Status.BAD_REQUEST,
          message: `Player already exists`,
        });
      }

      if (!isValidString(req.body.password)) {
        console.log("String is not valid");
        return res.status(Code.BAD_REQUEST).json({
          status: Status.BAD_REQUEST,
          message: `Password is invalid`,
        });
      }

      const player = await playerService.reigsterPlayer(playerBody);

      return res.status(Code.OK).json({ status: Status.OK, data: player });
    } catch (err) {
      console.error("Error:", err);
      return res
        .status(Code.INTERNAL_SERVER_ERROR)
        .json({ error: Status.INTERNAL_SERVER_ERROR, err: err });
    }
  },

  /********************************************************************************
   * Desc: Deposit method
   ********************************************************************************/
  deposit: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
      const player = await playerService.getPlayerById(id);
      if (!player) {
        return res.status(Code.NOT_FOUND).json({
          status: Status.NOT_FOUND,
          message: `Player not found: ${id}`,
        });
      }

      if (amount > 100000) {
        return res.status(Code.BAD_REQUEST).json({
          status: Status.BAD_REQUEST,
          message: "Can only deposit max at 100000",
        });
      } else if (amount < 100) {
        return res.status(Code.BAD_REQUEST).json({
          status: Status.BAD_REQUEST,
          message: "Can only deposit min at 100",
        });
      }

      await playerService.deposit(id, amount);
      await playerService.getPlayerById(id);
      return res
        .status(Code.OK)
        .json({ status: Status.OK, message: "You're deposit success!" });
    } catch (err) {
      console.error("Error:", err);
      return res
        .status(Code.INTERNAL_SERVER_ERROR)
        .json({ error: Status.INTERNAL_SERVER_ERROR, err: err });
    }
  },

  /********************************************************************************
   * Desc: Withdraw method
   ********************************************************************************/
  withdraw: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
      const loadPlayerAfterWithdraw = await playerService.getPlayerById(id);
      if (loadPlayerAfterWithdraw?.balance! < amount) {
        return res.status(Code.BAD_REQUEST).json({
          status: Status.BAD_REQUEST,
          message: "Can not withdraw more than your balance",
        });
      }

      await playerService.withdraw(id, amount);

      return res
        .status(Code.OK)
        .json({ status: Status.OK, message: "You're withdraw success!" });
    } catch (err) {
      console.error("Error:", err);
      return res
        .status(Code.INTERNAL_SERVER_ERROR)
        .json({ error: Status.INTERNAL_SERVER_ERROR, err: err });
    }
  },
};

// validate password
const isValidString = (inputString: string): boolean => {
  const pattern = /^[a-z]{5}[0-9]{5}$/i;
  return pattern.test(inputString);
};

export { PlayerHandler };
