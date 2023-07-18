import { IonTitle, IonToolbar } from "@ionic/react";
import AchatIcon from "../../assets/AchatIcon";
import { QrReader } from "react-qr-reader";
import axios from "axios";
import { useRef, useState } from "react";

const Achat = () => {
  const [image, setImage] = useState() as any;
  const [designFour, setDesignFour] = useState() as any;
  const [puFour, setPuFour] = useState() as any;
  const [idProd, setIdProd] = useState() as any;
  const [sumDepense, setSumDepense] = useState(0) as any;

  const qteRef = useRef() as any;
  const date_buy = useRef() as any;
  const id_four = useRef() as any;

  const [idAchat, setIdAchat] = useState(0);
  // * multiple add
  const [temp_product, setTempProduct] = useState<any[]>([]);
  const setProduct = () => {
    // console.log(image,designFour,puFour);
    const newData = {
      idProd: idProd,
      ImgProFOur: image,
      designFOur: designFour,
      PuFour: puFour,
      Qte: qteRef.current.value,
      Subtotal: (puFour * qteRef.current.value).toFixed(0),
    };
    const updatedData = [...temp_product, newData]; // Create a new array with the new data
    setTempProduct(updatedData);

    // * reset data
    setImage("");
    setDesignFour("");
    setPuFour("");
    qteRef.current.value = "";
    // console.log(temp_product);
  };

  // * delete array product element
  const deleteProduct = (i: any) => {
    const tempProductCopy = [...temp_product];
    tempProductCopy.splice(i, 1);
    setTempProduct(tempProductCopy);
  };

  // * buy all
  const buyAll = () => {
    setSumDepense(
      temp_product.reduce(
        (accumulator: any, item) => accumulator + parseInt(item.Subtotal),
        0
      )
    );
    const data = {
      idFour: parseInt(id_four.current.value),
      depense: parseInt(sumDepense),
      dateAchat: date_buy.current.value,
    };

    // * post achat
    axios.post("http://localhost:2000/createAchat", data).then((response) => {
      axios.get(`http://localhost:2000/recIdAchatMax`).then((res) => {
        setIdAchat(res.data.maxIdAchat);
      });
    });

    // console.log(temp_product,idAchat);

    // * multiple buy
    for (let index = 0; index < temp_product.length; index++) {
      const elements = {
        idAchat: idAchat,
        idFour: parseInt(id_four.current.value),
        idProd: temp_product[index]["idProd"],
        ImgPro: temp_product[index]["ImgProFOur"],
        design: temp_product[index]["designFOur"],
        PuFour: temp_product[index]["PuFour"],
        Qte: temp_product[index]["Qte"],
        Subtotal: temp_product[index]["Subtotal"],
        dateAchat: date_buy.current.value,
      };
      const element = {
        idProd: temp_product[index]["idProd"],
        ImgPro: temp_product[index]["ImgProFOur"],
        design: temp_product[index]["designFOur"],
        Stock: temp_product[index]["Qte"],
      };
      // * ty le miajpute amle table detAchats
      axios.post("http://localhost:2000/createDetAchat", elements).then((response) => {
        console.log("ok beeeee");
      });
      axios.post("http://localhost:2000/createProduit", element).then((response) => {
        console.log("ok kind");
      });


    }
  };

  function handleScan(data: String) {
    console.log(data);
  }
  function handleError(err: Error) {
    console.error(err);
  }
  function handleResult(result: String) {
    if (result) {
      console.log(result);
      axios
        .get(`http://localhost:2000/recIdProduitFour/${result}`)

        .then((res) => {
          console.log(res.data);
          setIdProd(res.data.idProdFour);
          setImage(res.data.ImgProFour);
          setDesignFour(res.data.designFour);
          setPuFour(res.data.PuFour);
        });
    }
  }
  const previewStyle = {
    height: 240,
    width: 320,
  };
  return (
    <div className="apple lg:col-span-7  overflow-y-scroll space-y-4">
      <IonToolbar className="text-center">
        <IonTitle className="tracking-widest uppercase">
          <div className="titre font-bold flex gap-4 justify-center">
            <AchatIcon />
            Achat de Produits
          </div>
        </IonTitle>
      </IonToolbar>
      <div className="lg:grid lg:grid-cols-2">
        <div className="flex flex-col items-center">
          <QrReader
            className="w-1/2 h-1/2"
            delay={3000}
            onError={handleError}
            onScan={handleScan}
            onResult={handleResult}
          />
        </div>
        <div>
          <div className="p-8 lg:px-32 lg:py-16">
            {/* <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                disabled
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                ID Produit
              </label>
            </div> */}
            {/* <div className="relative z-0 w-full mb-6 group">
              <input
                type="file"
                className="block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                disabled
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                ID Fournisseur
              </label>
            </div> */}
            <img
              src={`http://localhost:2000/${image}`}
              alt="Image"
              className="w-20 h-20 rounded"
            />
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={designFour}
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Nom du Produit
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={puFour}
                required
                readOnly
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Montant
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                ref={qteRef}
                type="number"
                className="block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Quantité à acheter
              </label>
            </div>
            <div className="flex justify-center">
              <button
                onClick={setProduct}
                type="submit"
                className="uppercase font-bold text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-md w-auto px-8 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" p-4 lg:p-16">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-slate-100">
            <thead className="text-xs text-slate-200 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Design
                </th>
                <th scope="col" className="px-6 py-3">
                  Prix Unitaire
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantité
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {temp_product.map((d: any, i: any) => (
                <tr className="bg-gray-700" key={i}>
                  <img
                    src={`http://localhost:2000/${d.ImgProFOur}`}
                    className="w-20 h-20 rounded"
                  />
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-200 whitespace-nowrap dark:text-white"
                  >
                    {d.designFOur}
                  </th>
                  <td className="px-6 py-4">{d.PuFour}</td>
                  <td className="px-6 py-4">{d.Qte}</td>
                  <td className="px-6 py-4">{d.Subtotal}</td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button
                      onClick={() => deleteProduct(i)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className={
            temp_product.length === 0 ? "hidden" : "flex justify-center my-2"
          }
          >
          <div>Somme : {sumDepense} Ar</div>
          <div>
            <div>
              <input ref={date_buy} type="date" />
            </div>
            <div>
              <input
                ref={id_four}
                placeholder="id four"
                type="number"
                value={1}
              />
            </div>
            <button
              onClick={buyAll}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-auto px-8 py-4 text-center"
            >
              Acheter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achat;
