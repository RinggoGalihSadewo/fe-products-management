import axios from "axios";

const Fetcher = (...args) => fetch(...args).then((res) => res.json());
// const Url = "http://localhost:5000/api/products";
// const UrlImg = "http://127.0.0.1:8000/assets";
const Url = "https://be-products-management.vercel.app/api/products";
const UrlImg =
  "https://ringgogalihsadewo.com/products-management/public/assets";

const GetAllProducts = async () => {
  try {
    const response = await axios.get(Url);
    const data = response.data;
    return data;
  } catch (err) {
    console.log(error);
    return null;
  }
};

const SaveProduct = (data) => {
  let formData = new FormData();

  formData.append("name", data.name);
  formData.append("purchase_price", data.purchase_price);
  formData.append("purchase_sell", data.purchase_sell);
  formData.append("stock", data.stock);
  formData.append("photo", data.photo);

  axios
    .post(Url, formData)
    .then((res) => (window.location.href = "/products"))
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        const errors = err.response.data.errors;

        alert(
          `Validasi Errors: ` +
            `${errors.map((value) => {
              return value.msg;
            })}`
        );
      }
    });
};

const UpdateProduct = (data) => {
  let formData = new FormData();

  formData.append("_id", data._id);
  formData.append("name", data.name);
  formData.append("purchase_price", data.purchase_price);
  formData.append("purchase_sell", data.purchase_sell);
  formData.append("stock", data.stock);
  formData.append("photo", data.photo);

  axios
    .patch(`${Url}/${data._id}`, formData)
    .then((res) => (window.location.href = "/products"))
    .catch((err) => {
      if (err.response && err.response.status === 400) {
        const errors = err.response.data.errors;

        alert(
          `Validasi Errors: ` +
            `${errors.map((value) => {
              return value.msg;
            })}`
        );
      }
    });
};

const DeleteProduct = async (name) => {
  try {
    await axios.delete(`${Url}/${name}`);
  } catch (err) {
    console.log(err);
  }
};

export {
  GetAllProducts,
  SaveProduct,
  UpdateProduct,
  DeleteProduct,
  Fetcher,
  Url,
  UrlImg,
};
