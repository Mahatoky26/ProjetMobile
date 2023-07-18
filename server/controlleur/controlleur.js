import { fournisseur,produit,produitFour,achat,DetAchat,vente,DetVente } from "../modele/modele.js";
import { Op } from "sequelize";
import  sequelize  from "sequelize";
//fournisseur
const createFour = (req, res) =>{
    const {body} = req;
    /*const{error} = voyageValidation(body);
    if(error)return res.status(401).json(error.details[0].message);*/   
    fournisseur.create({...body,logo : req.file.filename}).then(()=>{res.status(200).json({msg : "success"})}).catch(error=>{res.status(500).json(error)})
}
const recIdFour= (req, res) =>{
    const{id} = req.params
    fournisseur.findByPk(id).then(f =>{res.json(f)}).catch(error=>{res.status(500).json(error)})
}
const AfficherTousFour = (req, res) =>{
    fournisseur.findAll().then(f =>{res.status(200).json(f)}).catch(error=>{res.status(500).json(error)})
}
const recRehetraFour=(req,res) =>{
    const {id} = req.params
    fournisseur.findAll({
        where: {
          [Op.or]: [
            { idFour: { [Op.like]: `%${id}%` } },
            { nomSociete: { [Op.like]: `%${id}%` } },
            { nomGerant: { [Op.like]: `%${id}%` } },
            { email: { [Op.like]: `%${id}%` } },
            { Tel: { [Op.like]: `%${id}%` } },
          ]
        }
      })
    .then(f => {res.status(200).json(f)})
    .catch(error=>{res.status(500).json(error)})
}
const updateFour = (req, res) =>{
    const {body} = req;
    const {id} = req.params;
    fournisseur.findByPk(id).then(f =>{
        f.nomSociete = body.nomSociete;
        f.nomGerant = body.nomGerant;
        f.email = body.email;
        f.Tel = body.Tel;
        if(req.file){
          f.logo = req.file.filename;
        }
        f.save().then(() => res.status(200).json({msg : "success"})).catch(error=>{res.status()})
    }).catch(error=>{res.status(500).json(error)})
}
const deleteFour = (req, res) =>{
    const {id}= req.params;
    fournisseur.destroy({where: {idFour: id}})
    .then(() => res.status(200).json({msg:"delete succes"}))
    .catch(error=>{res.status(500).json(error)})
}

//produitFour
const createProduitFour = (req, res) =>{
    const {body} = req;
    produitFour.create({...body,ImgProFour : req.file.filename}).then(()=>{res.status(200).json({msg : "success"})}).catch(error=>{res.status(500).json(error)})
}
const recIdProduitFour = (req, res) =>{
    const {id} = req.params;
    produitFour.findByPk(id).then(f =>{res.status(200).json(f)}).catch(error=>{res.status(500).json(error)})
}

//produit
const createProduit = (req, res) =>{
    const {body} = req
    produit.create({...body}).then(()=>{res.status(200).json({msg : "success"})}).catch(error=>{res.status(500).json(error)})
}

const recIdProduit= (req, res) =>{
    const{id} = req.params
    produit.findByPk(id).then(f =>{res.json(f)}).catch(error=>{res.status(500).json(error)})
}
const AfficherTousProduit = (req, res) =>{
    produit.findAll().then(f =>{res.status(200).json(f)}).catch(error=>{res.status(500).json(error)})
}
const recRehetraProduit=(req,res) =>{
    const {id} = req.params
    produit.findAll({
        where: {
          [Op.or]: [
            { idProd: { [Op.like]: `%${id}%` } },
            { ImgPro: { [Op.like]: `%${id}%` } },
            { design: { [Op.like]: `%${id}%` } },
            { Stock: { [Op.like]: `%${id}%` } },
            { Pu: { [Op.like]: `%${id}%` } },
          ]
        }
      })
    .then(f => {res.status(200).json(f)})
    .catch(error=>{res.status(500).json(error)})
}
const updateProduit = (req, res) =>{
    const {body} = req;
    const {id} = req.params;
    produit.findByPk(id).then(f =>{
        f.design = body.design;
        f.Stock = body.Stock;
        f.Pu = body.Pu;
        f.ImgPro = req.file.filename;
        f.save().then(() => res.status(200).json({msg : "success"})).catch(error=>{res.status()})
    }).catch(error=>{res.status(500).json(error)})
}
const deleteProduit = (req, res) =>{
    const {id}= req.params;
    produit.destroy({where: {idProd: id}})
    .then(() => res.status(200).json({msg:"delete succes"}))
    .catch(error=>{res.status(500).json(error)})
}

//achat
const createAchat = (req, res) =>{
    const {body} = req;
    achat.create({...body}).then(()=>{res.status(200).json({msg : "success"})}).catch(error=>{res.status(500).json(error)})
}
const createDetAchat = (req, res) =>{
    const {body} = req;
    DetAchat.create({...body}).then(()=>{res.status(200).json({msg : "success"})}).catch(error=>{res.status(500).json(error)})
}

