module.exports = (sequelize,DataTypes)=>{
    const afterParties = sequelize.define(
        "afterParties",
    {
        location: DataTypes.STRING,
        city: DataTypes.STRING,
        date:DataTypes.DATE,
        ticketPrice: DataTypes.INTEGER
    },
    {
      timestamps : true
    });

   return afterParties;
};