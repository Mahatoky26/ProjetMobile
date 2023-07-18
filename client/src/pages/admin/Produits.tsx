import { IonTitle, IonToolbar } from "@ionic/react";
import React, { useEffect, useState } from "react";
import ProduitIcon from "../../assets/ProduitIcon";
import axios from "axios";
// import Produits from './Produits';

type Produits = {
  idProd: any;
  ImgPro: string;
  design: string;
  Pu: number | undefined;
  Stock: number | undefined;
};

function Produits() {
  const [products, setProducts] = useState<Produits[]>([]);
  const [product, setProduct] = useState({
    // ampesaina am formData sy ny input ao am formulaire
    design: "",
    Pu: "",
    Stock: "",
  });
  const [logoEdit, setLogoEdit] = useState<string | null>(null); // sary kely rehefa modif
  const [logoFile, setLogoFile] = useState<File | null>(null); // fichier sary
  const [idProd, setIdProd] = useState<number | null>(null); //ho an condition post sy put, refa misy de put, refa tsis de post

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:2000/AfficherTousProduit").then((res) => {
      setProduct(res.data);
    });
  };

  /* submit form */
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    /* ampidirina tsirairay anaty formData ny anaty four */
    for (const [name, value] of Object.entries(product)) {
      formData.append(name, value);
    }

    /* rehefa misy sary alefa */
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    /* condition ajout na modifier */
    if (idProd) {
      axios
        .put(`http://localhost:2000/updateProduit/${idProd}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          fetchData();
          setLogoFile(null);
          setLogoEdit(null);
        });
    }

    setProduct({
      design: "",
      Pu: "",
      Stock: "",
    });
  };

  /* rehefa miova ny input tsirairay dia miova ny four*/
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  /* rehefa mampiditra sary */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setLogoFile(files[0]);
    }
  };

  /* rehefa manindry bouton Modifier */
  const handleEdit = (data: any) => {
    const { idProd, ImgPro, ...other } = data;
    setLogoEdit("http://localhost:2000/" + ImgPro); // src anle sary kely
    setIdProd(idProd); // lasa put ny method ao am handleSubmit
    setProduct(other); // ampidirina ao le donnée tao am tableau izay mitovy amle state initial ligne 15
  };

  /* rehefa supprimer */
  const handleDelete = (id: any) => {
    axios
      .delete(`http://localhost:2000/deleteProduit/${id}`)
      .then((response) => {
        console.log(response);
        fetchData();
      });
  };

  /* recherche */
  const handleSearch = (search: string | null) => {
    if (search) {
      axios
        .get(`http://localhost:2000/recRehetraProduit/${search}`)
        .then((res) => {
          setProduct(res.data);
        });
    } else {
      fetchData();
    }
  };

  return (
    <div className="apple lg:col-span-7  overflow-y-scroll">
      <IonToolbar className="text-center">
        <IonTitle className="tracking-widest uppercase">
          <div className="titre font-bold flex justify-center gap-4">
            <ProduitIcon />
            Produits
          </div>
        </IonTitle>
      </IonToolbar>
      <div className=" lg:grid lg:grid-cols-2">
        <div className="p-8">
          <form>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className="block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
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
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Prix Unitaire
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="block py-2.5 px-0 w-full text-sm text-slate-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Quantité en Stock
              </label>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              {logoEdit && (
                <img src={logoEdit} className="w-20 h-20 rounded" alt="logo" />
              )}
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="uppercase text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-auto px-8 py-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ajouter Produit
              </button>
            </div>
          </form>
        </div>
        <div className="p-8 lg:translate-y-24 lg:translate-x-40 lg:w-2/3">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Rechercher Produit..."
                required
              />
            </div>
          </form>
        </div>
      </div>
      <div className=" p-4 lg:p-16">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-slate-100 ">
            <thead className="text-xs text-slate-200 uppercase bg-gray-700 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Nom du Produit
                </th>
                <th scope="col" className="px-6 py-3">
                  Prix Unitaire
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantité en Stock
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((d, i) => (
                <tr className="bg-gray-700 " key={i}>
                  <td className="pl-4">
                    <img
                      src={`http://localhost:2000/${d.ImgPro}`}
                      className="w-20 h-20 rounded"
                    />
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap dark:text-white"
                  >
                    {d.design}
                  </th>
                  <td className="px-6 py-4">{d.Pu}</td>
                  <td className="px-6 py-4">{d.Stock}</td>

                  <td className="px-6 py-4 text-right space-x-4 flex">
                    <button
                      className="font-medium text-gray-200 dark:text-slate-100 hover:underline"
                      onClick={handleEdit}
                    >
                      Modifier
                    </button>
                    <button
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => handleDelete}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Produits;
