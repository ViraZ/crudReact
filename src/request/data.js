import uuidv1 from "uuid/v1";

const collection = {
  info: {
    name: "test case"
  },
  item: [
    {
      name: "case1",
      id: "case1",
      request: {
        url: {
          protocol: "https",
          path: ["userId"],
          host: ["typicode", "users"],
          query: [],
          variable: []
        },
        header: [
          {
            key: "Content-Type",
            value: "application/json"
          }
        ],
        method: "GET",
        body: {
          mode: "raw",
          raw: 'quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto'
        }
      },
      executions: [
        {
          caseId: "case1",
          id: "case1_run1",
          trigger: "Dashboard",
          timings: {
            started: 1542100812366,
            completed: 1542100812366
          },
          request: {
            url: {
              protocol: "https",
              path: ["userId"],
              host: ["typicode", "users"],
              query: [],
              variable: []
            },
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            method: "GET",
            body: {
              mode: "raw",
              raw: 'quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto'
            }
          },
          response: {
            code: 200,
            header: [
              { key: "Content-Type", value: "application/json" },
              { key: "date", value: "Tue, 27 Nov 2019 09:04:17 GMT " }
            ],
            stream: { type: "buffer", data: [96, 97, 98] },
            responseTime: 2000,
            responseSize: 3129
          }
        },
        {
          caseId: "case1",
          id: "case1_run2",
          trigger: "API",
          timings: {
            started: 1532101812366,
            completed: 1532101812366
          },
          request: {
            url: {
              protocol: "https",
              path: ["userId"],
              host: ["typicode", "users"],
              query: [],
              variable: []
            },
            header: [
              {
                key: "Content-Type",
                value: "application/json"
              }
            ],
            method: "GET",
            body: {
              mode: "raw",
              raw: 'quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto'
            }
          },
          response: {
            code: 404,
            header: [
              { key: "Content-Type", value: "application/json" },
              { key: "date", value: "Tue, 27 Nov 2019 09:04:17 GMT " }
            ],
            stream: { type: "buffer", data: [96, 97, 98] },
            responseTime: 2000,
            responseSize: 3129
          }
        }
      ]
    },
    {
      name: "case2",
      id: "case2",
      request: {
        url: {
          protocol: "https",
          path: ["userId"],
          host: ["typicode", "users"],
          query: [],
          variable: []
        },
        header: [
          {
            key: "userId",
            value: "application/json"
          }
        ],
        method: "GET",
        body: {
          mode: "raw",
          raw: 'quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto'
        }
      },
      executions: [
        {
          caseId: "case2",
          id: "case2_run1",
          trigger: "Dashboard",
          status: "running",
          timings: {
            started: 1532101812366
          },
          request: {
            url: {
              protocol: "https",
              path: ["users", "userId"],
              host: ["typicode", "typicode", "users"],
              query: [],
              variable: []
            },
            header: [
              {
                key: "userId",
                value: "application/json"
              }
            ],
            method: "GET",
            body: {
              mode: "raw",
              raw: 'quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto'
            }
          },
          response: {}
        }
      ]
    }
  ]
};

export function formatUrl(request) {
  return (
    request.url.protocol +
    "://" +
    request.url.host.join(".") +
    "/" +
    request.url.path.join("/")
  );
}

export function formatResponseBody(response) {
  return String.fromCharCode.apply(this, response.stream.data);
}

export function newExecution(oneCase) {
  let ret = {
    id: uuidv1(),
    caseId: oneCase.id,
    request: { ...oneCase.request },
    status: "running",
    trigger: "Dashboard",
    timings: {
      started: Date.now()
    }
  };
  return ret;
}

export function setExecution(execution, response) {
  execution.status = "complete";
  execution.timings.completed = Date.now();
  execution.response = response;
}

export default collection;
