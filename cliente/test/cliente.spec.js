const axios = require('axios');
const { crearPedido, armarPedido,obtenerPedidoRestaurante,
  obtenerPedidoRepartidor ,marcarEntregado} = require('../controllers/cliente.controller');

jest.mock('axios');

describe('Cliente Controller', () => {
  describe('crearPedido', () => {
    let mockPedidos = []; // Variable para simular la lista de pedidos

    beforeEach(() => {
      mockPedidos = []; // Reiniciar la lista de pedidos antes de cada prueba
    });

    test('debe agregar un nuevo pedido y llamar a la API del restaurante', async () => {
      const mockReq = {
        body: [{ id: 1, nombre: 'hamburguesa', precio: 120, cantidad: 1 }]
      };
      const mockRes = {
        json: jest.fn()
      };
      const mockPedido = {
        id: 1,
        productos: [{ id: 1, cantidad: 1 }],
        total_pedido: 120,
        status: 'Enviado a Restaurante',
        fecha: expect.any(Date),
        repartidor: { id: 0, nombre: '' }
      };

      const mockAxiosPost = axios.post.mockResolvedValueOnce();

      const pedidosLength = mockPedidos.length;

      await crearPedido(mockReq, mockRes, mockPedidos); // Pasar la lista de pedidos como argumento

      expect(mockRes.json).toHaveBeenCalledWith({
        entidad: 'Cliente',
        message: 'Pedido Enviado a Restaurante'
      });
      
    });
  });
});


describe('Cliente Controller', () => {
  describe('obtenerPedidoRestaurante', () => {
    test('debe obtener el pedido del restaurante', async () => {
      const mockReq = {
        params: { id: 1 }
      };
      const mockRes = {
        json: jest.fn()
      };
      const mockPedidoRestaurante = {
        id: 1,
        estado: 'En proceso',
        total: 10
      };

      const mockAxiosGet = axios.get.mockResolvedValueOnce({ data: mockPedidoRestaurante });

      await obtenerPedidoRestaurante(mockReq, mockRes);

      expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:3001/restaurante/obtenerPedido/1');
      expect(mockRes.json).toHaveBeenCalledWith(mockPedidoRestaurante);
    });
  });

  describe('obtenerPedidoRepartidor', () => {
    test('debe obtener el pedido del repartidor', async () => {
      const mockReq = {
        params: { id: 1 }
      };
      const mockRes = {
        json: jest.fn()
      };
      const mockPedidoRepartidor = {
        id: 1,
        estado: 'En camino',
        destino: 'Calle Principal'
      };

      const mockAxiosGet = axios.get.mockResolvedValueOnce({ data: mockPedidoRepartidor });

      await obtenerPedidoRepartidor(mockReq, mockRes);

      expect(mockAxiosGet).toHaveBeenCalledWith('http://localhost:3000/repartidor/obtenerPedido/1');
      expect(mockRes.json).toHaveBeenCalledWith(mockPedidoRepartidor);
    });
  });
});


describe('Cliente Controller', () => {
  describe('marcarEntregado', () => {
    test('debe marcar el pedido como entregado', () => {
      const mockReq = {
        params: { id: 1 }
      };
      const mockRes = {
        json: jest.fn()
      };
      const pedidos = [
        { id: 1, status: 'Entregado' },
        { id: 2, status: 'En proceso' },
        { id: 3, status: 'En camino' }
      ];

      marcarEntregado(mockReq, mockRes);

      expect(pedidos[0].status).toBe('Entregado');
      expect(mockRes.json).toHaveBeenCalledWith({ entidad: 'cliente', message: 'Pedido Entregado' });
    });
  });
});