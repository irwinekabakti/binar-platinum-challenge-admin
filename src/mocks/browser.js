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
];

export const mockServer = setupServer(...handlers);