const recIdAchat = (req, res) =>{
    const {id} = req.params;
    achat.findByPk(id).then(f=>{res.status(200).json(f)}).catch(error=>{res.status(500).json(error)})
}
const recIdDetAchat = (req, res) =>{
    const {id} = req.params;
    DetAchat.findAll({where : {idAchat : id}}).then(f=>{res.status(200).json(f)}).catch(error=>{res.status(500).json(error)})
}
const AfficherTousAchat= (req, res) =>{
    DetAchat.findAll().then(f=>{res.status(200).json(f)}).catch(error=>{res.status(500).json(error)})
}

const recRehetraDetAchat=(req,res) =>{
    const {id} = req.params
    DetAchat.findAll({
        where: {
          [Op.or]: [
            { idAchat: { [Op.like]: `%${id}%` } },
            { idFour: { [Op.like]: `%${id}%` } },
            { idProd: { [Op.like]: `%${id}%` } },
            { ImgPro: { [Op.like]: `%${id}%` } },
            { design: { [Op.like]: `%${id}%` } },
            { PuFour: { [Op.like]: `%${id}%` } },
            {  Qte: { [Op.like]: `%${id}%` } },
            { Subtotal: { [Op.like]: `%${id}%` } },
            { dateAchat: { [Op.like]: `%${id}%` } },
          ]
        }
      })
    .then(f => {res.status(200).json(f)})
    .catch(error=>{res.status(500).json(error)})
}

const recAchatDate = (req, res) => {
    const {date1} = req.params.date1
    const {date2} = req.params.date2
    DetAchat.findAll({
        where: {
          dateAchat: {
            [sequelize.Op.between]: [date1, date2]
          }
        }
      }) .then(f => {res.status(200).json(f)})
      .catch(error=>{res.status(500).json(error)})
}

//vente
const createVente = (req, res) =>{
    const {body} = req;
    vente.create({...body}).then(()=>{res.status(200).json({msg : "success"})}).catch(error=>{res.status(500).json(error)})
}
const createDetVente = (req, res) =>{
    const {body} = req;
    DetVente.create({...body}).then(()=>{res.status(200).json({msg : "success"})}).catch(error=>{res.status(500).json(error)})
}

const recIdVente = (req, res) =>{
    const {id} = req.params;
    vente.findByPk(id).then(f=>{res.status(200).json(f)}).catch(error=>{res.status(500).json(error)})
}
const recIdDetVente = (req, res) =>{
    const {id} = req.params;
    DetVente.findAll({where : {idAchat : id}}).then(f=>{res.status(200).json(f)}).catch(error=>{res.status(500).json(error)})
}
const AfficherTousVente= (req, res) =>{
    DetVente.findAll().then(f=>{res.status(200).json(f)}).catch(error=>{res.status(500).json(error)})
}

const recRehetraDetVente=(req,res) =>{
    const {id} = req.params
    DetVente.findAll({
        where: {
          [Op.or]: [
            { idVente: { [Op.like]: `%${id}%` } },
            { idProd: { [Op.like]: `%${id}%` } },
            { ImgPro: { [Op.like]: `%${id}%` } },
            { design: { [Op.like]: `%${id}%` } },
            { Pu: { [Op.like]: `%${id}%` } },
            {  Qte: { [Op.like]: `%${id}%` } },
            { Subtotal: { [Op.like]: `%${id}%` } },
            { dateVente: { [Op.like]: `%${id}%` } },
          ]
        }
      })
    .then(f => {res.status(200).json(f)})
    .catch(error=>{res.status(500).json(error)})
}

const recVenteDate = (req, res) => {
    const {date1} = req.params.date1
    const {date2} = req.params.date2
    DetVente.findAll({
        where: {
          dateAchat: {
            [sequelize.Op.between]: [date1, date2]
          }
        }
      }) .then(f => {res.status(200).json(f)})
      .catch(error=>{res.status(500).json(error)})
}

//depense
const chiffreDepense = (req, res) => {
    const {id} = req.params
    
    achat.findAll({
        attributes: ['idFour', [sequelize.fn('SUM', sequelize.col('depense')), 'totalDepense']],
        where: sequelize.where(sequelize.fn('YEAR', sequelize.col('dateAchat')), sequelize.col('id')),
        group: ['idFour']
    }).then(f => {res.status(200).json(f)})
    .catch(error=>{res.status(500).json(error)})
}

//montant
const chiffreMontant = (req, res) => {
    const {id} = req.params
    vente.findAll({
        attributes: [
          [sequelize.fn('MONTH', sequelize.col('dateVente')), 'month'],
          [sequelize.fn('SUM', sequelize.col('montant')), 'totalMontant']
        ],
        where: sequelize.where(sequelize.fn('YEAR', sequelize.col('dateVente')), sequelize.col('id')),
        group: [sequelize.fn('MONTH', sequelize.col('dateVente'))]
      }).then(f => {res.status(200).json(f)})
      .catch(error=>{res.status(500).json(error)})
}

export {createFour,updateFour,recIdFour,recRehetraFour,deleteFour,AfficherTousFour,createProduitFour,recIdProduitFour
,createProduit,recIdProduit,recRehetraProduit,deleteProduit,updateProduit,AfficherTousProduit,createAchat,createDetAchat,recIdAchat,recIdDetAchat,
AfficherTousAchat,recRehetraDetAchat,recAchatDate,createDetVente,createVente,recIdVente,recIdDetVente,AfficherTousVente,recRehetraDetVente,recVenteDate
,chiffreDepense,chiffreMontant};