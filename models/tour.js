
module.export=(sequelize, DataTypes) => {
    const tour = sequelize.define("tour",{
        name : DataTypes.STRING,
    },
    {
        timestamps: true
    }
);

tour.associate = (models)=>{
    tour.hasMany(models.tourItem,{
        foreignkey : "tourId",
    });
};

return tour;
};