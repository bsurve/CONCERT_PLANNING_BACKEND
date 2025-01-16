const {
    concert: concertModel,
    merchandiseStalls: merchandiseStallsModel,
    tour: tourModel,
    tourItem: tourItemModel,
    afterParties: afterPartiesModel
    } = require("../models");

    const createTour = async (req,res)=>{
       try {
            
        const {concerts, merchandiseStalls,afterParties,name}= req.body;
        const newTour =await tourModel.create({name});

        if(concerts && concerts.length > 0){
            for(const concert of concerts){
                const saveConcert = await concertModel.create(concert);
                await tourItemModel.create({
                    tourId : newTour.id,
                    itemId: saveConcert.id,
                    type:"concert"
                });
            }
        }

        if(merchandiseStalls && merchandiseStalls.length > 0){
            for(const merchandiseStall of merchandiseStalls){
                const savemerchandiseStall = await merchandiseStallsModel.create(merchandiseStall);
                await tourItemModel.create({
                    tourId : newTour.id,
                    itemId: savemerchandiseStall.id,
                    type:"merchandiseStall"
                });
            }
        }
        
        if(afterParties && afterParties.length > 0){
            for(const afterParty of afterParties){
                const saveafterParty = await afterPartiesModel.create(afterParty);
                await tourItemModel.create({
                    tourId : newTour.id,
                    itemId: saveafterParty.id,
                    type:"afterParties"
                });
            }
        }
        
        res.status(201).json({message: "Tour Created", tour: newTour });
    
           } catch (error) {
            console.error(error);
            res.status(500).json({error: "Failed to create Tour"});
    
    } 
      
    };


    const getTour = async(req,res) =>{
        try {
            const tour = await tourModel.findByPk(req.params.id);
            if(!tour){
                return res.status(404).json({error: "Tour not Found"});
            }

            const items = await tourItemModel.findAll({
                where :{tourId: tour.id},
            });
            
           const afterParties =[];
          const concerts =[];
          const merchandiseStalls= [];

          for (const item of items){
            if(item.type === "afterParties"){
                const afterParties = await afterPartiesModel.findByPk(item.itemId);
                if(afterParties) afterParties.push(afterParties);
            }else if(item.type === "concert"){
                const concert = await concertModel.findByPk(item.itemId);
                if(concert) concerts.push(concert)
            }else if(item.type === "merchandiseStall"){
                const merchandiseStall = await merchandiseStallsModel.findByPk(item.itemId);
                if(merchandiseStall) merchandiseStalls.push(merchandiseStall)
            }
          }
            res.json({
                tour,
                afterParties,
                concerts, 
                merchandiseStalls
            });
            
        } catch (error) {
            console.error(error);
            res.status(505).json({error: "Failed to retrive tour"});
        }
    }

     module.exports = {createTour, getTour};