import  sequelize  from "sequelize";
import db from "../Db/db.js";
const {DataTypes} = sequelize;

const fournisseur = db.define('fournisseur',{
    idFour : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    logo:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    nomSociete:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    nomGerant:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    Tel:{
        type: DataTypes.INTEGER,
        allowNull : false,
    }
});
const produit = db.define('produit',{
    idProd:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull : false,
    },
    ImgPro:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    design:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    Pu:{
        type: DataTypes.INTEGER,
    },
    Stock:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
})
const produitFour = db.define('produitFour',{
    idProdFour:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull : false,
    },
    ImgProFour:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    designFour:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    PuFour:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
})
const achat = db.define('achat',{
    idAchat:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    idFour:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    depense:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    dateAchat: {
        type: DataTypes.DATE,
        allowNull : false,
    }
})
const DetAchat = db.define('DetAchat',{
    idDetAchat:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    idAchat:{
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    idFour:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    idProd:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull : false,
    },
    ImgPro:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    design:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    PuFour:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    Qte:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    Subtotal:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    dateAchat: {
        type: DataTypes.DATE,
        allowNull : false,
    }  
})
const vente = db.define('vente',{
    idVente:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    montant:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    dateVente: {
        type: DataTypes.DATE,
        allowNull : false,
    }
})
const DetVente = db.define('DetVente',{
    idDetVente:{
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false,
    },
    idVente:{
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    idProd:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull : false,
    },
    ImgPro:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    design:{
        type: DataTypes.STRING,
        allowNull : false,
    },
    Pu:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    Qte:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    Subtotal:{
        type: DataTypes.INTEGER,
        allowNull : false,
    },
    dateVente: {
        type: DataTypes.DATE,
        allowNull : false,
    }  
})
export {fournisseur,produit,produitFour,DetAchat,achat,vente,DetVente};