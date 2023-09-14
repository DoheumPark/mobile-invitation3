'use strict';

export default (sequelize, DataTypes) => {

  const User = sequelize.define(
    "User",
    {
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      uid: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    },
    {
      charset: "utf8mb4",
			collate: "utf8mb4_general_ci", // 한글 저장
    }
  );

  
  return User;
};