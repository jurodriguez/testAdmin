export interface EntityWithId {
  id: string;
}

export interface Product extends EntityWithId {
  nombre: string;
  tipo: string;
  clienteId: number;
}
