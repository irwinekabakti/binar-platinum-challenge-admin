import { rest } from "msw";
import { setupServer } from "msw/node";
import BASE_API from "../api/BASE_API";

const handlers = [
  rest.post(`${BASE_API}/admin/auth/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token: "test post admin login",
      })
    );
  }),

  rest.get(`${BASE_API}/admin/order/reports`, (req, res, ctx) => {
    return res(
      res.status(200),
      res.json({
        date: "2022-01-01",
        orderCount: 1,
      })
    );
  }),

  rest.get(`${BASE_API}/admin/v2/order`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: 1,
        pageSize: 10,
        pageCount: 100,
        count: 1000,
        orders: {
          id: 1,
          total_price: 100000,
          start_rent_at: "2022-01-01",
          finish_rent_at: "2022-01-02",
          status: false,
          slip: "https://www.jurnal.id/wp-content/uploads/2021/09/contoh-nota-kosong-434x628.png",
          UserId: 1,
          CarId: 1,
          User: {
            id: 1,
            email: "fain@bcr.io",
            role: "Admin",
          },
          Car: {
            id: 1,
            name: "Toyota Avanza",
            category: "medium",
            price: 100000,
            status: false,
            start_rent_at: "2022-01-01",
            finish_rent_at: "2022-01-02",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/0/0d/2019_Toyota_Avanza_1.3_G_F653RM_%2820200228%29.jpg",
            createdAt: "2023-03-30T19:57:08.731Z",
            updateAt: "2023-03-30T19:57:08.731Z",
          },
        },
      })
    );
  }),

  rest.get(`${BASE_API}/admin/v2/car`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        page: 1,
        pageSize: 10,
        pageCount: 100,
        count: 1000,
        cars: [
          {
            id: 1,
            name: "Toyota Avanza",
            category: "medium",
            price: 100000,
            status: false,
            start_rent_at: "2022-01-01",
            finish_rent_at: "2022-01-02",
            image:
              "https://upload.wikimedia.org/wikipedia/commons/0/0d/2019_Toyota_Avanza_1.3_G_F653RM_%2820200228%29.jpg",
            createdAt: "2023-03-24T14:42:58.997Z",
            updateAt: "2023-03-24T14:42:58.997Z",
          },
        ],
      })
    );
  }),

  rest.post(`${BASE_API}/admin/car`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.status({
        id: 1,
        name: "Toyota Avanza",
        category: "medium",
        price: 100000,
        status: false,
        start_rent_at: "2022-01-01",
        finish_rent_at: "2022-01-02",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/0d/2019_Toyota_Avanza_1.3_G_F653RM_%2820200228%29.jpg",
        createdAt: "2023-03-30T19:59:41.497Z",
        updateAt: "2023-03-30T19:59:41.497Z",
      })
    );
  }),

  rest.get(`${BASE_API}/admin/car/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        id,
        name: "Honda",
        category: "small",
        price: 4000000,
        status: false,
        start_rent_at: null,
        finish_rent_at: null,
        image:
          "https://firebasestorage.googleapis.com/v0/b/km-sib-2---secondhand.appspot.com/o/cars%2F1680409997233-2019-Mercedes-Benz-C-Class-Sedan-Hero-Image.png?alt=media",
        createdAt: "2023-04-02T04:33:17.237Z",
        updatedAt: "2023-04-02T04:33:17.237Z",
      })
    );
  }),

  rest.put(`${BASE_API}/admin/car/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        id,
        name: "Toyota Avanza",
        category: "medium",
        price: 100000,
        status: false,
        start_rent_at: "2022-01-01",
        finish_rent_at: "2022-01-02",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/0/0d/2019_Toyota_Avanza_1.3_G_F653RM_%2820200228%29.jpg",
        createdAt: "2023-03-30T20:02:34.235Z",
        updateAt: "2023-03-30T20:02:34.235Z",
      })
    );
  }),

  rest.delete(`${BASE_API}/admin/car/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        message: `Car with ${id} has been delete`,
        name: "Delete Success",
      })
    );
  }),
];

export const mockServer = setupServer(...handlers);
