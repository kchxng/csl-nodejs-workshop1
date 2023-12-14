import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "player",
})
export class Player extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phoneNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ipAddress!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  originUrl!: string;

  @Column({
    type: DataType.DOUBLE,
    defaultValue: 0,
  })
  balance!: number;
}
