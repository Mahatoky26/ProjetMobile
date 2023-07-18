import { Router } from "express";
import {createFour,updateFour,recIdFour, recRehetraFour, deleteFour, AfficherTousFour,
createProduitFour,recIdProduitFour,createProduit,recIdProduit,recRehetraProduit,deleteProduit,updateProduit,AfficherTousProduit,createAchat,createDetAchat
,recAchatDate,AfficherTousAchat,recRehetraDetAchat,recIdAchat,recIdDetAchat,createDetVente,createVente,recIdVente,recIdDetVente,AfficherTousVente,recRehetraDetVente,recVenteDate
,chiffreDepense,chiffreMontant}from "../controlleur/controlleur.js";
import multer from 'multer';
import path from 'path';


//logoFour
const router = Router();
const storage = multer.diskStorage({
    destination: './image/logoFournisseur',
    filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  });
const upload = multer({ storage : storage });

//imgProduit
const storage1 = multer.diskStorage({
    destination: './image/imageProduit',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload1 = multer({ storage : storage1 });


//fournisseur
router.post('/createFour',upload.single('logo'), createFour);
router.put('/updateFour/:id',upload.single('logo'), updateFour);
router.get('/AfficherTousFour', AfficherTousFour);
router.get('/recIdFour/:id', recIdFour);
router.get('/recRehetraFour/:id', recRehetraFour);
router.delete('/deleteFour/:id', deleteFour);

//produitFour
router.post('/createProduitFour',upload1.single('ImgProFour'), createProduitFour);
router.get('/recIdProduitFour/:id', recIdProduitFour);

//produit
router.post('/createProduit', createProduit);
router.put('/updateProduit/:id',upload1.single('ImgPro'), updateProduit);
router.get('/AfficherTousProduit', AfficherTousProduit);
router.get('/recIdProduit/:id', recIdProduit);
router.get('/recRehetraProduit/:id', recRehetraProduit);
router.delete('/deleteProduit/:id', deleteProduit);

//achat
router.post('/createAchat', createAchat);
router.post('/createDetAchat', createDetAchat);
router.get('/recAchatDate/:date1/:date2', recAchatDate);
router.get('/AfficherTousAchat', AfficherTousAchat);
router.get('/recRehetraDetAchat/:id', recRehetraDetAchat);
router.get('/recIdAchat/:id', recIdAchat);
router.get('/recIdDetAchat/:id', recIdDetAchat);

//vente
router.post('/createVente', createVente);
router.post('/createDetVente', createDetVente);
router.get('/recVenteDate/:date1/:date2', recVenteDate);
router.get('/AfficherTousVente', AfficherTousVente);
router.get('/recRehetraDetVente/:id', recRehetraDetVente);
router.get('/recIdVente/:id', recIdVente);
router.get('/recIdDetVente/:id', recIdDetVente);

//chiffre depense
router.get('/chiffreDepense/:id', chiffreDepense);

//chiffre montant
router.get('/chiffreMontant/:id', chiffreMontant);
export default router;