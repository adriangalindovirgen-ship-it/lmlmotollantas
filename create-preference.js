import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

export default async function handler(req, res) {
  const { carrito, envio } = req.body;

  const preference = {
    items: carrito.map(p => ({
      title: p.nombre,
      unit_price: Number(p.precio),
      quantity: 1,
      currency_id: "MXN"
    })),
    back_urls: {
      success: "https://TU_BACKEND_URL.vercel.app/success",
      failure: "https://TU_BACKEND_URL.vercel.app/failure",
      pending: "https://TU_BACKEND_URL.vercel.app/pending"
    },
    auto_return: "approved"
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    res.status(500).json(error);
  }
}
