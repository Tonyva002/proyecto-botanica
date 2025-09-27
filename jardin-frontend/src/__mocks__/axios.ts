interface MockAxiosInstance {
  get: jest.Mock;
  post: jest.Mock;
  put: jest.Mock;
  delete: jest.Mock;
  create: jest.Mock<any, []>; // Tipamos el retorno de create
}

const axios: MockAxiosInstance = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),

  create: jest.fn(() => axios as any) as jest.Mock<any, []>,
};

export default axios;
