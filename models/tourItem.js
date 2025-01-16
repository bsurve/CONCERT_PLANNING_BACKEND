module.exports = (sequelize, DataTypes)=>{
    const tourItem = sequelize.define(
        "tourItem",
        {
        tourId :{
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {model:"tour", key:"id"},
        },
        tourId:{
            type:DataTypes.INTEGER,
        },
        type:{
            type:DataTypes.STRING
        },
    },
        {timestamps: true}
    );

     tourItem.associate= (models)=>{
        tourItem.belongTo(models.tour, {foreignkey: "tourId"})
     };

return tourItem;

   };